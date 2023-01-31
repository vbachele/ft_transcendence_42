import React, { useContext, useState } from "react";
import logo from "assets/logo-text.svg";
import * as S from "./Testpage.style";
import { Link } from "react-router-dom";
import Popup from "components/Popup/PopupLogout";
import LogoutPopup from "components/Popup/Logout/LogoutPopup";
import SearchPlayer from "components/Popup/SearchPlayer";
import PopupContext, { usePopup } from "contexts/Popup/popup";

const Testpage = () => {
  const [logout, setLogout] = useState(false);
  const { popup, setPopup } = usePopup();

  const handlePlay = () => {
    setPopup({ toggle: !popup.toggle });
  };

  const toggleLogout = () => {
    setLogout(!logout);
  };

  return (
    <S.Container>
      <S.bgvid id="bgvid" autoPlay loop muted playsInline>
        <source
          src="https://cdn.discordapp.com/attachments/1067488107827576916/1067743308367020092/background.mp4"
          type="video/mp4"
        />
      </S.bgvid>
      <S.main id="main">
        <S.left id="left">
          <S.logo id="logo">
            <S.img src={logo} alt="" />
          </S.logo>
          <S.menus id="menus">
            <S.menuHighlight id="menu-highlight" />
            <S.logoutButton
              // className="navbar__subMenu-linkButton"
              onClick={handlePlay}
            >
              <S.italicHighlight className="italic highlight">
                PLAY
              </S.italicHighlight>
            </S.logoutButton>
            <S.link to="/spectate">
              <S.italic className="italic">SPECTATE</S.italic>
            </S.link>
            <S.link to="/leaderboard">
              <S.italic className="italic">LEADERBOARD</S.italic>
            </S.link>
            <S.link to="/career">
              <S.italic className="italic">CAREER</S.italic>
            </S.link>
            <S.link to="/chat">
              <S.italic className="italic">CHAT</S.italic>
            </S.link>
            {/* TO REMOVE AFTER TEST */}
            <S.link to="/oldlanding">
              <S.italic className="italic">TEST</S.italic>
            </S.link>
            <S.link to="/social">
              <S.normal className="normal">SOCIAL</S.normal>
            </S.link>
            <S.link to="/settings">
              <S.normal className="normal">SETTINGS</S.normal>
            </S.link>
            <S.logoutButton
              className="navbar__subMenu-linkButton"
              onClick={toggleLogout}
            >
              {logout && (
                <LogoutPopup
                  click={logout}
                  onClose={() => setLogout(false)}
                ></LogoutPopup>
              )}
              <S.normal className="normal">LOGOUT</S.normal>
            </S.logoutButton>
          </S.menus>
        </S.left>
        <S.hero id="hero">
          <S.heroName id="hero-name">VBACHELE</S.heroName>
          <S.heroUnlocks id="hero-unlocks">
            <span>1</span>/26 ACHIEVEMENTS
          </S.heroUnlocks>
        </S.hero>
      </S.main>
    </S.Container>
  );
};

export default Testpage;
