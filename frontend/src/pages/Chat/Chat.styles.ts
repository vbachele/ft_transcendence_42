import styled from 'styled-components';

interface IProps {
    open: boolean;
  }

export default styled.div<IProps>`
    @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
    @media only screen and (min-width: 769px) {
        grid-template-columns: ${({open}) => open ? '' : '320px 1fr'};
    }
	display: grid;
    grid-template-columns: 320px 1fr 320px;
    .buttonTitles:hover {
        transform: scale(1.3);
        background-color: ${(p) =>
            p.theme.name === 'light' ? '#e5e7eb' : '#242526'};
    }
`;

export const LateralBar = styled.div<IProps>`
    @media only screen and (max-width: 768px) {
        display: ${({open}) => open ? 'none': ''};
        width: 100%;
    }
    grid-column-start: 1/2;
    box-shadow: ${(p) =>
            p.theme.name === 'light' ? 'rgb(0 0 0 / 20%) 0px 4px 12px' : 'rgb(200 200 200 / 10%) 0px 4px 12px'};
    height: 91vh;
    width: 320px;
`;

export const MiddleDiv = styled.div<IProps>`
    @media only screen and (max-width: 768px) {
        display: ${({open}) => open ? '': 'none'};
    }
    //height: 100%;
    grid-column-start: 2/3;
`;

export const ContainerMainField = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    //align-items: center;
    height: 91vh;
    width: 100%;
`;

export const ContainerMiddleField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    /* flex: 1; */
`;

export const ContainerRightField = styled.div<IProps>`
    @media only screen and (max-width: 768px) {
        display: ${({open}) => open ? 'none': ''};
    }
    display: flex;
    flex-direction: column;
    //align-items: center;
    width: 320px;
    padding: 16px;
    box-shadow: ${(p) =>
            p.theme.name === 'light' ? 'rgb(0 0 0 / 20%) 0px 4px 12px' : 'rgb(200 200 200 / 10%) 0px 4px 12px'};
    .hover:hover {
        transform: scale(1.01);
        background-color: ${(p) =>
            p.theme.name === 'light' ? '#e5e7eb' : '#242526'};
    }
`;

export const ContainerLateralBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 16px;
    gap: 16px;
`;

export const ContainerTitles = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .buttons {
        //background-color: white;
        transition: all 0.3s linear;

        :hover {
        transform: scale(1.1);
        background-color: ${(p) =>
            p.theme.name === 'light' ? '#e5e7eb' : '#bfc1c4'};
        }
    }
`;

export const ContainerChannels = styled.div`
    width: 100%;
    max-height: 20vh;
    overflow-y: auto;
    //max-width: 25vw;
    /* @media only screen and (max-width: 768px) {
        max-width: 90vw;
    } */
    `;

export const ContainerChannel = styled.div`
    transition: all 0.2s linear;

    .hover:hover {
        transform: scale(1.01);
        background-color: ${(p) =>
            p.theme.name === 'light' ? '#e5e7eb' : '#242526'};
    }
`;

export const ContainerMessage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s linear;

    :hover {
        transform: scale(1.01);
        padding: 4px;
        background-color: ${(p) =>
            p.theme.name === 'light' ? '#e5e7eb' : '#242526'};
    }
`;

export const ContainerMessages = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 33vh;
    overflow-y: auto;
    gap: 8px;
`;

export const ContainerSubMessages = styled.div`
    width: 190px;
    @media only screen and (max-width: 768px) {
        width: 65vw;
    }
`;

export const ContainerPicture = styled.div`
	position: relative;
    padding: 0px;
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

export const ChatBarContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-Items: center;
    height: 80vh;
    justify-content: flex-end;
`;

export const ChatBarInput = styled.input<IProps>`
    @media only screen and (max-width: 768px) {
        width: 95%;
    }
    width: ${({open}) => open ? '95%' : '67%'};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing:border-box;
    border: 1px solid #E6E6E6; 
    border-radius: 12px;
    padding: 8px 16px; 
    margin-top: auto;
`;