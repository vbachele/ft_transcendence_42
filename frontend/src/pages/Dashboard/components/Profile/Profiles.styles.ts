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
	color: white;

	display: flex;
	align-items: center;
	gap: 64px;
	padding: 16px 96px;
	box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

	.ranks-div {
		display: flex;
		flex-direction: row;
		gap: 48px;
	}

	.antd-space {
		width: fit-content;
		cursor: pointer;
		margin-top: 16px;
	}

	@media screen and (max-width: 1600px) {
		.ranks-div {
			display: flex;
			flex-direction: column;
			gap: 16px;
			text-align: center;
		}
	}

	@media screen and (max-width: 768px) {
		flex-direction: column;
		gap: 32px;

		.name {
			align-items: center;
		}

		.ranks-div {
		 flex-direction: row;
		}
	}
`;

export const Avatar = styled.img`
	width: 192px;
	height: 192px;
	border-radius: 50%;
	box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

	@media screen and (max-width: 1280px) {
		width: 128px;
		height: 128px;
	}
`;

export const VDiv = styled.div`
	display: flex;
	flex-direction: column;
	word-break: break-all;

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

export const OptionButton = styled.button`
	border: none;
	background: none;
	width: 100%;
	text-align: left;
	cursor: pointer;
`;
