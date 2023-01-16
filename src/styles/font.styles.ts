import styled from 'styled-components';

export const Text = styled.text`
	// warning
	font-family: 'Montserrat';
	font-style: normal;
	color: ${(props) => props.theme.colors.secondary || '#000'};
`;

export const H1Title = styled(Text)`
	font-weight: ${(props) => props.fontWeight || '700'};
	font-size: ${(props) => props.fontSize || '40px'};
	text-align: ${(props) => props.fontSize || 'center'};
	line-height: 48px;
	@media only screen and (max-width: 768px) {
		font-size: ${(props) => props.string};
	}
`;

export const H2Title = styled(Text)`
	font-weight: ${(props) => props.fontWeight || '700'};
	font-size: ${(props) => props.fontSize || '30px'};
	line-height: 48px;
	@media only screen and (max-width: 768px) {
		font-weight: 700;
		font-size: 20px;
		line-height: 24px;
	}
`;

export const Subtitle = styled(Text)`
	font-weight: ${(props) => props.fontWeight || '500'};
	font-size: ${(props) => props.fontSize || '16px'};
	line-height: 20px;
	color: ${(props) => props.color};
	@media only screen and (max-width: 768px) {
		display: ${(props) => props.display};
		color: var(--font-color);
	}
`;

export const NormalText = styled(Text)`
	font-weight: ${(props) => props.fontWeight || '700'};
	font-size: ${(props) => props.fontSize || '16px'};
	line-height: 24px;
	@media only screen and (max-width: 768px) {
		display: ${(props) => props.string};
		font-size: 16px;
	}
`;

export const MenuText = styled(Text)`
	font-weight: ${(props) => props.fontWeight || '500'};
	font-size: ${(props) => props.fontSize || '22px'};
	line-height: 27px;
	color: #fff;
	@media only screen and (max-width: 768px) {
		display: ${(props) => props.display};
	}
`;
