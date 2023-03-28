import React, {useEffect, useState} from 'react';
import * as S from './Draw.styles';
import {useNavigate} from 'react-router-dom';

function Draw() {
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
				<>DRAW</>
				<span>DRAW</span>
			</S.Text>
		</S.Wrapper>
	);
};

export default Draw;
