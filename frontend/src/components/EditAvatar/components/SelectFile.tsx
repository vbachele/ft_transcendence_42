import React, { useState } from "react";
import { BsFillCameraFill as Icon } from "react-icons/bs";
import * as S from "../EditAvatar.styles";
import { backend } from "lib/backend";

export const SelectFile = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState<any>();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    previewFile(file);
    uploadImage(previewSource);
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  const uploadImage = (base64EncodedImage: string) => {
    let upload = {
      image: base64EncodedImage,
    };
    backend.patchUser("40", upload);
    const user = backend.getOneUser("40");
  };

  return (
    <form encType="multipart/form-data">
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
    </form>
  );
};

export default SelectFile;
