import React, {useState, useEffect} from 'react';
import * as S from './Victory.styles';
import {useNavigate} from 'react-router-dom';

function Victory() {
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
				<>VICTORY</>
				<span>VICTORY</span>
			</S.Text>
		</S.Wrapper>
	);
}

export default Victory;
