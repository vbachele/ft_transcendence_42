import {backend} from 'lib/backend';
import {fetchFriends} from './fetchFriends';
import {fetchUserByName} from './fetchUserByName';
import unlockAchievement from './unlockAchievement';

export async function addUserToFriends(
	user: string,
	friend: string,
	socket: any
) {
	const data = await fetchUserByName(user, user);
	const friends = await fetchFriends(user);

	const hasTeamAchievement = data?.achievements?.includes('TEAM');
	const hasFriendAchievement = data?.achievements?.includes('ADD');
	const hasThreeFriends = friends && friends?.length + 1 >= 3;

	backend.addFriend(user, friend);
	backend.removePending(user, friend);

	if (data && !hasFriendAchievement) {
		unlockAchievement('ADD', data, socket);
	}

	if (data && !hasTeamAchievement && hasThreeFriends) {
		unlockAchievement('TEAM', data, socket);
	}
}
