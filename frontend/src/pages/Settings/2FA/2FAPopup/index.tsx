import { Button, Modal } from "antd";
import Popup from "components/popup/popupLogout";
import React from "react";
import Qrcode from "assets/qrcode.png";

const AuthenticationPopup = () => {
  return (
    <>
      <Popup
        click={true}
        title="Enable 2FA"
        stringPrimaryButton="Enable"
        cancelString="cancel"
        linkTo="/login-page"
        subtitle="Scan the QRCode to enable 2FA"
      />
    </>
  );
};

export default AuthenticationPopup;
