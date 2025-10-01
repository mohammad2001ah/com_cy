// No additional code is needed at the placeholder. The existing code already uses the latest MUI (@mui/material) and react-router-dom v6 syntax.
// The file is already up-to-date with the requested changes.

import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import styled from 'styled-components';
import logo from '../../images/logo.png';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1976d2; /* مثال لون خلفية */
  padding: 10px 20px;
`;

const LogoImg = styled.img`
  width: 200px;
`;

const NavLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLinkStyled = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 20px;
  &:hover {
    border-bottom: 2px solid #fff;
  }
`;

const Nav = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser('');
    localStorage.clear();
  };

  return (
    <NavContainer>
      <LogoImg src={logo} alt="Logo" />
      <NavLinksContainer>
        <NavLinkStyled to="/">Home</NavLinkStyled>
        {!user && <NavLinkStyled to="/login">Login</NavLinkStyled>}
        {!user && <NavLinkStyled to="/signup">Signup</NavLinkStyled>}
        {user && <NavLinkStyled to="/todo">Todo</NavLinkStyled>}
        {user && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            style={{ marginLeft: '20px' }}
          >
            Logout
          </Button>
        )}
      </NavLinksContainer>
    </NavContainer>
  );
};

export default Nav;
