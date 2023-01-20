import React, { Dispatch, SetStateAction, useState } from "react";
import * as F from "styles/font.styles";
import "./styles.css";
import useToggle from "./useToggle";
import Popup from "components/popup/popupLogout";
import Modal from "antd/es/modal";
import AuthenticationPopup from "../2FAPopup";

interface Props {
  name?: string;
}

const Toggle: React.FC<Props> = (props) => {
  const { value, toggleValue } = useToggle(false); // I call the Customized hook
  return (
    <>
      <label className="toggle">
        <input
          id="toggle"
          className="toggle-checkbox"
          type="checkbox"
          checked={value}
          onClick={toggleValue}
        />
        <div className="toggle-switch">
          {value && <AuthenticationPopup></AuthenticationPopup>}
        </div>
        <F.Text>{props.name}</F.Text>
      </label>
    </>
  );
};

export default Toggle;
