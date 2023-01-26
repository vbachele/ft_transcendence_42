import styled from 'styled-components';

export const StyledNav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1em 2em;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
	width: 100%;
`;

export const Brand = styled.div`
	display: flex;
	align-items: center;
	gap: 1em;
	.logo {
		width: 48px;
		height: 48px;
	}
	.versus {
		width: fit-content;
		height: 32px;
	}

	@media only screen and (max-width: 768px) {
		.versus {
			display: none;
		}
	}
`;

export const Menu = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;

	svg {
		border-radius: 50%;
		/* width: 40px;
		height: 40px; */
		fill: ${(props) => props.theme.colors.secondary};
	}
	img {
		border-radius: 50%;
		width: 40px;
		height: 40px;
	}

	a {
		text-decoration: none;
	}

	@media screen and (max-width: 768px) {
	}
`;

export const Divider = styled.div`
	width: 20px;
	height: 2px;
	border-radius: 4px;
	transform: rotate(-90deg);
	background-color: ${(p) => p.theme.colors.secondary};
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const StyledToggleTheme = styled.label`
	cursor: pointer;

	svg {
		width: 24px;
		height: 24px;
		transition: fill 0.2s linear;
	}

	svg:hover {
		fill: #e04f5f;
	}
`;
