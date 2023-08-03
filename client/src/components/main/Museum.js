import { useEffect, useState, useRef } from 'react';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

function Museum() {
	const backgroundStyle = {
		backgroundImage: `url(${process.env.PUBLIC_URL + '/img/smartHome1.png'})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center ',
		backgroundSize: 'cover',
		zIndex: 0,
	};

	const [Museums, setMuseums] = useState([]);
	const [CurrentIdx, setCurrentIdx] = useState(0);
	const [Clickable, setClickable] = useState(true);
	const { idx } = useParams();
	const path = process.env.PUBLIC_URL;
	const titleLists = ['MÄVINN', 'Hej Ingvar', 'Our Roots', 'Democratic Design', 'Us & Our Planet', 'Story of IKEA', 'Existence Maximum'];

	const prevButtonShowList = () => {
		if (Clickable) {
			setClickable(false);
			setCurrentIdx((prevIdx) => (prevIdx - 1 + titleLists.length) % titleLists.length);

			setTimeout(() => {
				setClickable(true);
			}, 500);
		}
	};

	const nextButtonShowList = () => {
		if (Clickable) {
			setClickable(false);
			setCurrentIdx((prevIdx) => (prevIdx + 1) % titleLists.length);

			setTimeout(() => {
				setClickable(true);
			}, 500);
		}
	};

	// useEffect(() => {
	// 	axios.get(`${process.env.PUBLIC_URL}/DB/museum.json`).then((data) => {
	// 		setMuseums(data.data.museum);
	// 	});
	// }, []);

	// const Museum = useSelector((store) => store.museumReducer.museum);

	const dispatch = useDispatch();
	const history = useHistory();

	const goToDetail = (idx) => {
		history.push({
			pathname: `/museum/articles/${idx}`,
			state: {
				idx: idx,
			},
		});
		localStorage.setItem('index', parseInt(idx));
		console.log(idx);
	};

	gsap.registerPlugin(ScrollTrigger);
	const ref = useRef(null);

	useEffect(() => {
		const element = ref.current;
		gsap.fromTo(
			element.querySelector('.swiper-wrapper'),
			{
				opacity: 0,
				y: 200,
			},
			{
				opacity: 1,
				y: 0,
				ease: 'power2.out',
				scrollTrigger: {
					start: '2700',
					end: '3000',
					scrub: true,
				},
			}
		);
	}, []);

	useEffect(() => {
		const element = ref.current;
		gsap.fromTo(
			element.querySelector('.leftTxt'),
			{
				opacity: 0,
				y: 200,
			},
			{
				opacity: 1,
				y: 0,
				ease: 'power2.out',
				scrollTrigger: {
					start: '2700',
					end: '3000',
					scrub: true,
				},
			}
		);
	}, []);

	useEffect(() => {
		const element = ref.current;
		gsap.fromTo(
			element.querySelector('.rightTxt'),
			{
				opacity: 0,
				y: 200,
			},
			{
				opacity: 1,
				y: 0,
				ease: 'power2.out',
				scrollTrigger: {
					start: '2700',
					end: '3000',
					scrub: true,
				},
			}
		);
	}, []);

	useEffect(() => {
		const element = ref.current;
		gsap.fromTo(
			element.querySelector('.swiper-button-prev '),
			{
				opacity: 0,
			},
			{
				opacity: 1,
				ease: 'power2.out',
				scrollTrigger: {
					start: '2800',
					end: '3000',
					scrub: true,
				},
			}
		);
	}, []);

	useEffect(() => {
		const element = ref.current;
		gsap.fromTo(
			element.querySelector('.swiper-button-next '),
			{
				opacity: 0,
			},
			{
				opacity: 1,
				ease: 'power2.out',
				scrollTrigger: {
					start: '2800',
					end: '3000',
					scrub: true,
				},
			}
		);
	}, []);

	return (
		<section id='museum' className='myScroll' ref={ref}>
			{/* left background */}
			<div className='bgLeft' style={backgroundStyle}>
				{/* left titleList  */}
				<h2 className='leftTxt'> {titleLists[(CurrentIdx - 1 + titleLists.length) % titleLists.length]}</h2>
			</div>

			{/* right background  */}
			<div className='bgRight'>
				<img src={path + '/img/bg3.png'} alt='' style={{ opacity: '0.9' }} />
				{/* right titleList  */}
				<h2 className='rightTxt'>{titleLists[(CurrentIdx + 2 + titleLists.length) % titleLists.length]}</h2>
			</div>
			<div className='container'>
				<div className='swiper-container second'>
					<div className='swiper-wrapper '>
						<Swiper
							className='second'
							loop={true}
							navigation={{
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							}}
							slidesPerView={2}
							clickable={true}
							touchRatio={0}
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
							{/* {Museum.map((museum, i) => {
								return (
									<>
										<SwiperSlide className='swiper-slide second' key={i} onClick={() => goToDetail(i)}>
											<h3>{museum.topic}</h3>
											<h2>{museum.title.length > 7 ? museum.title.split(' ').splice(0, 7).join(' ') : museum.title}</h2>
											<p className='con'>{museum.content.length > 8 ? museum.content.split(' ').splice(0, 8).join(' ') + '...' : museum.content}</p>
											<p className='date'>{museum.date}&nbsp;&nbsp;| &nbsp;&nbsp;Exhibition</p>
										</SwiperSlide>
									</>
								);
							})} */}
						</Swiper>
					</div>

					{/* navigation buttons  */}
					<div className='swiper-button-prev swiper-button-white' onClick={prevButtonShowList} style={{ 'display': Clickable ? 'block' : 'none', '--swiper-navigation-size': '25px' }}></div>
					<div className='swiper-button-next swiper-button-white' onClick={nextButtonShowList} style={{ 'display': Clickable ? 'block' : 'none', '--swiper-navigation-size': '25px' }}></div>
				</div>
			</div>
		</section>
	);
}

export default Museum;
