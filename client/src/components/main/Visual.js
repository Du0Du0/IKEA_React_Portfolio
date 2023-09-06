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
					<p ref={visualDesc1}>
						This website is a project that replicates the IKEA website for educational and portfolio purposes, with no intention of commercial or profit-driven use. All trademarks, logos, and images
						are the property of IKEA, and their sources are attributed to IKEA. It is emphasized that this project is solely for cloning and educational purposes, and will not be used for commercial
						or profit-making purposes.
					</p>
					<h1 ref={visualDesc2}>
						이 웹사이트는 이케아 사이트를 클론 코딩한 프로젝트로, 취업용 포트폴리오로 활용됩니다. 본 작업물의 상표, 로고, 이미지 저작권은 전부 이케아에 있으며, 출처도 이케아에 있음을 밝힙니다. 또한
						클론코딩 목적 이외에 상업적, 영리 목적으로 절대 사용되지 않았음을 밝힙니다.
					</h1>
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
