import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import * as F from 'styles/font.styles';

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
        onCancel={handleCancel}
        footer={[
          <Button key="back" style={{border: 'none'}} onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="back" onClick={handleOk}>
            Validate
          </Button>
        ]}>
            <p style={{marginBottom: '24px', marginTop: '16px'}}> This channel is protected by a password.</p>
            <F.H5 style={{fontWeight: 500, marginBottom: '8px'}}> Password </F.H5>
            {/*<InputBox placeHolder=''/>                 */}
      </Modal>
    </>
  );
};

export default ModalChanPass;