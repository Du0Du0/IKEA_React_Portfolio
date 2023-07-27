import React from 'react';
import { useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';

function FormMail({ Success, setSuccess }) {
	const form = useRef(null);
	const inputName = useRef('');
	const inputEmail = useRef('');
	const inputMsg = useRef('');

	//폼메일 전송하는 기능
	const sendEmail = useCallback((e) => {
		e.preventDefault();

		emailjs.sendForm('service_zxmrkcb', 'template_gtne1ai', form.current, 'sw27qSr38NkxI2uRB').then(
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
	}, []);

	return (
		<>
			{/* 중앙 폼메일란 */}
			<div className='formMailContainer'>
				<div className='formMailTitWrap'>
					{/* 오른쪽 제목란 */}
					<div className='formMailTitWrapW'>
						<FontAwesomeIcon icon={faMobile} />
						<h2>문의하기</h2>
					</div>
				</div>
				{/* 왼쪽 폼메일 양식 시작 */}
				<div className='formMailWrap' id='formBox'>
					<form ref={form} onSubmit={sendEmail}>
						<div className='formTopWrap'>
							{/* 이름 */}
							<input type='text' name='name' placeholder='이름을 입력해주세요.' ref={inputName} />

							{/* 이메일 */}
							<input type='text' name='email' placeholder='이메일을 입력해주세요.' ref={inputEmail} />
						</div>

						<div className='formMiddleWrap'>
							{/* 내용 */}
							<textarea name='message' id='' cols='100' rows='5' placeholder='내용을 입력해주세요.' ref={inputMsg} />
						</div>

						<div className='formBottomWrap'>
							{/* 폼 메일 전송 성공시 알림 설정 */}
							{Success && <p>메일이 성공적으로 발송되었습니다.</p>}
							{/* 제출 버튼 */}
							<div className='submitBg'>
								<input type='submit' value='보내기' className='submitBtn' />
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default React.memo(FormMail);
