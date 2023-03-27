import {Popover } from 'antd'
import React from 'react'
import * as S from '../components/components.styles';

interface Iprops {
	description : string;
}

const ModalDescription = (props : Iprops) => {
  return (
	<Popover
			title="description"
			content={props.description}
			placement="right"
		>
		<S.infoIcon></S.infoIcon>
	</Popover>
  )
}

export default ModalDescription