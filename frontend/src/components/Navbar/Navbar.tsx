import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from 'assets/logo-text.svg';
import Avatar from 'assets/default-avatar.png';
import Toggle from './components/Toggle';
import * as S from './Navbar.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import {useState} from 'react';
import Dropdown from './components/Dropdown';

interface IProps {
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({setTheme}: IProps) => {
	const [log, setLog] = useState<boolean>(false);

	return (
		<S.StyledNav>
			<Link to="/">
				<Logo />
			</Link>
			<S.Menu>
				<Toggle setTheme={setTheme} />
				<S.Divider />
				{!log && (
					<UI.SecondaryButtonSmall>
						<Link to="/login" onClick={() => setLog(true)}>
							Log in
						</Link>
					</UI.SecondaryButtonSmall>
				)}
				{log && <Dropdown />}
			</S.Menu>
		</S.StyledNav>
	);
};

export default Navbar;