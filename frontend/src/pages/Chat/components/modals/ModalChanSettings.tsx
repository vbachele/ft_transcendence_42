import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import InputBox from './InputBox';


const ModalChanSettings: React.FC = () => {
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
            <h1 color={'black'}>#Boomersd</h1>
            </div>}        
        centered
        width={'393px'}
        open={isModalOpen}
        onOk={handleOk} 
        onCancel={handleCancel}>
          <div className="channelText"> Description </div>
          <InputBox placeHolder='This channel is a shelter for Boomers around the world.' />           
          <div className="DescriptionText"> Channel privacy </div>
          <InputBox placeHolder='Privacy'/>           
      </Modal>
    </>
  );
};

export default ModalChanSettings;