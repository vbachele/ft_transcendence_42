import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {UserContextProvider} from 'components/Context/userContent';
import {PictureContextProvider} from 'components/Context/pictureContent';
import LandingPage from 'pages/Landing';
import RegistrationPage from 'pages/Registration';
import LoginPage from 'pages/Login';
import Leaderboard from 'pages/Leaderboard';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';
import Settings from 'pages/Settings';
import Navbar from 'components/Navbar';
import GlobalStyle from 'styles/global';
import './App.css';
import {Fragment} from 'react';
import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from 'styles/theme';

function App() {
	return (
		// <UserContextProvider>
		// 	<PictureContextProvider>
		<Fragment>
			<ThemeProvider theme={darkTheme}>
				<GlobalStyle />
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" element={<LandingPage />} />
						{/* <Route path="/registration-page" element={<RegistrationPage />} />
						<Route path="/login-page" element={<LoginPage />} />
						<Route path="/leaderboard" element={<Leaderboard />} />
						<Route path="/dashboard/:id" element={<Dashboard />} />
					<Route path="/settings" element={<Settings />} /> */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Router>
			</ThemeProvider>
		</Fragment>
		// 	</PictureContextProvider>
		// </UserContextProvider>
	);
}

export default App;
