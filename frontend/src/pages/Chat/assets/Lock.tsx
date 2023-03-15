import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';

const StyledLock = styled.svg`
	color: ${(props) => props.theme.colors.secondary};
`;

function Lock() {
	return (
		<StyledLock
			width="14"
			height="20"
			viewBox="0 0 14 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1.59998 5.9C1.59998 2.91766 4.01764 0.5 6.99998 0.5C9.98231 0.5 12.4 2.91766 12.4 5.9V7.54C13.3129 7.7253 14 8.53241 14 9.5V17.5C14 18.6046 13.1046 19.5 12 19.5H2C0.89543 19.5 0 18.6046 0 17.5V9.5C0 8.53243 0.687092 7.72533 1.59998 7.54001V5.9ZM10.6 5.9V7.5H3.39998V5.9C3.39998 3.91177 5.01175 2.3 6.99998 2.3C8.9882 2.3 10.6 3.91178 10.6 5.9ZM8 11.5C8 10.9477 7.55228 10.5 7 10.5C6.44772 10.5 6 10.9477 6 11.5V15.5C6 16.0523 6.44771 16.5 7 16.5C7.55228 16.5 8 16.0523 8 15.5V11.5Z"
				fill="currentColor"
			/>
		</StyledLock>
	);
}

export default Lock;
