import { SelectFile } from "./components/SelectFile";
import Default from "assets/default-avatar.png";
import * as F from "styles/font.styles";
import * as S from "./EditAvatar.styles";
import { backend } from "lib/backend";
import { useEffect, useState } from "react";

async function getUserImage() {
  const user = await backend.getOneUser("44");
  return user.image;
}

export function EditAvatar() {
  const [image, setImage] = useState("");

  useEffect(() => {
    // remplacer ici par le useContext
    getUserImage().then((image) => {
      setImage(image);
    });
  }, []);
  return (
    <S.Container>
      <S.AvatarContainer>
        <S.Avatar src={image} />
        <SelectFile />
      </S.AvatarContainer>
      <S.NameContainer>
        <F.Text weight="700">username</F.Text>
        <F.Subtitle>Coalition</F.Subtitle>
      </S.NameContainer>
    </S.Container>
  );
}

export default EditAvatar;
