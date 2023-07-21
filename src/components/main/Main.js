import React from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Visual from './Visual';
import Products from './Products';
import Vids from './Vids';
import SmartHome from './SmartHome';
import Promotion from './Promotion';
import Museum from './Museum';
import MainCommunity from './MainCommunity';

function Main({ menuRef }) {
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
			<Footer type={'sub'} imgBg={'footerW'} />
		</main>
	);
}

export default Main;
