import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useState} from 'react';

import Pages from 'pages';

import {UserContextProvider} from 'contexts/User/userContent';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle} from 'styles/global';
import {dark, light} from 'styles/theme';
import './App.css';
import SocketContextComponent from 'contexts/Socket/Component';
import {UserMocks} from './mocks/Users/UserMocks';
import DoubleAuthentication from 'pages/2FA';
import Victory from 'components/Victory';
import Defeat from 'components/EditName/Defeat';
import Testpage from 'pages/Home';
import LandingPage from 'pages/Landing/Landingpage';
import Social from 'pages/Social';
import {PopupContextProvider, usePopup} from 'contexts/Popup/Popup';
import Popup from './components/Popup';
import {ConfigProvider} from 'antd';
import LobbyContextComponent from 'contexts/Lobby/Lobby';
import FakeLogin from 'mocks/Login/FakeLogin';
import {MessagesContextProvider} from "./contexts/Chat/MessagesContext";

function App() {
	const userPref =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches;
	const defaultTheme = userPref ? 'dark' : 'light';

	const [theme, setTheme] = useState(
		localStorage.getItem('theme') || defaultTheme
	);

	const {invitation} = usePopup();

	function WithNavbar() {
		return (
			<>
				<Pages.Navbar setTheme={setTheme}/>
				<Routes>
					<Route path="/oldlanding" element={<Pages.Landing/>}/>
					<Route path="/registration" element={<Pages.Registration/>}/>
					<Route path="/oldlogin" element={<Pages.Login/>}/>
					<Route path="/leaderboard" element={<Pages.Leaderboard/>}/>
					<Route path="/dashboard/:name" element={<Pages.Dashboard/>}/>
					<Route path="/settings" element={<Pages.Settings/>}/>
					<Route path="/headings" element={<Pages.Headings/>}/>
					<Route path="/social" element={<Social/>}/>
					<Route path="/users" element={<UserMocks/>}/>
					<Route path="/2FA" element={<DoubleAuthentication/>}/>
					<Route path="/Victory" element={<Victory/>}/>
					<Route path="/Defeat" element={<Defeat/>}/>
					<Route path="/game" element={<Pages.Game/>}/>
					<Route path="*" element={<Pages.NotFound/>}/>
					<Route path="/fake_login" element={<FakeLogin/>}/>
				</Routes>
			</>
		);
	}

	return (
		<UserContextProvider>
			<PopupContextProvider>
				<MessagesContextProvider>
					<SocketContextComponent>
						<LobbyContextComponent>
							<ThemeProvider theme={theme === 'light' ? light : dark}>
								<ConfigProvider
									theme={{
										token: {
											colorPrimary: '#e04f5f',
											colorSuccess: '#4bae4f',
										},
									}}
								>
									<GlobalStyle/>
									<Popup.GameInvite/>
									<Popup.SearchPlayer/>
									<Router>
										<Routes>
											<Route path="/" element={<LandingPage/>}/>
											<Route path="/login" element={<Testpage/>}/>
											<Route path="/*" element={<WithNavbar/>}/>
										</Routes>
									</Router>
								</ConfigProvider>
							</ThemeProvider>
						</LobbyContextComponent>
					</SocketContextComponent>
				</MessagesContextProvider>
			</PopupContextProvider>
		</UserContextProvider>
	);
}

export default App;
