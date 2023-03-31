import './styles.css';
import styled from 'styled-components';


export const Background = styled.video`
	z-index: -1;
	position: fixed;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
	transform: translateX(calc((100% - 100vw) / 2));
`;

const NotFound = () => {
	return (
		<div className="notFound">
			<p className="notFound__title">404</p>
			<h2 className="notFound__subtitle">Page Not Found</h2>
			<Background  autoPlay loop muted playsInline>
			<source
				src="https://cdn.discordapp.com/attachments/1067488107827576916/1091010720830853232/production_ID_5091624.mp4"
				type="video/mp4"
			/>
			</Background>
		</div>
	);
};

export default NotFound;
