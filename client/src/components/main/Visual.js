import { useRef, useEffect } from 'react';
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

	return (
		<section id='visual' ref={ref}>
			<img src={path + '/img/visual2.png'} alt='Main Kitchen' />
			<div className='visualWrap'>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>

				{/* Main pointBox(text) */}
				<div className='bg'>
					Like <br /> a new life
				</div>
				<div className='bg'>Ikea Home</div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'>
					<p ref={visualDesc1}>Good for me, Good for my home</p>
					<h1 ref={visualDesc2}>IKEA wants more people to experience IKEA home furnishing with products of good quality and practical designs.</h1>
				</div>

				{/* Main pointBox2 (text)  */}
				<div className='bg on '>
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
