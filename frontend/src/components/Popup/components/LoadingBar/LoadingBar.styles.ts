import styled from "styled-components";

export const Loading = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  align-items: center;
  display: flex;
  height: 10px;
`;

export const GiFFire = styled.img`
  position: relative;
  margin-bottom: 30px;
  margin-left: -10px;
  width: 40px;
  height: 50px;
`;

export const LoadingValue = styled.div`
  animation: load 15s normal forwards;
  box-shadow: 0 10px 40px -10px #fff;
  border-radius: 100px;
  background: #fff;
  height: 10px;
  width: 0;

  @keyframes load {
    100% {
      width: 0;
    }
    0% {
      width: 100%;
    }
  }
`;
