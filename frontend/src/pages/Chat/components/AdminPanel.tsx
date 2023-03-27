import { Dropdown, MenuProps } from 'antd'
import * as F from 'styles/font.styles';
import {DownOutlined} from '@ant-design/icons';
import * as S from '../components/components.styles';
import { useState } from 'react';
import ModalChangePassword from '../modals/ModalChangePassword';
import { ILobby } from 'contexts/Chat/context';
import ModalChangeDescription from '../modals/ModalChangeDescription';




interface IProps {
	dropdownVisible: boolean;
	setDropdownVisible: (value: React.SetStateAction<boolean>) => void;
  activeLobby: ILobby;
}

const AdminPanel = ({dropdownVisible, setDropdownVisible, activeLobby}: IProps) => {
  const [passPopup, setPassPopup] = useState<boolean>(false)
  const [descriptionPopup, setDescriptionPopup] = useState<boolean>(false)



  const handlePassword = () => {
    setPassPopup(true);
    setDropdownVisible(false)
  }

  const handleDescription = () => {
    setDescriptionPopup(true);
    setDropdownVisible(false)
  }

  const items: MenuProps['items'] = [{
    key: 'Description',
    label: <S.DropdownButton onClick={handleDescription}> Change description </S.DropdownButton>,
  },
  {
    key: 'Password',
    label:
      <> 
      {activeLobby.privacy === "private" && <S.DropdownButton onClick={handlePassword}> Change Password</S.DropdownButton>}
      </>
  }
  ];

	const handleDropdownVisibleChange = (visible: boolean) => {
		setDropdownVisible(visible);
	};

  return (
	  <Dropdown
					trigger={['click']}
					placement="bottomLeft"
					menu={{items}}
					open={dropdownVisible}
					onOpenChange={handleDropdownVisibleChange}
				>
					<S.DropdownAdmin>
						<F.Subtitle weight="400" fontSize='14px'>Options</F.Subtitle>
						<S.DropdownIcon className="dropdown-arrow" />
            {passPopup && <ModalChangePassword click={passPopup} onClose={() => setPassPopup(false)} activeLobby={activeLobby}/>}
            {descriptionPopup && <ModalChangeDescription click={descriptionPopup} onClose={() => setDescriptionPopup(false)} activeLobby={activeLobby} />}
					</S.DropdownAdmin>
				</Dropdown>
  )
}

export default AdminPanel