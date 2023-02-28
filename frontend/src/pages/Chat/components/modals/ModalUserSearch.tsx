import { Modal } from 'antd';
import ActivityStatus from 'components/ActivityStatus';
import MessagesContext from 'contexts/Chat/MessagesContext';
import useFetchUsers from 'hooks/useFetchUsers';
import React, { useContext, useState } from 'react';
import * as F from 'styles/font.styles';
import { IUser } from 'types/models';
import * as S from '../../Chat.styles';

interface IProps {
	friend: IUser;
}

export const Users = ({friend}: IProps) =>{
    return(
        <S.Friend>
            <img className="avatar" src={friend.image} />
            <div style={{textAlign: 'left'}}>
                <F.H5>{friend.name}</F.H5>
                <ActivityStatus state={friend.status} />
            </div>
        </S.Friend>
    )
  }

const ModalUserSearch: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { setIsPopupClicked } = useContext(MessagesContext);
  const {data, isLoading, error} = useFetchUsers();

  const handleOk = () => {
    setIsModalOpen(false);
    setIsPopupClicked(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsPopupClicked(false);
  };

  return (
      <>
      <Modal 
		title= {
            <div style={{display: 'flex'}}>
                <h1 color={'black'}>Users</h1>
            </div>}        
        centered
        width={'393px'}
        open={isModalOpen}
        onOk={handleOk} 
        onCancel={handleCancel}
        >
        {data
        ?.map((player: IUser) => {
            return <Users friend={player}/>
        }
        )}
                        
      </Modal>
    </>
  );
};

export default ModalUserSearch;