import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Landing from 'pages/Landing';
import Registration from 'pages/Registration';
import Login from 'pages/Login';
import Leaderboard from 'pages/Leaderboard';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';
import Settings from 'pages/Settings';
import Navbar from 'components/Navbar';
import Headings from 'pages/Headings';
import {UserContextProvider} from 'context/userContent';
import {PictureContextProvider} from 'context/pictureContent';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle, Content} from 'styles/global';
import {dark, light} from 'styles/theme';
import './App.css';

function App() {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

	return (
		<UserContextProvider>
			<PictureContextProvider>
				<ThemeProvider theme={theme === 'light' ? light : dark}>
					<GlobalStyle />
					<Router>
						<Navbar setTheme={setTheme} />
						<Content>
							<Routes>
								<Route path="/" element={<Landing />} />
								<Route path="/registration" element={<Registration />} />
								<Route path="/login" element={<Login />} />
								<Route path="/leaderboard" element={<Leaderboard />} />
								<Route path="/dashboard/:id" element={<Dashboard />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="/headings" element={<Headings />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
						</Content>
					</Router>
				</ThemeProvider>
			</PictureContextProvider>
		</UserContextProvider>
	);
}

export default App;
