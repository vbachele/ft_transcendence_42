import React, {ChangeEventHandler, useContext, useState} from 'react';
import * as S from './EditName.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import {useNavigate} from 'react-router-dom';
import {backend} from 'lib/backend';
import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {Input} from 'antd';

interface Props {
	visible?: boolean;
	linkTo: string;
	page: string;
}

/* MAIN FUNCTION */
const EditName = (props: Props) => {
	const navigate = useNavigate();
	const [value, setValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [uploadApproved, setUploadApproved] = useState(false);

	const {
		userName,
		setUserName,
		setCoalition,
		setAchievements,
		image,
		setImage,
	} = useUserInfos();

	/* Store infos in the user context */
	async function setUserInfosContext(value: string) {
		const userInfos: any = await backend.getUserByToken();
		setUploadApproved(true);
		setLoading(false);
		setUserName({userName: value});
		setImage({image: image.image});
		setAchievements({achievements: userInfos.achievements});
		setCoalition({coalition: userInfos.coalition});
		navigate('/');
	}

	async function createUser(value: string) {
		// Here n'aller dans la condition seulement si le user n'est pas deja registered" sinon just PATCH LE NOM
		let UserCreation = {
			name: value,
			isRegistered: true,
		};
		const user = await backend.createUser(UserCreation);
		const upload = await backend.patchUser(value, image);
		setUserInfosContext(value);
	}

	/* Registration of the user in database in the page /registration*/
	async function userRegistrationPage() {
		if (props.page === 'registration') {
			const user = await createUser(value);
		}
	}

	/* Change settings of the user in the page /settings */
	async function userSettingsPage() {
		if (props.page === 'settings') {
			let newuserName = {
				name: value,
			};
			const response = await backend.patchUser(userName.userName, newuserName);
			setUserName({userName: value});
			setUploadApproved(true);
			setLoading(false);
			unlockAchievement('RENAME', newuserName.name);
		}
	}

	/* On click functions */
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setLoading(true);
		userRegistrationPage(); // if in registrationPage
		userSettingsPage(); // if in settingsPage
	};

	return (
		<S.FormContainer onSubmit={handleSubmit}>
			<S.InputContainer>
				<F.Text weight="600">
					{props.page === 'settings' && 'Change your nickname'}
					{props.page === 'registration' && 'Choose a nickname*'}
				</F.Text>
				<Input
					type="text"
					value={value}
					size="large"
					onChange={handleChange}
					placeholder="Enter your nickname"
					maxLength={8}
					minLength={2}
					required
				/>
			</S.InputContainer>
			<S.ConfirmContainer>
				<UI.SecondaryButton type="submit">
					{props.page === 'settings' && 'Confirm'}
					{props.page === 'registration' && 'Continue'}
				</UI.SecondaryButton>
				{loading && (
					<S.loadingimg src="https://cdn.discordapp.com/attachments/1067488107827576916/1082305985042984960/Dual_Ring-1s-200px_1.gif" />
				)}
				{uploadApproved && (
					<S.loadingimg src="https://cdn.discordapp.com/attachments/1067488107827576916/1082309957053071370/check-mark.png" />
				)}
			</S.ConfirmContainer>
		</S.FormContainer>
	);
};
export default EditName;
