import styled from 'styled-components';

// https://cdn.intra.42.fr/coalition/cover/45/federation_background.jpg
// https://cdn.intra.42.fr/coalition/cover/46/alliance_background.jpg
// https://cdn.intra.42.fr/coalition/cover/47/order_background.jpg
// https://cdn.intra.42.fr/coalition/cover/48/assembly_background.jpg

export const Container = styled.div`
	height: 1000vh;
`;

export const Profile = styled.div`
	background-image: url('https://cdn.intra.42.fr/coalition/cover/45/federation_background.jpg');
	/* background-image: url('https://cdn.intra.42.fr/coalition/cover/46/alliance_background.jpg'); */
	/* background-image: url('https://cdn.intra.42.fr/coalition/cover/47/order_background.jpg'); */
	/* background-image: url('https://cdn.intra.42.fr/coalition/cover/48/assembly_background.jpg'); */
	background-position: center left;

	height: 250px;
`;

export const DashboardGrid = styled.div`
	height: 1000px;
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr 1fr;
	gap: 1em;
	padding: 1em;

	.subcontainer {
		background-color: rgba(224, 79, 95, 0.1);
		border-radius: 4px;
		padding: 0.5em;
		display: grid;
		grid-template-columns: 1.5fr 3fr;
		grid-template-rows: 1.5fr 1fr;
		gap: 0.5em;
	}
`;
