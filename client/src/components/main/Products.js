import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHistory } from 'react-router-dom';

function Products() {
	const backgroundStyle = {
		backgroundImage: `url(${process.env.PUBLIC_URL + '/img/productsBg.png'})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'top ',
		backgroundSize: 'cover',
		backgroundAttachment: 'fixed',
	};
	const [Products, setProducts] = useState([]);
	const [Count, setCount] = useState(0);
	const [NextPreventClick, setNextPreventClick] = useState(false);
	const [PrevPreventClick, setPrevPreventClick] = useState(true);
	const slideItems = useRef(null);
	const slideWrap = useRef(null);
	const prevBtn = useRef(null);
	const nextBtn = useRef(null);
	const ref = useRef(null);
	const history = useHistory();

	gsap.registerPlugin(ScrollTrigger);

	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/products.json`).then((data) => {
			setProducts(data.data.products);
		});
	}, []);

	const nextBtnClick = () => {
		if (Count * 400 >= 3203) {
			setNextPreventClick(true);
			return;
		}
		setCount((prevCount) => prevCount + 1);
		setPrevPreventClick(false);
		slideWrap.current.style.transform = `translateX(-${(Count + 1) * 400}px)`;
	};

	const prevBtnClick = () => {
		if (Count <= 0) {
			setPrevPreventClick(true);
			return;
		}
		setCount((prevCount) => prevCount - 1);
		setNextPreventClick(false);
		slideWrap.current.style.transform = `translateX(-${(Count - 1) * 400}px)`;
	};

	const openNewTab = (url) => {
		window.open(url, '_blank', 'noopener, noreferrer');
	};

	const [SelectedCategory, setSelectedCategory] = useState('');
	const [SelectedSearch, setSelectedSearch] = useState('');
	const [SelectedTit, setSelectedTit] = useState('');
	const [SelectedMainPic, setSelectedMainPic] = useState('');
	const [SelectedSubPic, setSelectedSubPic] = useState('');

	const goToDetail = (idx) => {
		const SelectedProduct = Products[idx];
		setSelectedCategory(SelectedProduct.category);
		setSelectedSearch(SelectedProduct.search);
		setSelectedTit(SelectedProduct.title);
		setSelectedMainPic(SelectedProduct.mainPic);
		setSelectedSubPic(SelectedProduct.subPic);
		setSelectedSubPic(SelectedProduct.subDesc);

		history.push({
			pathname: '/products/detail',
			state: {
				Topic: SelectedProduct.category,
				Search: SelectedProduct.search,
				Title: SelectedProduct.title,
				Desc: SelectedProduct.desc,
				MainPic: SelectedProduct.mainPic,
				SubPic: SelectedProduct.subPic,
				SubDesc: SelectedProduct.subDesc,
				idx: idx,
			},
		});
		console.log('Topic', SelectedProduct.category);
		console.log(idx);
	};

	useEffect(() => {
		const element = ref.current;
		gsap.fromTo(
			element.querySelector('.productsTit'),
			{
				opacity: 0.1,
				x: -450,
			},
			{
				opacity: 1,
				x: 0,
				ease: 'power2.out',
				scrollTrigger: {
					start: '260',
					end: '400',
					scrub: true,
				},
			}
		);
	}, []);

	useEffect(() => {
		const element = ref.current;
		gsap.fromTo(
			element.querySelector('.productsSub'),
			{
				opacity: 0,
			},
			{
				opacity: 1,
				ease: 'power2.out',
				scrollTrigger: {
					start: '380',
					end: '500',
					scrub: true,
				},
			}
		);
	}, []);

	return (
		<section id='products' className='myScroll' style={backgroundStyle} ref={ref}>
			<div className='productsContainer'>
				{/* products title (right side) */}

				<div className='productsTit'>
					<h2>카테고리</h2>
				</div>
				{/* products left side  */}
				<div className='productsSub'>
					{/* products slide  */}
					<div className='slideContainer'>
						<div className='slideWrap' ref={slideWrap}>
							{Products.map((product, i) => {
								return (
									<>
										<div className='slideItem' key={i} ref={slideItems} onClick={() => goToDetail(i)}>
											<div className='productsImg'>
												<img src={`${process.env.PUBLIC_URL}/img/${product.pic}`} alt={product.name} />
											</div>
											<div className='productsName'>{product.category}</div>
										</div>
									</>
								);
							})}
						</div>
					</div>
					{/* products bottom button container  */}
					<div className='btnWrap'>
						<div className='arrowBtns'>
							{/* products left arrow  */}
							<button className='leftArrowBtn' ref={prevBtn} onClick={prevBtnClick} style={{ backgroundColor: PrevPreventClick ? '#cacaca' : '#171717' }}>
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
							{/* products right arrow  */}
							<button className='rigtArrowBtn' ref={nextBtn} onClick={nextBtnClick} style={{ backgroundColor: NextPreventClick ? '#cacaca' : '#171717' }}>
								<FontAwesomeIcon icon={faChevronRight} />
							</button>
						</div>
						{/* products "all category" button */}
						<div className='hyperBtns' onClick={() => openNewTab('#')}>
							<p>
								All Categories&nbsp;&nbsp;
								<FontAwesomeIcon icon={faChevronRight} />
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Products;
