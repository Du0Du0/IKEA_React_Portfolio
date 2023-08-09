import { useRef } from 'react';

export const useThrottle = (func) => {
	const eventBlocker = useRef(null);

	return () => {
		if (eventBlocker.current) return;
		eventBlocker.current = setTimeout(() => {
			func();
			eventBlocker.current = null;
		}, 200);
	};
};
