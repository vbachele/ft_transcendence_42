import React, {useState} from 'react';
import * as F from 'styles/font.styles';
import useToggle from './useToggle';
import * as S from './Toggle.styles';
import AuthenticationPopup from '../2FAPopup/2FAPopup';
import Popup from 'components/Popup/PopupLogout';

interface Props {
	name?: string;
	component?: React.FC;
}

const Toggle: React.FC<Props> = (props) => {
	const {value, toggleValue} = useToggle(false); // I call the Customized hook
	const [enabled, setEnabled] = useState(true);

	function handleToggle() {
		if (!enabled) {
			setEnabled(true);
		}
		if (enabled) {
			toggleValue();
			setEnabled(false);
		}

		console.log(enabled);
	}

	return (
		<>
			<S.Toggle className="toggle">
				<S.ToggleCheckbox
					type="checkbox"
					id="toggle"
					checked={enabled}
					onClick={handleToggle}
				/>
				<S.ToggleSwitch>
					{enabled && <AuthenticationPopup />}
					{!enabled && (
						<Popup
							click={true}
							title={'Disabled 2FA'}
							linkTo={''}
							subtitle={'Are you sure?'}
							cancelString={'Cancel'}
							stringPrimaryButton={'Confirm'}
						/>
					)}
				</S.ToggleSwitch>
				<F.Text>{props.name}</F.Text>
			</S.Toggle>
		</>
	);
};

export default Toggle;
