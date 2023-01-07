import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {BsFillCameraFill} from 'react-icons/bs'
import storeProfilePicture from '../db_uploadicon'

const CameraLayout= styled.div `
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
	
`

export const CameraLayout__CameraIcon= styled(BsFillCameraFill)`
	width: 20px;
	height: 20px;
	color: var(--background-color);
`

export const Camera = () => {
	// const [image, setImage] = React.useState<string | undefined>(); 

	const handleChange:React.ChangeEventHandler<HTMLInputElement>  = (event) => {
		const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
		const formData = new FormData();
		if (fileInput.files)
			formData.append('image', fileInput.files[0]);
		formData.append('test', 'works');
		const request = new XMLHttpRequest();
		request.open('POST', 'http://localhost:3000/users');
		request.setRequestHeader('Content-Type', 'multipart/form-data');
		request.send(formData);

		// this function is to test
		request.onreadystatechange = function() {
			if (request.readyState === 4) {
			  console.log(request.responseText);
			}
		  };
		// if (!event.target.files) // to secure if the file of the event is null
		// 	return;
		// const file = event.target.files[0];
		// const imgUrl = URL.createObjectURL(file);
		// setImage(imgUrl);
	}
	/// Here I store the data by adding a key/value in the local storage of the browser to be sure to have access to it
	// useEffect(() => {
	// 	document.querySelector('#file-input')?.addEventListener('change', (event) => {
	// 		const reader = new FileReader(); // FileReader va convertir the file into a dataURL zhich contains information about actual file

	// 		if (event.target instanceof HTMLInputElement && event.target.files && event.target.files.length > 0)
	// 		{
	// 			reader.readAsDataURL(event.target.files[0]) 
	// 		}
	// 		reader.addEventListener("load", () => {
	// 			if (reader.result != null) {
	// 				storeProfilePicture(reader.result as string);
	// 			}
	// 		})
	// 	});
	// }, [image]);
	  
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
	
  )
}

export default Camera