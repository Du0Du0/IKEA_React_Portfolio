import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

function MapTraffic() {
	const map = useRef(null);
	const { kakao } = window;
	const [Traffic, setTraffic] = useState(false);
	const [Location, setLocation] = useState(null);
	const option = {
		center: new kakao.maps.LatLng(37.42432343572819, 126.88286963577373), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};
	const imgSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
	const imgSize = new kakao.maps.Size(110, 100);
	const imgPos = { offset: new kakao.maps.Point(56, 80) };
	const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);
	const marker = new kakao.maps.Marker({
		position: option.center,
		image: markerImage,
	});

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
