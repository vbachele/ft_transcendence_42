import styled from 'styled-components';

export const Overlay = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.56);
	z-index: 3000;
	width: 100%;
	height: 100%;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	align-items: center;
	background: rgba(0, 0, 0, 0.56);
	border-radius: 8px;
	backdrop-filter: blur(15px);
	margin: auto;
	position: relative;
	width: 375px;
	padding: 24px;

	gap: 24px;
	z-index: 50;
	border-radius: 8px;
	position: relative;
	width: clamp(80, 80%, 375px);
	height: 223px;
`;

export const Text = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	gap: 8px;
	padding: 0px;
`;

export const Button = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 0px;
	gap: 10px;
	align-self: stretch;
`;

export const ButtonText = styled.div`
  display: "flex";
  align-items: center;
  justify-content: center;
  
`;

export const GiFFire = styled.img`
	width: 40px;
	height: 50px;
`;
