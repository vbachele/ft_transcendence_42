import Popup from "components/popup/PopupLogout";


const AuthenticationPopup = () => {
  return (
    <>
      <Popup
        click={true}
        title="Enable 2FA"
        stringPrimaryButton="Enable"
        cancelString="cancel"
        linkTo="/login"
        subtitle="Scan the QRCode to enable 2FA"
        form={true}
      />
    </>
  );
};

export default AuthenticationPopup;
