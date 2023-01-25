import React, { Component, useState } from "react";
import { Button, Input, Modal } from "antd";
import { PrimaryButton } from "styles/buttons.styles";
import { H1, Text, Subtitle } from "styles/font.styles";
import { Link } from "react-router-dom";
import "./styles.css";
import ByeLogout from "assets/homer.gif";
import { Form } from "antd";

interface Props {
  click: boolean;
  title: string;
  linkTo: string;
  subtitle: string;
  srcImage?: string;
  sizeTitle?: string;
  cancelString: string;
  stringPrimaryButton: string;
  form?: boolean;
}

const Popup: React.FC<Props> = (props) => {
  const [modal2Open, setModal2Open] = useState(props.click);

  return (
    <>
      <Modal
        className="modale-container"
        width={"393px"}
        title={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <H1 color={"black"}>{props.title}</H1>
          </div>
        }
        centered
        open={modal2Open}
        footer={[
          <div className="popup__logout_button">
            <Button
              className="no-style-button"
              key="cancel"
              color={"black"}
              onClick={() => setModal2Open(false)}
            >
              {
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Text color={"black"}> {"cancel"}</Text>
                </div>
              }
            </Button>
            <Link to={props.linkTo}>
              <PrimaryButton>{props.stringPrimaryButton}</PrimaryButton>
            </Link>
          </div>,
        ]}
        onCancel={() => setModal2Open(false)}
      >
        {props.form === true && (
          <div className="InputNumber" style={{ marginTop: "30px" }}>
            <Input
              placeholder="Enter your phone number"
              style={{ height: "40px", width: "80%", alignItems: "center" }}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

Popup.defaultProps = {
  form: false,
  linkTo: "/settings",
};

export default Popup;
