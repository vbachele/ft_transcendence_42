import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from 'assets/logo.svg';
import {ReactComponent as Versus} from 'assets/versus.svg';
import {ReactComponent as BellOpened} from './assets/bell-opened.svg';
import {ReactComponent as BellClosed} from './assets/bell-closed.svg';
import ToggleTheme from './components/ToggleTheme';
import Dropdown from './components/Dropdown';
import * as S from './Navbar.styles';
import * as S2 from './components/Dropdown.styles';
import {useState} from 'react';

interface IProps {
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({setTheme}: IProps) => {
	const [bellOpen, setBellOpen] = useState(false);

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

				{/* <S.Divider />
				<div style={{position: 'relative', height: '24px'}}>
					<S2.NotifCounter>15</S2.NotifCounter>
					{bellOpen ? (
						<BellOpened
							className="bell"
							onClick={() => setBellOpen(!bellOpen)}
						/>
					) : (
						<BellClosed
							className="bell"
							onClick={() => setBellOpen(!bellOpen)}
						/>
					)}
				</div> */}

				<S.Divider />
				<Dropdown />
			</S.Menu>
		</S.StyledNav>
	);
};

export default Navbar;
