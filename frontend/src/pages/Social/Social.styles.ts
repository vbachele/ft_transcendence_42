import {Collapse} from 'antd';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const {Panel} = Collapse;

export const Container = styled.div`
	margin-top: 64px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 64px;
`;

export const StyledCollapse = styled(Collapse)`
	user-select: none;
	display: flex;
	flex-direction: column;
	gap: 64px;
	width: 60%;

	.ant-collapse-header-text {
		color: ${(p) => p.theme.colors.text};
		font-size: 24px;
		font-weight: bold;
		text-align: center;
	}

	.ant-collapse-expand-icon {
		align-self: center;

		svg {
			fill: ${(p) => p.theme.colors.text};
			width: 16px;
			height: 16px;
		}
	}
`;

interface IPanelProps {
	empty: string;
}

export const StyledPanel = styled(Panel)<IPanelProps>`
	.ant-collapse-content-box {
		display: ${(p) => (p.empty === 'true' ? 'flex' : 'grid')};
		grid-template-columns: 1fr 1fr 1fr;
		justify-content: center;
		gap: 2em;

		.empty {
			color: ${(p) => p.theme.colors.text};
			filter: ${(p) =>
				p.theme.name === 'light' ? 'brightness(1)' : 'brightness(0.9)'};
		}

		@media screen and (max-width: 1300px) {
			grid-template-columns: 1fr 1fr;
		}

		@media screen and (max-width: 768px) {
			grid-template-columns: 1fr;
		}
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
	color: ${(p) => p.theme.colors.text};
	background-color: ${(p) => p.theme.colors.secondary};
	box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
	transition: transform 0.1s linear;

	.avatar {
		border-radius: 50%;
		width: 64px;
		height: 64px;
	}

	:hover {
		transform: scale(1.01);
		background-color: ${(p) => p.theme.colors.hover};
	}
`;

export const DrawerTitle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 32px;
	width: 100%;

	svg {
		cursor: pointer;
		width: 24px;
		height: 24px;
		fill: ${(p) => p.theme.colors.text};

		:hover {
			transform: scale(1.2);
		}

		:active {
			transform: scale(1);
		}
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
		fill: ${(p) => p.theme.colors.text};
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
		color: ${(p) => p.theme.colors.text};
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
	color: ${(p) => p.theme.colors.text};
	background-color: ${(p) => p.theme.colors.secondary};
	box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;

	h5 {
		color: #808080;
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
		margin-left: 16px;
		margin-top: 3px;
		transition: all 0.1s linear;

		:hover {
			transform: scale(1.2);
		}

		:active {
			transform: scale(1);
		}

		svg {
			width: 24px;
			height: 24px;
			fill: ${(p) => p.theme.colors.main};
		}
	}
`;

export const Pending = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 8px;
	border: none;
	border-radius: 8px;
	align-items: center;
	background-color: ${(p) => p.theme.colors.secondary};
	box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
`;

export const HDivLink = styled(Link)`
	display: flex;
	flex-direction: row;
	text-decoration: none;
	align-items: center;
	gap: 8px;

	.avatar {
		border-radius: 50%;
		width: 64px;
		height: 64px;
	}

	h5 {
		color: ${(p) => p.theme.colors.text};
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export const HDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-left: 16px;
	gap: 8px;

	button {
		cursor: pointer;
		margin-right: 8px;
		margin-top: 3px;
		transition: all 0.1s linear;

		.ignore-icon {
			width: 20px;
			height: 20px;
			fill: ${(p) => p.theme.colors.main};
		}

		.accept-icon {
			width: 24px;
			height: 24px;
			fill: #4bae4f;
		}

		:hover {
			transform: scale(1.2);
		}
		:active {
			transform: scale(1);
		}
	}
`;

export const AddUser = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16px;
`;

export const User = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 8px 16px;
	transition: all 0.2s linear;
	background: none;
	gap: 32px;
	border: none;
	color: ${(p) => p.theme.colors.text};

	border-bottom: 1px dotted;
	border-bottom-color: ${(p) =>
		p.theme.name === 'light' ? '#e5e7eb' : '#403F40'};

	button {
		border: none;
		background: none;

		p {
			display: none;
		}

		svg {
			cursor: pointer;
			fill: ${(p) => p.theme.colors.text};
			width: 24px;
			height: 24px;

			:hover {
				transform: scale(1.1);
			}
		}
	}
`;

export const UserLink = styled(Link)`
	display: flex;
	align-items: center;
	gap: 16px;
	text-decoration: none;

	color: ${(p) => p.theme.colors.text};

	:hover {
		color: ${(p) => p.theme.colors.text};
		text-decoration: underline;
	}
`;
