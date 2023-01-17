import styled from 'styled-components';

export const StyledNav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 3em;
	padding: 1em 2em;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
	/* border-bottom: 1px solid var(--font-color); */

	svg {
		width: 144px;
		height: 48px;
	}
`;

export const Menu = styled.div`
	display: flex;
	align-items: center;
	gap: 1em;

	svg,
	img {
		border-radius: 50%;
		width: 40px;
		height: 40px;
		fill: ${(props) => props.theme.colors.secondary};
	}
`;

export const Divider = styled.div`
	width: 20px;
	height: 2px;
	border-radius: 4px;
	transform: rotate(-90deg);
	background-color: ${(props) => props.theme.colors.secondary};
`;

export const StyledToggle = styled.label`
	cursor: pointer;

	svg {
		width: 24px;
		height: 24px;
		transition: fill 0.1s linear;
	}

	svg:hover {
		fill: #e04f5f;
	}
`;
