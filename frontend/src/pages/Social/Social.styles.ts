import styled from 'styled-components';

export const Container = styled.div`
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 25px;
`;

interface IUserProps {
	isEmpty: boolean;
}

export const UserContainer = styled.div<IUserProps>`
	display: ${(p) => (p.isEmpty ? 'flex' : 'grid')};
	grid-template-columns: 1fr 1fr 1fr;
	justify-content: center;
	gap: 2em;
	padding: 16px;
	width: 60%;
	max-height: 512px;
	overflow-y: auto;

	.empty {
		filter: ${(p) =>
			p.theme.name === 'light' ? 'brightness(1)' : 'brightness(0.9)'};
	}

	@media screen and (max-width: 1300px) {
		grid-template-columns: 1fr 1fr;
		width: 75%;
	}
	@media screen and (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

export const Friend = styled.button`
	cursor: pointer;
	padding: 8px;
	display: flex;
	gap: 16px;
	border: none;
	border-radius: 8px;
	align-items: center;
	color: ${(p) => p.theme.colors.secondary};
	background-color: ${(p) =>
		p.theme.name === 'light' ? '#f6f6f7' : '#252526'};
	box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
	transition: transform 0.1s linear;

	.avatar {
		border-radius: 50%;
		width: 64px;
		height: 64px;
	}

	:hover {
		transform: scale(1.01);
		background-color: ${(p) =>
			p.theme.name === 'light' ? '#e9e9eb' : '#1f1f20'};
	}
`;

export const DrawerTitle = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	svg {
		cursor: pointer;
		width: 24px;
		height: 24px;
		fill: ${(p) => p.theme.colors.secondary};
	}
`;

export const FriendDetails = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32px;

	.drawer__avatar {
		width: 192px;
		border-radius: 50%;
	}
`;

export const FriendOptions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 32px;

	svg {
		fill: ${(p) => p.theme.colors.secondary};
		width: 24px;
		height: 24px;
	}

	a,
	button {
		width: fit-content;
		cursor: pointer;
		text-decoration: none;
		background: none;
		border: none;
		display: flex;
		gap: 1em;
		color: ${(p) => p.theme.colors.secondary};
		transition: transform 0.1s linear;

		:hover {
			transform: translateX(8px);
		}
	}
`;

export const Blocked = styled.div`
	cursor: not-allowed;
	padding: 8px;
	display: flex;
	justify-content: space-between;
	border: none;
	border-radius: 8px;
	align-items: center;
	color: ${(p) => p.theme.colors.secondary};
	background-color: ${(p) =>
		p.theme.name === 'light' ? '#f6f6f7' : '#252526'};
	box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;

	h5 {
		color: #9ca3af;
	}

	.avatar {
		border-radius: 50%;
		width: 64px;
		height: 64px;
		filter: grayscale(1);
	}

	button {
		cursor: pointer;
		margin-right: 24px;
		margin-top: 3px;
		transition: all 0.1s linear;

		:hover {
			transform: scale(1.1);
		}
		:active {
			transform: scale(1);
		}
		svg {
			width: 24px;
			height: 24px;
			fill: #dc4f19;
		}
	}
`;
