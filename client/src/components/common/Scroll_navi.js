import { useRef, useState, useEffect } from 'react';

function Scroll_navi({ type, pageLists }) {
	const btnRef = useRef(null);
	const position = useRef([]);
	const [ActiveIdx, setActiveIdx] = useState(0);
	const [Num, setNum] = useState(0);

	const getPosition = () => {
		const sections = btnRef.current.parentElement.querySelectorAll('.myScroll');
		position.current = Array.from(sections).map((sec) => sec.offsetTop);
		setNum(position.current.length);
	};

	const activeIndicator = () => {
		const base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const sections = btnRef.current.parentElement.querySelectorAll('.myScroll');

		position.current?.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const sec of sections) sec.classList.remove('on');
				btns[idx].classList.add('on');
				sections[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		getPosition();
		window.addEventListener('scroll', activeIndicator);
		return () => {
			window.removeEventListener('scroll', activeIndicator);
		};
	}, []);

	return (
		<ul id='scroll_navi' className={type} ref={btnRef}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					let defaultClass = '';
					if (ActiveIdx === idx) defaultClass = 'on';

					return (
						<li key={idx} className={defaultClass} onClick={() => setActiveIdx(idx)}>
							{pageLists[idx]}
						</li>
					);
				})}
		</ul>
	);
}

export default Scroll_navi;
