import * as S from './History.styles';
import * as F from 'styles/font.styles';
import Card from './Card';
import {Empty} from 'antd';

interface IMatch {
	user: string;
	myScore: number;
	userScore: number;
	id: number;
	date: Date;
}

// prettier-ignore
const matches: IMatch[] = [
	{id: 23, user: 'Melato', myScore: 5, userScore: 8, date: new Date},
	{id: 27, user: 'Harmour', myScore: 5, userScore: 6, date: new Date('2023-03-12T19:30:00.000Z')},
	{id: 24, user: 'Lemoir', myScore: 10, userScore: 3, date: new Date('2023-03-09T18:45:00.000Z')},
	{id: 25, user: 'Bess', myScore: 7, userScore: 5, date: new Date('2023-03-08T20:00:00.000Z')},
	{id: 26, user: 'Gready', myScore: 5, userScore: 6, date: new Date('2023-03-07T19:30:00.000Z')},
];

const History = () => {
	let isEmpty: boolean = true;
	if (matches.length >= 1) {
		isEmpty = false;
	}

	return (
		<S.Container>
			<F.Subtitle weight="700" fontSize="30px">
				Last Matches
			</F.Subtitle>
			<S.History empty={isEmpty}>
				{!isEmpty &&
					matches.map((match: IMatch) => <Card match={match} key={match.id} />)}
				{isEmpty && <Empty className="empty" description="No matches played" />}
			</S.History>
		</S.Container>
	);
};

export default History;
