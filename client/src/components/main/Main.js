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

function Main({ menu }) {
	const mainIndicatorLists = ['Menu', 'video', 'Living', 'Event', 'Exhibit', 'Notice'];
	const [IsOpen, setIsOpen] = useState(false);
	const container = useRef(null);
	const [Cookies, setCookies] = useCookies(['ONE_WEEK_COOKIE']);
	const getCookiesValue = localStorage.getItem('cookiesValue') === true ? true : false;
	const [CookiesValue, setCookiesValue] = useState(JSON.parse(getCookiesValue));
	const path = process.env.PUBLIC_URL;
	const [IsHideChecked, setIsHideChecked] = useState(false);
	const cookiePop = useRef(null);

	console.log('CookiesValue', CookiesValue);
	const oneWeek = moment();
	oneWeek.add(7, 'd');

	const hideModal = () => {
		if (IsHideChecked) {
			setCookies('ONE_WEEK_COOKIE', 'true', oneWeek.toDate());
			localStorage.setItem('cookiesValue', JSON.stringify(true));
		} else {
			localStorage.setItem('cookiesValue', JSON.stringify(false));
		}

		setIsOpen(true);
	};

	useEffect(() => {
		const getCookies = localStorage.getItem('cookiesValue');
		const result = JSON.parse(getCookies);
		setCookiesValue(result);
	}, []);

	console.log('IsOpen', IsOpen);
	// 쿠키팝업창 뜰 시 뒷 배경 스크롤 기능 방지(스크롤 보이는 채)
	const containerBlockScroll = {
		overflowY: 'hidden',
	};

	// 쿠키팝업창 닫을 시 뒷 배경 스크롤 가능하도록(스크롤 보이는 채)
	const cookiePopEnable = {
		overflowY: 'auto',
		width: '100vw',
	};

	return (
		<>
			<main>
				{/* 메인전용 라우터에는 main문자값을 전달 */}
				{!IsOpen && !CookiesValue ? (
					<aside id='pop'>
						<div className='content'>
							{/* cookie pop title top  */}
							<div className='top'>
								<p className='wrap'>
									<input type='checkbox' id='ck' ref={cookiePop} checked={IsHideChecked} onChange={() => setIsHideChecked((prevIsHideChecked) => !prevIsHideChecked)} />
									<label htmlFor='ck'>7일간 보지 않기</label>
									<FontAwesomeIcon icon={faXmark} className='close' onClick={hideModal} />
									<p onClick={hideModal}>팝업닫기</p>
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

				<aside className='bodyContainer' ref={container} style={IsOpen ? containerBlockScroll : cookiePopEnable}>
					<Header type={'sub'} menuRef={menu} />
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
