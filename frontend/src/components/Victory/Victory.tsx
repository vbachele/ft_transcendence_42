import React, { useState, useEffect } from "react";
import * as S from "./Victory.styles";
import sound from "assets/victory.mp3";

const Victory: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      const audio = new Audio(sound);
      audio.play();
      setAnimate(true);
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }, 500);
  }, []);

  return (
    <S.Wrapper>
      <S.Text className={animate ? "animate" : ""}>
        <>VICTORY</>
        <span>VICTORY</span>
      </S.Text>
    </S.Wrapper>
  );
};

export default Victory;
