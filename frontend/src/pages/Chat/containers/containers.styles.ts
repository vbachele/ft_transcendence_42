import styled from 'styled-components';
import PlusSign from 'assets/new_discussion.svg';

export const LateralBar = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
	padding: 16px 0 0 0;
	overflow: auto;
	@media only screen and (min-width: 768px) {
		border-right: 1px solid;
		border-color: ${(p) => (p.theme.name === 'light' ? '#e5e7eb' : '#403F40')};
		min-width: 240px;
		width: 320px;
	}
`;

export const ChannelList = styled.div`
	display: flex;
	flex-direction: column;
	white-space: nowrap;
	max-height: 100%;
	//overflow: hidden;

	@media only screen and (min-height: 480px) {
		max-height: calc(80px * 3);
		overflow: hidden;
		transition: max-height 0.15s ease-in-out;
		//overflow: auto;
	}

	&.active {
		overflow: unset;
		//overflow: auto;
		max-height: fit-content;
	}
`;

export const Header = styled.div`
	display: none;
	@media only screen and (min-height: 480px) {
		display: flex;
		padding: 8px;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.buttons {
			transition: all 0.3s linear;

			:hover {
				transform: scale(1.1);
				background-color: ${(p) =>
					p.theme.name === 'light' ? '#e5e7eb' : '#bfc1c4'};
			}
		}
	}
`;

export const UserPanel = styled.div`
	width: 100%;
	padding: 16px;
	overflow: auto;
	@media only screen and (min-width: 768px) {
		border-left: solid 1px;
		border-color: ${(p) => (p.theme.name === 'light' ? '#e5e7eb' : '#403F40')};
		width: 320px;
		min-width: 300px;
	}
`;
export const MainFieldLayout = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
`;

export const Scroller = styled.div`
	overflow: auto;
	display: flex;
	flex-direction: column-reverse;
	flex: 1;
`;

export const MessageList = styled.div`
	word-break: break-word;
`;

export const Chat = styled.div`
	display: flex;
	flex: 1 1 0;
	min-height: 0;
`;

export const MiddleDiv = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	flex: 1;
	justify-content: space-between;
`;

export const TopBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 80px;
	padding: 16px;
	border-bottom: solid 1px;
	border-color: ${(p) => (p.theme.name === 'light' ? '#e5e7eb' : '#403F40')};
`;

export const ExpandButton = styled.button`
	background-color: transparent;
	border: none;
	font-size: 1.2rem;
	color: ${(p) => (p.theme.name === 'light' ? '#000' : '#fff')};
	cursor: pointer;
	text-decoration: underline;
`;
