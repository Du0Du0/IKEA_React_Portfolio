import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useState, useRef } from 'react';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

function SmartHome() {
	const path = process.env.PUBLIC_URL;
	const backgroundStyle = {
		backgroundImage: `url(${process.env.PUBLIC_URL + '/img/smartHomeBg3.png'})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center ',
		backgroundSize: 'cover',
	};

	const prevRef = useRef(null);
	const nextRef = useRef(null);

	const [CurrentIdx, setCurrentIdx] = useState(0);
	const [Clickable, setClickable] = useState(true);

	const prevButtonShowList = () => {
		if (Clickable) {
			setClickable(false);
			setCurrentIdx((prevIdx) => prevIdx - 1);

			setTimeout(() => {
				setClickable(true);
			}, 500);
		}
	};

	const nextButtonShowList = () => {
		if (Clickable) {
			setClickable(false);
			setCurrentIdx((prevIdx) => prevIdx + 1);

			setTimeout(() => {
				setClickable(true);
			}, 500);
		}
	};

	return (
		<section id='smartHome' className='myScroll' style={backgroundStyle}>
			<div className='container'>
				<div className='swiper-container first'>
					<div className='swiper-wrapper'>
						<Swiper
							classNameName='first'
							autoplay={{ delay: 200, disableOnInteraction: false }}
							loop={true}
							navigation={{
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							}}
							loadPrevNext={true}
							slidesPerView={3}
							clickable={true}
							paginationClickable={true}
							spaceBetween={150}
							breakpoints={{
								1920: {
									slidesPerView: 3,
									spaceBetween: 150,
								},
								1024: {
									slidesPerView: 2,
									spaceBetween: 30,
								},
								689: {
									slidesPerView: 1,
									spaceBetween: 10,
								},
							}}
						>
							<SwiperSlide>1</SwiperSlide>
							<SwiperSlide>2</SwiperSlide>
							<SwiperSlide>3</SwiperSlide>
							<SwiperSlide>4</SwiperSlide>
							<SwiperSlide>5</SwiperSlide>
							<SwiperSlide>6</SwiperSlide>
							<SwiperSlide>7</SwiperSlide>
							<SwiperSlide>8</SwiperSlide>

							{/* navigation buttons  */}
							<div className='swiper-button-prev swiper-button-white' onClick={prevButtonShowList}></div>
							<div className='swiper-button-next swiper-button-white' onClick={nextButtonShowList}></div>
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SmartHome;
