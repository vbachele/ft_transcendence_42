import styled, {ThemeContext} from 'styled-components';
import {motion} from 'framer-motion';
import {useContext} from 'react';

interface IProps {
	toggle: () => void;
	isOpen: boolean;
}

const Button = styled.div`
	cursor: pointer;
	position: relative;
	z-index: 99;
	svg {
		border-radius: 0;
	}
	@media screen and (min-width: 769px) {
		display: none;
	}
`;

const Path = (props: any) => (
	<motion.path
		fill="transparent"
		strokeLinecap="round"
		strokeWidth="3"
		{...props}
	/>
);

export function ToggleDrop({toggle, isOpen}: IProps) {
	const transition = {duration: 0.3};
	const theme = useContext(ThemeContext);

	return (
		<Button onClick={toggle}>
			<svg width="40" height="40" viewBox="0 0 32 32">
				<Path
					animate={isOpen ? 'open' : 'closed'}
					initial={false}
					variants={{
						closed: {d: 'M8 8 L24 8', stroke: theme.colors.secondary},
						open: {d: 'M8 8 L24 24', stroke: 'hsl(0, 0%, 100%)'},
					}}
					transition={transition}
				/>
				<Path
					d="M8 16 L24 16"
					stroke={theme.colors.secondary}
					animate={isOpen ? 'open' : 'closed'}
					initial={false}
					variants={{
						closed: {opacity: 1},
						open: {opacity: 0},
					}}
					transition={transition}
				/>
				<Path
					animate={isOpen ? 'open' : 'closed'}
					initial={false}
					variants={{
						closed: {
							d: 'M8 24 L24 24',
							stroke: theme.colors.secondary,
						},
						open: {d: 'M8 24 L24 8', stroke: 'hsl(0, 0%, 100%)'},
					}}
					transition={transition}
				/>
			</svg>
		</Button>
	);
}
