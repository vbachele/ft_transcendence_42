import React, { useState } from "react";
import logo from "assets/logo-text.svg";
import * as S from "./Landingpage.style";
import { Link } from "react-router-dom";
import Popup from "components/Popup/PopupLogout";

const LandingPage = () => {
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
            <S.slogan id="version">Two sides one victory</S.slogan>
          </S.logo>
          <S.menus id="menus">
            <S.menuHighlight id="menu-highlight" />
            <S.link to="/registration">
              <S.italicHighlight className="italic highlight">
                JOIN THE BATTLE
              </S.italicHighlight>
            </S.link>
            {/* <S.link to="/spectate">
              <S.italic className="italic">SPECTATE</S.italic>
            </S.link> */}
            <S.link to="/settings">
              <S.normal className="normal">WATCH GAMES</S.normal>
            </S.link>
          </S.menus>
        </S.left>
      </S.main>
    </S.Container>
  );
};

export default LandingPage;
