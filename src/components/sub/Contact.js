import LayoutNone from '../common/LayoutNone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faPhone, faMobile } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import StoreName from './StoreName';
import MapTraffic from './MapTraffic';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
	const [City, setCity] = useState('Goyang-si');
	const [Index, setIndex] = useState(0);
	const form = useRef(null);

	//폼메일 전송 함수
	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_zxmrkcb', 'template_gtne1ai', form.current, 'PP62qMtzJtTKVyq').then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

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
				<div className='formMailWrap' id='formBox'>
					<form ref={form} onSubmit={sendEmail}>
						<div className='formTopWrap'>
							<label>Name</label>
							<input type='text' name='name' placeholder='이름을 입력해주세요.' />
							<label>Email</label>
							<input type='text' name='email' placeholder='이메일을 입력해주세요.' />
						</div>
						<div className='formMiddleWrap'>
							<label>Message</label>
							<textarea name='message' id='' cols='100' rows='5' placeholder='내용을 입력해주세요.' />
						</div>
						<div className='formBottomWrap'>
							<input type='submit' value='Send' className='submitBtn' />
							보내기
						</div>
					</form>
				</div>
			</div>

			<MapTraffic City={City} setCity={setCity} Index={Index} setIndex={setIndex} />
		</LayoutNone>
	);
}

export default Contact;
