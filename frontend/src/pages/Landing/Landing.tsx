import { Link } from "react-router-dom";
import * as UI from "styles/buttons.styles";
import * as F from "styles/font.styles";
import * as S from "./Landing.styles";
import { storeName } from "components/EditName/db_updatenickname";
import { ReactComponent as Versus } from "assets/versus.svg";

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
      </S.ButtonsContainer>
    </S.Container>
  );
};

export default Landing;
