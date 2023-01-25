import React, { useState, useEffect } from "react";
import * as S from "./Defeat.styles";
import sound from "assets/victory.mp3";

const Defeat: React.FC = () => {
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
        <>DEFEAT</>
        <span>DEFEAT</span>
      </S.Text>
    </S.Wrapper>
  );
};

export default Defeat;
