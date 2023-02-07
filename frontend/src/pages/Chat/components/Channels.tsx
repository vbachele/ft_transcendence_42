import React, {useEffect, useState} from 'react';
import {IChannels} from '../data';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';

interface IProps {
	data: IChannels;
}

const Channels = ({data}: IProps) => {
	return (
		<S.ContainerChannel>
			<F.Text className='hover' style={{fontWeight: 500}}> #{data.name} </F.Text>
		</S.ContainerChannel>
	);
};

export default Channels;
