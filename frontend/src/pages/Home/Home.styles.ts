import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  cursor: url(https://cdn.discordapp.com/attachments/303406782104207362/315839175406649345/Overwatch.cur),
    auto;
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: transparent;

  ::-webkit-scrollbar {
    display: none;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-track {
    display: none;
  }
  ::-webkit-scrollbar-track-piece {
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    display: none;
  }
  ::-webkit-scrollbar-corner {
    display: none;
  }
  ::-webkit-resizer {
    display: none;
  }
`;

export const main = styled.div`
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;
export const left = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  height: 100%;
`;

export const logo = styled.div`
  position: relative;
  padding: 7px 0 0 30px;
  opacity: 0.9;
  z-index: -1;
  &img {
    width: 390px;
  } */
`;

export const slogan = styled(logo)`
  position: relative;
  bottom: 6px;
  font-size: 30px;
  font-weight: 550;
  color: rgba(255, 255, 255, 0.7);
`;

export const img = styled.img`
  width: 390px;
`;

export const menuHighlight = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
`;

export const menus = styled.div`
  position: fixed;
  top: 30%;
  padding-left: 35px;
  @media only screen and (max-width: 768px) {
    #menus {
      top: 35%;
    }
  }
`;

export const italic = styled.div`
  position: relative;
  left: 0;
  font-size: clamp(32px, 4vw, 64px);
  font-weight: 600;
  color: #fff;
  text-shadow: 0px 0px 3px #cecece;
  transform-origin: bottom;
  transition: all 0.05s ease-in;
  :hover {
    left: 20px;
    transform: scaleY(1.05);
  }
`;

export const italicHighlight = styled(italic)`
  color: #f3c026;
  text-shadow: 0px 0px 5px #bb7e29;
`;

export const normal = styled.div`
  position: relative;
  left: 0;
  line-height: 1.7;
  font-size: 24px;
  color: #e3f2ff;
  text-shadow: 0 0 2px #336cec;
  transform-origin: bottom;
  transition: all 0.05s ease-in;
  :hover {
    left: 6px;
    transform: scaleY(1.1);
    color: #fff;
  }
`;

export const logoutButton = styled.button`
  color: white;
  display: flex;
  align-items: center;
  margin: 4px 0px;
  border: none;
  text-decoration: none;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
`;

export const hero = styled.div`
  position: fixed;
  bottom: 21%;
  right: 53px;
  text-align: right;
`;

export const heroName = styled(hero)`
  font-size: clamp(24px, 4vw, 50px);
  font-weight: 550;
  color: #fff;
  line-height: 2.5;
  text-shadow: 0 -2px 1px rgba(255, 255, 255, 0.8);
  @media only screen and (max-width: 768px) {
    line-height: 3;
  }
`;

export const heroUnlocks = styled.div`
  font-size: clamp(16px, 3vw, 22px);
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 0 2px rgb(0, 0, 0);
  &span {
    color: #fff;
  }
`;

export const bgvid = styled.video`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  background: #000;
  background-size: cover;
`;

export const link = styled(Link)`
  text-decoration: none;
`;
