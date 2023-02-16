import React, { useState } from "react";
import logo from "assets/logo-text.svg";
import * as S from "./Landingpage.styles";
import { Link } from "react-router-dom";

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
            <S.link href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8be13340a116eca57b9ba0f248f05297e6b9563bd01c6ec7ccd5a85341b9b499&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fregistration&response_type=code">
              <S.italicHighlight className="italic highlight">
                JOIN THE BATTLE
              </S.italicHighlight>
            </S.link>
          </S.menus>
        </S.left>
      </S.main>
    </S.Container>
  );
};

export default LandingPage;
