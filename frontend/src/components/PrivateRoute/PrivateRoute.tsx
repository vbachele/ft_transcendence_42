import {useLocation, useNavigate} from 'react-router-dom';
import React, {FC, useEffect, useState} from 'react';
import {useUserInfos} from 'contexts/User/userContent';
import LandingPage from 'pages/Landing/Landing';
import Loading from 'components/Loading';
import {backend} from 'lib/backend';

const PrivateRoute: FC<{children: React.ReactElement}> = ({children}) => {
	const navigate = useNavigate();
	const [tokenExists, setTokenExists] = useState(false);
	const {userName, verified2FA, doubleAuth} = useUserInfos();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const location = useLocation();

	async function checkUserToken() {
		const response = await backend.checkToken();
		if (response.statusCode == 400 || response.statusCode == "403") {

		navigate("/login");
		  return;
		}
		setIsLoading(false);
		setTokenExists(true);
	}

	async function check2FAEnabled() {
		const path = location.pathname;
		const response = await backend.getUserByToken();
		console.log("verified 2FA", response.otp_validated);
		console.log("DoubleAuth 2FA", response.otp_enabled);


		if (response.otp_validated === false && response.otp_enabled === true) {
			console.log("inside");

			await backend.generate2FA(response.userName);
			console.log("after");

			navigate('/2FA');
			return;
		}
		if (
			path === '/2FA' &&
			response.otp_validated === false &&
			response.otp_enabled === false
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
