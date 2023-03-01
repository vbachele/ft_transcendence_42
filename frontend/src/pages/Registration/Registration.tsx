import EditAvatar from "components/EditAvatar";
import EditName from "components/EditName";
import * as F from "styles/font.styles";
import * as S from "./Registration.styles";
import { useEffect } from "react";
import { backend } from "lib/backend";

async function getToken() {
  const params = new URLSearchParams(window.location.search);
  const code: string = params.get("code")!;
  let patch = {
    Oauth42: code,
  };
  const user42 = await backend.Oauth42(patch);
  console.log(user42);
}

const Registration = () => {
  useEffect(() => {
    getToken();
  }, []);
  return (
    <S.Container>
      <F.H2>Create Your Profile</F.H2>
      <S.Form>
        <EditAvatar />
        <EditName linkTo="/login" />
      </S.Form>
    </S.Container>
  );
};

export default Registration;
