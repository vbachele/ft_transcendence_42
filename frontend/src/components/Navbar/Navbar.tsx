import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from 'assets/logo.svg';
import {ReactComponent as Versus} from 'assets/versus.svg';
import ToggleTheme from './components/ToggleTheme';
import Dropdown from './components/Dropdown';
import * as S from './Navbar.styles';

interface IProps {
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({setTheme}: IProps) => {
	return (
		<S.StyledNav id="navbar">
			<Link to="/">
				<S.Brand>
					<Logo className="logo" />
					<Versus className="versus" />
				</S.Brand>
			</Link>
			<S.Menu>
				<ToggleTheme setTheme={setTheme} />
				<S.Divider />
				<Dropdown />
			</S.Menu>
		</S.StyledNav>
	);
};

export default Navbar;
