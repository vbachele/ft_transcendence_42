import { Camera} from 'Components/UploadAvatar/CameraIcon'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DefaultAvatar from 'Components/UploadAvatar/Images/DefaultAvatar.png'
import { NormalText, Subtitle } from 'Components/Text'
import UserAvatarIcon from './Avatar'

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

`

const UploadAvatarLayout__AddPictureLayout = styled.div`
	
	height: 88px;
	left: 20px;
	top: 20px;
`

export const UploadAvatar = () => {
	// const [items, setItems] = React.useState([]);

	// useEffect(() => {
	// 	const  dataURL = localStorage.getItem("ProfilePicture");
	// 	// console.log(value);
	// 	if (dataURL !== null)
	// 	{
	// 		const items = JSON.parse(dataURL);
	// 	}
	// 	if (items) {
	// 	 setItems(items);
	// 	}
	//   }, []);
  return (
	<UploadAvatarLayout>
		<UploadAvatarLayout__AddPictureLayout>
			<UserAvatarIcon src={DefaultAvatar}/>
			<Camera></Camera>
		</UploadAvatarLayout__AddPictureLayout>
		<div>
            <NormalText className='UploadAvatarLayout__Text'> vbachele </NormalText>
		    <Subtitle color='#666666' fontWeight='400'> Federation </Subtitle>
			{/* <img id="imgPreview" src="dataURL" alt="previewImage"></img> */}
        </div>
	</UploadAvatarLayout>
  )
}



export default UserAvatarIcon