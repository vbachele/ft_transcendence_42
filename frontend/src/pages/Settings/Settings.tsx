import EditAvatar from "components/EditAvatar";
import EditName from "components/EditName";
import * as F from "styles/font.styles";
import * as S from "./Settings.styles";
import Toggle from "./2FA/toggle/Toggle";

const Settings = () => {
  return (
    <>
      <S.Container>
        <S.Container__Text>
          <F.H2>Settings</F.H2>
          <F.Subtitle>Manage your information and security</F.Subtitle>
        </S.Container__Text>
        <S.Container__Infos>
          <EditAvatar />
          <Toggle name="Enable 2FA" />
          <EditName linkTo={""} visible={false} />
        </S.Container__Infos>
      </S.Container>
    </>
  );
};

export default Settings;
