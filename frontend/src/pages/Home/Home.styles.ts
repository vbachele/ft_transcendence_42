import styled from 'styled-components';

export const Container = styled.div`
	user-select: none;
`;

export const Background = styled.video`
	position: absolute;
	z-index: -1;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
`;

export const Image = styled.img`
	width: 256px;
	height: 256px;

	@media screen and (max-width: 768px) {
		width: 192px;
		height: 192px;
	}
`;

export const LinksContainer = styled.div`
	padding-left: 32px;
	/* width: fit-content; */
	button,
	a {
		/* border: 2px solid crimson; */
		text-decoration: none;
		cursor: pointer;
		width: max-content;
	}
`;

export const Bold = styled.div`
	position: relative;
	color: #fff;
	left: 0;
	font-size: clamp(32px, 4vw, 64px);
	font-weight: 600;
	text-shadow: 0px 0px 3px #cecece;
	transition: all 0.1s ease-in;

	:hover {
		left: 16px;
	}
`;

export const BoldYellow = styled(Bold)`
	color: #f3c026;
	text-shadow: 0px 0px 5px #bb7e29;
`;

export const Regular = styled.div`
	position: relative;
	left: 0;
	font-size: 24px;
	color: #fff;
	/* line-height: 1.7; */
	text-shadow: 0 0 2px #336cec;
	transition: all 0.1s ease-in;

	:hover {
		left: 8px;
	}
`;

export const PopupButton = styled.button`
	border: none;
	background: transparent;
`;

export const UserInfo = styled.div`
	position: fixed;
	bottom: 20%;
	right: 56px;
	text-align: right;
`;

export const heroName = styled(UserInfo)`
	font-size: clamp(24px, 4vw, 50px);
	font-weight: 550;
	color: #fff;
	line-height: 2.5;
	text-shadow: 0px 0px 3px #fff;

	@media only screen and (max-width: 768px) {
		line-height: 3;
	}
`;

export const heroUnlocks = styled.div`
	font-size: clamp(16px, 3vw, 22px);
	color: rgba(255, 255, 255, 0.85);
	text-shadow: 0 0 2px rgb(0, 0, 0);
	&span {
		color: #fff;
	}
`;
