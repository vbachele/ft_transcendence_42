import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './block.svg';
import * as F from 'styles/font.styles';
import {backend} from 'lib/backend';
import {IUser} from 'types/models';

interface IProps {
	user: IUser;
	hideDrawer?: () => void;
	onBlock?: (user: IUser) => void;
}

function BlockUser({user, hideDrawer, onBlock}: IProps) {
	const {userName} = useUserInfos();

	const handleClick = () => {
		backend.blockUser(userName.userName, user.name).then(() => {
			if (onBlock) {
				onBlock(user);
			}
		});
		backend.removeFriend(userName.userName, user.name);
		unlockAchievement('BLOCK', userName.userName);

		if (hideDrawer) {
			hideDrawer();
		}
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Block</F.Text>
		</button>
	);
}

export default BlockUser;
