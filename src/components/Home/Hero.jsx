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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const StyledButton = styled(Button)`
  && {
    font-weight: 600;
    text-transform: none;
    padding: 10px 24px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(59, 130, 246, 0.5);
    }
  }
`;

const CodeContainer = styled.div`
  margin: 60px auto 0;
  max-width: 720px;
  background-color: #0f172a;
  color: #d1d5db;
  font-family: 'Source Code Pro', monospace;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const TerminalHeader = styled.div`
  background-color: #1e293b;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background-color: ${props => props.color};
`;

const CodeBlock = styled.pre`
  padding: 20px;
  font-size: 0.95rem;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const codeString = `
// Creating a responsive landing page with React
import React from 'react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50">
      <header className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-600">Brand</div>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
            Login
          </button>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl font-bold mb-6">Your Amazing Product</h1>
        <p className="text-xl mb-8">Transform ideas into reality with our platform</p>
        <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg">
          Get Started
        </button>
      </main>
    </div>
  );
}

export default LandingPage;
`;

const Hero = () => {
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

        <ButtonGroup>
          <StyledButton variant="contained" style={{ backgroundColor: '#3b82f6' }} onClick={handlePrimaryClick}>
            {user ? 'Start Coding' : 'Try It Free'}
          </StyledButton>

          <ScrollLink to="examples" smooth={true} duration={500}>
            <StyledButton variant="outlined">View Examples</StyledButton>
          </ScrollLink>
        </ButtonGroup>

        <CodeContainer>
          <TerminalHeader>
            <Dot color="#ff5f56" />
            <Dot color="#ffbd2e" />
            <Dot color="#27c93f" />
          </TerminalHeader>
          <CodeBlock>
            <Typewriter
              words={[codeString]}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={25}
              deleteSpeed={0}
              delaySpeed={2500}
            />
          </CodeBlock>
        </CodeContainer>
      </HeroContainer>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Hero;
