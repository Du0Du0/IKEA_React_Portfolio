import { useState, useRef, useCallback } from 'react';
import LayoutNone from '../../common/LayoutNone';
import StoreName from '../contactPage/StoreName';
import MapTraffic from '../contactPage/MapTraffic';
import FormMail from '../contactPage/FormMail';
import { Helmet } from 'react-helmet-async';

function Contact() {
	const [City, setCity] = useState('Goyang-si');
	const [Index, setIndex] = useState(0);
	const [Success, setSuccess] = useState(false);

	return (
		<>
			<Helmet>
				<title>점포 안내</title>
			</Helmet>
			<LayoutNone type={''} name1={'contact'}>
				{/* 상단 지점선택 / 영업시간 / 캘린더란 */}
				<StoreName City={City} setCity={setCity} Index={Index} setIndex={setIndex} />

				{/* 중앙 폼메일란 */}
				<FormMail Success={Success} setSuccess={setSuccess} />

				{/* 하단 지도 / 주차안내 / 지하철 / 버스 정보란*/}
				<MapTraffic Index={Index} />
			</LayoutNone>
		</>
	);
}

export default Contact;
