import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import LoginModal from '../../pages/LoginModal';

const Section = styled.section`
  padding: 80px 20px;
  background: linear-gradient(to bottom right, #4f46e5, #3b82f6);
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
`;

const Subtext = styled.p`
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(to right, #6366f1, #3b82f6);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #111;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
  }
`;

const Note = styled.p`
  font-size: 0.9rem;
  margin-top: 10px;
  opacity: 0.9;
`;

const CallToAction = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleStartCoding = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <Section>
        <Heading>Ready to transform your development workflow?</Heading>
        <Subtext>
          Join thousands of developers who are shipping features faster and writing better code with CodeCraft.ai.
        </Subtext>
        <ButtonGroup>
          <PrimaryButton onClick={handleStartCoding}>Start Your Code Now</PrimaryButton>
          <ScrollLink to="features" smooth={true} duration={500}>
            <SecondaryButton>Explore Features</SecondaryButton>
          </ScrollLink>
        </ButtonGroup>
        <Note>No Payment required. 💎 Credits free trial.</Note>
      </Section>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default CallToAction;
