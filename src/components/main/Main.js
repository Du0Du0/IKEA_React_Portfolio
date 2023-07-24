import React from 'react';
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
import CookiePop from './CookiePop';
import { useState, useRef } from 'react';

function Main({ menuRef }) {
	const mainIndicatorLists = ['Menu', 'video', 'Living', 'Event', 'Exhibit', 'Notice'];
	const [IsOpen, setIsOpen] = useState(true);
	const container = useRef(null);

	// 쿠키팝업창 뜰 시 뒷 배경 스크롤 기능 방지(스크롤 보이는 채)
	const containerBlockScroll = {
		position: 'fixed',
		top: `-${window.scrollY}px`,
		left: '0',
		width: '100%',
		overflowY: 'scroll',
	};

	// 쿠키팝업창 닫을 시 뒷 배경 스크롤 가능하도록(스크롤 보이는 채)
	const containerEnableScroll = () => {};

	return (
		<>
			<main>
				{/* 메인전용 라우터에는 main문자값을 전달 */}
				{IsOpen && <CookiePop IsOpen={IsOpen} setIsOpen={setIsOpen} />}
				<aside class='bodyContainer' ref={container} style={IsOpen ? containerBlockScroll : null} onChange={!IsOpen && containerEnableScroll()}>
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
