import {useState} from 'react';
import {Route, Routes, useRoutes} from 'react-router-dom';

import Defeat from 'components/EditName/Defeat';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import Victory from 'components/Victory';
import FakeLogin from 'mocks/Login/FakeLogin';
import {UserMocks} from './mocks/Users/UserMocks';
import {MessagesContextProvider} from 'contexts/Chat/MessagesContext';
import {PopupContextProvider} from 'contexts/Popup/Popup';
import SocketContextComponent from 'contexts/Socket/Component';
import {UserContextProvider} from 'contexts/User/userContent';
import Pages from 'pages';
import DoubleAuthentication from 'pages/2FA';
import Game from 'pages/Game/Game';
import Homepage from 'pages/Home';
import Landing from 'pages/Landing';
import Registration from 'pages/Registration';
import Social from 'pages/Social';
import Popup from './components/Popup';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle} from 'styles/global';
import {dark, light} from 'styles/theme';
import {ConfigProvider} from 'antd';

function App() {
	const defaultTheme = 'dark';

	const [theme, setTheme] = useState(
		localStorage.getItem('theme') || defaultTheme
	);

	function WithNavbar() {
		return (
			<>
				<Pages.Navbar setTheme={setTheme} />
				<Routes>
					<Route path="/chat" element={<Pages.Chat />} />
					<Route path="/leaderboard" element={<Pages.Leaderboard />} />
					<Route path="/dashboard/:name" element={<Pages.Dashboard />} />
					<Route path="/settings" element={<Pages.Settings />} />
					<Route path="/headings" element={<Pages.Headings />} />
					<Route path="/social" element={<Social />} />
					<Route path="/users" element={<UserMocks />} />,
					<Route path="/game" element={<Game />} />
					<Route path="*" element={<Pages.NotFound />} />
					<Route path="/fake_login" element={<FakeLogin />} />
					<Route path="/chat" element={<Pages.Chat />} />
				</Routes>
			</>
		);
	}

	const routes = useRoutes([
		{
			path: '/login',
			element: <UserMocks />,
			// element: <Landing />,
		},
		{
			path: '/',
			element: (
				<PrivateRoute>
					<Homepage />
				</PrivateRoute>
			),
		},
		{
			path: '/registration',
			element: <Registration />,
		},
		{
			path: '/2FA',
			element: (
				<PrivateRoute>
					<DoubleAuthentication />
				</PrivateRoute>
			),
		},
		{
			path: '/Victory',
			element: (
				<PrivateRoute>
					<Victory />
				</PrivateRoute>
			),
		},
		{
			path: '/Defeat',
			element: (
				<PrivateRoute>
					<Defeat />
				</PrivateRoute>
			),
		},
		{
			path: '/*',
			element: (
				<PrivateRoute>
					<WithNavbar />
				</PrivateRoute>
			),
		},
	]);

	return (
		<UserContextProvider>
			<MessagesContextProvider>
				<SocketContextComponent>
					<PopupContextProvider>
						<ThemeProvider theme={theme === 'light' ? light : dark}>
							<ConfigProvider
								theme={{
									token: {
										colorPrimary: '#dc4f19',
										colorSuccess: '#4bae4f',
									},
								}}
							>
								<GlobalStyle />
								<Popup.GameInvite />
								<Popup.SearchPlayer />
								{routes}
							</ConfigProvider>
						</ThemeProvider>
					</PopupContextProvider>
				</SocketContextComponent>
			</MessagesContextProvider>
		</UserContextProvider>
	);
}

export default App;
