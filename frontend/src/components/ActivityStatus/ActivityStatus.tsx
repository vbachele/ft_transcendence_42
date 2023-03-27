import * as S from './ActivityStatus.styles';
import * as F from 'styles/font.styles';
import {useContext, useEffect, useState} from 'react';
import {IUser} from 'types/models';
import SocketContext from 'contexts/Socket/context';

interface IProps {
	user: IUser;
	weight?: string;
	size?: string;
	updateStatus?: React.Dispatch<React.SetStateAction<string>>;
}

const stateEnumLookup: {[key: string]: string} = {
	online: 'Online',
	ingame: 'In Game',
	offline: 'Offline',
};

function ActivityStatus({user, weight, size, updateStatus}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;

	const [status, setStatus] = useState(user.status);
	const output: string = stateEnumLookup[status];

	useEffect(() => {
		socket?.on('update_status', (data: any) => {
			if (data.user === user.name) {
				setStatus(data.status);
				if (updateStatus) {
					updateStatus(data.status);
				}
			}
		});

		return () => {
			socket?.off('update_status');
		};
	}, [socket]);

	return (
		<S.Status state={status}>
			<span></span>
			<F.Text weight={weight || '500'} fontSize={size}>
				{output}
			</F.Text>
		</S.Status>
	);
}

export default ActivityStatus;
