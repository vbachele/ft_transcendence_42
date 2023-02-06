import AddFriend from 'components/Buttons/Social/AddFriend';
import styled from 'styled-components';
import * as F from 'styles/font.styles';

const Container = styled.div`
	padding: 5%;
	background-color: rgba(219, 163, 154, 0.5);
	border-radius: 10px;
	text-align: center;

	hr {
		height: 2px;
		background-color: black;
		border: 0;
		margin: 5%;
	}
`;

const Headings = () => {
	return (
		<Container>
			<F.H1>This is Heading 1</F.H1>
			<F.H2>This is Heading 2</F.H2>
			<F.H3>This is Heading 3</F.H3>
			<F.H4>This is Heading 4</F.H4>
			<F.H5>This is Heading 5</F.H5>
			<F.H6>This is Heading 6</F.H6>
			<F.Text>This is Normal Text</F.Text>
			<F.MenuText>This is Menu Text</F.MenuText>
			<F.Subtitle>This is Subtitle</F.Subtitle>
			<hr />
			<h1>This is Heading 1</h1>
			<h2>This is Heading 2</h2>
			<h3>This is Heading 3</h3>
			<h4>This is Heading 4</h4>
			<h5>This is Heading 5</h5>
			<h6>This is Heading 6</h6>
			<p>This is p Text</p>
		</Container>
	);
};

export default Headings;
