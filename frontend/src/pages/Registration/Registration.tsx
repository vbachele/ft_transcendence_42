import EditAvatar from "components/EditAvatar";
import EditName from "components/EditName";
import * as F from "styles/font.styles";
import * as S from "./Registration.styles";

const Registration = () => {
  return (
    <S.Container>
      <F.H2>Create Your Profile</F.H2>
      <S.Form>
        <EditAvatar />
        <EditName linkTo="/2FA" />
      </S.Form>
    </S.Container>
  );
};

export default Registration;
