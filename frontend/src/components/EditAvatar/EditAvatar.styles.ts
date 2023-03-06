import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2em;
`;

export const AvatarContainer = styled.div`
  position: relative;
`;

export const NameContainer = styled.div``;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  display: block;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const SelectFileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  bottom: -10px;
  left: 65%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.secondary};
  svg {
    height: 20px;
    width: 20px;
    fill: ${(p) => p.theme.colors.main};
  }
`;
