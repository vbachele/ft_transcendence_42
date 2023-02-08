import React, {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Lobby {
  id: string;
  mode: "solo" | "duo";
  playerOne: string;
  playerTwo?: string;
}

function Game() {
  return <div></div>;
}

export default Game;
