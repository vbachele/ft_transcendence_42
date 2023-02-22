import EditAvatar from "components/EditAvatar";
import EditName from "components/EditName";
import * as F from "styles/font.styles";
import * as S from "./Registration.styles";
import { useEffect } from "react";
import { backend } from "lib/backend";

// function checkIfAlreadyRegistered(code: string) {
//   const response = backend.checkIfUserExists(code);
// }

const Registration = () => {
  return (
    <S.Container>
      <F.H2>Create Your Profile</F.H2>
      <S.Form>
        <EditAvatar />
        <EditName linkTo="/" />
      </S.Form>
    </S.Container>
  );
};

export default Registration;
