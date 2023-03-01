export interface IUser {
  name: string;
  image: string;
  coalition: string;
  status: string;
  score: number;
  games: number;
  wins: number;
  ratio: number;
  achievements: string[];
}

export enum StateEnum {
  online = "Online",
  ingame = "In Game",
  offline = "Offline",
}

export type TCallback = ({}) => void;
