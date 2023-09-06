import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Visual() {
	const path = process.env.PUBLIC_URL;
	const ref = useRef(null);
	gsap.registerPlugin(ScrollTrigger);

	const visualDesc1 = useRef(null);
	const visualDesc2 = useRef(null);

	useEffect(() => {
		visualDesc1.current.classList.add('on');
		visualDesc2.current.classList.add('on');
	}, []);

	const [IsColorYellow, setIsColorYellow] = useState(true);
	const [BgImg, setBgImg] = useState('visual2');

	useEffect(() => {
		if (IsColorYellow) setBgImg('visual2');
		else if (!IsColorYellow) setBgImg('visual1');
	}, [IsColorYellow]);

	return (
		<section id='visual' ref={ref}>
			<img src={path + `/img/${BgImg}.png`} alt='Main Kitchen' />
			<div className='visualWrap'>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>

				{/* Main pointBox(text) (none color box) */}
				<div className={!IsColorYellow ? 'bg on' : 'bg'} onClick={() => setIsColorYellow(false)}>
					Like <br /> a new life
				</div>
				<div className='bg'>Ikea Home</div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'>
					<p ref={visualDesc1}>Good for me, Good for my home</p>
					<h1 ref={visualDesc2}>이 웹사이트는 이케아 사이트를 클론 코딩한 프로젝트로, 취업용 포트폴리오로 활용됩니다. 절대 상업 목적으로 사용되지 않았으며 이미지 저작권은 전부 이케아에 있습니다.</h1>
				</div>

				{/* Main pointBox2 (text) (yellow box)*/}
				<div className={IsColorYellow ? 'bg on' : 'bg'} onClick={() => setIsColorYellow(true)}>
					Make
					<br /> Home Happen.
				</div>
				<div className='bg'></div>
				<div className='bg'></div>
			</div>
		</section>
	);
}

export default Visual;
