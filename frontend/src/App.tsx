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

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  return (
    <UserContextProvider>
      <PictureContextProvider>
        <SocketContextComponent>
          <ThemeProvider theme={theme === "light" ? light : dark}>
            {/* <GlobalStyle /> */}
            <Router>
              <Navbar setTheme={setTheme} />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/dashboard/:id" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/headings" element={<Headings />} />
                <Route path="/game" element={<Game />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </SocketContextComponent>
      </PictureContextProvider>
    </UserContextProvider>
  );
}

export default App;
