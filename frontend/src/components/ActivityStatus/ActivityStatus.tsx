import * as S from './ActivityStatus.styles';
import * as F from 'styles/font.styles';

interface IProps {
	state: string;
}

const stateEnumLookup: {[key: string]: string} = {
	online: 'Online',
	ingame: 'In Game',
	offline: 'Offline',
};

function ActivityStatus({state}: IProps) {
	const output: string = stateEnumLookup[state];

	return (
		<S.Status state={state}>
			<span></span>
			<F.Text weight="500">{output}</F.Text>
		</S.Status>
	);
}

export default ActivityStatus;
