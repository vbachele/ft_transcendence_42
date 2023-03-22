import styled from 'styled-components';
import ModalChanCreate from '../modals/ModalChanCreate';
import {useState} from 'react';
import ModalUserSearch from '../modals/ModalUserSearch';
import * as S from './components.styles'
import useFetchUsers from '../../../hooks/useFetchUsers';



interface NewDiscussionProps {
	type: 'channel' | 'direct_message';
}

function NewDiscussion({type}: NewDiscussionProps) {
	const [displayModal, setDisplayModal] = useState(false);
	const {data} = useFetchUsers();

	return (
		<S.NewDiscussion onClick={() => setDisplayModal(true)}>
			<svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M6.00006 8.00049V14.0005H8.00006V8.00049H14V6.00049H8.00006V0.000488281H6.00006V6.00049H0V8.00049H6.00006Z"
					fill="currentColor"
				/>
			</svg>
			{displayModal &&
				(type === 'channel' ? (
					<ModalChanCreate
						isModalOpen={displayModal}
						setIsModalOpen={setDisplayModal}
					/>
				) : (
					<ModalUserSearch
						isModalOpen={displayModal}
						setIsModalOpen={setDisplayModal}
						userList={data!}
						type={'newDirectMessage'}
					/>
				))}
		</S.NewDiscussion>
	);
}

export default NewDiscussion;
