import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

function SummaryFY22() {
	const [offsetX, setOffsetX] = useState(0);
	const [offsetY, setOffsetY] = useState(0);
	const friction = 1 / 20;

	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

	const cursorTrackingMove = (e) => {
		if (e) {
			const followX = window.innerWidth / 2 - e.clientX;
			const followY = window.innerHeight / 2 - e.clientY;

			let x = 0;
			let y = 0;
			x += (-followX - x) * friction;
			y += (followY - y) * friction;

			setOffsetX(x);
			setOffsetY(y);
		}
	};
	const cursorTrackingColor = (e) => {
		if (e) {
			setCursorPosition({ x: e.clientX, y: e.clientY });
		}
	};

	const cursorTrackingMoveHook = useDebounce(cursorTrackingMove);
	const cursorTrackingColorHook = useDebounce(cursorTrackingColor);

	useEffect(() => {
		document.addEventListener('mouseenter', cursorTrackingMove);
		document.addEventListener('mouseenter', cursorTrackingColor);

		return () => {
			document.removeEventListener('mouseenter', cursorTrackingMove);
			document.removeEventListener('mouseenter', cursorTrackingColor);
		};
	}, []);

	const offsetStyle = {
		transform: ` perspective(1200px) rotateY(${offsetX}deg) rotateX(${offsetY}deg)`,
	};
	const gradientStyle = {
		background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.6))`,
	};

	// 두 스타일 객체를 병합
	const combinedStyle = { ...offsetStyle, ...gradientStyle };
	return (
		<div className='summaryFY22Wrap' style={combinedStyle}>
			<div className='retailSalesBox'>
				<h3>EUR 44.6</h3>
				<p>
					billion in IKEA retail <br />
					sales
				</p>
			</div>
			<div className='salesLocationBox'>
				<h3>38</h3>
				<p>
					new IKEA sales <br />
					locations
				</p>
			</div>
			<div className='coWorkerBox'>
				<h3>231,000</h3>
				<p>
					IKEA co-workers <br />
					around the world
				</p>
			</div>
		</div>
	);
}

export default SummaryFY22;
