import React, {
	FormEvent,
	FormEventHandler,
	MouseEvent,
	useContext,
	useEffect,
	useState,
} from 'react';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import SearchBox from '../modals/SearchBox';
import {GrFormAdd} from 'react-icons/gr';
import ChannelsList from '../channels/ChannelsList';
import DirectMessages from '../messages/DirectMessages';
import {MessagesContext} from 'contexts/Chat/MessagesContext';
import styled, {ThemeContext} from 'styled-components';
import {useFetchLobbies} from '../../../../hooks/chat/useFetchLobbies';

interface LateralBarProps {
	joinLobby: (event: MouseEvent) => void;
}

const StyledButton = styled.button`
  margin: 0;
  padding: 16px 8px;
  border: none;
  text-overflow: ellipsis;
  font-size: 1.3em;
  overflow: auto;
  background-color: transparent;
  min-height: 80px;
  flex: 0 1 25%;

  &:hover {
    background-color: lightgray;
  }
`;

const StyledChannels = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  min-width: 0;
  max-height: 25%;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

function LateralBar({joinLobby}: LateralBarProps) {
	const theme = useContext(ThemeContext);
	const [search, setSearch] = useState<string>('');
	const lobbies = useFetchLobbies();

	const searchFilter = (value: any): boolean => {
		return value
			.normalize('NFD')
			.toLowerCase()
			.includes(search.normalize('NFD').toLowerCase());
	};

	function handleChange(event: FormEvent<HTMLInputElement>) {
		setSearch(event.currentTarget.value);
	}

	return (
		<S.LateralBarContainer>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					margin: '8px 16px',
					gap: '8px',
				}}
			>
				<F.H2>Discussion</F.H2>
				<SearchBox value={search} setValue={handleChange} />
			</div>
			<S.ContainerTitles>
				<F.H3> Channels</F.H3>
				<button
					className="buttonTitles"
					style={{
						border: 'none',
						color: theme.name === 'light' ? 'black' : 'white',
						backgroundColor: 'transparent',
					}}
				>
					<F.H3> + </F.H3>
				</button>
			</S.ContainerTitles>
			<StyledChannels>
				{lobbies
					.filter((lobby) => searchFilter(lobby.id))
					.map((lobby) => (
						<StyledButton onClick={joinLobby}>
							{lobby.id}
						</StyledButton>
					))}
			</StyledChannels>
			<S.ContainerTitles>
				<F.H3> Direct messages</F.H3>
				<button
					className="buttonTitles"
					style={{
						border: 'none',
						color: theme.name === 'light' ? 'black' : 'white',
						backgroundColor: 'transparent',
					}}
				>
					<F.H3> + </F.H3>
				</button>
			</S.ContainerTitles>
		</S.LateralBarContainer>
	);
}

export default LateralBar;
