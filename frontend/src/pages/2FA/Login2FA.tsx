import {useNavigate} from 'react-router-dom';
import * as F from 'styles/font.styles';
import * as S from './Login2FA.styles';
import Submit2FA from './components/Inputs/Submit/Submit2FA';

const DoubleAuthentication = () => {
	const navigate = useNavigate();

	return (
		<S.Container>
			<S.Container__Text>
				<F.H2>Two authentication factor</F.H2>
				<F.Subtitle>For added security, please enter this code</F.Subtitle>
			</S.Container__Text>
			<Submit2FA />
		</S.Container>
	);
};

export default DoubleAuthentication;
