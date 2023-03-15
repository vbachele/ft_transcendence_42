import Loading from 'components/Loading';
import getInfosFromDB from 'contexts/User/GetuserFromDB';
import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import LandingPage from 'pages/Landing';
import React, {FC, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const PrivateRoute: FC<{children: React.ReactElement}> = ({children}) => {
	const navigate = useNavigate();
	const [tokenExists, setTokenExists] = useState(false);
	const {userName, verified2FA, doubleAuth} = useUserInfos();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const location = useLocation();

	async function checkUserToken() {
		// const response = await backend.checkToken();
		// if (response.statusCode == "400" || response.statusCode == "403") {
		//   navigate("/login");
		//   return;
		// }
		setIsLoading(false);
		setTokenExists(true);
	}

	async function check2FAEnabled() {
		const path = location.pathname;

		if (verified2FA.verified2FA === false && doubleAuth.doubleAuth === true) {
			navigate('/2FA');
			return;
		}
		if (
			path === '/2FA' &&
			verified2FA.verified2FA === false &&
			doubleAuth.doubleAuth === false
		) {
			navigate('/');
		}
	}

	useEffect(() => {
		checkUserToken();
		check2FAEnabled();
	}, []);

	if (tokenExists && userName.userName) {
		return children;
	}
	return (
		<>
			{isLoading && <Loading />}
			{!isLoading && <LandingPage />}
		</>
	);
};

export default PrivateRoute;
