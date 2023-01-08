import './App.css'
import Nav from './Components/NavBar/Notlogged'
import {PrimaryButton, SecondaryButton } from 'Components/Buttons'
import styles from '.././App.css'
import { Subtitle, H1Title } from 'Components/Text'
import { 
  BrowserRouter as Router,
  Route, 
  Routes, 
  } from 'react-router-dom';

import LandingPage from './Pages/LandingPage'
import RegistrationPage from 'Pages/Registration'
import LoginPage from 'Pages/LoginPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration-page" element={<RegistrationPage />} />
        <Route path="/login-page" element={<LoginPage />} />
      </Routes>
    </Router>
   )
}

export default App
