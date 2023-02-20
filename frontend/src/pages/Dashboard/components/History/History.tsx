import * as S from './History.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';

const History = () => {
	return (
		<S.Container>
			<F.Subtitle weight="700" fontSize="30px">
				Last Matches
			</F.Subtitle>
			<S.History>
				<S.Card>match</S.Card>
				<S.Card>match</S.Card>
				<S.Card>match</S.Card>
				<S.Card>match</S.Card>
				<S.Card>match</S.Card>
			</S.History>
		</S.Container>
	);
};

export default History;
