import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../../pages/LoginModal';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
  color: #3b82f6;

  .logo-symbol {
    color: #6366f1;
    margin-right: 6px;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 30px;

  span {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: #3b82f6;
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  }
`;

const LoginButton = styled(Button)`
  && {
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    padding: 6px 16px;
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
    text-transform: none;

    &:hover {
      background-color: #2563eb;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;

  svg {
    font-size: 28px;
    color: #333;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCodeConsoleClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setShowLoginModal(true);
    }
    setIsOpen(false);
  };

  const handleScrollNavigate = (section) => {
    navigate('/', { state: { scrollTo: section } });
    setIsOpen(false);
  };

  return (
    <>
      <NavbarContainer>
        <Logo>
          <span className="logo-symbol">&lt;/&gt;</span> CodeCraft.ai
        </Logo>

        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Hamburger>

        <NavLinks isOpen={isOpen}>
          <li><span onClick={() => handleScrollNavigate('features')}>Features</span></li>
          <li><span onClick={() => handleScrollNavigate('examples')}>Examples</span></li>
          <li><span onClick={() => handleScrollNavigate('pricing')}>Pricing</span></li>
          <li><span onClick={handleCodeConsoleClick}>Code Console</span></li>
          {isAdmin && (
            <li><span onClick={() => { navigate('/admin'); setIsOpen(false); }}>Admin Panel</span></li>
          )}
          {!user && (
            <li>
              <LoginButton variant="contained" onClick={() => setShowLoginModal(true)}>
                Login
              </LoginButton>
            </li>
          )}
        </NavLinks>
      </NavbarContainer>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Navbar;
