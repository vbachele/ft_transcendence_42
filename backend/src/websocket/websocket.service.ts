import { Injectable } from "@nestjs/common";

interface ISession {
    id: string;
    userID: string;
    username: string;
}

enum SessionStorage {
    SessionID = 'session.sessionID',
    UserID = 'session.userID',
    Username = 'session.username',
}

abstract class SessionStore {
  abstract findSession(id: string): ISession;
  abstract saveSession(session: ISession): void;
}

@Injectable()
export class SessionStoreService extends SessionStore {
    sessions: Map<any, any>;
    constructor() {
        super();
    }

    findSession(id: string): ISession {
        const session = {
            id: sessionStorage.getItem(SessionStorage.SessionID),
            userID: sessionStorage.getItem(SessionStorage.UserID),
            username: sessionStorage.getItem(SessionStorage.Username),
        }
        return this.sessions.get(id);
    }

    saveSession(session: ISession): void {
        sessionStorage.setItem(SessionStorage.SessionID, session.id);
        sessionStorage.setItem(SessionStorage.UserID, session.userID);
        sessionStorage.setItem(SessionStorage.Username, session.username);
    }
}
