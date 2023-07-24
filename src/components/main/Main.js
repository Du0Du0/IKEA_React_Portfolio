import React from 'react';
import FooterNone from '../common/FooterNone';
import Header from '../common/Header';
import Visual from './Visual';
import Products from './Products';
import Vids from './Vids';
import SmartHome from './SmartHome';
import Promotion from './Promotion';
import Museum from './Museum';
import MainCommunity from './MainCommunity';
import Scroll_navi from '../common/Scroll_navi';
import TopButton from '../common/TopButton';

function Main({ menuRef }) {
	const mainIndicatorLists = ['Menu', 'video', 'Living', 'Event', 'Exhibit', 'Notice'];
	return (
		<main>
			{/* 메인전용 라우터에는 main문자값을 전달 */}
			<Header type={'sub'} menuRef={menuRef} />
			<Visual />
			<Products />
			<Vids />
			<SmartHome />
			<Promotion />
			<Museum />
			<MainCommunity />
			<Scroll_navi type={'w'} pageLists={mainIndicatorLists} />
			<TopButton />
			<FooterNone type={'sub'} imgBg={''} />
		</main>
	);
}

export default Main;
