import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import InputBox from './InputBox';
import * as F from "styles/font.styles";
import useToggle from 'pages/Settings/2FA/toggle/useToggle';
import { Toggle, ToggleCheckbox, ToggleSwitch } from 'pages/Settings/2FA/toggle/Toggle.styles';


export const TogglePrivate = () => {
  const { value, toggleValue } = useToggle(false); // I call the Customized hook
  const [enabled, setEnabled] = useState(false); // to modify by the backend

  const handleToggle = () => {
    setEnabled(!enabled);
    toggleValue();
  };

  return (
    <>
      <Toggle className="toggle">
        <ToggleCheckbox
          type="checkbox"
          id="toggle"
          checked={value}
          onClick={handleToggle}
        />
        <ToggleSwitch>
          {/* put the logic here if user click on the toggle */}
        </ToggleSwitch>
      </Toggle>
    </>
  );
};

export const Lock = () =>{
  return(
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.59998 5.9C1.59998 2.91766 4.01764 0.5 6.99998 0.5C9.98231 0.5 12.4 2.91766 12.4 5.9V7.54C13.3129 7.7253 14 8.53241 14 9.5V17.5C14 18.6046 13.1046 19.5 12 19.5H2C0.89543 19.5 0 18.6046 0 17.5V9.5C0 8.53243 0.687092 7.72533 1.59998 7.54001V5.9ZM10.6 5.9V7.5H3.39998V5.9C3.39998 3.91177 5.01175 2.3 6.99998 2.3C8.9882 2.3 10.6 3.91178 10.6 5.9ZM8 11.5C8 10.9477 7.55228 10.5 7 10.5C6.44772 10.5 6 10.9477 6 11.5V15.5C6 16.0523 6.44771 16.5 7 16.5C7.55228 16.5 8 16.0523 8 15.5V11.5Z" fill="#111827"/>
    </svg>

  )
}

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
        onCancel={handleCancel}
        >
            <p> Channel name*</p>
            <InputBox placeHolder='#new-channel'/>
            <p> Description</p>
            <InputBox placeHolder='Channel description...'/>
            <br />
            <br />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Lock />
                <h4 style={{ marginLeft: '5px' }}>Private Channel</h4>
              </div>
              <TogglePrivate />
            </div>
            <br />
            <p> Password (optionnal)</p>
            <InputBox placeHolder='●●●●●●●●●●●'/>                 
      </Modal>
    </>
  );
};

export default ModalChanCreate;