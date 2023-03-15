import React, { useState } from "react";
import { BsFillCameraFill as Icon } from "react-icons/bs";
import * as S from "../EditAvatar.styles";
import { useUserInfos } from "contexts/User/userContent";
import { backend } from "lib/backend";
import Popup from "components/Popup/components/Popup/Popup";
import { Text } from "styles/font.styles";
import { PopupButton } from "styles/buttons.styles";

interface Props {
  page?: string;
  setLoadingTrue: () => void;
  setUploadedimg: () => void;
  setLoadingFalse: () => void;
  setUploadedimgFalse: () => void;
}

/* MAIN FUNCTION*/
export const SelectFile = (props: Props) => {
  /* Variables declarations */
  const [fileInputState] = useState("");
  const { image, setImage } = useUserInfos();
  const [error, setError] = useState(false);
  const { userName } = useUserInfos();

  function checkImageError(response: any, uploadedImage: string) {
    if (response.statusCode == "400") {
      setError(true);
      props.setUploadedimgFalse()
      return;
    }
    props.setUploadedimg();
    setImage({ image: uploadedImage });
  }

  
  /* Check file and upload file in database */
  async function uploadImageDataBase(uploadedImage: any) {
    if (props.page === "settings") {
      const response = await backend.patchUser(
        userName.userName,
        uploadedImage
      );
      checkImageError(response, uploadedImage.image);
    }
    if (props.page === "registration") {
      setImage(uploadedImage);
      props.setUploadedimg();
    }
    props.setLoadingFalse();
  }

  /* Transform file into a base64 string */
  const transformFiletoURL = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImageDataBase({ image: reader.result as string });
    };
  };

  /* Function to store the image */
  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    props.setLoadingTrue();
    props.setUploadedimgFalse();
    const file = e.target.files[0];
    transformFiletoURL(file);
  };

  const handlePopup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setError(!error);
  };

  /* BODY */
  return (
    <label htmlFor="file-input">
      {error && (
        <Popup
          title="Wrong file"
          subtitle="Please upload a png or a jpeg file"
          overlay={true}
        >
          <PopupButton
            onClick={handlePopup}
            border="1px solid #e5e7eb"
            className="Cancel"
          >
            <Text weight="500" fontSize="clamp(0.9rem, 1.5vw, 1.1rem)">
              I got it!
            </Text>
          </PopupButton>
        </Popup>
      )}
      <S.SelectFileIcon>
        <Icon />
      </S.SelectFileIcon>
      <input
        type="file"
        id="file-input"
        value={fileInputState}
        onChange={handleFileInputChange}
        accept="image/*"
        style={{ display: "none" }}
      />
    </label>
  );
};

export default SelectFile;
