import * as S from './History.styles';
import * as F from 'styles/font.styles';
import Card from './Card';

interface IMatch {
	user: string;
	myScore: number;
	userScore: number;
	id: number;
}

// prettier-ignore //? 4 ou 5 max ? + pas beau quand semi complet
const matches: IMatch[] = [
	{id: 23, user: 'Melato', myScore: 5, userScore: 8},
	{id: 24, user: 'Lemoir', myScore: 10, userScore: 3},
	{id: 25, user: 'Bess', myScore: 7, userScore: 5},
	{id: 26, user: 'Thowes', myScore: 5, userScore: 6},
	// {"id":26,"user":"Thowes",myScore:5,userScore:6},
];

const History = () => {
	return (
		<S.Container>
			<F.Subtitle weight="700" fontSize="30px">
				Last Matches
			</F.Subtitle>
			<S.History>
				{matches.map((match: IMatch) => (
					<Card match={match} />
				))}
			</S.History>
		</S.Container>
	);
};

export default History;
