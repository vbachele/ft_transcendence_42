import React from 'react'
import DefaultAvatar from 'Components/UploadAvatar/Images/DefaultAvatar.png'
import * as fs from 'fs';
import { backend } from 'Lib/backend';

export const storeFirstNicknameDataBase = async () => {
	
		const userObject = {
		name: "Vincent",
		image: ""
	}

	const user = await backend.createUser(userObject);
	//   fetch('http://localhost:3000/users', {
	// 	method: 'POST',
	// 	body: JSON.stringify({
	// 			name: "Vincent",
	// 			image: ""
	// 		  }),
	// 	headers: {
	// 	  'Content-Type': 'application/json'
	// 	}
	//   })
		// .then(response => response.json())
	}

const storeNicknameDataBase = (value:string) => {
	{
	//   const data = {
	// 	name: value
	//   };
	  
	//   fetch('http://localhost:3000/users/1', {
	// 	method: 'PUT',
	// 	body: JSON.stringify(data),
	// 	headers: {
	// 	  'Content-Type': 'application/json'
	// 	}
	//   })
	// 	.then(response => response.json())
	  }
	}

export default storeNicknameDataBase