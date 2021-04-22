import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const StyledMenuLabel = styled('span')`
  margin-left: 15px;
`;

const StyledArrowTop = styled('span')`
  content: '.';
  width: 10px;
  height: 10px;
  display: block;
  background: #fff;
  position: relative;
  top: 0;
  left: 0;
  margin-left: 70%;
  border: 1px solid #eee;
  border-bottom-width: 0;
  border-right-width: 0;
  transform: rotate(45deg);
  margin-bottom: -4px;
`;

const HeaderContainer = styled.div`
  position: relative;
  display: block;
  height: 100%;
  box-shadow: 1px 6px 5px #ccc;
  color: #7a8994;
`;

const StyledLogoutButton = styled(StyledMenuLabel)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  &:hover {
    color: #ccc;
  }
`;

const ProfileMenu = (): JSX.Element => {
  const history = useHistory();

  return (
    <HeaderContainer>
      <StyledArrowTop />
      <Menu style={{ paddingBottom: 0, marginBottom: 0, position: 'relative' }}>
        <Menu.Item
          onClick={(): void => {
            history.push('/perfil');
          }}
        >
          <StyledMenuLabel>
            <UserOutlined />
          </StyledMenuLabel>
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item>
          <StyledLogoutButton>
            <PoweroffOutlined />
            Sair
          </StyledLogoutButton>
        </Menu.Item>
      </Menu>
    </HeaderContainer>
  );
};

export default ProfileMenu;
