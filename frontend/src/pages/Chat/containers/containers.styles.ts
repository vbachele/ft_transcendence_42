import styled from 'styled-components';
import PlusSign from 'assets/new_discussion.svg';

export const LateralBar = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
	padding: 16px 0 0 0;
	@media only screen and (min-width: 768px) {
		border-right: 1px solid;
		border-color: ${(p) => (p.theme.name === 'light' ? '#e5e7eb' : '#403F40')};
		width: 380px;
	}
`;

export const ChannelList = styled.div`
	display: flex;
	flex-direction: column;
	white-space: nowrap;
	max-height: 100%;
	overflow: scroll;
	scrollbar-width: none;

	@media only screen and (min-height: 480px) {
		max-height: calc(80px * 4 + 40px);
	}

	&::-webkit-scrollbar {
		display: none;
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
`;

export const UserPanel = styled.div`
	width: 100%;
	padding: 16px;
	overflow: auto;
	@media only screen and (min-width: 768px) {
		border-left: lightgray solid 1px;
		width: 300px;
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
	word-break: break-all;
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
