import React, {useContext} from 'react';
import {api} from 'lib/api';
import UserContext from 'contexts/User/userContent';
import PictureContext from 'contexts/User/pictureContent';
import {BsFillCameraFill as Icon} from 'react-icons/bs';
import * as S from '../EditAvatar.styles';

export const SelectFile = () => {
	// const handleChange:React.ChangeEventHandler<HTMLInputElement>  = (event) => {
	const userContext = useContext(UserContext);

	const getBase64 = (file: File) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;

		if (file) {
			const uploadfile = getBase64(file).then((base64) => {
				const upload = {image: base64};
				api.patch('/users/1', upload);
				// Save the base64 data to a JSON file or to your state
			});

			const pictureContext = useContext(PictureContext);
			pictureContext.setPicture(uploadfile);
			console.log(pictureContext.picture);
		}
	};

	// Here I create a label for my cameraIcon and create an input, by giving an id with the name of my labe
	// I can put the input in my image

	return (
		<label htmlFor="file-input">
			<S.SelectFileIcon>
				<Icon />
			</S.SelectFileIcon>
			<input
				type="file"
				id="file-input"
				onChange={handleChange}
				accept="image/*"
				style={{display: 'none'}}
			/>
		</label>
	);
};

export default SelectFile;
