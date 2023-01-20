import { NormalText } from 'components/Text';
import React, { Dispatch, SetStateAction, useState } from 'react';
import './styles.css';
import useToggle from './useToggle';
import Popup from 'components/Popup/popupLogout';
import Menu from 'components/NavBar/Menu';
import Modal from 'antd/es/modal';
import AuthenticationPopup from '../2FAPopup';

interface Props {
	name?: string;
}

const Toggle: React.FC<Props> = (props) => {
	const { value, toggleValue } = useToggle(false); // I call the Customized hook
	return (
		<>
			<label className="toggle">
				<input
					id="toggle"
					className="toggle-checkbox"
					type="checkbox"
					checked={value}
					onClick={toggleValue}
				/>
				<div className="toggle-switch">
					{value && <AuthenticationPopup></AuthenticationPopup>}
				</div>
				<NormalText
					fontWeight={'600'}
					fontSize={'14px'}
					className="toggle-label"
				>
					{props.name}
				</NormalText>
			</label>
		</>
	);
};

export default Toggle;
