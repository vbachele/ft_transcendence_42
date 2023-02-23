import React, { useState } from "react";
import { BsFillCameraFill as Icon } from "react-icons/bs";
import * as S from "../EditAvatar.styles";
import { useUserInfos } from "contexts/User/userContent";

/* MAIN FUNCTION*/
export const SelectFile = () => {
  /* Variables declarations */
  const [fileInputState] = useState("");
  const { image, setImage } = useUserInfos();

  const transformFiletoURL = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage({ image: reader.result as string });
      console.log(image);
    };
  };

  /* Function to store the image */
  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const image1 = transformFiletoURL(file);
  };

  /* BODY */
  return (
    <label htmlFor="file-input">
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
