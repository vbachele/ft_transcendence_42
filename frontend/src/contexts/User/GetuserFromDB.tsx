import {backend} from 'lib/backend';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {useUserInfos} from './userContent';

const getInfosFromDB = async (navigate: NavigateFunction) => {
	const response = await backend.getUserByToken();
	return response;
};

export default getInfosFromDB;
