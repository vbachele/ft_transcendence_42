import styled from 'styled-components';

interface IProps {
	open: boolean;
}

export default styled.div`
	.buttonTitles:hover {
		cursor: pointer;
		transform: scale(1.4);
		background-color: ${(p) =>
			p.theme.name === 'light' ? '#e5e7eb' : '#242526'};
	}
	.hiddenDesktop {
		@media only screen and (min-width: 769px) {
			display: none;
		}
	}
	.hiddenMobile {
		@media only screen and (max-width: 768px) {
			display: none;
		}
	}
	display: flex;
	flex: 1 1 0;
	min-height: 0;
`;

export const LateralBarContainer = styled.div<IProps>`
	@media only screen and (max-width: 768px) {
		display: ${({open}) => (open ? 'none' : '')};
		max-width: 100%;
	}
	border: ${(p) =>
		p.theme.name === 'light'
			? '1px solid #DDDDCC'
			: '0.2px solid rgb(100, 100, 100)'};
	border-top: ${(p) =>
		p.theme.name === 'light' ? '0' : '0.2px solid rgb(100, 100, 100)'};
	width: 320px;
	max-width: 320px;
	display: flex;
	flex-direction: column;
	flex: 1;
	gap: 8px;
	/* flex: 1; */
	/* overflow: hidden; */
	/* flex-wrap: wrap; */
`;

export const MiddleDiv = styled.div<IProps>`
	@media only screen and (max-width: 768px) {
		display: ${({open}) => (open ? '' : 'none')};
	}
	display: flex;
	flex-direction: column;
	text-align: center;
	flex: 1;
	justify-content: space-between;
`;

export const ContainerMainField = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	//align-items: center;
	height: 91vh;
	width: 100%;
`;

export const ContainerMiddleField = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	/* flex: 1; */
`;

export const ContainerRightField = styled.div<IProps>`
	@media only screen and (max-width: 768px) {
		display: ${({open}) => (open ? 'none' : '')};
		width: 100%;
		overflow: auto;
	}
	display: flex;
	flex-direction: column;
	//align-items: center;
	width: 320px;
	padding: 16px;
	border: ${(p) =>
		p.theme.name === 'light'
			? '1px solid #DDDDCC'
			: '0.2px solid rgb(100, 100, 100)'};
	border-top: ${(p) =>
		p.theme.name === 'light' ? '0' : '0.2px solid rgb(100, 100, 100)'};
	.hover:hover {
		cursor: pointer;
		transform: scale(1.01);
		background-color: ${(p) =>
			p.theme.name === 'light' ? '#e5e7eb' : '#242526'};
	}
`;

export const ContainerLateralBar = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	padding: 16px;
`;

export const ContainerTitles = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0px 16px;
	.buttons {
		//background-color: white;
		transition: all 0.3s linear;

		:hover {
			transform: scale(1.1);
			background-color: ${(p) =>
				p.theme.name === 'light' ? '#e5e7eb' : '#bfc1c4'};
		}
	}
`;

export const ContainerChannels = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	/* max-height: 33vh; */
	overflow: auto;
	/* flex: 1; */
	gap: 8px;
	li {
		padding: 8px 16px;
	}
	li:hover {
		cursor: pointer;
		transform: scale(1.01);
		background-color: ${(p) =>
			p.theme.name === 'light' ? '#e5e7eb' : '#242526'};
	}
`;

export const ContainerChannel = styled.div`
	transition: all 0.1s linear;
`;

export const ContainerMessage = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 8px 16px;
	transition: all 0.1s linear;

	:hover {
		cursor: pointer;
		transform: scale(1.035);
		/* padding: 4px; */
		background-color: ${(p) =>
			p.theme.name === 'light' ? '#e5e7eb' : '#242526'};
	}
`;

export const ContainerMessages = styled.div`
	/* width: 100%; */
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	/* max-height: 33vh; */
	overflow: auto;
	/* flex: 1; */
	gap: 8px;
`;

export const ContainerSubMessages = styled.div`
	width: 190px;
	@media only screen and (max-width: 768px) {
		width: 65vw;
	}
`;

export const ContainerPicture = styled.div`
	position: relative;
	padding: 0px;
`;

export const PastillePic = styled.div`
	width: 12px;
	height: 12px;
	position: absolute;
	bottom: 0;
	right: 0;
	border-radius: 50%;
	box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
`;

export const Pastille = styled.div`
	width: 12px;
	height: 12px;
	border-radius: 50%;
	box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
`;

export const ProfilePic = styled.img`
	width: 48px;
	border-radius: 50%;
`;

export const ProfilePicRightBar = styled.img`
	@media only screen and (max-width: 768px) {
		width: 30%;
	}
	width: 70%;
	border-radius: 50%;
`;

export const ChatBarContainer = styled.div<IProps>`
	/* @media only screen and (min-width: 769px) {
        width: ${({open}) => (open ? '95%' : '67%')};
    }
    @media only screen and (max-width: 768px) {
        width: 95%;
    } */
	/* display: flex; */
	/* flex-direction: column; */
	/* align-Items: center; */
	/* justify-content: center; */
	/* position: relative; */
	/* position: fixed; */
	/* bottom: 0;
    left: 0;
    right: 0; */
	/* justify-content: flex-end; */
`;

export const ChatBarInput = styled.input<IProps>`
	/* @media only screen and (max-width: 768px) {
        width: 95%;
    } */
	/* width: ${({open}) => (open ? '95%' : '67%')}; */
	width: 100%;
	background: #f9f9f9;
	box-sizing: border-box;
	border: 1px solid #e6e6e6;
	border-radius: 12px;
	padding: 8px 16px;
`;

export const Input = styled.input`
	height: 48px;
	width: clamp(20rem, 50%, 30rem);
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 28px;

	::placeholder {
		font-weight: 400;
		font-size: 14px;
	}
`;

export const IsNotDesktop = styled.div`
	@media only screen and (min-width: 769px) {
		display: none;
	}
`;

export const IsNotMobile = styled.div`
	@media only screen and (max-width: 768px) {
		display: none;
	}
`;
