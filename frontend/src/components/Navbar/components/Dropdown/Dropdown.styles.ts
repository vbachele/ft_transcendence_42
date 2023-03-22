import styled from 'styled-components';

// prettier-ignore
export const Container = styled.div`
	position: relative;
	user-select: none;
	width: 40px;
	height: 40px;

	.avatar {
		cursor: pointer;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}

	a, p {
		text-decoration: none;
		word-break: break-all;
	}

	@media only screen and (max-width: 768px) {
		.avatar {
			display: none;
		}
	}
`;

export const DropdownContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 0;
	width: 275px;
	border-radius: 8px;
	padding: 1em;
	background-color: rgb(0, 0, 0, 0.8);
	/* background-color: #dc4f19; */
	backdrop-filter: blur(16px);
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	z-index: 90;

	hr {
		height: 1px;
		background-color: #fff;
		margin: 1em 0;
	}

	@media only screen and (max-width: 768px) {
		position: fixed;
		width: 100%;
		height: 100%;
		align-items: center;
		border-radius: 0;
		z-index: 50;
		top: 0;

		hr {
			margin: 32px 0;
		}

		.first-hr {
			width: 100vw;
			margin-top: 8px;
		}
		.second-hr {
			width: 60vw;
		}
	}
`;

export const User = styled.div`
	display: flex;
	align-items: center;
	gap: 1em;

	img {
		width: 64px;
		height: 64px;
		border-radius: 50%;
	}

	@media screen and (max-width: 768px) {
		img {
			width: 48px;
			height: 48px;
			border-radius: 50%;
		}
		width: 100%;
		padding: 0 16px;
		justify-content: center;
	}
`;

// prettier-ignore
export const User__Infos = styled.div`
	a, p {
		color: white;
	}
`;

// prettier-ignore
export const LinksContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;


	a, button {
		cursor: pointer;
		width: 100%;
		color: white;
		display: flex;
		gap: 1em;
		align-items: center;

		transition: all 0.1s linear;

		:hover {
			p {
				font-weight: 600;
			}
			transform: translateX(8px);
		}
	}

	svg {
		fill: white;
		width: 28px;
		height: 28px;
		border-radius: 0;
	}

	@media only screen and (max-width: 768px) {
		gap: 1.5em;

		p {
			font-weight: 600;
			font-size: 24px;
		}

		a, button {
			width: fit-content;
			margin: auto;
		}

		svg {
			display: none;
		}
	}
`;

export const PopupButton = styled.button`
	background-color: transparent;
	border: none;
`;
