import {Link} from 'react-router-dom';
import * as UI from 'styles/buttons.styles';
import * as F from 'styles/font.styles';
import * as S from './Landing.styles';
import {ReactComponent as Versus} from 'assets/versus.svg';
import {backend} from 'lib/backend';
import {IUser} from 'types/models';
import {use} from 'matter-js';
import Loading from 'components/Loading';

const Landing = () => {
	const handlePost = () => {
		let user: IUser[] = [];
		const response = backend.createUser(user);
		console.log(response);
	};
	const handleGetAll = () => {
		const userList = backend.getAllUsers();
		console.log(userList);
	};
	const handleGetOne = () => {
		const user = backend.getOneUser('39');
		console.log(user);
	};
	const handlePatch = () => {
		let patch = {
			name: 'Domingo',
		};

		/***  user before the change  ***/
		console.log('BEFORE UPDATE');
		const userbefore = backend.getOneUser('39');
		console.log(userbefore);
		/***  Patch user  ***/
		const user = backend.patchUser('39', patch);
		/***  see the change of the name  ***/
		const userafter = backend.getOneUser('39');
		console.log('AFTER UPDATE');
		console.log(userafter);
	};

	const handleDeleteAll = () => {
		console.log('BEFORE DELETING');
		console.log(backend.getAllUsers());
		backend.deleteAllUsers();
		console.log('AFTERDELETING');
		console.log(backend.getAllUsers());
	};

	return (
		<S.Container>
			<Loading />
			<S.ButtonsContainer>
				<UI.PrimaryButton onClick={handlePost}>POST USER</UI.PrimaryButton>
				<UI.PrimaryButton onClick={handleGetAll}>
					GET ALL USERS
				</UI.PrimaryButton>
				<UI.PrimaryButton onClick={handleGetOne}>GET 1 USER</UI.PrimaryButton>
				<UI.PrimaryButton onClick={handlePatch}>PATCH 1 USER</UI.PrimaryButton>

				<UI.PrimaryButton onClick={handleDeleteAll}>
					DELETE ALL USERS
				</UI.PrimaryButton>
			</S.ButtonsContainer>
		</S.Container>
	);
};

export default Landing;
