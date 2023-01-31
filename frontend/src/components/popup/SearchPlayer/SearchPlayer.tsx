import React, { useContext, useEffect, useState } from "react";
import { PopupButton } from "styles/buttons.styles";
import { Text, H2 } from "styles/font.styles";
import * as S from "./SearchPlayer.styles";
import Timer from "../components/Timer/Timer";
import PopupContext from "contexts/Popup/popup";
import GameFound from "../components/GameFound/GameFound";

function stopPropagation(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.stopPropagation();
}

// BACKEND : Ajouter que lorsque play on a le statut red
// BACKEND : Ajouter le statut : recherche une partie
// BACKEND : ajouter condition when game is found

const SearchPlayer: React.FC<{}> = () => {
  const { popup, setPopup } = useContext(PopupContext);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowComponent(true);
    }, 10000);
  }, []);

  return popup.toggle ? (
    <S.Overlay onClick={(e) => stopPropagation(e)}>
      <S.Container>
        <S.Text>
          <S.GiFFire src="https://cdn.discordapp.com/attachments/1067488107827576916/1069217769515651132/Rectangle.gif" />
          <H2>Waiting for players</H2>
          <Timer></Timer>
        </S.Text>
        <S.Button>
          <PopupButton
            onClick={() => setPopup({ toggle: false })}
            border="1px solid #e5e7eb"
            className="Cancel"
            width="50%"
          >
            <Text weight="500">Cancel</Text>
          </PopupButton>
        </S.Button>
        {showComponent ? <GameFound /> : ""}
      </S.Container>
    </S.Overlay>
  ) : null;
};

export default SearchPlayer;
