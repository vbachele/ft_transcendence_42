import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from 'pages/Landing';
import RegistrationPage from 'pages/Registration';
import LoginPage from 'pages/Login';
import Leaderboard from 'pages/Leaderboard';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';
import Settings from 'pages/Settings';
import Navbar from 'components/Navbar';
import {UserContextProvider} from 'components/Context/userContent';
import {PictureContextProvider} from 'components/Context/pictureContent';
import {ThemeProvider} from 'styled-components';
import GlobalStyle from 'styles/global';
import {dark, light} from 'styles/theme';
import './App.css';

function App() {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

	return (
		<UserContextProvider>
			<PictureContextProvider>
				<ThemeProvider theme={theme === 'light' ? light : dark}>
					<React.Fragment>
						<GlobalStyle />
						<Router>
							<Navbar setTheme={setTheme} />
							<Routes>
								<Route path="/" element={<LandingPage />} />
								<Route
									path="/registration-page"
									element={<RegistrationPage />}
								/>
								<Route path="/login-page" element={<LoginPage />} />
								<Route path="/leaderboard" element={<Leaderboard />} />
								<Route path="/dashboard/:id" element={<Dashboard />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
						</Router>
					</React.Fragment>
				</ThemeProvider>
			</PictureContextProvider>
		</UserContextProvider>
	);
}

export default App;
