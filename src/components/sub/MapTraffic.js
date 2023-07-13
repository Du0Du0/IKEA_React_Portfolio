import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

function MapTraffic() {
	const map = useRef(null);
	const { kakao } = window;
	const [Traffic, setTraffic] = useState(false);
	const [Location, setLocation] = useState(null);

	const info = [
		{
			title: 'IKEA 고양점',
			latlng: new kakao.maps.LatLng(37.62986119395948, 126.8631475894335),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(110, 100),
			imgPos: { offset: new kakao.maps.Point(56, 80) },
		},
		{
			title: 'IKEA 기흥점',
			latlng: new kakao.maps.LatLng(37.22224126621655, 127.11567913939837),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(110, 100),
			imgPos: { offset: new kakao.maps.Point(54, 90) },
		},
		{
			title: 'IKEA 광명점',
			latlng: new kakao.maps.LatLng(37.42432343572819, 126.88286963577373),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(110, 100),
			imgPos: { offset: new kakao.maps.Point(55, 90) },
		},
		{
			title: 'IKEA 동부산점',
			latlng: new kakao.maps.LatLng(35.19079483522182, 129.210473742942),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(110, 100),
			imgPos: { offset: new kakao.maps.Point(54, 90) },
		},
	];

	const option = { center: info[0].latlng, level: 3 };
	const imgSrc = info[0].imgSrc;
	const imgSize = info[0].imgSize;
	const imgPos = info[0].imgPos;
	const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);
	const marker = new kakao.maps.Marker({ latlng: option.center, image: markerImage });

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(map.current, option);
		marker.setMap(mapInstance);
		setLocation(mapInstance);
	}, []);

	useEffect(() => {
		Traffic ? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<div className='locationContainer'>
			<div className='titWrap'>
				<h3>오시는 길</h3>

				<div className='tabMenu'>
					<ul>
						<li className='active'>주차안내</li>
						<li>지하철</li>
						<li>버스</li>
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
								주소
							</div>
							<div className='rightside'>
								<button onClick={() => setTraffic(!Traffic)}>
									{Traffic ? '교통정보 OFF' : '교통정보 ON'} <FontAwesomeIcon icon={faCaretDown} />
								</button>
							</div>
						</div>
					</div>

					<div className='rightInfo'>안녕</div>
				</div>
			</div>
		</div>
	);
}

export default MapTraffic;
