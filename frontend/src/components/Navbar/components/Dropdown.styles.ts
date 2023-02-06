import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  .avatar {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  a,
  p {
    text-decoration: none;
    word-break: break-all;
  }
  @media only screen and (max-width: 768px) {
    .avatar {
      display: none;
    }
  }
`;

export const DropdownContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: #e04f5f;
  position: fixed;
  z-index: 90;
  right: 24px;
  border-radius: 6px;
  padding: 1em;
  width: 275px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transform: translateX(4em);

  hr {
    height: 1px;
    background-color: #fff;
    border: none;
    margin: 1em 0;
  }

  @media only screen and (max-width: 768px) {
    position: fixed;
    align-items: center;
    border-radius: 0px;
    z-index: 50;
    top: 0;
    right: 0;
    width: 100%;
    min-width: 280px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);

    hr {
      margin: 32px 0;
    }

    .first-hr {
      width: 100vw;
      margin-top: 8px;
    }
    .second-hr {
      width: 60vw;
    }
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }

  @media screen and (max-width: 768px) {
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    width: 100%;
    padding: 0 16px;
    justify-content: center;
  }
`;

export const User__Infos = styled.div`
  a,
  p {
    color: white;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 16px;

  a {
    width: 100%;
    color: white;
    display: flex;
    gap: 1em;
    align-items: center;

    transition: all 0.2s linear;

    :hover {
      p {
        font-weight: 600;
      }
      transform: translateX(8px);
    }
  }

  svg {
    fill: white;
    width: 24px;
    height: 24px;
    border-radius: 0;
  }

  @media only screen and (max-width: 768px) {
    gap: 1.5em;

    a,
    p {
      font-weight: 600;
      font-size: 24px;
      justify-content: center;
    }
    svg {
      display: none;
    }
  }
`;

export const PopupButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: left;
  gap: 16px;
  color: white;

  background-color: transparent !important;
  border: none !important;
  transition: all 0.2s linear;
  :hover {
    p {
      font-weight: 600;
    }
    transform: translateX(8px);
  }
  svg {
    fill: white;
    width: 24px;
    height: 24px;
    border-radius: 0;
  }
  @media only screen and (max-width: 768px) {
    gap: 1.5em;

    a,
      font-weight: 600;
      font-size: 24px;
      justify-content: center;
      align-items: center;
    svg {
      display: none;
    }
  }
`;
