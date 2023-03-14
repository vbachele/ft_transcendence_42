import {useLayoutEffect, useState} from 'react';

export function useResponsiveLayout() {
	const [responsive, setResponsive] = useState(false);

	useLayoutEffect(() => {
		function updateSize() {
			if (window.innerWidth < 768) {
				setResponsive(true);
			} else {
				setResponsive(false);
			}
		}

		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);
	return {responsive, setResponsive};
}
