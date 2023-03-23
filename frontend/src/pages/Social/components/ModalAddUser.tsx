import {Modal} from 'antd';
import React, {FormEvent, useEffect, useState} from 'react';
import {IUser} from 'types/models';
import * as S from 'pages/Chat/components/components.styles';
import User from './User';
import filterByName from 'helpers/filterByName';

interface ModalAddUserProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	userList: IUser[];
	onAdd: (user: IUser) => void;
	search: string;
	onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ModalAddUser({
	isModalOpen,
	setIsModalOpen,
	userList,
	onAdd,
	search,
	onSearch,
}: ModalAddUserProps) {
	function onCancel(event: React.MouseEvent) {
		event.stopPropagation();
		setIsModalOpen(false);
	}
	console.log('sasas');

	return (
		<Modal
			title={<h1>Users</h1>}
			centered
			width={'393px'}
			open={isModalOpen}
			onCancel={onCancel}
			footer={null}
			bodyStyle={{maxHeight: '75vh', overflowY: 'auto', overflowX: 'hidden'}}
		>
			<S.InputSearch
				placeholder={'Search user'}
				value={search}
				onChange={onSearch}
				size={'large'}
			/>
			{userList
				.filter((user) => filterByName(user, search))
				.map((player: IUser, index) => {
					return <User key={index} user={player} onAdd={onAdd} />;
				})}
		</Modal>
	);
}

export default ModalAddUser;
