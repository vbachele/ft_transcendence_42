import React, {useEffect, useState} from 'react';
import * as S from './Defeat.styles';
import {useNavigate} from 'react-router-dom';

function Defeat() {
	const [animate, setAnimate] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setAnimate(true);
		}, 500);
		setTimeout(() => {
			navigate('/');
		}, 8_000);
	}, []);

	return (
		<S.Wrapper>
			<S.Text className={animate ? 'animate' : ''}>
				<>DEFEAT</>
				<span>DEFEAT</span>
			</S.Text>
		</S.Wrapper>
	);
};

export default Defeat;
