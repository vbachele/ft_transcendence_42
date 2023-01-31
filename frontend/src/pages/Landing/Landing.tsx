import { Link } from "react-router-dom";
import * as UI from "styles/buttons.styles";
import * as F from "styles/font.styles";
import * as S from "./Landing.styles";
import { storeName } from "components/EditName/db_updatenickname";
import { ReactComponent as Versus } from "assets/versus.svg";
import PopupContext, { usePopup } from "contexts/Popup/popup";
import { useContext } from "react";
import SearchPlayer from "components/Popup/SearchPlayer/SearchPlayer";

const Landing = () => {
  const handleChange = () => {
    storeName();
  };

  return (
    <S.Container>
      <Versus className="logo" />
      <F.H2>Two sides, one victory</F.H2>
      <S.ButtonsContainer>
        <Link to="/login">
          <UI.PrimaryButton onClick={handleChange}>
            Join the battle
          </UI.PrimaryButton>
        </Link>
        <Link to="/spectate">
          <UI.SecondaryButtonSmall>Watch games</UI.SecondaryButtonSmall>
        </Link>
      </S.ButtonsContainer>
    </S.Container>
  );
};

export default Landing;
