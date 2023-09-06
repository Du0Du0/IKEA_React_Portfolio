import React, { useState, useEffect, useRef } from 'react';
import { geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

function CircleWorldGlobe() {
	const uuid = require('react-uuid');
	const scale = 400;
	//중앙 X 좌표
	const cx = scale;
	//중앙 Y 좌표
	const cy = scale;

	const [Geographies, setGeographies] = useState([]);
	const [IsRotating, setIsRotating] = useState(false);
	const [HoveredCountry, setHoveredCountry] = useState(null);
	const [SelectedCoordinates, setSelectedCoordinates] = useState({ x: 0, y: 0 });

	//세계 지도 정보 출력
	useEffect(() => {
		fetch('/DB/worldContries-110m.json')
			.then((response) => {
				if (response.status !== 200) {
					console.log(`err: ${response.status}`);
					return;
				}
				response.json().then((worldData) => {
					const mapFeatures = feature(worldData, worldData.objects.countries).features;
					setGeographies(mapFeatures);
				});
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	//d3.js지도 스타일 설정
	const projection = geoOrthographic().scale(scale).translate([cx, cy]);
	const svgRef = useRef(null);

	// 프레임 요청 식별자를 저장할 변수
	let animationFrameId;

	//지도 회전 재생 버튼 설정
	const startRotation = () => {
		if (!IsRotating) {
			setIsRotating(true);
			rotate();
		}
	};

	const stopRotation = () => {
		if (IsRotating) {
			setIsRotating(false);
			cancelAnimationFrame(animationFrameId);
		}
	};

	const rotate = () => {
		if (IsRotating) {
			const rotationSpeed = 0.5;
			const newRotation = [projection.rotate()[0] + rotationSpeed, projection.rotate()[1]];
			projection.rotate(newRotation);
			render();
			animationFrameId = requestAnimationFrame(rotate);
		}
	};

	useEffect(() => {
		const startAfterDelay = setTimeout(() => {
			rotate();
		}, 500); // 5초 후에 startRotation 함수 호출

		return () => {
			clearTimeout(startAfterDelay); // 컴포넌트가 언마운트되면 타이머 정리
		};
	}, []); // 이펙트는 컴포넌트가 처음 렌더링될 때만 실행됩니다.

	useEffect(() => {
		if (IsRotating) {
			rotate(); // 회전 함수 호출
		}
	}, [IsRotating]);

	const render = () => {
		const svg = svgRef.current;
		if (svg) {
			const paths = svg.querySelectorAll('path');
			paths.forEach((path, i) => {
				const d = geoPath().projection(projection)(Geographies[i]) || '';
				path.setAttribute('d', d);
			});

			const circles = svg.querySelectorAll('.fixed-circle');
			circles.forEach((circle, i) => {
				const [latitude, longitude] = data[i].coordinates;
				const [x, y] = projection([longitude, latitude]);
				if (projection.rotate()[1] > -90) {
					// 서울이 시야에 들어올 때만 점을 나타냄
					circle.setAttribute('cx', x);
					circle.setAttribute('cy', y);
					circle.style.display = 'block';
				} else {
					circle.style.display = 'none';
				}
			});
		}
	};

	//지도 coordinate 설정
	const data = [
		{ name: '미국 뉴욕', coordinates: [-73.9919, 40.7529] },
		{ name: '대한민국 서울', coordinates: [126.978, 37.5665] },
		{ name: '독일 베를린', coordinates: [13.404954, 52.520008] },
		{ name: '덴마크 코펜하겐', coordinates: [9.501785, 56.26392] },
		{ name: '네덜란드 암스테르담', coordinates: [4.899431, 52.379189] },
		{ name: '캐나다 밴쿠버', coordinates: [-123.1216, 49.2827] },
		{ name: '오스트리아 빈', coordinates: [16.373818, 48.208174] },
		{ name: '프랑스 파리', coordinates: [2.352222, 48.856614] },
		{ name: '벨기에 브뤼셀', coordinates: [4.3517103, 50.8503463] },
		{ name: '체코 프라하', coordinates: [14.4204598, 50.0880414] },
		{ name: '아랍에미리트 두바이', coordinates: [55.296249, 25.276987] },
		{ name: '중국 베이징', coordinates: [116.4073963, 39.9041999] },
		{ name: '러시아 모스크바', coordinates: [37.6172999, 55.755826] },
		{ name: '일본 도쿄', coordinates: [139.6917064, 35.6894875] },
		{ name: '터키 이스탄불', coordinates: [28.9783589, 41.0082376] },
	];

	function returnProjectionValueWhenValid(point, index) {
		const retVal = projection(point);
		if (retVal?.length) {
			return retVal[index];
		}
		return 0;
	}

	const handleMarkerClick = (i) => {
		if (selectedCountryIndex === i) {
			setSelectedCountryIndex(-1);
			setSelectedCountry('');
		} else {
			setSelectedCountryIndex(i);
			setSelectedCountry(data[i].name);
		}
	};

	const handleMouseMove = (e) => {
		setSelectedCoordinates({ x: e.clientX, y: e.clientY });
	};

	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedCountryIndex, setSelectedCountryIndex] = useState(-1);
	console.log('hoveredCountry', HoveredCountry);
	console.log('selectedCountry', selectedCountry);
	return (
		<>
			<div id='stars' /> <div id='stars2' /> <div id='stars3' />
			<div className='subTitle'>
				<h2>Discover Our Global Network of IKEA Stores</h2>
				<p>
					Immerse yourself in the vast universe of IKEA by venturing into our extraordinary stores <br />
					across the world. With each store embodying its unique charm, you're invited to discover the art of
					<br /> creating a home that speaks to you
				</p>
			</div>
			<div className='worldGlobe' onMouseMove={handleMouseMove} style={{ position: 'relative', overflow: 'visible' }}>
				<div className='buttonWrap'>
					<button onClick={startRotation}>회전 시작</button>
					<button onClick={stopRotation}>회전 정지</button>
				</div>
				{selectedCountryIndex && <aside style={{ backgroundColor: 'white', color: 'white' }}>{HoveredCountry}</aside>}
				<svg
					ref={svgRef}
					width={scale * 2} // SVG의 크기를 화면의 반으로 설정 (중앙에 오도록)
					height={scale * 2}
					viewBox={`0 0 ${scale * 2} ${scale * 2}`}
					style={{ overflow: 'visible' }}
				>
					<defs>
						<clipPath id='clip-path'>
							<circle cx={cx} cy={cy} r={scale} />
						</clipPath>
					</defs>
					<g>
						<circle fill='rgba(0, 0, 0, 1)' cx={cx} cy={cy} r={scale} stroke={'#333333'} strokeWidth={0.2} />
					</g>
					<g>
						{data.map((d, i) => (
							<circle
								key={`marker-${uuid()}`}
								className='fixed-circle'
								cx={returnProjectionValueWhenValid(d.coordinates, 0)}
								cy={returnProjectionValueWhenValid(d.coordinates, 1)}
								r={8}
								fill='#fec202'
								stroke='#fec202'
								strokeOpacity='0.2'
								strokeWidth={20}
								onClick={(e) => handleMarkerClick(i)}
								onMouseEnter={() => setIsRotating(false)}
								style={{ cursor: 'pointer' }} // 마우스 커서 스타일 변경
							/>
						))}
					</g>

					<g>
						{Geographies.map((d, i) => (
							<path
								key={`path-${uuid()}`}
								d={geoPath().projection(projection)(d) || ''}
								fill={selectedCountryIndex === i ? '#fec202' : `rgba(38, 50, 56, ${(1 / (Geographies ? Geographies.length : 0)) * i})`}
								stroke='aliceblue'
								strokeWidth={0.5}
								onMouseEnter={() => setHoveredCountry(d.properties.name)}
								onMouseLeave={() => setHoveredCountry(null)}
								onClick={() => {
									setSelectedCountryIndex(selectedCountryIndex === i ? -1 : i);
									setSelectedCountry(selectedCountryIndex === i ? '' : d.properties.name);
								}}
							/>
						))}
					</g>
					{selectedCountryIndex !== -1 && SelectedCoordinates && selectedCountry !== undefined && (
						<svg width='800' height='600'>
							<g transform={`translate(${SelectedCoordinates.x - 455}, ${SelectedCoordinates.y - 300})`}>
								<rect width={190} height={80} fill='rgb(83,84,84)' rx={5} ry={5} />

								<g transform={`translate(75, 25)`} position={'absolute'}>
									<text font-size='18' font-weight='700' fill='#fff' text-anchor='start' dominant-baseline='middle'>
										<tspan x={-60} dy='0'>
											IKEA Stores
										</tspan>
									</text>
									<text font-size='12' fill='#1b2539' text-anchor='middle' dominant-baseline='middle' dy='30'>
										<tspan x={0} dy='15'>
											ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
										</tspan>
									</text>
								</g>

								<g transform={`translate(75, 57)`}>
									<rect width={15} height={15} x={-60} y={-5} fill='#fec202' />
									<text font-size='16' fill='#fff' text-anchor='start' dominant-baseline='middle' x='-30' y='2'>
										<tspan dy='0'>{selectedCountry}</tspan>
									</text>
								</g>
							</g>
						</svg>
					)}
				</svg>
			</div>
		</>
	);
}

export default CircleWorldGlobe;
