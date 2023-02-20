import styled from 'styled-components';
import Federation from '../../assets/federation_bg.png';
import Alliance from '../../assets/alliance_bg.png';
import Assembly from '../../assets/assembly_bg.png';
import Order from '../../assets/order_bg.png';
import {Link} from 'react-router-dom';

interface IProfile {
	coalition?: string;
}

// prettier-ignore
export const Profile = styled.div<IProfile>`
	background-image: url(${(p) => p.coalition === 'Federation' ? Federation : (p) => p.coalition === 'Order' ? Order: (p) => p.coalition === 'Assembly'? Assembly: (p) => p.coalition === 'Alliance' ? Alliance: Federation});
	background-position: left;
	height: 250px;
	color: white;

	display: flex;
	align-items: center;
	gap: 64px;
	padding: 16px 96px;
	box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;`;

export const Avatar = styled.img`
	width: 192px;
	height: 192px;
	border-radius: 50%;
	border: 1px solid white;
`;

export const VDiv = styled.div`
	display: flex;
	flex-direction: column;

	.rank {
		color: #ffbf00;
	}
`;

export const VDivLink = styled(Link)`
	text-decoration: none;
	color: white;
	display: flex;
	flex-direction: column;

	.rank {
		color: #ffbf00;
	}
`;
