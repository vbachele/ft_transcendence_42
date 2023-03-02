import { IUser } from "types/models";
import * as S from "./Leaderboard.styles";
import * as F from "styles/font.styles";
import * as UI from "styles/buttons.styles";

interface IProps {
  user: IUser;
  rank: string;
}

const MiniRank = ({ user, rank }: IProps) => {
  return (
    <S.MiniRank to={`/dashboard/${user.name}`}>
      <F.Text>{rank}</F.Text>
      <S.User>
        <S.Avatar src={user.image} />
        <F.Text weight="500">{user.name}</F.Text>
      </S.User>
      <F.Text className="score" weight="500">
        {user.score} pts
      </F.Text>
    </S.MiniRank>
  );
};

export default MiniRank;
