import React, {useState, useEffect} from 'react';
import * as S from './Victory.styles';
import {usePopup} from 'contexts/Popup/popup';

const Victory: React.FC = () => {
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setAnimate(true);
			return () => {};
		}, 500);
	}, []);

	return (
		<S.Wrapper>
			<S.Text className={animate ? 'animate' : ''}>
				<>VICTORY</>
				<span>VICTORY</span>
			</S.Text>
		</S.Wrapper>
	);
};

export default Victory;
