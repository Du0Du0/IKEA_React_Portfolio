import { useEffect, useRef } from 'react';

function Layout({ name1, name2, video, type, children }) {
	const path = process.env.PUBLIC_URL;

	const title = useRef(null);

	useEffect(() => {
		title.current.classList.add('on');
	}, []);

	return (
		<section className={`content ${type} ${name1}`}>
			<figure className='subVisual'>
				<video autoPlay loop muted>
					<source src={path + `/img/${video}`} type='video/mp4' />
				</video>
				<div className='background'></div>
			</figure>

			<div className='titContainer'>
				<h1 ref={title}>{name2}</h1>
			</div>

			<div className='inner'>{children}</div>
		</section>
	);
}

export default Layout;
