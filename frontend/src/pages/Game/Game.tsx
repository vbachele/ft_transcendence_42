import React, {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
// import SocketContext from '../../contexts/Socket/Context';
// import {useRef} from 'react';
// import {Pong} from './Pong';
// import {Socket} from 'socket.io-client';
// import Matter from 'matter-js';
// import {StyledChat, StyledGame} from './Game.styles';
// import {stringify} from 'querystring';
// import {BsTruckFlatbed} from 'react-icons/bs';
// import {Auth} from './Temp/Auth/Auth';
// import styled from 'styled-components';
// import {useNavigate} from 'react-router-dom';
// import { ClientLobbyEvents, ServerLobbyEvents } from './events/lobby.events';
// import { createLobby } from './lobby';

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
