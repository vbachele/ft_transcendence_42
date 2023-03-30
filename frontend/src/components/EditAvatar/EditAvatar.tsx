import {SelectFile} from './components/SelectFile';
import Default from 'assets/default-avatar.png';
import * as F from 'styles/font.styles';
import * as S from './EditAvatar.styles';
import {backend} from 'lib/backend';
import {useContext, useEffect, useState} from 'react';
import {IUser} from 'types/models';
import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {fetchUserByName} from 'helpers/fetchUserByName';
import SocketContext from 'contexts/Socket/context';

interface Props {
	page: string;
}

/* MAIN FUNCTION */
export const EditAvatar = (props: Props) => {
	const {socket} = useContext(SocketContext).SocketState;
	const {userName, image, setImage, coalition, setAchievements} =
		useUserInfos();
	const [loading, setLoading] = useState(false);
	const [uploadApproved, setUploadApproved] = useState(false);


	/* in first render add the default image */
	useEffect(() => {

		function defineRandomString (){
			const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
			let randomString = '';
			for (let i = 0; i < 7; i++) {
			  const randomIndex = Math.floor(Math.random() * alphabet.length);
			  randomString += alphabet[randomIndex];
			}
			return randomString;
		  }
		if (!image.image){
			const randomString = defineRandomString()
			setImage({
				image:
					`https://robohash.org/${randomString}?bgset=bg1`,
			});
		}
	}, []);

	const setLoadingTrue = () => {
		setLoading(true);
	};

	const setLoadingFalse = () => {
		setLoading(false);
	};

	const setUploadedimg = async () => {
		const data = await fetchUserByName(userName.userName, userName.userName);
		const hasAvatarAchievement = data?.achievements.includes('AVATAR');

		setUploadApproved(true);
		if (data && !hasAvatarAchievement) {
			unlockAchievement('AVATAR', data, socket);
			setAchievements({achievements: [...data.achievements]});
		}
	};

	const setUploadedimgFalse = () => {
		setUploadApproved(false);
	};

	return (
		<S.Container>
			<S.AvatarContainer>
				<S.Avatar src={image.image} />
				<SelectFile
					page={props.page}
					setLoadingTrue={setLoadingTrue}
					setUploadedimg={setUploadedimg}
					setLoadingFalse={setLoadingFalse}
					setUploadedimgFalse={setUploadedimgFalse}
				/>
			</S.AvatarContainer>
			<S.NameContainer>
				<F.Text weight="700">
					{props.page === 'registration' && 'New adventurer'}
					{props.page === 'settings' && userName.userName}
					{loading && (
						<S.loadingimg src="https://cdn.discordapp.com/attachments/1067488107827576916/1082305985042984960/Dual_Ring-1s-200px_1.gif" />
					)}
					{uploadApproved && (
						<S.loadingimg
							src="https://cdn.discordapp.com/attachments/1067488107827576916/1082309957053071370/check-mark.png"
							style={{width: '24px', height: '24px'}}
						/>
					)}
				</F.Text>
				<F.Subtitle>
					{props.page === 'registration' && 'Ready for your mission'}
					{props.page === 'settings' && coalition.coalition}
				</F.Subtitle>
			</S.NameContainer>
		</S.Container>
	);
};
export default EditAvatar;
