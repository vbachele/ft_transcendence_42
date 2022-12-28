import './App.css'
import Nav from './Components/NavBar'
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration-page" element={<RegistrationPage />} />
      </Routes>
    </Router>
   )
}

export default App
