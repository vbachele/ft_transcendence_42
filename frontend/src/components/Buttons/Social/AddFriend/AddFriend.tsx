import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './add.svg';
import * as F from 'styles/font.styles';
import {backend} from 'lib/backend';

interface IProps {
	user: string;
}

function AddFriend({user}: IProps) {
	const {userName} = useUserInfos();

	const handleClick = () => {
		backend.unblockUser(userName.userName, user);
		backend.addFriend(userName.userName, user);
		unlockAchievement('ADD', userName.userName);
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Add friend</F.Text>
		</button>
	);
}

export default AddFriend;
