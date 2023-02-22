import React, { useState } from "react";
import { BsFillCameraFill as Icon } from "react-icons/bs";
import * as S from "../EditAvatar.styles";
import { backend } from "lib/backend";
import { IUser } from "types/models";
import { useUserInfos } from "contexts/User/userContent";

/* MAIN FUNCTION*/
export const SelectFile = () => {
  /* Variables declarations */
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState<any>();
  const { image, setImage } = useUserInfos();

  function storeImageUserContext() {
    setImage({ image: previewSource });
    const timer = setTimeout(() => {
      console.log(" AU MOMENT OU JE LA STOCK ", image);
    }, 2000);
  }

  const transformFiletoURL = (file: File) => {
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result as string);
      // setPreviewSource(reader.result as string);
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
    // storeImageUserContext();
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
