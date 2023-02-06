import {useState} from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from 'assets/logo.svg';
import {ReactComponent as Versus} from 'assets/versus.svg';
import ToggleTheme from './components/ToggleTheme';
import Dropdown from './components/Dropdown';
import * as S from './Navbar.styles';
import * as UI from 'styles/buttons.styles';

interface IProps {
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({setTheme}: IProps) => {
	const [log, setLog] = useState<boolean>(false);

	return (
		<S.StyledNav>
			<Link to="/">
				<S.Brand>
					<Logo className="logo" />
					<Versus className="versus" />
				</S.Brand>
			</Link>
			<S.Menu>
				<ToggleTheme setTheme={setTheme} />
				<S.Divider />
				{/* {!log && (
					<Link to="/login" onClick={() => setLog(true)}>
						<UI.SecondaryButtonSmall>Log in</UI.SecondaryButtonSmall>
					</Link>
				)} */}
				{/* {log && <Dropdown />} */}
				<Dropdown />
			</S.Menu>
		</S.StyledNav>
	);
};

export default Navbar;
