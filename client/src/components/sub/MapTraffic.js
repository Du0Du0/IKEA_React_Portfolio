import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import React from 'react';
import ParkingInfo from './ParkingInfo';
import SubwayInfo from './SubwayInfo';
import BusInfo from './BusInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faCaretRight } from '@fortawesome/free-solid-svg-icons';

function MapTraffic({ Index }) {
	const map = useRef(null);
	const { kakao } = window;
	const [Traffic, setTraffic] = useState(false);
	const [Location, setLocation] = useState(null);
	const [ActiveBtn, setActiveBtn] = useState(0);

	const info = useMemo(
		() => [
			{
				title: '고양점',
				address: '경기도 고양시 덕양구 권율대로 420',
				subwayIcon: `${process.env.PUBLIC_URL}/img/ico_subway_3.png`,
				subwayStationName: '원흥역',
				subwayStationDec: '원흥역 3번 게이트를 이용하시면 편안하게 오실 수 있습니다.',

				latlng: new kakao.maps.LatLng(37.62986119395948, 126.8631475894335),
				imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
				imgSize: new kakao.maps.Size(110, 100),
				imgPos: { offset: new kakao.maps.Point(56, 80) },

				localBusKo: '지선버스',
				localBus: '730, 733',
				localBusIcon: `${process.env.PUBLIC_URL}/img/localBus.png`,

				trunkBusKo: '간선버스',
				trunkBus: '024, 046, 95',
				trunkBusIcon: `${process.env.PUBLIC_URL}/img/trunkBus.png`,

				seaterBusKo: '좌석버스',
				seaterBus: '1001, 1003',
				seaterBusIcon: `${process.env.PUBLIC_URL}/img/seaterBus.png`,

				expressBusKo: '광역버스',
				expressBus: '',
				expressBusIcon: `${process.env.PUBLIC_URL}/img/expressBus.png`,
			},
			{
				title: '기흥점',
				address: '경기도 용인시 기흥구 신고매로 62',
				subwayIcon: `${process.env.PUBLIC_URL}/img/ico_subway_1.png`,
				subwayStationName: '신길역',
				subwayStationDec: '신길역 1번 게이트를 이용하시면 편안하게 오실 수 있습니다.',
				latlng: new kakao.maps.LatLng(37.22224126621655, 127.11567913939837),
				imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
				imgSize: new kakao.maps.Size(110, 100),
				imgPos: { offset: new kakao.maps.Point(54, 90) },

				localBusKo: '지선버스',
				localBus: '51-1, 51-2A',
				localBusIcon: `${process.env.PUBLIC_URL}/img/localBus.png`,

				trunkBusKo: '간선버스',
				trunkBus: '',
				trunkBusIcon: `${process.env.PUBLIC_URL}/img/trunkBus.png`,

				seaterBusKo: '좌석버스',
				seaterBus: '',
				seaterBusIcon: `${process.env.PUBLIC_URL}/img/seaterBus.png`,

				expressBusKo: '광역버스',
				expressBus: '99',
				expressBusIcon: `${process.env.PUBLIC_URL}/img/expressBus.png`,
			},
			{
				title: '광명점',
				address: '경기도 광명시 일직로 17',
				subwayIcon: `${process.env.PUBLIC_URL}/img/ico_subway_bundang.png`,
				subwayStationName: '광명사거리역역',
				subwayStationDec: '광명사거리역 10번 게이트로 10분정도 소요됩니다.',
				latlng: new kakao.maps.LatLng(37.42432343572819, 126.88286963577373),
				imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
				imgSize: new kakao.maps.Size(110, 100),
				imgPos: { offset: new kakao.maps.Point(55, 90) },

				localBusKo: '지선버스',
				localBus: '8507, G8808',
				localBusIcon: `${process.env.PUBLIC_URL}/img/localBus.png`,

				trunkBusKo: '간선버스',
				trunkBus: '2, 3, 12, 17, 75, 505 ',
				trunkBusIcon: `${process.env.PUBLIC_URL}/img/trunkBus.png`,

				seaterBusKo: '좌석버스',
				seaterBus: '',
				seaterBusIcon: `${process.env.PUBLIC_URL}/img/seaterBus.png`,

				expressBusKo: '광역버스',
				expressBus: 'G9633',
				expressBusIcon: `${process.env.PUBLIC_URL}/img/expressBus.png`,
			},
			{
				title: '동부산점',
				address: '부산시 기장군 기장읍 동부산관광3로 17',
				subwayIcon: `${process.env.PUBLIC_URL}/img/ico_subway_Gyeonggang.png`,
				subwayStationName: '오시리아역',
				subwayStationDec: '오시리아역 1번 게이트를 이용하시면 15분정도 소요됩니다.',

				localBusKo: '지선버스',
				localBus: '100, 1003',
				localBusIcon: `${process.env.PUBLIC_URL}/img/localBus.png`,

				trunkBusKo: '간선버스',
				trunkBus: '139, 181, 185',
				trunkBusIcon: `${process.env.PUBLIC_URL}/img/trunkBus.png`,

				seaterBusKo: '좌석버스',
				seaterBus: '1001, 1003',
				seaterBusIcon: `${process.env.PUBLIC_URL}/img/seaterBus.png`,

				expressBusKo: '광역버스',
				expressBus: '1011',
				expressBusIcon: `${process.env.PUBLIC_URL}/img/expressBus.png`,

				latlng: new kakao.maps.LatLng(35.19079483522182, 129.210473742942),
				imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
				imgSize: new kakao.maps.Size(110, 100),
				imgPos: { offset: new kakao.maps.Point(54, 90) },
			},
		],
		[kakao.maps.LatLng, kakao.maps.Point, kakao.maps.Size]
	);

	const title = info[Index].title;
	const address = info[Index].address;
	const option = { center: info[Index].latlng, level: 3 };

	//지역버스 정보
	const localBusKo = useMemo(() => info[Index].localBusKo, [info, Index]);
	const localBus = useMemo(() => info[Index].localBus, [info, Index]);
	const localBusIcon = useMemo(() => <img src={info[Index].localBusIcon} alt={'localBus icon'} />, [info, Index]);

	//간선버스 정보
	const trunkBusKo = useMemo(() => info[Index].trunkBusKo, [info, Index]);
	const trunkBus = useMemo(() => info[Index].trunkBus, [info, Index]);
	const trunkBusIcon = useMemo(() => <img src={info[Index].trunkBusIcon} alt={'trunkBus icon'} />, [info, Index]);

	//광역버스 정보
	const expressBusKo = useMemo(() => info[Index].expressBusKo, [info, Index]);
	const expressBus = useMemo(() => info[Index].expressBus, [info, Index]);
	const expressBusIcon = useMemo(() => <img src={info[Index].expressBusIcon} alt={'expressBusIcon icon'} />, [info, Index]);

	//좌석버스 정보
	const seaterBusKo = useMemo(() => info[Index].seaterBusKo, [info, Index]);
	const seaterBus = useMemo(() => info[Index].seaterBus, [info, Index]);
	const seaterBusIcon = useMemo(() => <img src={info[Index].seaterBusIcon} alt={'seaterBus icon'} />, [info, Index]);

	//지하철 정보
	const subwayIcon = useMemo(() => <img src={info[Index].subwayIcon} alt={'subway icon'} />, [info, Index]);
	const subwayStationName = useMemo(() => info[Index].subwayStationName, [info, Index]);
	const subwayStationDec = useMemo(() => info[Index].subwayStationDec, [info, Index]);

	const marker = useMemo(() => {
		new kakao.maps.Marker({
			position: option.center,
			image: new kakao.maps.MarkerImage(info[Index].imgSrc, info[Index].imgSize, info[Index].imgPos),
		});
	}, [Index, kakao]);

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(map.current, option);
		marker.setMap(mapInstance);
		setLocation(mapInstance);
		//지도인스턴스에 타입, 줌 컨트롤 추가
		mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
		const setCenter = () => {
			console.log('setCenter');
			//setCetner가 호출시 내부적으로 Index state값에 의존하고 있기 떄문에
			//useEffect안쪽에서 setCenter함수를 정의하고 호출
			mapInstance.setCenter(info[Index].latlng);
		};

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index, kakao, marker]);

	useEffect(() => {
		Traffic ? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, Location, kakao]);

	const swtichTabButton = useCallback(() => {
		if (ActiveBtn === 0) return <ParkingInfo />;
		if (ActiveBtn === 1) return <SubwayInfo subwayIcon={subwayIcon} subwayStationName={subwayStationName} subwayStationDec={subwayStationDec} />;
		if (ActiveBtn === 2)
			return (
				<BusInfo
					localBusIcon={localBusIcon}
					localBusKo={localBusKo}
					localBus={localBus}
					trunkBusIcon={trunkBusIcon}
					trunkBusKo={trunkBusKo}
					trunkBus={trunkBus}
					expressBusIcon={expressBusIcon}
					expressBusKo={expressBusKo}
					expressBus={expressBus}
					seaterBusKo={seaterBusKo}
					seaterBusIcon={seaterBusIcon}
					seaterBus={seaterBus}
				/>
			);
	}, [
		ActiveBtn,
		localBusIcon,
		localBusKo,
		localBus,
		trunkBusIcon,
		trunkBusKo,
		trunkBus,
		expressBusIcon,
		expressBusKo,
		expressBus,
		seaterBusKo,
		seaterBusIcon,
		seaterBus,
		subwayIcon,
		subwayStationDec,
		subwayStationName,
	]);

	return (
		<div className='locationContainer'>
			<div className='titWrap'>
				<h2>오시는 길</h2>
				<div className='tabMenu'>
					<ul>
						<li
							className={ActiveBtn === 0 ? 'active' : ''}
							onClick={() => {
								setActiveBtn(0);
							}}
						>
							주차안내
						</li>
						<li
							className={ActiveBtn === 1 ? 'active' : ''}
							onClick={(e) => {
								setActiveBtn(1);
								setActiveBtn(1) ? e.target.classList.add('active') : e.target.classList.remove('active');
							}}
						>
							지하철
						</li>
						<li
							className={ActiveBtn === 2 ? 'active' : ''}
							onClick={(e) => {
								setActiveBtn(2);
								setActiveBtn(2) ? e.target.classList.add('active') : e.target.classList.remove('active');
							}}
						>
							버스
						</li>
					</ul>
				</div>
				<div className='mapContainer'>
					<div className='leftInfo'>
						<div id='map' ref={map}>
							map
						</div>
						<div className='addressDesc'>
							<div className='leftside'>
								<FontAwesomeIcon icon={faEarthAsia} className='loactionIcon' />
								{title} : {address}
							</div>
							<div className='rightside'>
								<button onClick={() => setTraffic((prevTraffic) => !prevTraffic)}>
									{Traffic ? '교통정보 OFF' : '교통정보 ON'} <FontAwesomeIcon icon={faCaretRight} />
								</button>
							</div>
						</div>
					</div>

					<div className='rightInfo'>{swtichTabButton()}</div>
				</div>
			</div>
		</div>
	);
}

export default React.memo(MapTraffic);
