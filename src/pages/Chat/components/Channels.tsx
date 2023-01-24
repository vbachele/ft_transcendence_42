import React, {useEffect, useState} from 'react';
import {IChannels} from '../data';
import * as F from 'styles/font.styles';
import * as S from '../Chat.styles';
import './styles.css';

interface IProps {
	channels: IChannels[];
}

const Channels = ({channels}: IProps) => {
	return (
		<div className="channelsContainer">
			{channels.map((chans: IChannels) => (
				<F.Text style={{padding: '0px 0px 16px 0px'}}> #{chans.name} </F.Text>
			))}
		</div>
	);
};

export default Channels;
