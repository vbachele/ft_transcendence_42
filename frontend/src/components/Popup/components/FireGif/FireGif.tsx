import styled from "styled-components";

const StyledFireGif = styled.img`
width: 40px;
height: 50px;
@media only screen and (max-width: 768px) {
  display: none;
}
`

function FireGif() {
	return (
		<StyledFireGif src="https://cdn.discordapp.com/attachments/1067488107827576916/1069217769515651132/Rectangle.gif" />
	);
}

export default FireGif;