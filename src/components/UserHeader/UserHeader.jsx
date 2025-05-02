import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Typewriter } from 'react-simple-typewriter';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import LoginModal from '../../pages/LoginModal'; // ✅ use modal

// Styled components (unchanged)
const HeroContainer = styled.section`
  background: linear-gradient(to bottom right, #f8f9ff, #edf2ff);
  padding: 120px 40px 60px;
  text-align: center;
`;

const Tagline = styled.div`
  display: inline-block;
  background-color: #e0e7ff;
  color: #6366f1;
  padding: 4px 16px;
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 16px;

  span {
    color: #3b82f6;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 700px;
  margin: 0 auto 32px;
`;
const WelcomeText = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 20px;
  color: #333;
`;
const UserHeader = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handlePrimaryClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <HeroContainer>
        <Tagline>✨ AI-Powered Code Generation</Tagline>

        <Title>
          Transform Your Ideas Into <br />
          <span>
            <Typewriter
              words={['Production-Ready Code', 'Functional UI Components', 'Responsive Layouts']}
              loop={Infinity}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </Title>

        <Subtitle>
          Create beautiful, functional applications in seconds with our advanced AI code generation platform.
          Just describe what you need, and watch the magic happen.
        </Subtitle>
        {user && (
          <WelcomeText>
            Welcome, <span>{user.displayName}</span>!
          </WelcomeText>
        )}

       

        
      </HeroContainer>

     
    </>
  );
};

export default UserHeader;
