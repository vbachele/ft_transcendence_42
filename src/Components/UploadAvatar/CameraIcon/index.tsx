import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {BsFillCameraFill} from 'react-icons/bs'

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
	const [image, setImage] = React.useState<string | undefined>(); 

	const handleChange:React.ChangeEventHandler<HTMLInputElement>  = (event) => {
	{
		if (!event.target.files) // to secure if the file of the event is null
			return;
		const file = event.target.files[0];
		const imgUrl = URL.createObjectURL(file);
		setImage(imgUrl);
	}
	}
	/// Here I store the data by adding a key/value in the local storage of the browser to be sure to have access to it
	useEffect(() => {
		document.querySelector('#file-input')?.addEventListener('change', (event) => {
			const reader = new FileReader(); // FileReader va convertir the file into a dataURL zhich contains information about actual file

			if (event.target instanceof HTMLInputElement && event.target.files && event.target.files.length > 0)
			{
				reader.readAsDataURL(event.target.files[0]) 
			}
			reader.addEventListener("load", () => {
				console.log(reader.result);
				if (reader.result != null) {
					localStorage.setItem("ProfilePicture", reader.result as string);
				}
			})

			// document.addEventListener("DOMContentLoaded", () => { 
			// 	console.log("WORKAS")
			// 	const recentimg = localStorage.getItem("recent-image");
			// 	if (recentimg)
			// 		console.log("WORKAS")
			// 		document.querySelector("#imgPreview")?.setAttribute("src", recentimg as string);
			// })
			// const reader = new FileReader();
			// if (images.files){
			// 	const values = reader.readAsDataURL(images.files[0]);
			// }
			// 
			// 		{
			// 			localStorage.setItem("ProfilePicture", JSON.stringify(url));
			// 		}
			// })
		});
	}, [image]);
	  
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

export default CameraLayout