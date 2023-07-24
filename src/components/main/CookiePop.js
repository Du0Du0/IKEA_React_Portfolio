import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function CookiePop({ IsOpen, setIsOpen }) {
	const path = process.env.PUBLIC_URL;

	// 쿠키팝업창 닫을 시 뒷 배경 스크롤 가능하도록(스크롤 보이는 채)
	function cookiePopEnable() {
		const container = document.querySelector('.bodyContainer');
		const scrollPosition = Math.abs(parseInt(container.style.top));

		container.removeAttribute('style');
		window.scrollTo(0, scrollPosition);
		document.body.removeAttribute('style');
	}

	return (
		<aside id='pop'>
			<div className='content'>
				{/* cookie pop title top  */}
				<div className='top'>
					<p className='wrap'>
						<input type='checkbox' id='ck' />
						<label for='ck'>7일간 보지 않기</label>
						<a href='#' className='close' onClick={() => setIsOpen(false)}>
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
	);
}

export default CookiePop;
