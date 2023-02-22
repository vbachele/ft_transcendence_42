import { SelectFile } from "./components/SelectFile";
import Default from "assets/default-avatar.png";
import * as F from "styles/font.styles";
import * as S from "./EditAvatar.styles";
import { backend } from "lib/backend";
import { useEffect, useState } from "react";
import { IUser } from "types/models";

// async function getUserImage(id: string) {
//   const user = await backend.getOneUser("3");
//   return user.image;
// }

/* MAIN FUNCTION */
export const EditAvatar = () => {
  const [image, setImage] = useState("");

  return (
    <S.Container>
      <S.AvatarContainer>
        <S.Avatar src={Default} />
        <SelectFile />
      </S.AvatarContainer>
      <S.NameContainer>
        <F.Text weight="700">New adventurer</F.Text>
        <F.Subtitle>Ready for your mission?</F.Subtitle>
      </S.NameContainer>
    </S.Container>
  );
};

export default EditAvatar;
