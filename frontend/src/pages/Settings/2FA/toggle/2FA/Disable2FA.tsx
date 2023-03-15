import { useUserInfos } from 'contexts/User/userContent';
import { backend } from 'lib/backend';
import React, { ChangeEventHandler, Component, useState } from "react";
import * as S from "./doubleAutentication.styles";
import { PopupButton } from 'styles/buttons.styles';
import { H2, Text } from 'styles/font.styles';

interface Props {
	click?: boolean;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
  }

const Disable2FA: React.FC<Props> = (props) =>{
const {userName, setDoubleAuth, doubleAuth} = useUserInfos();

    async function handleClick(){
		props.onClose;
		const response = await backend.disable2FA(userName);
		if (response.status === "fail" || response.status === "error"){
		  console.error(response.message);
		  return;
		}
		setDoubleAuth({doubleAuth : false});
		props.onClose;
	  }
  
	  return (
		<S.Overlay>
		<S.Overlay__Container >
		  <S.Text>
			<H2 style={{ textAlign: "center" }}>Disable 2FA</H2>
			<Text style={{ textAlign: "center" }} weight={"350"} fontSize="1rem">
			  Are you sure ?
			</Text>
		  </S.Text>
		  <S.Button>
			<PopupButton
			  className="logout"
			  backgroundColor={"#DC4F19"}
			  // onClick={() => handleClick()}
			  onClick={handleClick}
			>
			  {doubleAuth.doubleAuth && <Text weight="500"> Disable </Text>}            
			</PopupButton>
		</S.Button>
		</S.Overlay__Container>
		</S.Overlay>
	  );
}

// onClick={(e) => stopPropagation(e)}

export default Disable2FA