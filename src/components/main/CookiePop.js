import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import { useState, useRef } from 'react';

function CookiePop({ IsOpen, setIsOpen }) {
	const path = process.env.PUBLIC_URL;
	const [Cookies, setCookies] = useCookies(['ONE_WEEK_COOKIE']);
	const [IsHideChecked, setIsHideChecked] = useState(false);
	const cookiePop = useRef(null);

	const hideModal = () => {
		const oneWeek = moment();
		oneWeek.add(7, 'd');

		// 체크박스가 체크되었을 때만 쿠키를 설정하도록 수정
		if (IsHideChecked) {
			setCookies('ONE_WEEK_COOKIE', 'true', {
				path: '/',
				expires: oneWeek.toDate(),
			});
		}
		setIsOpen(false);
	};

	return (
		<>
			{Cookies['ONE_WEEK_COOKIE'] ? null : (
				<aside id='pop'>
					<div className='content'>
						{/* cookie pop title top  */}
						<div className='top'>
							<p className='wrap'>
								<input type='checkbox' id='ck' ref={cookiePop} checked={IsHideChecked} onChange={() => setIsHideChecked(!IsHideChecked)} />
								<label for='ck'>7일간 보지 않기</label>
								<a href='#' className='close' onClick={hideModal}>
									<FontAwesomeIcon icon={faXmark} />
									팝업닫기
								</a>
							</p>
						</div>

						<div className='middle'>
							<div className='leftWrap'>
								<div className='popLeft'>
									<img src={path + '/img/cookiePop1.png'} />
								</div>

								<div className='popLeft'>
									<img src={path + '/img/cookiePop3.png'} />
								</div>
								<div className='popLeft'>
									<img src={path + '/img/cookiePop2.png'} />
								</div>
							</div>
							<div className='rightWrap'>
								<div className='popRight'>
									<img src={path + '/img/cookiePop4.png'} />
								</div>
								<div className='popRight'>
									<img src={path + '/img/cookiePop5.png'} />
								</div>
								<div className='popRight'>
									<img src={path + '/img/cookiePop6.png'} />
								</div>
							</div>
						</div>
					</div>
				</aside>
			)}
		</>
	);
}

export default CookiePop;
