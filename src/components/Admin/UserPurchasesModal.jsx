import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { X } from 'lucide-react';

Modal.setAppElement('#root');

const StyledModal = styled(Modal)`
  background: white;
  max-width: 600px;
  width: 90%;
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

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;

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
  margin-bottom: 16px;
  font-weight: 700;
  color: #111827;
`;

const PurchaseList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PurchaseItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;

  span {
    color: #374151;
    font-size: 0.95rem;
  }

  strong {
    color: #3b82f6;
  }
`;

const NoData = styled.p`
  color: #6b7280;
  font-style: italic;
  text-align: center;
`;

const CloseFooterButton = styled.button`
  margin-top: 20px;
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

const UserPurchasesModal = ({ isOpen, onClose, user, purchases }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="User Purchases"
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

      <Header>{user?.email}'s Purchase History</Header>

      <ScrollArea>
        {purchases?.length > 0 ? (
          <PurchaseList>
            {purchases.map((purchase, index) => (
              <PurchaseItem key={index}>
                <span>{new Date(purchase.time).toLocaleString()}</span>
                <span>{purchase.credits} credits</span>
                <strong>₹{purchase.amount}</strong>
              </PurchaseItem>
            ))}
          </PurchaseList>
        ) : (
          <NoData>No purchases found.</NoData>
        )}
      </ScrollArea>

      <CloseFooterButton onClick={onClose}>Close</CloseFooterButton>
    </StyledModal>
  );
};

export default UserPurchasesModal;
