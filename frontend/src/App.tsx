import {Route, Routes} from 'react-router-dom';
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
import {PopupContextProvider} from 'contexts/Popup/Popup';
import Popup from './components/Popup';
import FakeLogin from 'mocks/Login/FakeLogin';
import {MessagesContextProvider} from './contexts/Chat/MessagesContext';
import {ConfigProvider} from 'antd';
import {ChatTest} from 'pages/ChatTest/ChatTest';

function App() {
	// const userPref =
	// 	window.matchMedia &&
	// 	window.matchMedia('(prefers-color-scheme: light)').matches;
	// const defaultTheme = userPref ? 'light' : 'dark';
	const defaultTheme = 'dark';

	const [theme, setTheme] = useState(
		localStorage.getItem('theme') || defaultTheme
	);

	function WithNavbar() {
		return (
			<>
				<Pages.Navbar setTheme={setTheme} />
				<Routes>
					<Route path="/oldlanding" element={<Pages.Landing />} />
					<Route path="/registration" element={<Pages.Registration />} />
					<Route path="/oldlogin" element={<Pages.Login />} />
					<Route path="/leaderboard" element={<Pages.Leaderboard />} />
					<Route path="/dashboard/:name" element={<Pages.Dashboard />} />
					<Route path="/settings" element={<Pages.Settings />} />
					<Route path="/headings" element={<Pages.Headings />} />
					<Route path="/social" element={<Social />} />
					<Route path="/users" element={<UserMocks />} />
					<Route path="/2FA" element={<DoubleAuthentication />} />
					<Route path="/Victory" element={<Victory />} />
					<Route path="/Defeat" element={<Defeat />} />
					<Route path="game" element={<Pages.Game />} />
					<Route path="*" element={<Pages.NotFound />} />
					<Route path="/fake_login" element={<FakeLogin />} />
					<Route path="/chat" element={<Pages.Chat />} />
					<Route path="/chatTest" element={<ChatTest />} />
				</Routes>
			</>
		);
	}

	return (
		<UserContextProvider>
			<MessagesContextProvider>
				<SocketContextComponent>
					<PopupContextProvider>
						<ThemeProvider theme={theme === 'light' ? light : dark}>
							<ConfigProvider
								theme={{
									token: {
										colorPrimary: '#e04f5f',
										colorSuccess: '#4bae4f',
									},
								}}
							>
								<GlobalStyle />
								<Popup.GameInvite />
								<Popup.SearchPlayer />
								<Routes>
									<Route path="/" element={<LandingPage />} />
									<Route path="/login" element={<Testpage />} />
									<Route path="/*" element={<WithNavbar />} />
								</Routes>
							</ConfigProvider>
						</ThemeProvider>
					</PopupContextProvider>
				</SocketContextComponent>
			</MessagesContextProvider>
		</UserContextProvider>
	);
}

export default App;
