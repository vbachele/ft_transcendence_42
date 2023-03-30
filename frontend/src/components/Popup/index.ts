import GameIncomingInvite from './GameIncomingInvite/GameIncomingInvite';
import LogoutPopup from './Logout/LogoutPopup';
import Matchmaking from './Matchmaking/Matchmaking';
import InviteToPlay from './InviteToPlay/InviteToPlay';
import AuthPopup from './Auth/AuthPopup';

export default {
	GameInvite: GameIncomingInvite,
	LogoutPopup,
	SearchPlayer: Matchmaking,
	UserInvitedToGame: InviteToPlay,
	AuthPopup,
};
