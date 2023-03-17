import styled from 'styled-components';

export const Overlay = styled.div`
	display: flex;
	position: fixed;
	background: rgba(0, 0, 0, 0.56);
	z-index: 100;
	width: 100%;
	height: 100%;
	inset: 0;
`;

export const Container = styled.div`
	position: fixed;
	top: calc(50% - 150px);
	right: calc(50% - 150px);
	width: 300px;
	height: 300px;

	display: flex;
	flex-direction: column;
	border-radius: 8px;
	padding: 24px;
	gap: 20px;
	background: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(16px);
	z-index: 100;
`;

export const Button = styled.div`
	display: flex;
	justify-content: center;
	gap: 16px;
`;

export const Text = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	color: white;
	gap: 8px;
`;

export const GiFFire = styled.img`
	width: 40px;
	height: 50px;
`;
