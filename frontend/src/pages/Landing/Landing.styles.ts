import styled from 'styled-components';

export const Container = styled.div`
	user-select: none;
	margin: 32px;
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

export const BrandContainer = styled.div`
	margin-bottom: 160px;
`;

export const Slogan = styled.p`
	margin: 16px 0 0 32px;
	font-size: 32px;
	font-weight: 600;
	color: rgba(255, 255, 255, 0.8);
	text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const Logo = styled.img`
	width: clamp(300px, 60vw, 500px);
`;

export const BoldYellow = styled.p`
	position: relative;
	color: #f3c026;
	left: 0;
	font-size: clamp(32px, 4vw, 64px);
	font-weight: 600;
	text-shadow: 0px 0px 5px #bb7e29;
	transition: all 0.1s ease-in;

	:hover {
		left: 16px;
	}
`;

export const JoinButton = styled.button`
	cursor: pointer;
	text-decoration: none;
	background: none;
	border: none;
`;
