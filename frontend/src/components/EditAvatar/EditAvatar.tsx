import { SelectFile } from "./components/SelectFile";
import Default from "assets/default-avatar.png";
import * as F from "styles/font.styles";
import * as S from "./EditAvatar.styles";
import { backend } from "lib/backend";
import { useEffect, useState } from "react";
import { IUser } from "types/models";
import { useUserInfos } from "contexts/User/userContent";

interface Props {
  page: string;
}

/* MAIN FUNCTION */
export const EditAvatar = (props: Props) => {
  const { userName, image, setImage, coalition } = useUserInfos();
  const [loading, setLoading] = useState(false);
  const [uploadApproved , setUploadApproved ] = useState(false);


  /* in first render add the default image */
  useEffect(() => {
    if (!image.image)
      setImage({
        image:
          "https://res.cloudinary.com/djdxw1y13/image/upload/v1676390380/Transcendence/default-avatar_hsktjo.png",
      });
  }, []);

  const setLoadingTrue = () => {
    setLoading(true);
  };

  const setLoadingFalse = () => {
    setLoading(false);
  };

  const setUploadedimg = () => {
    setUploadApproved(true);
  };

  const setUploadedimgFalse = () => {
    setUploadApproved(false);
  };


  return (
    <S.Container>
      <S.AvatarContainer>
        <S.Avatar src={image.image} />
        <SelectFile page={props.page} setLoadingTrue={setLoadingTrue} setUploadedimg={setUploadedimg} setLoadingFalse={setLoadingFalse} setUploadedimgFalse={setUploadedimgFalse} />
      </S.AvatarContainer>
      <S.NameContainer>
        <F.Text weight="700">
          {props.page === "registration" && "New adventurer"}
          {props.page === "settings" && userName.userName}
          {loading && <S.loadingimg src="https://cdn.discordapp.com/attachments/1067488107827576916/1082305985042984960/Dual_Ring-1s-200px_1.gif"></S.loadingimg>}
          {uploadApproved && <S.loadingimg src="https://cdn.discordapp.com/attachments/1067488107827576916/1082309957053071370/check-mark.png"></S.loadingimg>}
        </F.Text>
        <F.Subtitle>
          {props.page === "registration" && "Ready for your mission"}
          {props.page === "settings" && coalition.coalition}
        </F.Subtitle>
      </S.NameContainer>
    </S.Container>
  );
};
export default EditAvatar;
