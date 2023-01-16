import styled from 'styled-components';

interface IProps {
	weight?: string;
}

export const Text = styled.p<IProps>`
	font-weight: ${(p) => p.weight || 500};
	font-size: 20px;
	@media only screen and (max-width: 768px) {
	}
`;

export const MenuText = styled(Text)`
	color: white;
	@media only screen and (max-width: 768px) {
	}
`;

export const Subtitle = styled.p`
	font-size: 16px;
	color: #949494;
	@media only screen and (max-width: 768px) {
	}
`;

export const H1 = styled.h1`
	font-size: 40px;
	@media only screen and (max-width: 768px) {
	}
`;

export const H2 = styled.h2`
	font-size: 32px;
	@media only screen and (max-width: 768px) {
	}
`;

export const H3 = styled.h3`
	font-size: 26px;
	@media only screen and (max-width: 768px) {
	}
`;

export const H4 = styled.h4`
	font-size: 24px;
	@media only screen and (max-width: 768px) {
	}
`;

export const H5 = styled.h5`
	font-size: 20px;
	@media only screen and (max-width: 768px) {
	}
`;

export const H6 = styled.h6`
	font-size: 18px;
	@media only screen and (max-width: 768px) {
	}
`;
