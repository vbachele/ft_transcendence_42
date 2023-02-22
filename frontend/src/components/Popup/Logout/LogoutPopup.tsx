import React, { Component, useState } from "react";
import { Button, Input, Modal } from "antd";
import { PopupButton } from "styles/buttons.styles";
import { H1, Text, Subtitle, H2, H6 } from "styles/font.styles";
import { Link } from "react-router-dom";
import * as S from "./LogoutPopup.styles";
import { backend } from "lib/backend";

interface Props {
  click: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const LogoutPopup: React.FC<Props> = (props) => {
  if (!props.click) return null;

  function stopPropagation(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.stopPropagation();
  }

  function allowPropagation(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    props.onClose(
      event as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>
    );
    // Do nothing, allowing event to propagate
  }

  function deleteCookies() {
    backend.deleteTokenCookie();
  }

  return (
    <S.Overlay onClick={(e) => allowPropagation(e)}>
      <S.Overlay__Container onClick={(e) => stopPropagation(e)}>
        <S.Text>
          <H2>Log out</H2>
          <Text weight={"400"}> Already leaving paradise? </Text>
        </S.Text>
        <S.Button>
          <PopupButton
            onClick={props.onClose}
            border="1px solid #e5e7eb"
            className="Cancel"
          >
            <Text weight="500" fontSize="clamp(0.9rem, 1.5vw, 1.1rem)">
              Cancel
            </Text>
          </PopupButton>
          <PopupButton className="logout" backgroundColor={"#DC4F19"}>
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={deleteCookies}
            >
              <Text weight="500" fontSize="clamp(0.9rem, 1.5vw, 1.1rem)">
                Log out
              </Text>
            </Link>
          </PopupButton>
        </S.Button>
      </S.Overlay__Container>
    </S.Overlay>
  );
};
export default LogoutPopup;
