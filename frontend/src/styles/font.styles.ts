import styled from 'styled-components';

interface IProps {
	weight?: string;
	fontSize?: string;
}

export const Text = styled.p<IProps>`
	font-weight: ${(p) => p.weight || 600};
	font-size: ${(p) => p.fontSize || '1.1rem'};
	@media only screen and (max-width: 768px) {
	}
`;
export const MenuText = styled(Text)`
	color: white;
	@media only screen and (max-width: 768px) {
	}
`;

export const Subtitle = styled.p<IProps>`
	font-weight: ${(p) => p.weight || 500};
	font-size: ${(p) => p.fontSize || '1rem'};
	color: ${(p) => p.color || '#949494'};
	@media only screen and (max-width: 768px) {
	}
`;

export const H1 = styled.h1`
	font-size: clamp(2rem, 2.5vw, 2.5rem);
	@media only screen and (max-width: 768px) {
	}
`;

export const H2 = styled.h2`
	font-size: clamp(1.4rem, 2vw, 2rem);
	@media only screen and (max-width: 768px) {
	}
`;

export const H3 = styled.h3`
	font-size: clamp(1.3rem, 1.5vw, 1.6rem);
	@media only screen and (max-width: 768px) {
	}
`;

export const H4 = styled.h4`
	font-size: clamp(1.1rem, 1.2vw, 1.5rem);
	@media only screen and (max-width: 768px) {
	}
`;

export const H5 = styled.h5`
	font-size: clamp(1rem, 1vw, 1.2rem);
	@media only screen and (max-width: 768px) {
	}
`;

export const H6 = styled.h6`
	font-size: clamp(1rem, 1.5vw, 1.1rem);
`;
