import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import {BsFillCameraFill} from 'react-icons/bs';
import axios from 'axios';
import {api} from 'lib/api';
import UserContext from 'components/Context/userContent';
import PictureContext from 'components/Context/pictureContent';

const CameraLayout = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 12px;
	gap: 10px;

	left: 55%;
	right: 00%;
	top: -40%;
	bottom: 0%;
	width: 20px;
	height: 20px;

	/* Sidebar background */

	background: var(--font-color);
	border-radius: 56px;
	position: relative;
`;

export const CameraLayout__CameraIcon = styled(BsFillCameraFill)`
	width: 20px;
	height: 20px;
	color: var(--background-color);
`;

export const Camera = () => {
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
		<CameraLayout>
			<label htmlFor="file-input">
				<CameraLayout__CameraIcon />
			</label>
			<input
				type="file"
				id="file-input"
				onChange={handleChange}
				accept="image/*"
			/>
		</CameraLayout>
	);
};

export default Camera;
