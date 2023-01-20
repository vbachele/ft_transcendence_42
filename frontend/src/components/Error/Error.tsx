import './styles.css';

interface IProps {
	text: string;
}

const Error = ({text}: IProps) => {
	return (
		<div className='error'>
			<h2 className='error__title'>Error</h2>
			<div className="error__detail">{text}</div>
		</div>
	);
}

export default Error;
