import BackButton from 'Components/Buttons/BackButton'
import Nav from 'Components/NavBar'
import { H2Title, NormalText, Subtitle } from 'Components/Text'
import React, { useRef, useState } from 'react'
import './index.css'
import { SecondaryButton } from 'Components/Buttons'
import { UploadAvatar } from 'Components/UploadAvatar'
import UpdateNickname from 'Components/UpdateNickname'



const RegistrationPage = () => {
  return (
    <div className="RegistrationPage">
      <Nav></Nav>
      <BackButton></BackButton>
      <div className="CreateYourProfile">
        <H2Title >Create Your Profile</H2Title>
        <Subtitle display="none">Ajout subtitle pour préciser l’action souhiatée</Subtitle>
        <UploadAvatar></UploadAvatar>
        <UpdateNickname ></UpdateNickname>
      </div>
    </div>
  )
}

export default RegistrationPage