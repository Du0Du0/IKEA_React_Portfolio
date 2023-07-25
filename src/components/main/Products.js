import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
	const slideItems = useRef(null);
	const slideWrap = useRef(null);
	const prevBtn = useRef(null);
	const nextBtn = useRef(null);
	const [NextPreventClick, setNextPreventClick] = useState(false);
	const [PrevPreventClick, setPrevPreventClick] = useState(true);

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

	return (
		<section id='products' className='myScroll' style={backgroundStyle}>
			<div className='productsContainer'>
				{/* products title (right side) */}
				<div className='productsTit'>
					<h2>제품</h2>
				</div>
				{/* products left side  */}
				<div className='productsSub'>
					{/* products slide  */}
					<div className='slideContainer'>
						<div className='slideWrap' ref={slideWrap}>
							{Products.map((product, i) => {
								return (
									<>
										<div className='slideItem' key={i} ref={slideItems}>
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
						<div className='hyperBtns'>
							<a herf='#' target='_blank' title='모든 카테고리 보기'>
								<p>
									All Categories&nbsp;&nbsp;
									<FontAwesomeIcon icon={faChevronRight} />
								</p>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Products;
