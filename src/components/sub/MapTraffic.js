import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

function MapTraffic() {
	const map = useRef(null);
	const { kakao } = window;

	const option = {
		center: new kakao.maps.LatLng(37.42432343572819, 126.88286963577373), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(map.current, option);

		const marker = new kakao.maps.Marker({
			position: option.center,
		});

		marker.setMap(mapInstance);
	}, []);

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
							<FontAwesomeIcon icon={faEarthAsia} className='loactionIcon' />
							주소
						</div>
					</div>

					<div className='rightInfo'>안녕</div>
				</div>
			</div>
		</div>
	);
}

export default MapTraffic;
