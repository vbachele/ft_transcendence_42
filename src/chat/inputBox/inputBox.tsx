
import React, { useState } from 'react'
import './inputBox.css'

interface IProps {
    placeHolder: string;
}

const InputBox:React.FC<IProps> = (props) => {

    const [description, setDescription] = useState('');

    return (
        <textarea 
            cols={20}
            rows={4} 
            value={description} 
            className="firstBoxText"
            placeholder={props.placeHolder} 
            onChange={e => setDescription(e.target.value)}>
        </textarea>
	  )
}

export default InputBox