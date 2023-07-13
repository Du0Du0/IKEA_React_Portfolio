import LayoutNone from '../common/LayoutNone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import StoreName from './StoreName';
import MapTraffic from './MapTraffic';

function Contact() {
	return (
		<LayoutNone type={''} name1={'community'}>
			<StoreName />
			{/* 
			<div className='promotionWrap'>
				<div className='promotionTit'>제목</div>
				<div className='eventWrap'>
					<div className='eventBox'>1</div>
					<div className='eventBox'>1</div>
					<div className='eventBox'>1</div>
				</div>
			</div> */}

			<MapTraffic />
		</LayoutNone>
	);
}

export default Contact;
