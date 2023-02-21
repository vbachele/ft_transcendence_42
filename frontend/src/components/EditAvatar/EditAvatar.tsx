import { SelectFile } from "./components/SelectFile";
import Default from "assets/default-avatar.png";
import * as F from "styles/font.styles";
import * as S from "./EditAvatar.styles";
import { backend } from "lib/backend";
import { useEffect, useState } from "react";

async function getUserImage(id: string) {
  const user = await backend.getOneUser("6");
  return user.image;
}

async function getUser42login(id: string) {
  const user = await backend.getOneUser(id);
  // return user.user42Name;
  return user.name;
}

async function getUser42coalition(id: string) {
  const user = await backend.getOneUser(id);
  return user.coalition;
}

export function EditAvatar() {
  const [image, setImage] = useState("");
  const [coalition, setCoalition] = useState("");
  const [user42Login, setUser42Login] = useState("");

  useEffect(() => {
    getUserImage("3").then((image) => setImage(image));
    getUser42login("3").then((login) => setCoalition(login));
    getUser42coalition("3").then((coalition) => setUser42Login(coalition));
    // remplacer ici par le useContext
  }, []);
  return (
    <S.Container>
      <S.AvatarContainer>
        <S.Avatar src={image} />
        <SelectFile />
      </S.AvatarContainer>
      <S.NameContainer>
        <F.Text weight="700">{user42Login}</F.Text>
        <F.Subtitle>{coalition}</F.Subtitle>
      </S.NameContainer>
    </S.Container>
  );
}

export default EditAvatar;
