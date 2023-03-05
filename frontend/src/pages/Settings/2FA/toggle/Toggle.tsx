import React, { useEffect, useState } from "react";
import * as F from "styles/font.styles";
import useToggle from "./useToggle";
import * as S from "./Toggle.styles";
import DoubleAutentication from "./2FA/doubleAutentication";
import { backend } from "lib/backend";
import { useUserInfos } from "contexts/User/userContent";
import QRCode from "qrcode";
import Disable2FA from "./2FA/Disable2FA";

interface Props {
  name?: string;
  component?: React.FC;
}


/* Main function */

const Toggle: React.FC<Props> = (props) => {

  //initializer
  const { value, toggleValue } = useToggle(false); // I call the Customized hook
  const [enabled, setEnabled] = useState(false); // to modify by the backend
  const [qrcodeUrl, setqrCodeUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const {userName, setDoubleAuth, doubleAuth} = useUserInfos();


  const handleToggle = async () => {
    if (value === false)
    {
      const generate = await backend.generate2FA(userName);
      QRCode.toDataURL(generate.otpauth_url).then(setqrCodeUrl);
      setSecretKey(generate.base32);
    }
    toggleValue()
    setEnabled(!enabled);

  };
  
  useEffect(() => { 
    setEnabled(true);
  },[])

  //return part
  return (
    <>
      <S.Toggle className="toggle">
        <S.ToggleCheckbox
          type="checkbox"
          id="toggle"
          onClick={handleToggle}
        />
        <S.ToggleSwitch>
          {!doubleAuth.doubleAuth && value && (
            <DoubleAutentication
              click={enabled}
              onClose={() => setEnabled(false)}
              QRcode={qrcodeUrl}
              secretKey={secretKey}
            />
          )}
            {doubleAuth.doubleAuth && !value && (
            <Disable2FA
              click={enabled}
              onClose={() => setEnabled(false)}
            />
          )}
        </S.ToggleSwitch>
        {!doubleAuth.doubleAuth && <F.Text>Enable 2FA </F.Text>}
        {doubleAuth.doubleAuth && <F.Text>Disable 2FA </F.Text>}
      </S.Toggle>
    </>
  );
};

export default Toggle;
