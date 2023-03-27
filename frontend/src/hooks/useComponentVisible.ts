import {useState, useEffect, useRef} from 'react';

function useComponentVisible(initialState: boolean) {
	const [isComponentVisible, setIsComponentVisible] =
		useState<boolean>(initialState);
	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (ref.current && !ref.current.contains(target)) {
			setIsComponentVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	return {ref, isComponentVisible, setIsComponentVisible};
}

export default useComponentVisible;
