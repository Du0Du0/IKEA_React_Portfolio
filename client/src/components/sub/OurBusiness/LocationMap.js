import React, { useState, useEffect, useRef } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

function LocationMap() {
	const uuid = require('react-uuid');
	const scale = 200;
	const cx = 350;
	const cy = 100; // 더 위에 위치

	const [Geographies, setGeographies] = useState([]);
	const [IsRotating, setIsRotating] = useState(false);
	const [hoveredCountry, setHoveredCountry] = useState(null);
	const [USAElement, setUSAElement] = useState(null);
	const [PhilippinesElement, setPhilippinesElement] = useState(null);
	const [ColombiaElement, setColombiaElement] = useState(null);
	const [ChileElement, setChileElement] = useState(null);
	const [PeruElement, setPeruElement] = useState(null);
	const [OmanElement, setOmanElement] = useState(null);

	useEffect(() => {
		fetch('/DB/worldContries-110m.json')
			.then((response) => {
				if (response.status !== 200) {
					console.log(`Houston we have a problem: ${response.status}`);
					return;
				}
				response.json().then((worldData) => {
					const mapFeatures = feature(worldData, worldData.objects.countries).features;

					//미국 fill 추가
					const USA = mapFeatures.find((geo) => geo.id === '840');
					const USAPath = geoPath().projection(projection)(USA);
					const USAElement = (
						<path key={`path-USA`} d={USAPath} fill='#fff' stroke='#fff' strokeWidth={0.5} onMouseEnter={() => setHoveredCountry('USA')} onMouseLeave={() => setHoveredCountry(null)} />
					);

					setUSAElement(USAElement);

					//필리핀 fill 추가
					const Philippines = mapFeatures.find((geo) => geo.id === '608');
					const PhilippinesPath = geoPath().projection(projection)(Philippines);
					const PhilippinesElement = (
						<path
							key={`path-Philippines`}
							d={PhilippinesPath}
							fill='#fff'
							stroke='#fff'
							strokeWidth={1.5}
							onMouseEnter={() => setHoveredCountry('Philippines')}
							onMouseLeave={() => setHoveredCountry(null)}
						/>
					);

					setPhilippinesElement(PhilippinesElement);

					//콜롬비아 fill 추가
					const Colombia = mapFeatures.find((geo) => geo.id === '152');
					const ColombiaPath = geoPath().projection(projection)(Colombia);
					const ColombiaElement = (
						<path key={`path-Colombia`} d={ColombiaPath} fill='#fff' stroke='#fff' strokeWidth={1.5} onMouseEnter={() => setHoveredCountry('Colombia')} onMouseLeave={() => setHoveredCountry(null)} />
					);

					setColombiaElement(ColombiaElement);

					//칠레 fill 추가
					const Chile = mapFeatures.find((geo) => geo.id === '170');
					const ChilePath = geoPath().projection(projection)(Chile);
					const ChileElement = (
						<path key={`path-Chile`} d={ChilePath} fill='#fff' stroke='#fff' strokeWidth={1.5} onMouseEnter={() => setHoveredCountry('Chile')} onMouseLeave={() => setHoveredCountry(null)} />
					);

					setChileElement(ChileElement);

					//페루 Peru 추가
					const Peru = mapFeatures.find((geo) => geo.id === '604');
					const PeruPath = geoPath().projection(projection)(Peru);
					const PeruElement = (
						<path key={`path-Peru`} d={PeruPath} fill='#fff' stroke='#fff' strokeWidth={1.5} onMouseEnter={() => setHoveredCountry('Peru')} onMouseLeave={() => setHoveredCountry(null)} />
					);

					setPeruElement(PeruElement);

					//오만 fill 추가
					const Oman = mapFeatures.find((geo) => geo.id === '512');
					const OmanPath = geoPath().projection(projection)(Oman);
					const OmanElement = (
						<path key={`path-Oman`} d={OmanPath} fill='#fff' stroke='#fff' strokeWidth={2.5} onMouseEnter={() => setHoveredCountry('Oman')} onMouseLeave={() => setHoveredCountry(null)} />
					);

					setOmanElement(OmanElement);

					setGeographies(mapFeatures);
				});
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	const projection = geoEqualEarth().scale(scale).translate([cx, cy]);
	const svgRef = useRef(null);

	const render = () => {
		const svg = svgRef.current;
		if (svg) {
			const paths = svg.querySelectorAll('path');
			paths.forEach((path, i) => {
				const d = geoPath().projection(projection)(Geographies[i]) || '';
				path.setAttribute('d', d);
			});
		}
	};

	const data = [
		{ name: '1', coordinates: [-73.9919, 40.7529] }, // 뉴욕, 미국
		{ name: '2', coordinates: [126.978, 37.5665] }, // 서울, 대한민국 남한
	];

	function returnProjectionValueWhenValid(point, index) {
		const retVal = projection(point);
		if (retVal?.length) {
			return retVal[index];
		}
		return 0;
	}

	const handleMarkerClick = (i) => {
		alert(`Marker: ${JSON.stringify(data[i])}`);
	};

	return (
		<>
			<div className='locationMapSection'>
				<div className='sectionNum'>2</div>
				<div className='borderLine' />
				<div className='locationMapTitWrap'>
					<h3>
						New IKEA locations <br />
						opened around the <br />
						world
					</h3>
					<ul>
						<li>
							opened around the world In FY22, IKEA opened retail operations in new markets, including the very first IKEA store and online channel in South America. IKEA Santiago de Chile opened on
							10 August, and South American expansion will continue with Colombia and Peru during the coming years. The Philippines also became a new IKEA market, and the first IKEA stores in Estonia,
							Puerto Rico and Oman opened their doors. In total, 38 new IKEA sales locations opened around the world in FY22.
						</li>
						<li>Hej, South America, Chile and Falabella: welcome to the IKEA family!</li>
					</ul>
				</div>

				<div className='LocationMapWrap'>
					<svg ref={svgRef} width={scale * 5} height={scale * 5} viewBox='0 0 800 450'>
						<g>
							{data.map((d, i) => (
								<circle
									key={`marker-${uuid()}`}
									cx={returnProjectionValueWhenValid(d.coordinates, 0)}
									cy={returnProjectionValueWhenValid(d.coordinates, 1)}
									r={5}
									fill={hoveredCountry === d.name ? 'yellow' : '#E91E63'}
									stroke='#FFFFFF'
									onClick={() => handleMarkerClick(i)}
								/>
							))}
						</g>
						<g>
							{OmanElement}
							{PeruElement}
							{ChileElement}
							{ColombiaElement}
							{PhilippinesElement}
							{USAElement}
							{Geographies.map((d, i) => (
								<path
									key={`path-${uuid()}`}
									d={geoPath().projection(projection)(d) || ''}
									fill={`rgba(38,50,56,${(1 / (Geographies ? Geographies.length : 0)) * i})`}
									stroke='aliceblue'
									strokeWidth={0.5}
									onMouseEnter={() => setHoveredCountry(d.properties.name)}
									onMouseLeave={() => setHoveredCountry(null)}
								/>
							))}
						</g>
					</svg>
				</div>
			</div>
		</>
	);
}

export default LocationMap;
