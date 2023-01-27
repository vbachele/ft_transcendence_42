import React, { ChangeEventHandler, useContext, useState } from "react";
import * as S from "./EditName.styles";
import * as F from "styles/font.styles";
import * as UI from "styles/buttons.styles";
import { useNavigate } from "react-router-dom";

interface Props {
  visible?: boolean;
  linkTo: string;
}

const EditName: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  // const userContext = useContext(UserContext);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // userContext.setUser({nickname: e.target.value});
    setValue(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    // backend.updateUser({name: userContext?.user?.nickname});
    e.preventDefault();
    navigate(props.linkTo); // put a condition here if the user is 2FA enabled or not
  };

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
