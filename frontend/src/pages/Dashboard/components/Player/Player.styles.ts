import styled from 'styled-components';

export const Coalition = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	text-align: center;

	a {
		text-decoration: none;
		color: ${(p) => p.theme.colors.secondary};
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}
`;

export const Flag = styled.img`
	border-radius: 8px;
`;

export const Ranks = styled.div`
	display: flex;
	gap: 10%;

	a {
		gap: 0;
	}
`;

export const Profile = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;

	.text-color.ant-progress .ant-progress-text {
		color: ${(p) => (p.theme.name === 'light' ? '#000' : '#fff')};
	}
`;

export const User = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5em;
`;

export const Avatar = styled.img`
	width: 100px;
	border-radius: 50%;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const Options = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Stats = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;
