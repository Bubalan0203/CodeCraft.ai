import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { X } from 'lucide-react';

Modal.setAppElement('#root');

const StyledModal = styled(Modal)`
  background: white;
  max-width: 700px;
  width: 95%;
  max-height: 90vh;
  margin: auto;
  padding: 30px 20px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #6b7280;

  &:hover {
    color: #ef4444;
  }
`;

const Header = styled.h3`
  margin-bottom: 20px;
  font-weight: 700;
  color: #111827;
`;

const PromptList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PromptItem = styled.li`
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;

  pre {
    background-color: #f3f4f6;
    padding: 10px;
    border-radius: 6px;
    font-size: 0.85rem;
    white-space: pre-wrap;
    margin-top: 8px;
    color: #374151;
  }

  small {
    display: block;
    margin-top: 8px;
    color: #6b7280;
    font-size: 0.8rem;
  }
`;

const NoData = styled.p`
  color: #6b7280;
  font-style: italic;
  text-align: center;
`;

const CloseFooterButton = styled.button`
  margin-top: auto;
  align-self: center;
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #dc2626;
  }
`;

const UserPromptsModal = ({ isOpen, onClose, user, history }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="User Prompts"
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        },
      }}
    >
      <CloseButton onClick={onClose}>
       
      </CloseButton>

      <Header>{user?.email}'s Prompt History</Header>

      <ScrollArea>
        {history?.length > 0 ? (
          <PromptList>
            {history.map((item, index) => (
              <PromptItem key={index}>
                <strong>Prompt:</strong> {item.prompt || '—'}
                <pre>{item.code ? item.code.slice(0, 200) + '...' : 'No code available'}</pre>
                <small>
                  {item.time
                    ? new Date(item.time?.seconds * 1000).toLocaleString()
                    : 'Time unknown'}
                </small>
              </PromptItem>
            ))}
          </PromptList>
        ) : (
          <NoData>No prompt history found.</NoData>
        )}
      </ScrollArea>

      <CloseFooterButton onClick={onClose}>Close</CloseFooterButton>
    </StyledModal>
  );
};

export default UserPromptsModal;
