import * as S from './History.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import Card from './Card';
import {IUser} from 'types/models';

interface IMatch {
	user: string;
	myScore: number;
	userScore: number;
	id: number;
}

// prettier-ignore
const matches: IMatch[] = [
	{"id":23,"user":"Minnis",myScore:5,userScore:8},
	{"id":24,"user":"Dalston",myScore:10,userScore:3},
	{"id":25,"user":"Toppin",myScore:7,userScore:5},
	{"id":26,"user":"Coleman",myScore:5,userScore:6},
	{"id":27,"user":"Helder",myScore:8,userScore:9},
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
