import {Camera} from 'components/UploadAvatar/UploadIcon';
import styled from 'styled-components';
import DefaultAvatar from 'components/UploadAvatar/Images/DefaultAvatar.png';
import {NormalText, Subtitle} from 'styles/font.styles';
import UserAvatarIcon from 'components/UploadAvatar/Avatar';

const UploadAvatarLayout = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px;
	gap: 32px;
	/* height: 88px; */

	/* Inside auto layout */

	flex: none;
	order: 0;
	align-self: stretch;
	flex-grow: 0;
	margin-top: 64px;
	@media only screen and (max-width: 768px) {
		margin-top: 16px;
	}
`;

const UploadAvatarLayout__AddPictureLayout = styled.div`
	height: 88px;
	left: 20px;
	top: 20px;
`;

export const UploadAvatar = () => {
	const test =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEgSURBVHgBtZWtbgJBFIVP+wTVrShNk5qairapbE1FTSubKtIn4BEqKhBoSDCgsOCQBIFAYUGQJSRY/hwJZDk3OyQb2GEH9vIlX7KTnZy7dzIzC9i5oBnaoD0o80sn1DeWoEg+FCwOaApKVLbCxQKU+I8IF5+gwIslfAElOpYCHhSwfb1KgXP6vef9JRRow96B+IoESAd3MXM+kBA/xhkSHjTfwQaCbo/CcyxSxmFc0S95qDkWEPtwW653OqIrGWQOKLCxStP0AcG1Ll97b7JaoXl1mAnTI4q4+LNpKXuCcC+8ZtLFULnAzg3xrBj+BwtphfAcYniE+9kIO0ewi5xIIfjRLx3DZTveRgWdYT/X9I1+0hszlitjTLu0SYtmHMkaVknx6meMoiYAAAAASUVORK5CYII=';
	return (
		<UploadAvatarLayout>
			<UploadAvatarLayout__AddPictureLayout>
				<UserAvatarIcon src={DefaultAvatar} />
				<Camera></Camera>
			</UploadAvatarLayout__AddPictureLayout>
			<div>
				<NormalText className="UploadAvatarLayout__Text"> vbachele </NormalText>
				<Subtitle color="#666666" fontWeight="400">
					{' '}
					Federation{' '}
				</Subtitle>
			</div>
		</UploadAvatarLayout>
	);
};

export default UploadAvatar;
