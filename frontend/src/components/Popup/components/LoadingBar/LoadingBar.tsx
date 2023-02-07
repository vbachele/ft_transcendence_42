import React, { useEffect, useState } from "react";
import * as S from "./LoadingBar.styles";

const LoadingBar = () => {
  const [seconds, setSeconds] = useState(15);

  // BACKEND SET THE TIMER IF 0, Not in party

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
      if (seconds === 0) setSeconds(0);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <>
      <S.Loading>
        <S.LoadingValue />
        <S.GiFFire src="https://cdn.discordapp.com/attachments/1067488107827576916/1069217769515651132/Rectangle.gif" />
      </S.Loading>
    </>
  );
};

export default LoadingBar;
