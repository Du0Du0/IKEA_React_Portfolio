import LayoutNone from '../common/LayoutNone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faPhone, faMobile } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import StoreName from './StoreName';
import MapTraffic from './MapTraffic';
import { useState } from 'react';

function Contact() {
	const [City, setCity] = useState('Goyang-si');
	const [Index, setIndex] = useState(0);

	return (
		<LayoutNone type={''} name1={'contact'}>
			<StoreName City={City} setCity={setCity} Index={Index} setIndex={setIndex} />

			<div className='formMailContainer'>
				<div className='formMailTitWrap'>
					<div className='formMailTitWrapW'>
						<FontAwesomeIcon icon={faMobile} />
						<h2>문의하기</h2>
					</div>
				</div>
				<div className='formMailWrap'>
					<div className='formTopWrap'>
						<input type='text' placeholder='이름을 입력해주세요.' />
						<input type='text' placeholder='이메일을 입력해주세요.' />
					</div>
					<div className='formMiddleWrap'>
						<textarea name='' id='' cols='100' rows='5' placeholder='내용을 입력해주세요.' />
					</div>
					<div className='formBottomWrap'>
						<button>보내기</button>
					</div>
				</div>
			</div>

			<MapTraffic City={City} setCity={setCity} Index={Index} setIndex={setIndex} />
		</LayoutNone>
	);
}

export default Contact;
