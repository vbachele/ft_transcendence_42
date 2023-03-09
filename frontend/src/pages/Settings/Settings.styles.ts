import styled from 'styled-components';

export const Container = styled.div`
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;
	width: clamp(60vw, 394px, 50vw);
	margin-top: 6vh;
	gap: 20px;
	/* Inside auto layout */

	::before {
		content: '';
		z-index: -1;
		position: fixed;
		background: url('https://cdn.discordapp.com/attachments/1067488107827576916/1080769554302652416/Capture_decran_2023-03-02_a_09.31.57.png')
			no-repeat center center;
		background-size: cover;
		transform: scale(1.2);

		filter: brightness(0.3) blur(25px);
		top: 0;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	flex: none;
	order: 2;
	flex-grow: 0;
`;

export const Container__Text = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: clamp(0rem, 2vh, 0.5rem);
`;

export const Container__Infos = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
	gap: clamp(4rem, 2vh, 8rem);

	@media only screen and (max-width: 768px) {
		align-items: left;
	}
`;
