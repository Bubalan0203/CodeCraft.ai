// src/components/Buttons/CopyButton.jsx
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiCopy, FiCheckCircle } from 'react-icons/fi';

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const fadeInOut = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  10% { opacity: 1; transform: scale(1); }
  90% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.95); }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1e1e1e;
  padding: 24px 32px;
  border-radius: 12px;
  color: white;
  z-index: 1000;
  animation: ${fadeInOut} 2.5s ease forwards;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  text-align: center;

  svg {
    color: #00c853;
    font-size: 32px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-size: 16px;
  }
`;

const CopyButton = ({ code }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2500);
  };

  return (
    <>
      <Button onClick={handleCopy}>
        <FiCopy /> Copy Code
      </Button>

      {showModal && (
        <Modal>
          <FiCheckCircle />
          <p>Copied to clipboard!</p>
        </Modal>
      )}
    </>
  );
};

export default CopyButton;
