import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import InputBox from './InputBox';

const ModalChanPass: React.FC = () => {
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
                <h1 color={'black'}>#Boomers</h1>
            </div>}        
        centered
        width={'393px'}
        open={isModalOpen}
        onOk={handleOk} 
        onCancel={handleCancel}>
            <p> This channel is protected by a password.</p>
            <div className="channelText"> Password </div>
            <InputBox placeHolder='●●●●●●●●●●●'/>                 
      </Modal>
    </>
  );
};

export default ModalChanPass;