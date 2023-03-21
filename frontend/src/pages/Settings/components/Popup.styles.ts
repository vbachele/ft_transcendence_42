import styled from 'styled-components';
import {Button} from 'antd';

export const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	padding: 0px 24px;
	gap: 16px;
	width: clamp(80px, 80%, 375px);
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	background-color: ${(p) => (p.theme.name === 'dark' ? '#000' : '#fff')};
	z-index: 100;
	.antd-input {
  	font-family: 'Montserrat';
	}
`;

export const DisableContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	padding: 24px;
	gap: 32px;
	width: clamp(80px, 80%, 375px);
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	background-color: ${(p) => (p.theme.name === 'dark' ? '#000' : '#fff')};
	z-index: 100;
`;

export const Title = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	margin: auto;
	margin-top: 16px;
`;

export const GIF = styled.img`
	width: 36px;
	height: 48px;
	position: relative;
	bottom: 6px;
`;

export const PopupButton = styled(Button)``;

export const Divider = styled.hr`
	border-bottom: 1px solid #ccc;
`;

export const Text = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-justify: justify;
	color: white;
	padding: 0px;
	gap: 16px;
`;
