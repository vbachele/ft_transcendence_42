import React, { useState } from "react";
import * as F from "styles/font.styles";
import useToggle from "./useToggle";
import * as S from "./Toggle.styles";
import Popup from "components/Popup/PopupLogout";
import DoubleAutentication from "./2FA/doubleAutentication";

interface Props {
  name?: string;
  component?: React.FC;
}

// BACKEND 2FAEnable: boolean
// BACKEND: on met a jour la page pour updater le user sur le 2FA par default c'est false

const Toggle: React.FC<Props> = (props) => {
  const { value, toggleValue } = useToggle(true); // I call the Customized hook
  const [enabled, setEnabled] = useState(false); // to modify

  const handleToggle = () => {
    setEnabled(!enabled);
    toggleValue();
  };

  return (
    <>
      <S.Toggle className="toggle">
        <S.ToggleCheckbox
          type="checkbox"
          id="toggle"
          checked={value}
          onClick={handleToggle}
        />
        <S.ToggleSwitch>
          {value && <DoubleAutentication click={false} onClose={() => false} />}
          {!value && (
            <DoubleAutentication
              click={true}
              onClose={() => setEnabled(false)}
            ></DoubleAutentication>
          )}
        </S.ToggleSwitch>
        <F.Text>{props.name}</F.Text>
      </S.Toggle>
    </>
  );
};

export default Toggle;
