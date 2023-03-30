import ModalChanCreate from '../modals/ModalChanCreate';
import {useState} from 'react';
import ModalUserSearch from '../modals/ModalUserSearch';
import * as S from './components.styles';
import useFetchUsers from '../../../hooks/useFetchUsers';
import {useUserInfos} from '../../../contexts/User/userContent';
import Plus from '../assets/Plus';

interface NewDiscussionProps {
	type: 'channel' | 'direct_message';
}

function NewDiscussion({type}: NewDiscussionProps) {
	const [displayModal, setDisplayModal] = useState(false);
	const {userName} = useUserInfos().userName;
	const {data} = useFetchUsers();

	return (
		<S.NewDiscussion onClick={() => setDisplayModal(true)}>
			<Plus />
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
						userList={data?.filter((user) => user.name !== userName)!}
						type={'newDirectMessage'}
					/>
				))}
		</S.NewDiscussion>
	);
}

export default NewDiscussion;
