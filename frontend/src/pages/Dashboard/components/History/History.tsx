import * as S from './History.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import Card from './Card';
import {IUser} from 'types/models';

interface IMatch {
	opponent: string;
	// score: number[2]; // [5,8]
	myScore: number;
	opponentScore: number;
	id: number;
}

// prettier-ignore
const matches: IMatch[] = [
	{"id":23,"opponent":"Minnis",myScore:5,opponentScore:8},
	{"id":24,"opponent":"Dalston",myScore:10,opponentScore:3},
	{"id":25,"opponent":"Toppin",myScore:7,opponentScore:5},
	{"id":26,"opponent":"Coleman",myScore:5,opponentScore:6},
	{"id":27,"opponent":"Helder",myScore:8,opponentScore:9},
];

const History = () => {
	return (
		<S.Container>
			<F.Subtitle weight="700" fontSize="30px">
				Last Matches
			</F.Subtitle>
			<S.History>
				<Card match={matches[0]} />
				<Card match={matches[1]} />
				<Card match={matches[2]} />
				<Card match={matches[3]} />
				<Card match={matches[4]} />
			</S.History>
		</S.Container>
	);
};

export default History;
