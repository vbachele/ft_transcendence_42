import React, { useEffect, useState } from "react";
import * as F from "styles/font.styles";
import useToggle from "./useToggle";
import * as S from "./Toggle.styles";
import DoubleAutentication from "./2FA/doubleAutentication";
import { backend } from "lib/backend";
import { useUserInfos } from "contexts/User/userContent";
import QRCode from "qrcode";

interface Props {
  name?: string;
  component?: React.FC;
}

// BACKEND 2FAEnable: boolean
// BACKEND: on met a jour la page pour updater le user sur le 2FA par default c'est false

const Toggle: React.FC<Props> = (props) => {
  const { value, toggleValue } = useToggle(false); // I call the Customized hook
  const [enabled, setEnabled] = useState(false); // to modify by the backend
  const [qrcodeUrl, setqrCodeUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const {userName} = useUserInfos();


  const handleToggle = async () => {
    setEnabled(!enabled);
    toggleValue();
    if (value === false)
    {
      const generate = await backend.generate2FA(userName);
      QRCode.toDataURL(generate.otpauth_url).then(setqrCodeUrl);
      setSecretKey(generate.base32);
      console.log (generate)
    }
  };

  return (
    <>
      <S.Toggle className="toggle">
        <S.ToggleCheckbox
          type="checkbox"
          id="toggle"
          // checked={value}
          onClick={handleToggle}
        />
        <S.ToggleSwitch>
          {value && (
            <DoubleAutentication
              click={enabled}
              onClose={() => setEnabled(false)}
              QRcode={qrcodeUrl}
              secretKey={secretKey}
            />
          )}
          {/* {!value && (
            <DoubleAutentication
              click={enabled}
              onClose={() => setEnabled(false)}
            ></DoubleAutentication>
          )} */}
        </S.ToggleSwitch>
        <F.Text>{props.name}</F.Text>
      </S.Toggle>
    </>
  );
};

export default Toggle;
