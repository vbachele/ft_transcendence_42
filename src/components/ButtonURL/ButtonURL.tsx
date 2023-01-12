import { Link } from 'react-router-dom';
import './styles.css'

interface IButtonURL {
	text: string;
	url: string;
}

const ButtonURL = ({text, url}: IButtonURL) => {
	return (
		<Link to={url} className="button-url">{text}</Link>
	);
}

export default ButtonURL;
