import { BsFillInfoCircleFill } from "react-icons/bs";
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
			overlayStyle={{
				maxWidth: "40vw"
			  }}
			content={props.description}
			placement="right"
		>
		<BsFillInfoCircleFill></BsFillInfoCircleFill>
	</Popover>
  )
}

export default ModalDescription