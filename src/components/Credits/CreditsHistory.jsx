import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'; // Importing icons for accordion

const AccordionWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  overflow: hidden;
  padding-bottom: 20px;
`;

const AccordionHeader = styled.div`
  padding: 16px;
  background-color: #3b82f6;
  color: white;
  font-weight: 700;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-size: 1.1rem;

  &:hover {
    background-color: #2563eb;
  }
`;

const AccordionContent = styled.div`
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 0 0 8px 8px;
  display: ${({ open }) => (open ? 'block' : 'none')};
  transition: all 0.3s ease-in-out;
`;

const PurchaseList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PurchaseItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
  font-size: 1rem;

  span {
    color: #374151;
  }

  strong {
    color: #3b82f6;
    font-weight: bold;
  }
`;

const CreditsHistory = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (userDoc) => {
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.purchases && Array.isArray(data.purchases)) {
          const sorted = [...data.purchases].sort(
            (a, b) => new Date(b.time) - new Date(a.time)
          );
          setPurchases(sorted);
        } else {
          setPurchases([]);
        }
      }
    });

    return () => unsubscribe();
  }, [user]);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="card mt-4 p-3 shadow-sm">
      <h5><FileText size={20} /> Purchase History</h5> {/* Replaced emoji with icon */}
      <AccordionWrapper>
        <AccordionHeader onClick={toggleAccordion}>
          {isOpen ? 'Hide Purchase History' : 'Show Purchase History'}
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </AccordionHeader>

        <AccordionContent open={isOpen}>
          {purchases.length === 0 ? (
            <p className="text-muted">No purchases found.</p>
          ) : (
            <PurchaseList>
  <PurchaseItem style={{ fontWeight: 'bold', borderBottom: '2px solid #d1d5db' }}>
    <span>Date</span>
    <span>Time</span>
    <span>Credits</span>
    <span>Amount</span>
  </PurchaseItem>

  {purchases.map((purchase, index) => {
    const dateObj = new Date(purchase.time);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }); // "May 1, 2025"

    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }); // "12:30 PM"

    return (
      <PurchaseItem key={index}>
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
        <span>{purchase.credits} credits</span>
        <strong>₹{purchase.amount}</strong>
      </PurchaseItem>
    );
  })}
</PurchaseList>

          )}
        </AccordionContent>
      </AccordionWrapper>
    </div>
  );
};

export default CreditsHistory;
