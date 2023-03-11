import React, {useState} from 'react';
import * as F from 'styles/font.styles';
import useToggle from './useToggle';
import * as S from './Toggle.styles';
import DoubleAutentication from './2FA/doubleAutentication';
import React, {useEffect, useState} from 'react';
import * as F from 'styles/font.styles';
import useToggle from './useToggle';
import * as S from './Toggle.styles';
import DoubleAutentication from './2FA/doubleAutentication';
import {backend} from 'lib/backend';
import {useUserInfos} from 'contexts/User/userContent';
import QRCode from 'qrcode';
import Disable2FA from './2FA/Disable2FA';
import {
	DoubleAuthButton,
	SecondaryButton,
	SecondaryButtonSmall,
} from 'styles/buttons.styles';

interface Props {
	name?: string;
	component?: React.FC;
}

/* Main function */

const Toggle: React.FC<Props> = (props) => {
	const {value, toggleValue} = useToggle(false); // I call the Customized hook
	const [enabled, setEnabled] = useState(false); // to modify by the backend

	const handleToggle = () => {
		setEnabled(!enabled);
		toggleValue();
	};

	return (
		<>
			<S.Toggle className="toggle">
				<S.ToggleCheckbox
					type="checkbox"
					id="toggle"
					// checked={value}
					onClick={handleToggle}
				/>
				<S.ToggleSwitch>
					{value && (
						<DoubleAutentication
							click={enabled}
							onClose={() => setEnabled(false)}
						/>
					)}
					{!value && (
						<DoubleAutentication
							click={enabled}
							onClose={() => setEnabled(false)}
						></DoubleAutentication>
					)}
				</S.ToggleSwitch>
				<F.Text>{props.name}</F.Text>
			</S.Toggle>
		</>
	);
};

export default Toggle;
