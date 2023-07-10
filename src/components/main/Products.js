import { useEffect, useState } from 'react';
import axios from 'axios';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Products() {
	const path = process.env.PUBLIC_URL;
	const backgroundStyle = {
		backgroundImage: `url(${process.env.PUBLIC_URL + '/img/productsBg.png'})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'top ',
		backgroundSize: 'cover',
		backgroundAttachment: 'fixed',
	};
	const [Products, setProducts] = useState([]);
	const [Count, setCount] = useState(0);
	const [TranslateX, setTranslateX] = useState(0);
	const [BackgroundColor, setBackgroundColor] = useState('#171717');

	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/products.json`).then((data) => {
			setProducts(data.data.products);
		});
	}, []);

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
						<div className='slideWrap'>
							{Products.map((product, i) => {
								return (
									<>
										<div className='slideItem' key={i}>
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
							<button className='leftArrowBtn'>
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
							{/* products right arrow  */}
							<button className='rigtArrowBtn'>
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
