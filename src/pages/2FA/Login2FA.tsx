import React, {ChangeEventHandler} from 'react';
import {Link} from 'react-router-dom';
import Qrcode from 'assets/qrcode.png';
import * as UI from 'styles/buttons.styles';
import * as F from 'styles/font.styles';
import * as S from './Login2FA.style';
import * as I from './components/Inputs/Input/Single.style';
import styled from 'styled-components';
import {useState} from 'react';
import Submit2FA from './components/Inputs/Submit/Submit2FA';

const DoubleAuthentication = () => {
	return (
		<S.Container>
			<S.Container__Text>
				<F.H2>Two authentication factor</F.H2>
				<F.Subtitle>For added security, please enter this code</F.Subtitle>
			</S.Container__Text>
			<Submit2FA></Submit2FA>
		</S.Container>
	);
};

export default DoubleAuthentication;
