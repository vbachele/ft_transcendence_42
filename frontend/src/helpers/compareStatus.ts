import {IUser} from 'types/models';

interface IStatusOrder {
	[status: string]: number;
}

const statusOrder: IStatusOrder = {
	ingame: 0,
	online: 1,
	offline: 2,
};

function compareStatus(a: IUser, b: IUser) {
	const aStatus = statusOrder[a.status];
	const bStatus = statusOrder[b.status];
	return aStatus - bStatus;
}

export default compareStatus;
