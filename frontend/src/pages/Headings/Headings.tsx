import {openNotification} from 'helpers/openNotification';
import * as F from 'styles/font.styles';

const Headings = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				marginTop: '32px',
			}}
		>
			<F.H1 style={{marginBottom: '64px'}}>Test Page</F.H1>
			<button onClick={() => openNotification('info', 'msg')}>click</button>
		</div>
	);
};

export default Headings;
