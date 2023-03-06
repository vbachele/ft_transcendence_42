import styled from "styled-components";

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.56);
`;

export const Overlay__Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.56);
  border-radius: 8px;
  backdrop-filter: blur(15px);
  margin: auto;
  position: relative;
  width: clamp(80px, 80%, 375px);
  padding: 24px;
  gap: 16px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-justify: justify;
  color: white;
  padding: 0px;
  gap: 16px;
`;

// 2FA ENABLED - ASKING USER IF HE WANTS TO ENABLE IT

export const FormNumber = styled.form`
  color: black;
  height: 100%;
`;

export const TitleGif = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 16px;
`;

export const GiFFire = styled.img`
  width: 40px;
  height: 50px;
  position: relative;
  left: 10px;
  bottom: 10px;
`;

export const Input = styled.input`
  display: flex;
  flex-direction: column;
  height: 40px;
  width: clamp(100px, 70vw, 20rem);
  background: #f9f9f9;

  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding-left: 24px;
  /* Text box */
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 1;
  margin-bottom: 16px;

  ::placeholder {
    font-weight: 400;
    font-size: 14px;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

// BUTTONS OF THE POPUP

export const Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;
  flex: none;
  align-self: stretch;
`;

export const ButtonText = styled.div`
  display: "flex"
  align-items: center;
  justify-content: center;
  
`;

export const Qrcode = styled.img`
    display: "flex"
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
`

export const divider = styled.hr `
  width: clamp(100px, 70vw, 320px);
  border-bottom:1px solid #ccc;
`