import { Autoplay, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useRef } from 'react';

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

	return <section id='smartHome' className='myScroll' style={backgroundStyle}></section>;
}

export default SmartHome;
