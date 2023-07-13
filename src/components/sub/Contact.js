import LayoutNone from '../common/LayoutNone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import StoreName from './StoreName';
import MapTraffic from './MapTraffic';
import { useState } from 'react';

function Contact() {
	const [City, setCity] = useState('Goyang-si');
	const [Index, setIndex] = useState(0);

	return (
		<LayoutNone type={''} name1={'community'}>
			<StoreName City={City} setCity={setCity} Index={Index} setIndex={setIndex} />
			{/* 
			<div className='promotionWrap'>
				<div className='promotionTit'>제목</div>
				<div className='eventWrap'>
					<div className='eventBox'>1</div>
					<div className='eventBox'>1</div>
					<div className='eventBox'>1</div>
				</div>
			</div> */}

			<MapTraffic City={City} setCity={setCity} Index={Index} setIndex={setIndex} />
		</LayoutNone>
	);
}

export default Contact;
