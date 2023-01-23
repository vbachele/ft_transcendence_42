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
    background-color : #9999;
    border-right: 0.2px solid #000000;
    height: 88vh;
`;

export const MiddleDiv = styled.div`
    @media only screen and (max-width: 768px) {
        display: none;
    }
   // height: 100%;
    grid-column-start: 2/3;
    background-color : #3333;
`;

export const ContainerLateralBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    gap: 16px;
`;

export const ContainerChannel = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
