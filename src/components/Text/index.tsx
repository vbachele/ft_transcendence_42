import styled from 'styled-components'

// Here we can define all the property for a text by

export const Text = styled.text`
	font-family: 'Montserrat';
	font-style: normal;
	display: flex;
	align-items: center;
	color: var(--font-color);
`;

export const H1Title = styled(Text)`
	font-weight: ${props => props.fontWeight || "700"};
	font-size: ${props => props.fontSize || "40px"};
	line-height: 48px;
	@media only screen and (max-width: 768px) {
		font-size:${props => props.string};
	}
`

export const H2Title = styled(Text)`
	font-weight: ${props => props.fontWeight || "700"};
	font-size: ${props => props.fontSize || "40px"};
	line-height: 48px;
	@media only screen and (max-width: 768px) {
		font-weight: 700;
		font-size: 20px;
		line-height: 24px;
		align-items: left;
	}
`

export const Subtitle = styled(Text)`
	font-weight: ${props => props.fontWeight || "500"};
	font-size: ${props => props.fontSize || "16px"};
	line-height: 20px;
	color:${props => props.color};
	@media only screen and (max-width: 768px) {
		display :${props => props.display};
		color:var(--font-color);
	}
`

export const NormalText = styled(Text)`
	font-weight: ${props => props.fontWeight || "700"};
	font-size: ${props => props.fontSize || "16px"};
	line-height: 24px;
	@media only screen and (max-width: 768px) {
		display :${props => props.string};
		font-size: 16px;
	}
`

export const MenuText = styled(Text)`
	font-weight: ${props => props.fontWeight || "500"};
	font-size: ${props => props.fontSize || "22px"};
	line-height: 27px;
	color: #FFFFFF;
	@media only screen and (max-width: 768px) {
		display :${props => props.display};
	}
`
