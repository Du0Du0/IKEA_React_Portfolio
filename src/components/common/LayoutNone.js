import { useEffect, useRef } from 'react';

function LayoutNone({ name1, type, children }) {
	const path = process.env.PUBLIC_URL;

	const inner = useRef(null);

	useEffect(() => {
		inner.current.classList.add('on');
	}, []);

	return (
		<section className={`content ${type} ${name1}`}>
			<div className='inner' ref={inner}>
				{children}
			</div>
		</section>
	);
}

export default LayoutNone;
