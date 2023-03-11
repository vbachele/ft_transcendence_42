import styled from 'styled-components';

export const Container = styled.div`
	user-select: none;
`;

export const Background = styled.video`
	z-index: -1;
	position: fixed;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
	transform: translateX(calc((100% - 100vw) / 2));
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
	padding-left: 48px;
	width: fit-content;
	button,
	a {
		/* border: 2px solid crimson; */ //TODO chelou
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
	line-height: 1.5;
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
	right: 48px;
	text-align: right;
`;

export const UserName = styled.p`
	font-size: clamp(24px, 4vw, 50px);
	font-weight: 600;
	color: #fff;
	text-shadow: 0px 0px 3px #fff;
`;

export const UserAchievements = styled.div`
	color: rgba(255, 255, 255, 0.75);
	font-size: clamp(16px, 3vw, 22px);
	text-shadow: 0 0 2px rgb(0, 0, 0);
`;
