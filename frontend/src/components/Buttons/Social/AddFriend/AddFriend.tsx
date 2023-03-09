import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './add.svg';
import * as F from 'styles/font.styles';

interface IProps {
	user: string;
}

function AddFriend({user}: IProps) {
	const {userName} = useUserInfos();

	const handleClick = () => {
		console.log(userName.userName, 'wants to add', user); //TODO add user to friend list
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
