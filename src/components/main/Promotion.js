import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Promotion() {
	const path = process.env.PUBLIC_URL;
	return (
		<section id='promotion' className='myScroll'>
			<div className='promotionContainer'>
				<img className='circleText' src={path + '/img/textCircle2.png'} alt='' />
				{/* promotion left side  */}
				<div className='promotionWrap'>
					<div className='top'>
						{/* ikea youtube embed video  */}
						<iframe
							src='https://www.youtube-nocookie.com/embed/_5SyZ0TXPH0?color=white&rel=0&modestbranding=1'
							title='YouTube video player'
							frameborder='0'
							showInfo='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							allowfullscreen
							playsinline
						></iframe>
					</div>
					<div className='down'>
						{/* imbed video description  */}
						<div className='downLeft'>
							<a href='#'>
								<h3>Lorem ipsum dolor, sit amet consectetur </h3>
								<h2>Lorem ipsum dolor </h2>
							</a>
						</div>
						{/* arrow button  */}
						<div className='downRight'>
							<a href='#'>
								<FontAwesomeIcon icon={faArrowRight} />
							</a>
						</div>
					</div>
				</div>

				{/* promotion 중앙 제목 영역  */}
				<div className='promotionWrap'>
					<h4>진행중이벤트</h4>
				</div>

				{/* promotion 오른쪽 sns 영역  */}
				<div className='promotionWrap'>
					<div className='sns'>
						<h3>Introducing our new floor lamp with WiFi speaker</h3>
						<h4>
							The latest addition to our popular SYMFONISK series, this striking floor lamp with bamboo shade will bring a warm, rustic charm to any room. Developed as part of the collaboration
							between IKEA and Sonos, it will effortlessly fill your room with beautiful light and your favourite sounds.
						</h4>
						<p>2023.05.03ㆍDavid </p>
						<br />
						<br />

						<h3>Lorem, ipsum dolor.</h3>
						<h4>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, nesciunt vero aliquam dicta unde blanditiis quis. Harum animi a, saepe at eveniet vel architecto ipsum, iste velit
							ut aliquid nostrum?
						</h4>
						<p>2023.05.03ㆍDavid </p>
						<br />
						<br />

						<h3>Lorem, ipsum dolor.</h3>
						<h4>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, nesciunt vero aliquam dicta unde blanditiis quis. Harum animi a, saepe at eveniet vel architecto ipsum, iste velit
							ut aliquid nostrum?
						</h4>
						<p>2023.05.03ㆍDavid </p>
						<br />
						<br />

						<h3>Lorem, ipsum dolor.</h3>
						<h4>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, nesciunt vero aliquam dicta unde blanditiis quis. Harum animi a, saepe at eveniet vel architecto ipsum, iste velit
							ut aliquid nostrum?
						</h4>
						<p>2023.05.03ㆍDavid </p>
						<br />
						<br />

						<h3>Lorem, ipsum dolor.</h3>
						<h4>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, nesciunt vero aliquam dicta unde blanditiis quis. Harum animi a, saepe at eveniet vel architecto ipsum, iste velit
							ut aliquid nostrum?
						</h4>
						<p>2023.05.03ㆍDavid </p>
						<br />
						<br />

						<h3>Lorem, ipsum dolor.</h3>
						<h4>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, nesciunt vero aliquam dicta unde blanditiis quis. Harum animi a, saepe at eveniet vel architecto ipsum, iste velit
							ut aliquid nostrum?
						</h4>
						<p>2023.05.03ㆍDavid </p>
						<br />
						<br />

						<h3>Lorem, ipsum dolor.</h3>
						<h4>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, nesciunt vero aliquam dicta unde blanditiis quis. Harum animi a, saepe at eveniet vel architecto ipsum, iste velit
							ut aliquid nostrum?
						</h4>
						<p>2023.05.03ㆍDavid </p>
						<br />
						<br />

						<h3>Lorem, ipsum dolor.</h3>
						<h4>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, nesciunt vero aliquam dicta unde blanditiis quis. Harum animi a, saepe at eveniet vel architecto ipsum, iste velit
							ut aliquid nostrum?
						</h4>
						<p>2023.05.03ㆍDavid </p>
						<br />
						<br />
					</div>
					<div className='snsGoBtn'>
						<a href='#'>
							바로가기&nbsp;&nbsp;&nbsp; <FontAwesomeIcon icon={faArrowRight} />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Promotion;
