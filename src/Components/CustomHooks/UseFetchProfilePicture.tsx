import { api } from 'Lib/api';
import React from 'react'
import { useState, useEffect } from "react";

// async function fetchIDJson(url:string) {

// 	fetch(url)
// 	const response = await fetch(url);
// 	const data = await response.json();
//   	return data.name;
// }

// async function fetchPictureJson(url:string) {

// 	fetch('http://localhost:3000/1')
// 	const response = await fetch('http://localhost:3000/1');
// 	  const data = await response.json();
//   	return data.image;
// }

// Here I create a customHook to fetch the information about the profilepictureoftheuser a response that I transform to a json
const UseFetchProfilePicture = (url:string) => {
		// const [imageUrl, setImageUrl] = useState<string>('');
		
		// fetch('http://localhost:3000/users/1')
		// .then(response => response.json())
		// .then(data => console.log(data));


		// api.get('http://localhost:3000/users/1')


		// useEffect(() => {
		// })
		// .then(data => console.log(data));
			// fetch(url)
			// .then(response => response.json())
			// // .then(data => {
			// // 	const imageID = data[data.length - 1].id
			// // 	fetchPictureJSON(imageID)
			// 	.then(data => {
			// 		const imageData = data.image;
			// 		try 
			// 		{
			// 			const imageObject = JSON.parse(imageData);
			// 			setImageUrl(URL.createObjectURL(imageObject));
			// 		} catch (error) 
			// 		{
			// 			setImageUrl(imageData);
			// 		}
			// 	// })
			// });
	// }, []);
  return [];
}

export default UseFetchProfilePicture