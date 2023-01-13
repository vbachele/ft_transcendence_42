import BackButton from 'components/Buttons/BackButton'
import Nav from 'components/NavBar/Notlogged'
import { H2Title, NormalText, Subtitle } from 'components/Text'
import React, { useRef, useState } from 'react'
import './styles.css'
import { SecondaryButton } from 'components/Buttons'
import { UploadAvatar } from 'components/UploadAvatar'
import UpdateNickname from 'components/UpdateNickname'



const RegistrationPage = () => {
  return (
    <div className="RegistrationPage">
      <Nav></Nav>
      <BackButton></BackButton>
      <div className="CreateYourProfile">
        <H2Title >Create Your Profile</H2Title>
        <Subtitle display="none">Here you are going to HELL</Subtitle>
        <UploadAvatar></UploadAvatar>
        <UpdateNickname></UpdateNickname>
      </div>
    </div>
  )
}

export default RegistrationPage