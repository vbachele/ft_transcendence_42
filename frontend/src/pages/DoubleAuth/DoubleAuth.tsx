import Submit from './components/Submit';
import * as F from 'styles/font.styles';
import * as S from './DoubleAuth.styles';

const DoubleAuth = () => {
	return (
		<S.Container>
			<div>
				<F.H2>Two authentication factor</F.H2>
				<F.Subtitle>For added security, please enter this code</F.Subtitle>
			</div>
			<Submit />
		</S.Container>
	);
};

export default DoubleAuth;
