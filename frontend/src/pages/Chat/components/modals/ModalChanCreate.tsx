import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import InputBox from './InputBox';

const ModalChanCreate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal 
		title= {
            <div style={{display: 'flex'}}>
                <h1 color={'black'}>Create channel</h1>
            </div>}        
        centered
        width={'393px'}
        open={isModalOpen}
        onOk={handleOk} 
        onCancel={handleCancel}>
            <p> Channel name*</p>
            <InputBox placeHolder='#new-channel'/>
            <p> Description</p>
            <InputBox placeHolder='Channel description...'/>
            <p> Password (optionnal)</p>
            <InputBox placeHolder='●●●●●●●●●●●'/>                 
      </Modal>
    </>
  );
};

export default ModalChanCreate;