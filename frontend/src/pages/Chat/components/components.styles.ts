import styled from "styled-components";
import Arrow from '../../../assets/send_message_arrow.svg';
import {Input as AntdInput} from 'antd';

export const StyledUser = styled.button`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 8px 16px;
	transition: all 0.2s linear;
	background-color: transparent;
	gap: 32px;
	border: none;
  	color: ${(p) => (p.theme.name === 'light' ? '#000' : '#fff')};
	border-bottom: 1px dotted;
  	border-bottom-color: ${(p) => (p.theme.name === 'light' ? '#e5e7eb' : '#403F40')};

	:hover {
		transform: translateX(10px);
	}
`;

export const SendButton = styled.button`
	position: absolute;
	right: 8px;
	cursor: pointer;
	background-image: url(${Arrow});
	background-size: cover;
	background-color: transparent;
	border: none;
	width: 24px;
	height: 24px;
	top: 0;
	bottom: 0;
	margin: auto;
`;

export const Form = styled.form`
	position: relative;
	margin: 16px 16px;
`;

export const ChatBarInput = styled.input`
    width: 100%;
    background: #F9F9F9;
    box-sizing:border-box;
    border: 1px solid #E6E6E6; 
    border-radius: 12px;
    padding: 8px 16px; 
    font-size: 1.2em;
`;

export const Channel = styled.button`
	margin: 0;
	padding: 16px 8px;
	border: none;
	text-align: left;
	text-overflow: ellipsis;
	font-size: 1.3em;
	overflow: auto;
	background-color: transparent;
	min-height: 80px;
	flex: 0 1 25%;
	color: ${(props) => props.theme.colors.secondary};

	&:hover {
		background-color: ${(props) =>
	props.theme.name === 'light' ? 'lightgray' : 'gray'};
	}
`;

export const PastillePic = styled.div`
    width: 12px;
    height:12px;
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
`;


export const ProfilePic = styled.img`
    width: 48px;
    border-radius: 50%;
`;


export const InputSearch = styled(AntdInput.Search)`
	padding: 16px 8px;
`;

export const ChannelName = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16px;

	button {
		border: none;
		background-color: transparent;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;

		svg {
			width: 32px;
			height: 32px;
		}
	}

	img {
		justify-content: center;
		width: 32px;
		height: 32px;
	}
`;

export const NewDiscussion = styled.button`
	background-color: transparent;
	border: none;
	width: 20px;
	height: 20px;
	cursor: pointer;
	color: ${(props) => props.theme.colors.secondary};

	&:hover {
		transform: scale(1.1);
	}
`;
