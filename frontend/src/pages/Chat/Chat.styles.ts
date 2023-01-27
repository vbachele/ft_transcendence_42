import styled from 'styled-components';

export default styled.div`
    @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
	display: grid;
    grid-template-columns: 1fr 3fr;
    //grid-template-rows: repeat(2, 1fr);
    //grid-auto-rows: minmax(100px, auto);
    //width: 100vw;
    //min-height: 100px;
    //height: 100%;;
    //height: 88vh;
`;

export const LateralBar = styled.div`
    grid-column-start: 1/2;
    /* background-color : #9999; */
    box-shadow: ${(p) =>
            p.theme.name === 'light' ? 'rgb(0 0 0 / 20%) 0px 4px 12px' : 'rgb(200 200 200 / 10%) 0px 4px 12px'};
    height: 91vh;
`;

export const MiddleDiv = styled.div`
    @media only screen and (max-width: 768px) {
        display: none;
    }
   // height: 100%;
    grid-column-start: 2/3;
    /* background-color : #3333; */
`;

export const ContainerLateralBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    gap: 16px;
`;

export const ContainerTitles = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .button {
        background-color: white;
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
`;

export const ContainerChannel = styled.div`
    transition: all 0.2s linear;

    :hover {
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
    max-height: 32vh;
    overflow-y: auto;
    gap: 8px;
`;

export const ContainerPicture = styled.div`
	position: relative;
    padding: 0px;
`;

export const Pastille = styled.div`
    width: 12px;
    height:12px;
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
`;

export const ProfilePic = styled.img`
    width: 48px;
    border-radius: 50%;
`;