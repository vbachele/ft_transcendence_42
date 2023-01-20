import styled from 'styled-components';

export const Container__Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 70vw;
	gap: 4em;
`;
export const Container__Input = styled.div`
	display: flex;
	flex-direction: row;
	align-items: space-between;
	gap: 1.2em;
	@media screen and (max-width: 768px) {
		gap: 0.8em;
	}
`;
