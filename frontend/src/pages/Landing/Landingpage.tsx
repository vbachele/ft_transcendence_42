import { useState } from "react";
import logo from "assets/logo-text.svg";
import * as S from "./Landingpage.styles";
import { Subtitle } from "styles/font.styles";
import { backend } from "lib/backend";

const LandingPage = () => {
  const [click, setClick] = useState(false);
  const Oauth42 = () => {
    setClick(!click);
    let url = `${import.meta.env.VITE_AUTH42_URL}`;
    window.open(url, "_self");
  };
  const OauthGoogle = async () => {
    setClick(!click);
    let url = `${import.meta.env.VITE_GOOGLE_URL}`;
    window.open(url, "_self")
    const response = await backend.AuthWithGoogle();
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
            <S.slogan id="version">Two sides one victory</S.slogan>
          </S.logo>
          <S.menus id="menus">
            <S.menuHighlight id="menu-highlight" />
            <S.link onClick={Oauth42}>
              <S.italicHighlight className="italic highlight">
                JOIN THE BATTLE
              </S.italicHighlight>
            </S.link>
              <br/>
              <br/>
              <S.menuHighlight id="menu-highlight" />
            <S.link onClick={OauthGoogle}>
              <S.italicHighlight className="italic highlight">
                JOIN THE BATTLE (with google)
              </S.italicHighlight>
            </S.link>
          </S.menus>
        </S.left>
      </S.main>
    </S.Container>
  );
};

export default LandingPage;
