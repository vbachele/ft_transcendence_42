import { Modal } from 'antd';
import ActivityStatus from 'components/ActivityStatus';
import MessagesContext from 'contexts/Chat/MessagesContext';
import useFetchUsers from 'hooks/useFetchUsers';
import React, { FormEvent, useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import * as F from 'styles/font.styles';
import { IUser } from 'types/models';
import * as S from '../../Chat.styles';
import { displayText } from '../messages/Message';
import { displayPastille } from '../messages/RightBarDirectMessages';
import SearchBox from './SearchBox';
import SearchBoxChat from './SearchBoxChat';

interface IProps {
	friend: IUser;
}

export const ContainerMessage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    transition: all 0.2s linear;

    :hover {
        cursor: pointer;
        transform: scale(1.1);
        /* padding: 4px; */
        /* background-color: ${(p) =>
            p.theme.name === 'light' ? '#e5e7eb' : '#242526'}; */
    }
`;

export const displayName = ({friend}: IProps) => {
  const theme = useContext(ThemeContext);

  if (theme.name === 'dark')
      return (
          <S.ContainerSubMessages>
              <F.Text style={{fontWeight: 600}}> {friend.name} </F.Text>
          </S.ContainerSubMessages>
      );
      else
          return (
              <S.ContainerSubMessages>
                  <F.Text style={{fontWeight: 600}}> {friend.name} </F.Text>
              </S.ContainerSubMessages>
          );
}

export const displayStatus = (params: string) => {
  if (params == "online")
      return (
          <S.PastillePic style={{background: '#2FE837'}} />
      );
  else if (params == "offline")
      return (
          <S.PastillePic style={{background: '#9CA3AF'}} />
      );
  else
      return (
          <S.PastillePic style={{background: '#EB5757'}} />
      );
};

export const Users = ({friend}: IProps) =>{
    return(
        <ContainerMessage>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div style={{width: '48px', height: '48px', position: 'relative'}}>
                <S.ProfilePic src={friend.image} />
                {displayStatus(friend.status)}
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2px', padding: '6px 0 0 8px'}}>
                {displayName({friend})}
            </div>
          </div>
        </ContainerMessage>
    )
  }

const ModalUserSearch: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { setIsPopupClicked } = useContext(MessagesContext);
  const {data, isLoading, error} = useFetchUsers();
  const [search, setSearch] = useState<string>('');

  function handleChange(event: FormEvent<HTMLInputElement>) {
      setSearch(event.currentTarget.value);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsPopupClicked(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsPopupClicked(false);
  };

  let filter = new RegExp(`^.*${search}.*`, 'i');

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
        bodyStyle={{ overflow: 'hidden' }}
        >
        <SearchBox value={search} setValue={handleChange}/>
        {data
          ?.filter((message) => {
				  	return filter.test(message.name)
				  })
          .map((player: IUser) => {
              return <Users friend={player}/>
          }
        )}
      </Modal>
    </>
  );
};

export default ModalUserSearch;