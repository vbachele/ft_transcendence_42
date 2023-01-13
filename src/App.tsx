import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PictureContextProvider } from 'components/Context/pictureContent';
import { UserContextProvider } from 'components/Context/userContent';
import LandingPage from 'pages/Landing/Landing';
import RegistrationPage from 'pages/Registration';
import LoginPage from 'pages/Login';
import Leaderboard from 'pages/Leaderboard';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';
import Navbar from 'components/Navbar';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'styles/theme';
import GlobalStyle from 'styles/global';
import './App.css';
import { useState } from 'react';

function App() {
	const [theme, setTheme] = useState('light');

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	return (
		<UserContextProvider>
			<PictureContextProvider>
				<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
					<GlobalStyle />
					<Router>
						<Navbar />
						<Routes>
							<Route
								path="/"
								element={<button onClick={toggleTheme}>Toggle Theme</button>}
							/>
							{/* <Route path="/" element={<LandingPage />} /> */}

							{/* <Route path="/registration-page" element={<RegistrationPage />} />
							<Route path="/login-page" element={<LoginPage />} />
							<Route path="/testImage" />
							<Route path="/leaderboard" element={<Leaderboard />} />
							<Route path="/dashboard/:id" element={<Dashboard />} /> */}
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Router>
				</ThemeProvider>
			</PictureContextProvider>
		</UserContextProvider>
	);
}

export default App;
