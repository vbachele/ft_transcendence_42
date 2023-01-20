import { useState } from 'react';

export default function useToggle(defaultValue: boolean) {
	const [value, setValue] = useState(defaultValue);
	function toggleValue() {
		setValue(!value);
	}
	return { value, toggleValue };
}
