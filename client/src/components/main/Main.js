import React, { useState, useRef, useEffect } from 'react';
import FooterNone from '../common/FooterNone';
import Header from '../common/Header';
import Visual from './Visual';
import Products from './Products';
import Vids from './Vids';
import Promotion from './Promotion';
import Museum from './Museum';
import MainCommunity from './MainCommunity';
import Scroll_navi from '../common/Scroll_navi';
import TopButton from '../common/TopButton';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function Main({ menuRef }) {
	const mainIndicatorLists = ['Menu', 'video', 'Living', 'Event', 'Exhibit', 'Notice'];
	const [IsOpen, setIsOpen] = useState(true);
	const container = useRef(null);
	const [Cookies, setCookies] = useCookies(['ONE_WEEK_COOKIE']);
	const path = process.env.PUBLIC_URL;
	const [IsHideChecked, setIsHideChecked] = useState();
	const cookiePop = useRef(null);

	const hideModal = () => {
		const oneWeek = moment();
		oneWeek.add(7, 'd');

		if (IsHideChecked) {
			setCookies('ONE_WEEK_COOKIE', 'true', {
				path: '/',
				expires: oneWeek.toDate(),
			});
		}

		localStorage.setItem('IsOpen', 'false');
		setIsOpen(false);
	};

	useEffect(() => {
		localStorage.getItem('IsOpen', true);
		setIsOpen(true);
	}, []);

	return (
		<>
			<main>
				{/* 메인전용 라우터에는 main문자값을 전달 */}
				{IsOpen && !Cookies['ONE_WEEK_COOKIE'] ? (
					<aside id='pop'>
						<div className='content'>
							{/* cookie pop title top  */}
							<div className='top'>
								<p className='wrap'>
									<input type='checkbox' id='ck' ref={cookiePop} checked={IsHideChecked} onChange={() => setIsHideChecked(!IsHideChecked)} />
									<label htmlFor='ck'>7일간 보지 않기</label>
									<FontAwesomeIcon icon={faXmark} className='close' onClick={hideModal} />
									팝업닫기
								</p>
							</div>

							<div className='middle'>
								<div className='leftWrap'>
									<div className='popLeft'>
										<img src={path + '/img/cookiePop1.png'} alt={'cookiePopup banner1'} />
									</div>
									<div className='popLeft'>
										<img src={path + '/img/cookiePop3.png'} alt={'cookiePopup banner2'} />
									</div>
									<div className='popLeft'>
										<img src={path + '/img/cookiePop2.png'} alt={'cookiePopup banner3'} />
									</div>
								</div>
								<div className='rightWrap'>
									<div className='popRight'>
										<img src={path + '/img/cookiePop4.png'} alt={'cookiePopup banner4'} />
									</div>
									<div className='popRight'>
										<img src={path + '/img/cookiePop5.png'} alt={'cookiePopup banner5'} />
									</div>
									<div className='popRight'>
										<img src={path + '/img/cookiePop6.png'} alt={'cookiePopup banner6'} />
									</div>
								</div>
							</div>
						</div>
					</aside>
				) : null}

				<aside className='bodyContainer' ref={container}>
					<Header type={'sub'} menuRef={menuRef} />
					<Visual />
					<Products />
					<Vids />
					<Promotion />
					<Museum />

					<MainCommunity />
					<FooterNone type={'sub'} imgBg={''} />
				</aside>
				<Scroll_navi type={'w'} pageLists={mainIndicatorLists} />
				<TopButton />
			</main>
		</>
	);
}

export default Main;
