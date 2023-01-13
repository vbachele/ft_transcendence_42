import './App.css'
import { 
  BrowserRouter as Router,
  Route, 
  Routes, 
  } from 'react-router-dom';
import {UserContextProvider} from "components/Context/userContent"
import LandingPage from 'pages/Landing'
import RegistrationPage from 'pages/Registration'
import LoginPage from 'pages/Login'
import { PictureContextProvider } from 'components/Context/pictureContent'
import Leaderboard from 'pages/Leaderboard';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';
import useFetchPlayer from 'hooks/useFetchPlayer';
import Settings from 'pages/Settings';



function App() {

  const player = useFetchPlayer();

  return (
    <UserContextProvider>
    <PictureContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration-page" element={<RegistrationPage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
				<Route path='/dashboard/:id' element={<Dashboard />} />
        <Route path='/settings' element={<Settings />} />
				<Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </PictureContextProvider>
    </UserContextProvider>
   )
}

export default App
