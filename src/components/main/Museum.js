import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';

// Import Swiper styles

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar, EffectFade } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

function Museum() {
	const path = process.env.PUBLIC_URL;
	const backgroundStyle = {
		backgroundImage: `url(${process.env.PUBLIC_URL + '/img/smartHome1.png'})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center ',
		backgroundSize: 'cover',
	};
	const [Museums, setMuseums] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/museum.json`).then((data) => {
			setMuseums(data.data.museum);
		});
	}, []);

	console.log(window.innerWidth);

	return (
		<section id='museum' class='myScroll'>
			{/* left background */}
			<div class='bgLeft' style={backgroundStyle}>
				{/* left titleList  */}
				<h2 class='leftTxt'>Existence Maximum</h2>
			</div>
			{/* right background  */}
			<div class='bgRight'>
				{/* right titleList  */}
				<h2 class='rightTxt'>Our Roots</h2>
			</div>
			<div class='container'>
				{/* Slider main container */}
				<div class='swiper-container second'>
					{/* Additional required wrapper  */}
					<div class='swiper-wrapper '>
						<Swiper
							className='second'
							loop={true}
							navigation={{
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							}}
							slidesPerView={2}
							clickable={true}
							touchRatio={1}
							breakpoints={{
								1920: {
									slidesPerView: 2,
									spaceBetween: 440,
								},
								1820: {
									slidesPerView: 2,
									spaceBetween: 440,
								},
								1720: {
									slidesPerView: 2,
									spaceBetween: 350,
								},
								1620: {
									slidesPerView: 2,
									spaceBetween: 250,
								},
								1520: {
									slidesPerView: 2,
									spaceBetween: 200,
								},
								1420: {
									slidesPerView: 2,
									spaceBetween: 150,
								},
								1320: {
									slidesPerView: 2,
									spaceBetween: 100,
								},
								1220: {
									slidesPerView: 2,
									spaceBetween: 70,
								},
								1120: {
									slidesPerView: 2,
									spaceBetween: 280,
								},
								1024: {
									slidesPerView: 2,
									spaceBetween: 150,
								},

								980: {
									slidesPerView: 2,
									spaceBetween: 150,
								},
								880: {
									slidesPerView: 2,
									spaceBetween: 90,
								},

								848: {
									slidesPerView: 2,
									spaceBetween: 50,
								},

								830: {
									slidesPerView: 2,
									spaceBetween: 50,
								},

								806: {
									slidesPerView: 2,
									spaceBetween: 20,
								},

								768: {
									slidesPerView: 2,
									spaceBetween: 10,
								},

								689: {
									slidesPerView: 1,
									spaceBetween: 5,
								},
								589: {
									slidesPerView: 1,
									spaceBetween: 5,
								},
								489: {
									slidesPerView: 1,
									spaceBetween: 5,
								},
								389: {
									slidesPerView: 1,
									spaceBetween: 5,
								},
							}}
						>
							{/* 슬라이드 내용 */}

							{Museums.map((museum, i) => {
								return (
									<>
										<SwiperSlide className='swiper-slide second' key={i}>
											<h3>{museum.topic}</h3>
											<h2>{museum.length > 7 ? museum.tit.split(' ').splice(0, 7).join(' ') : museum.tit}</h2>
											<p class='con'>{museum.content.length > 10 ? museum.content.split(' ').splice(0, 10).join(' ') + '...' : museum.content}</p>
											<p class='date'>{museum.date}&nbsp;&nbsp;| &nbsp;&nbsp;Exhibition</p>
										</SwiperSlide>
									</>
								);
							})}
						</Swiper>
					</div>

					{/* navigation buttons  */}
					<div class='swiper-button-prev swiper-button-white'></div>
					<div class='swiper-button-next swiper-button-white'></div>
				</div>
			</div>
		</section>
	);
}

export default Museum;
