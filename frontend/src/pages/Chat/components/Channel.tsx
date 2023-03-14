import React, {useEffect, useState} from 'react';
import {IChannels} from '../data';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import useContext from 'react';
import MessagesContext from 'contexts/Chat/ChatContext';

interface IProps {
	data: IChannels;
	onClick: (isClicked: boolean) => void;
}

const Channel: React.FC<IProps> = (props) => {
    const handleClick = () => {
        props.onClick(true);
      };

	return (
		<S.ContainerChannel onClick={handleClick}>
			<F.Text className='hover' style={{fontWeight: 500}}> #{props.data.name} </F.Text>
		</S.ContainerChannel>
	);
};

export default Channel;
