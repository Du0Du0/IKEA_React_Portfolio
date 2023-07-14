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
	const inputName = useRef('');
	const inputEmail = useRef('');
	const inputMsg = useRef('');
	const [Success, setSuccess] = useState(false);

	//폼메일 전송 함수
	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_zxmrkcb', 'template_gtne1ai', form.current, '-2LQanwpgbk-qnYZG').then(
			(result) => {
				console.log(result.text);
				setSuccess(true);
				inputName.current.value = '';
				inputEmail.current.value = '';
				inputMsg.current.value = '';
			},
			(error) => {
				console.log(error.text);
				setSuccess(false);
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
							<input type='text' name='name' placeholder='이름을 입력해주세요.' ref={inputName} />

							<input type='text' name='email' placeholder='이메일을 입력해주세요.' ref={inputEmail} />
						</div>
						<div className='formMiddleWrap'>
							<textarea name='message' id='' cols='100' rows='5' placeholder='내용을 입력해주세요.' ref={inputMsg} />
						</div>
						<div className='formBottomWrap'>
							{Success && <p>메일이 성공적으로 발송되었습니다.</p>} <input type='submit' value='보내기' className='submitBtn' />
						</div>
					</form>
				</div>
			</div>

			<MapTraffic City={City} setCity={setCity} Index={Index} setIndex={setIndex} />
		</LayoutNone>
	);
}

export default Contact;
