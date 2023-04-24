import React from 'react'
import Popup from "../components/Popup/Popup";
import { PopupButton } from "styles/buttons.styles";
import { Text } from "styles/font.styles";
import { Link } from "react-router-dom";
import { backend } from 'lib/backend';
import FireGif from '../components/FireGif/FireGif';
import GoogleLogo from 'assets/GoogleLogo.svg.png'
import Logo42 from 'assets/42_Logo.svg'


interface IProps {
	click: boolean;
	onClose: React.MouseEventHandler<HTMLButtonElement>;
  }

  const Oauth42 = () => {
    let url = `${import.meta.env.VITE_AUTH42_URL}`;
    window.open(url, "_self");
  };

  const OauthGoogle = async () => {
    let url = `${import.meta.env.VITE_GOOGLE_URL}`;
    window.open(url, "_self")
  };

function AuthPopup(props: IProps) {
	if (!props.click) return null;
  return (
	<Popup title="VERSUS" subtitle="Choose how to connect" overlay={true} headerImage={<FireGif />}>

	  <PopupButton
        onClick={Oauth42}
        border="1px solid #e5e7eb"
        className="42"
      >
        <Text weight="500" fontSize="clamp(0.9rem, 1.5vw, 1.1rem)" style={{ marginRight: "8px" }}>
			With
        </Text>
		<img src={Logo42} width={"20px"} height={"20px"} style={{ filter: "invert(100%)" }} />
      </PopupButton>
      <PopupButton className="Google" border="1px solid #e5e7eb"  onClick={OauthGoogle}>
        	<Text weight="500" fontSize="clamp(0.9rem, 1.5vw, 1.1rem)" style={{ marginRight: "8px" }}>
			With
          </Text>
		  <img src={GoogleLogo} width={"20px"} height={"20px"}/>
      </PopupButton> 
    </Popup>
  )
}

export default AuthPopup
