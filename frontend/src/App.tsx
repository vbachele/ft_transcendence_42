import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Landing from "pages/Landing";
import Registration from "pages/Registration";
import Login from "pages/Login";
import Leaderboard from "pages/Leaderboard";
import Dashboard from "pages/Dashboard";
import NotFound from "pages/NotFound";
import Settings from "pages/Settings";
import Navbar from "components/Navbar";
import Headings from "pages/Headings";

import { UserContextProvider } from "contexts/User/userContent";
import { PictureContextProvider } from "contexts/User/pictureContent";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "styles/global";
import { dark, light } from "styles/theme";
import "./App.css";
import Game from "pages/Game/Game";
import SocketContextComponent from "contexts/Socket/Component";
import { StyledGame } from "pages/Game/Game.styles";
import { UserMocks } from "./mocks/Users/UserMocks";
import DoubleAuthentication from "pages/2FA";
import Victory from "components/Victory";
import Defeat from "components/Defeat";
import Testpage from "pages/Testpage";
import LandingPage from "pages/Testlanding/Landingpage";
import Chat from "pages/Chat/Chat";
import { MessagesContextProvider } from './contexts/Chat/MessagesContext';

function App() {
  const userPref =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme = userPref ? "dark" : "light";

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || defaultTheme
  );
  return (
    <UserContextProvider>
      <PictureContextProvider>
        {/* <SocketContextComponent> */}
        <ThemeProvider theme={theme === "light" ? light : dark}>
          <GlobalStyle />
          <Router>
            {location.pathname !== "/login" && location.pathname !== "/" && (
              <Navbar setTheme={setTheme} />
            )}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/oldlanding" element={<Landing />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/oldlogin" element={<Login />} />
              <Route path="/chat" element={
                <MessagesContextProvider>
                  <Chat />
                </MessagesContextProvider>
              } />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/dashboard/:id" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/headings" element={<Headings />} />
              <Route path="/users" element={<UserMocks />} />
              <Route path="/2FA" element={<DoubleAuthentication />} />
              <Route path="/Victory" element={<Victory />} />
              <Route path="/Defeat" element={<Defeat />} />
              <Route path="/login" element={<Testpage />} />
              {/* <Route path="/game" element={<Game/>} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>{" "}
          </Router>
        </ThemeProvider>
        {/* </SocketContextComponent> */}
      </PictureContextProvider>
    </UserContextProvider>
  );
}

export default App;
