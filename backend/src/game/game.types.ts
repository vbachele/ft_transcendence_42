import { ClientEvents, ServerEvents } from "./events/game.events";

export type TServerPayloads = {
  [ServerEvents.BallPosition]: {
    x: number;
    y: number;
  };
};

export type TClientPayloads = {
  [ClientEvents.PaddlePosition]: {
    x: number;
    y: number;
  };
};
