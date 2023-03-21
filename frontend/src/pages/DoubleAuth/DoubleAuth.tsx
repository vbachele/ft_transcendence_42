import Submit from './components/Submit';
import * as F from 'styles/font.styles';
import * as S from './DoubleAuth.styles';
import {useUserInfos} from 'contexts/User/userContent';

const DoubleAuth = () => {
	const {email} = useUserInfos();

	return (
		<S.Container>
			<div>
				<F.H2>Two authentication factor</F.H2>
				<F.Subtitle>
					For added security, please enter the code sent to {email.email}
				</F.Subtitle>
			</div>
			<Submit />
		</S.Container>
	);
};

export default DoubleAuth;
