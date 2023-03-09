import React, {useState} from 'react';
import * as F from 'styles/font.styles';
import useToggle from './useToggle';
import * as S from './Toggle.styles';
import DoubleAutentication from './2FA/doubleAutentication';

interface Props {
	name?: string;
	component?: React.FC;
}

// BACKEND 2FAEnable: boolean
// BACKEND: on met a jour la page pour updater le user sur le 2FA par default c'est false

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
