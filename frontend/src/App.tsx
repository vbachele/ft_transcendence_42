import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useState} from 'react';

import Pages from 'pages';

import { UserContextProvider } from "contexts/User/userContent";
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
import Social from "pages/Social";
import { PopupContextProvider } from "contexts/Popup/popup";
import SearchPlayer from "components/Popup/SearchPlayer";
import { ConfigProvider } from "antd";

function App() {
  const userPref =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme = userPref ? "dark" : "light";

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || defaultTheme
  );

  function WithNavbar() {
    return (
      <>
        <Pages.Navbar setTheme={setTheme} />
        <Routes>
          <Route path="/oldlanding" element={<Pages.Landing />} />
          <Route path="/registration" element={<Pages.Registration />} />
          <Route path="/oldlogin" element={<Pages.Login />} />
          <Route path="/leaderboard" element={<Pages.Leaderboard />} />
          <Route path="/dashboard/:id" element={<Pages.Dashboard />} />
          <Route path="/chat" element={<Pages.Chat />} />
          <Route path="/settings" element={<Pages.Settings />} />
          <Route path="/headings" element={<Pages.Headings />} />
          <Route path="/social" element={<Social />} />
          <Route path="/users" element={<UserMocks />} />
          <Route path="/2FA" element={<DoubleAuthentication />} />
          <Route path="/Victory" element={<Victory />} />
          <Route path="/Defeat" element={<Defeat />} />
          {/* <Route path="/game" element={<Game/>} /> */}
          <Route path="*" element={<Pages.NotFound />} />
        </Routes>
      </>
    );
  }

  return (
    <UserContextProvider>
      <PopupContextProvider>
      <MessagesContextProvider>
        {/* <SocketContextComponent> */}
        <ThemeProvider theme={theme === "light" ? light : dark}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#e04f5f",
                colorSuccess: "#4bae4f",
              },
            }}
          >
            <GlobalStyle />
            <SearchPlayer />
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Testpage />} />
                <Route path="/*" element={<WithNavbar />} />
              </Routes>
            </Router>
          </ConfigProvider>
        </ThemeProvider>
        {/* </SocketContextComponent> */}
        </MessagesContextProvider>
      </PopupContextProvider>
    </UserContextProvider>
  );
}

export default App;
