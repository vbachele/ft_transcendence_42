import { SecondaryButton } from 'components/Buttons'
import { NormalText } from 'components/Text'
import React, { ChangeEventHandler, Component, useContext, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import { backend } from 'Lib/backend'
import { useNavigate } from 'react-router-dom';
import UserContext from 'components/Context/userContent'
import FieldNickname, { NicknameForm } from './input'


const UpdateNickname: React.FC = () => {

  // const [value, setValue] = useState('');
  let navigate = useNavigate(); // Use navigate allow to take the Route and to navigate to other page
  // const userContext = useContext(UserContext);
  
  // const handleChange:ChangeEventHandler<HTMLInputElement> = (event) =>
  // {
  //   userContext.setUser({nickname: event.target.value})
  //   setValue(event.target.value);
  // };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // backend.updateUser({name : userContext?.user?.nickname});
    backend.updateLogStatus({logged:true});
    navigate('/login-page');
  };

  return (
      <NicknameForm className='NicknameForm' onSubmit={handleSubmit}>
        <FieldNickname></FieldNickname>
        <SecondaryButton type='submit'>Continue</SecondaryButton>
  
      </NicknameForm>
  )
}

export default UpdateNickname