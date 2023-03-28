import {Route, Routes, useRoutes} from 'react-router-dom';
import {ConfigProvider, theme as antdTheme} from 'antd';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle} from 'styles/global';
import {dark, light} from 'styles/theme';
import {useState} from 'react';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import FakeLogin from 'mocks/Login/FakeLogin';
import {UserMocks} from 'mocks/Users/UserMocks';
import {PopupContextProvider} from 'contexts/Popup/Popup';
import SocketContextComponent from 'contexts/Socket/Component';
import {UserContextProvider} from 'contexts/User/userContent';
import ChatContextComponent from 'contexts/Chat/Component';
import Pages from 'pages';
import Popup from 'components/Popup';

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
					<Route path="/leaderboard" element={<Pages.Leaderboard />} />
					<Route path="/dashboard/:name" element={<Pages.Dashboard />} />
					<Route path="/settings" element={<Pages.Settings />} />
					<Route path="/headings" element={<Pages.Headings />} />
					<Route path="/social" element={<Pages.Social />} />
					{/*<Route path='/users' element={<UserMocks />} />,*/}
					<Route path="/game" element={<Pages.Game />} />
					<Route path="*" element={<Pages.NotFound />} />
					<Route path="/fake_login" element={<FakeLogin />} />
					<Route
						path="/chat"
						element={
							<ChatContextComponent>
								<Pages.Chat />
							</ChatContextComponent>
						}
					/>
				</Routes>
			</>
		);
	}

	const routes = useRoutes([
		{
			path: '/login',
			// element: <UserMocks />,
			element: <Pages.Landing />,
		},
		{
			path: '/',
			element: (
					<PrivateRoute>
						<Pages.Home />
					</PrivateRoute>

			),
		},
		{
			path: '/registration',
			element: <Pages.Registration />,
		},
		{
			path: '/2FA',
			element: (
				// <SocketContextComponent>
					<PrivateRoute>
						<Pages.DoubleAuth />
					</PrivateRoute>
				// </SocketContextComponent>
			),
		},
		{
			path: '/*',
			element: (
				// <SocketContextComponent>
				<PrivateRoute>
					<WithNavbar />
				</PrivateRoute>
				// </SocketContextComponent>

			),
		},
	]);

	return (
		<UserContextProvider>
			<PopupContextProvider>
				<ThemeProvider theme={theme === 'light' ? light : dark}>
					<ConfigProvider
						theme={{
							token: {
								colorPrimary: '#dc4f19',
								colorSuccess: '#4bae4f',
							},
							algorithm:
								theme === 'light'
									? antdTheme.defaultAlgorithm
									: antdTheme.darkAlgorithm,
						}}
					>
						 <SocketContextComponent>
							<GlobalStyle />
							<Popup.GameInvite />
							<Popup.SearchPlayer />
							{routes}
						 </SocketContextComponent>
					</ConfigProvider>
				</ThemeProvider>
			</PopupContextProvider>
		</UserContextProvider>
	);
}

export default App;
