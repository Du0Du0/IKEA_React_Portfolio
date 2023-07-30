import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Promotion() {
	const history = useHistory();
	const path = process.env.PUBLIC_URL;
	const Promotion = useSelector((store) => store.promotionReducer.promotion);
	const dispatch = useDispatch();

	const goToDetail = (idx) => {
		try {
			history.push({
				pathname: `/promotion/articles/${idx}`,
				state: {
					idx: idx,
				},
			});
			console.log('idx', idx);
		} catch (err) {
			console.log('goToDetailErr', err);
		}
	};
	gsap.registerPlugin(ScrollTrigger);
	const ref = useRef(null);

	useEffect(() => {
		const element = ref.current;
		gsap.fromTo(
			element.querySelector('.top'),
			{
				opacity: 0,
				y: 200,
			},
			{
				opacity: 1,
				y: 0,
				ease: 'power2.out',
				scrollTrigger: {
					start: '1900',
					end: '2400',
					scrub: true,
				},
			}
		);
	}, []);

	useEffect(() => {
		const element = ref.current;
		gsap.fromTo(
			element.querySelector('.pageTit'),
			{
				opacity: 0,
				y: 200,
			},
			{
				opacity: 1,
				y: 0,
				ease: 'power2.out',
				scrollTrigger: {
					start: '1900',
					end: '2400',
					scrub: true,
				},
			}
		);
	}, []);

	useEffect(() => {
		const element = ref.current;
		gsap.fromTo(
			element.querySelector('.sns'),
			{
				opacity: 0,
				y: 200,
			},
			{
				opacity: 1,
				y: 0,
				ease: 'power2.out',
				scrollTrigger: {
					start: '1900',
					end: '2400',
					scrub: true,
				},
			}
		);
	}, []);

	return (
		<section id='promotion' className='myScroll' ref={ref}>
			<div className='promotionContainer'>
				<img className='circleText' src={path + '/img/textCircle2.png'} alt='' />

				{/* promotion left side  */}
				<div className='promotionWrap'>
					<div className='top'>
						{/* ikea youtube embed video  */}
						<iframe
							src='https://www.youtube-nocookie.com/embed/_5SyZ0TXPH0?color=white&rel=0&modestbranding=1'
							title='YouTube video player'
							frameBorder='0'
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
								<h3>참나무 앞판을 사용한 포근한 주방</h3>
								<h2>VEDHAMN 베드함 참나무 주방 가이드</h2>
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
					<h4 className='pageTit'>진행중이벤트</h4>
				</div>

				{/* promotion 오른쪽 sns 영역  */}
				<div className='promotionWrap'>
					<div className='sns'>
						{Promotion.map((promotion, idx) => {
							return (
								<React.Fragment key={idx}>
									<h3 onClick={() => goToDetail(idx)}>{promotion.title}</h3>
									<h4 onClick={() => goToDetail(idx)}>{promotion.content.length > 150 ? `${promotion.content}`.split(' ').splice(0, 43).join(' ') + '...' : promotion.content}</h4>
									<p>
										{promotion.date}ㆍ{promotion.user}
									</p>
									<br />
									<br />
								</React.Fragment>
							);
						})}
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
