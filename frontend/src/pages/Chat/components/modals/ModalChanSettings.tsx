import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import InputBox from './InputBox';
import * as F from 'styles/font.styles';
import * as S from '../../Chat.styles';
import '../style.css';


const ModalChanSettings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal 
			  title= {
            <div style={{display: 'flex'}}>
            <F.H1 color={'black'}>#Boomers</F.H1>
            </div>}
        style= {{padding: '24px', gap: '24px'}}
        centered
        width={'393px'}
        open={isModalOpen}
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button key="back" style={{border: 'none'}} onClick={handleCancel}>
            Cancel
          </Button>,
        ]}>
          <F.H5 style={{fontWeight: 600}}> Description </F.H5>
          <div style={{marginBottom: '24px', padding: '8px 21px 32px', border: "1px solid #E6E6E6", background: '#F9F9F9', borderRadius:'5px'}}> This channel is a shelter for Boomers around the world. </div>           
          <F.H5 style={{fontWeight: 600}}> Channel privacy </F.H5>
          <div style={{marginBottom: '32px', padding: '8px 21px 8px', border: "1px solid #E6E6E6", background: '#F9F9F9', borderRadius:'5px'}}> Privacy </div>           
      </Modal>
    </>
  );
};

export default ModalChanSettings;