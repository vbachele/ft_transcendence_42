import {Modal} from 'antd';
import useFetchUsers from 'hooks/useFetchUsers';
import React, {FormEvent, useState} from 'react';
import {IUser} from 'types/models';
import User from '../components/User';
import * as S from '../components/components.styles';

export const displayStatus = (params: string) => {
	if (params == 'online')
		return <S.PastillePic style={{background: '#2FE837'}} />;
	else if (params == 'offline')
		return <S.PastillePic style={{background: '#9CA3AF'}} />;
	else return <S.PastillePic style={{background: '#EB5757'}} />;
};

interface ModalUserSearchProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalUserSearch({isModalOpen, setIsModalOpen}: ModalUserSearchProps) {
	const {data} = useFetchUsers();
	const [search, setSearch] = useState<string>('');

	function handleChange(event: FormEvent<HTMLInputElement>) {
		setSearch(event.currentTarget.value);
	}

	function onCancel(event: React.MouseEvent) {
		event.stopPropagation();
		setIsModalOpen(false);
	}

	let filter = new RegExp(`^.*${search}.*`, 'i');

	return (
		<Modal
			title={<h1 color={'black'}>Users</h1>}
			centered
			width={'393px'}
			open={isModalOpen}
			onCancel={onCancel}
			footer={null}
			bodyStyle={{maxHeight: '75vh', overflowY: 'auto', overflowX: 'hidden'}}
		>
			<S.InputSearch
				placeholder={'Search user'}
				onChange={handleChange}
				size={'large'}
			/>
			{data
				?.filter((message) => {
					return filter.test(message.name);
				})
				.map((player: IUser, index) => {
					return (
						<User key={index} user={player} setIsModalOpen={setIsModalOpen} />
					);
				})}
		</Modal>
	);
}

export default ModalUserSearch;
