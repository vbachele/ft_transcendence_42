import styled from 'styled-components';

interface IProps {
    open: boolean;
  }

export default styled.div`
    .buttonTitles:hover {
        cursor: pointer;
        transform: scale(1.4);
        background-color: ${(p) =>
            p.theme.name === 'light' ? '#e5e7eb' : '#242526'};
    }
    .hiddenDesktop {
        @media only screen and (min-width: 769px) {
            display: none;
        }
    }
    .hiddenMobile {
        @media only screen and (max-width: 768px) {
            display: none;
        }
    }
    display: flex;
    flex: 1 1 0;
    min-height: 0;
`;

export const LateralBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  @media only screen and (min-width: 768px) {
    border-right: lightgray 1px solid;
    width: 380px;

  }
`;

export const MiddleDiv = styled.div<IProps>`
    @media only screen and (max-width: 768px) {
        display: ${({open}) => open ? '': 'none'};
    }
    display: flex;
    flex-direction: column;
    text-align: center;
    flex: 1;
    justify-content: space-between;
`;

export const ContainerTitles = styled.div`
    display: flex;
    padding: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .buttons {
        transition: all 0.3s linear;
        
        :hover {
        transform: scale(1.1);
        background-color: ${(p) =>
            p.theme.name === 'light' ? '#e5e7eb' : '#bfc1c4'};
        }
    }
`;

export const ContainerChannels = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
    gap: 8px;
    li {
        padding : 8px 16px;
    }
    li:hover {
        cursor: pointer;
        transform: scale(1.01);
        background-color: ${(p) =>
           p.theme.name === 'light' ? '#e5e7eb' : '#242526'};
    }
    `;

export const ContainerChannel = styled.div`
    transition: all 0.2s linear;
    `;

export const ContainerMessage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    transition: all 0.2s linear;

    :hover {
        cursor: pointer;
        transform: scale(1.035);
        /* padding: 4px; */
        background-color: ${(p) =>
            p.theme.name === 'light' ? '#e5e7eb' : '#242526'};
    }
`;

export const ContainerMessages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
    gap: 8px;
`;

export const ContainerSubMessages = styled.div`
    width: 190px;
    @media only screen and (max-width: 768px) {
        width: 65vw;
    }
`;

export const PastillePic = styled.div`
    width: 12px;
    height:12px;
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
`;

export const Pastille = styled.div`
    width: 12px;
    height:12px;
    border-radius: 50%;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
`;

export const ProfilePic = styled.img`
    width: 48px;
    border-radius: 50%;
`;

export const ProfilePicRightBar = styled.img`
    @media only screen and (max-width: 768px) {
        width: 30%;
    }
    width: 70%;
    border-radius: 50%;
`;


export const ChatBarInput = styled.input`
    width: 100%;
    background: #F9F9F9;
    box-sizing:border-box;
    border: 1px solid #E6E6E6; 
    border-radius: 12px;
    padding: 8px 16px; 
`;

export const Input = styled.input`
  height: 48px;
  width: clamp(20rem, 50%, 30rem);
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;

  ::placeholder {
    font-weight: 400;
    font-size: 14px;
  }
`;
