import React, { useState } from 'react'
import '../style.css'
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';

interface IProps {
    placeHolder: string;
}

const InputBox:React.FC<IProps> = (props) => {


    return (
        <S.Input
            type="text"
            className='firstBoxText'
            // value={description}
            placeholder={props.placeHolder}
            // minLength={1}
            // maxLength={8}
            required
        />
	  )
}

export default InputBox