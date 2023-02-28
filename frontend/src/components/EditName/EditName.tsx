import React, { ChangeEventHandler, useContext, useState } from "react";
import * as S from "./EditName.styles";
import * as F from "styles/font.styles";
import * as UI from "styles/buttons.styles";
import { useNavigate } from "react-router-dom";
import { backend } from "lib/backend";
import { useUserInfos } from "contexts/User/userContent";
import getInfosFromDB from "contexts/User/GetuserFromDB";

interface Props {
  visible?: boolean;
  linkTo: string;
  page: string;
}

/* Function to create the user in the database */
async function createUser(value: string) {
  // Here n'aller dans la condition seulement si le user n'est pas deja registered" sinon just PATCH LE NOM
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
  const { userName, setUserName, setCoalition, setAchievements, setImage } =
    useUserInfos();
  const { image } = useUserInfos();

  function setUserInfosContext() {
    const userInfos = getInfosFromDB();
    userInfos.then((res) => {
      setUserName({ userName: value });
      setImage({ image: res.image });
      setAchievements({ achievements: res.achievements });
      setCoalition({ coalition: res.coalition });
      navigate(props.linkTo); // put a condition here if the user is 2FA enabled or not
    });
  }
  /* Registration of the user in database in the page /registration*/
  function userRegistrationPage() {
    if (props.page === "registration") {
      createUser(value);
      backend.patchUser(value, image);
      setUserInfosContext();
    }
  }

  /* Change settings of the user in the page /settings */
  async function userSettingsPage() {
    if (props.page === "settings") {
      let newuserName = {
        name: value,
      };
      backend.patchUser(userName.userName, newuserName);
      setUserName({ userName: value });
    }
  }

  /* On click functions */
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    userRegistrationPage(); // if in registrationPage
    userSettingsPage(); // if in settingsPage
  };

  /* RETURN BODY */
  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.InputContainer>
        <F.Text weight="600">
          {props.page === "settings" && "Change your nickname"}
          {props.page === "registration" && "Choose a nickname*"}
        </F.Text>
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
      <UI.SecondaryButton type="submit">
        {props.page === "settings" && "Confirm"}
        {props.page === "registration" && "Continue"}
      </UI.SecondaryButton>
    </S.FormContainer>
  );
};
export default EditName;
