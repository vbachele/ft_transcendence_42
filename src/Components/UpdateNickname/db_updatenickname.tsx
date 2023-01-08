import React from 'react'
import DefaultAvatar from 'Components/UploadAvatar/Images/DefaultAvatar.png'
import * as fs from 'fs';
import { backend } from 'Lib/backend';
import { api } from 'Lib/api';

export const storeFirstNicknameDataBase = async () => {
	const user = await backend.createUser(
	{
		name: "Vincent",
		image: "",
		logged: false,
		id: ""
	}
	);
	localStorage.setItem("id", user.id)
}


export default storeFirstNicknameDataBase