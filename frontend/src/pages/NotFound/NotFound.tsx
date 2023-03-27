import './styles.css';

const NotFound = () => {
	return (
		<div className="notFound">
			<p className="notFound__title">404</p>
			<h2 className="notFound__subtitle">Page Not Found</h2>
			<img
				src="https://cdn.discordapp.com/attachments/1067488107827576916/1070721840160440402/fire404.gif"
				className="notFound__gif"
			/>
		</div>
	);
};

export default NotFound;
