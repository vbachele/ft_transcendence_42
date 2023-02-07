interface LobbyNamespace {
    foo: (arg: string) => void;
}

export interface Lobby {
    id: string;
    namespace: any;
    mode: string;
    playerOne: number;
    playerTwo: number | undefined;
}

export type LobbyMode = 'solo' | 'duo';