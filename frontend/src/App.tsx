import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import { useState } from "react";

import Pages from "pages";

import { UserContextProvider } from "contexts/User/userContent";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "styles/global";
import { dark, light } from "styles/theme";
import "./App.css";
import SocketContextComponent from "contexts/Socket/Component";
import { UserMocks } from "./mocks/Users/UserMocks";
import DoubleAuthentication from "pages/2FA";
import Victory from "components/Victory";
import Defeat from "components/EditName/Defeat";
import LandingPage from "pages/Landing/Landingpage";
import Social from "pages/Social";
import { ConfigProvider } from "antd";
import { PopupContextProvider } from "contexts/Popup/Popup";
import Homepage from "pages/Home";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import LobbyContextComponent from "contexts/Lobby/Lobby";
import { MessagesContextProvider } from "contexts/Chat/MessagesContext";
import Game from "pages/Game/Game";
import SearchPlayer from "components/Popup/SearchPlayer/SearchPlayer";
import Registration from "pages/Registration/Registration";

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
          <Route path="/chat" element={<Pages.Chat />} />
          <Route path="/leaderboard" element={<Pages.Leaderboard />} />
          <Route path="/dashboard/:name" element={<Pages.Dashboard />} />
          <Route path="/settings" element={<Pages.Settings />} />
          <Route path="/headings" element={<Pages.Headings />} />
          <Route path="/social" element={<Social />} />
          <Route path="/users" element={<UserMocks />} />
          {/* <Route path="/game" element={<Game/>} /> */}
          <Route path="*" element={<Pages.NotFound />} />
        </Routes>
      </>
    );
  }

  const routes = useRoutes([
    {
      path: "/login",
      element: <LandingPage />,
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Homepage />
        </PrivateRoute>
      ),
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/2FA",
      element: (
        <PrivateRoute>
          <DoubleAuthentication />
        </PrivateRoute>
      ),
    },
    {
      path: "/Victory",
      element: (
        <PrivateRoute>
          <Victory />
        </PrivateRoute>
      ),
    },
    {
      path: "/Defeat",
      element: (
        <PrivateRoute>
          <Defeat />
        </PrivateRoute>
      ),
    },
    {
      path: "/*",
      element: (
        <PrivateRoute>
          <WithNavbar />
        </PrivateRoute>
      ),
    },
  ]);

  return (
    <UserContextProvider>
      <PopupContextProvider>
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
            {routes}
          </ConfigProvider>
        </ThemeProvider>
        {/* </SocketContextComponent> */}
      </PopupContextProvider>
    </UserContextProvider>
  );
}

export default App;
