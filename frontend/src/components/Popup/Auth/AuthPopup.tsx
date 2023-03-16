import React from 'react'
import Popup from "../components/Popup/Popup";
import { PopupButton } from "styles/buttons.styles";
import { Text } from "styles/font.styles";
import { Link } from "react-router-dom";
import { backend } from 'lib/backend';
import FireGif from '../components/FireGif/FireGif';


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
        className="Sign up with 42"
      >
        <Text weight="500" fontSize="clamp(0.9rem, 1.5vw, 1.1rem)">
			42
        </Text>
      </PopupButton>
      <PopupButton className="Sign up with google" backgroundColor={"#DC4F19"}  onClick={OauthGoogle}>
          <Text weight="500" fontSize="clamp(0.9rem, 1.5vw, 1.1rem)">
		  	GOOGLE
          </Text>
      </PopupButton>
    </Popup>
  )
}

export default AuthPopup