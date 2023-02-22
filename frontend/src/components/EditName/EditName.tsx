import React, { ChangeEventHandler, useContext, useState } from "react";
import * as S from "./EditName.styles";
import * as F from "styles/font.styles";
import * as UI from "styles/buttons.styles";
import { useNavigate } from "react-router-dom";
import { backend } from "lib/backend";
import { useUserInfos } from "contexts/User/userContent";

interface Props {
  visible?: boolean;
  linkTo: string;
}

/* Function to create the user in the database */
async function createUser(value: string) {
  let UserCreation = {
    name: value,
    isRegistered: true,
  };
  backend.createUser(UserCreation);
}

/* MAIN FUNCTION */
const EditName = (props: Props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { setUserName } = useUserInfos();
  const { image } = useUserInfos();

  /* On click functions */
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createUser(value);
    setUserName({ userName: value });
    backend.patchUser(value, image);
    backend.getUserByName(value);
    navigate(props.linkTo); // put a condition here if the user is 2FA enabled or not
  };

  /* RETURN BODY */
  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.InputContainer>
        <F.Text weight="600">Choose a nickname*</F.Text>
        <S.Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter your nickname"
          maxLength={8}
          minLength={2}
          required
        />
      </S.InputContainer>
      {props.visible === true && (
        <UI.SecondaryButton type="submit">Continue</UI.SecondaryButton>
      )}
    </S.FormContainer>
  );
};

EditName.defaultProps = {
  visible: true,
};
export default EditName;
