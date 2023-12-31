import { useRef, useState, useEffect, useCallback } from 'react';
import Anime from '../../asset/anime';
import { useThrottle } from '../../hooks/useThrottle';

function Scroll_navi({ type, pageLists }) {
	const btnRef = useRef(null);
	const position = useRef([]);
	const [ActiveIdx, setActiveIdx] = useState(0);
	const [Num, setNum] = useState(0);

	const getPosition = () => {
		position.current = [];
		const sections = btnRef.current?.parentElement.querySelectorAll('.myScroll');
		position.current = Array.from(sections).map((sec) => sec.offsetTop);
		setNum(position.current.length);
	};

	const activeIndicator = () => {
		const base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = btnRef.current?.children;
		const sections = btnRef.current?.parentElement.querySelectorAll('.myScroll');

		position.current?.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				if (btns && sections) {
					for (const btn of btns) btn.classList.remove('on');
					for (const sec of sections) sec.classList.remove('on');
					btns[idx].classList.add('on');
					sections[idx].classList.add('on');
				}
			}
		});
	};

	const getPos = useThrottle(getPosition);
	const activation = useThrottle(activeIndicator);

	useEffect(() => {
		getPosition();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		//리액트는 SPA이기 때문에 페이지가 변경된다고 하더라도 스크롤 위치값이 초기화 되지 않으므로 마운트시마다 스크롤값을 초기화함
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		};
	}, [getPos, activation, getPosition]);

	return (
		<ul id='scroll_navi' className={type} ref={btnRef}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					let defaultClass = '';
					if (ActiveIdx === idx) defaultClass = 'on';

					return (
						<li
							key={idx}
							className={defaultClass}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: position.current[idx],
									duration: 500,
								});
							}}
						>
							{pageLists[idx]}
						</li>
					);
				})}
		</ul>
	);
}

export default Scroll_navi;
