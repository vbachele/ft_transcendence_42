import React, { ChangeEventHandler, Component, useState } from "react";
import { PopupButton } from "styles/buttons.styles";
import { Text, H2, Subtitle } from "styles/font.styles";
import * as S from "./doubleAutentication.styles";
import { backend } from "lib/backend";
import { useUserInfos } from "contexts/User/userContent";

interface Props {
  click: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  QRcode: string;
  secretKey: string;
}

function stopPropagation(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.stopPropagation();
}

// BACKEND retrieve information from the backend
const DoubleAutentication: React.FC<Props> = (props) => {
  const {userName} = useUserInfos();
  const [errorCode, setErrorCode]= useState(false)
  const [doubleAuthEnabled, setDoubleAuthEnabled]= useState(false);


  // set up variables
  if (!props.click) return null;

  // 2FA DISABLED - USER ENTERS HIS NUMBER
  function AddPhoneNumber() {
    const [verifyCode, setVerifyCode] = useState("");
    const handleFormPhone: ChangeEventHandler<HTMLInputElement> = (e) => {
      setVerifyCode(e.target.value);
    };

    async function handleSubmitCode(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const userForm = {
        userName,
        token : verifyCode
      }
      const response = await backend.verify2FA(userForm);
      if (response.status === "fail"){
        console.error(response.message);
        setErrorCode(true);
        return;
      }
      setDoubleAuthEnabled(true);
        
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.currentTarget.value.length === 10) {
        event.preventDefault();
      }
    }
    return (
      <S.Overlay__Container onClick={(e) => stopPropagation(e)}>
        <S.Text>
          <S.TitleGif>
            <S.GiFFire src="https://cdn.discordapp.com/attachments/1067488107827576916/1069217769515651132/Rectangle.gif" />
            <H2>Enable 2FA</H2>
          </S.TitleGif>
          <Text style={{ textAlign: "center" }} weight={"350"} fontSize="1rem">
            Scan this QRcode
            or enter you secret key : {props.secretKey}
          </Text>
          <S.Qrcode src={props.QRcode}/>
          <Text style={{ textAlign: "center" }} weight={"350"} fontSize="1rem">
           verify the code
          </Text>
        </S.Text>
        <S.FormNumber key="phone" onSubmit={handleSubmitCode}>
          <S.Input
            key="phone"
            type="text"
            value={verifyCode}
            onChange={handleFormPhone}
            onKeyPress={handleKeyPress}
            placeholder="Ex: 066578"
            required
          />
          {errorCode && <Subtitle style={{ textAlign: "center" }} weight={"350"} fontSize="1rem">Your code is wrong</Subtitle>}
          <Buttons />
        </S.FormNumber>
      </S.Overlay__Container>
    );
  }

  // 2FA DISABLE - ASKING USER IF HE WANTS TO ENABLE IT
  function Disable2FA() {
    return (
      <S.Overlay__Container onClick={(e) => stopPropagation(e)}>
        <S.Text>
          <H2 style={{ textAlign: "center" }}>Disable 2FA</H2>
          <Text style={{ textAlign: "center" }} weight={"350"} fontSize="1rem">
            Are you sure ?
          </Text>
        </S.Text>
        <Buttons />
      </S.Overlay__Container>
    );
  }

  // BUTTONS OF THE POPUP
  function Buttons() {
    return (
      <S.Button>
        <PopupButton
          className="logout"
          backgroundColor={"#DC4F19"}
          // onClick={() => handleClick()}
        >
          {doubleAuthEnabled && <Text weight="500"> Disable </Text>}
          {!doubleAuthEnabled && <Text weight="500"> Confirm </Text>}
        </PopupButton>
      </S.Button>
    );
  }

  // MAIN FUNCTION
  return (
    <S.Overlay>
      {!doubleAuthEnabled && <AddPhoneNumber />}
      {doubleAuthEnabled && <Disable2FA />}
    </S.Overlay>
  );
};

export default DoubleAutentication;
