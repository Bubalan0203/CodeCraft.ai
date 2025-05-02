import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Eye, FileText } from 'lucide-react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.5s ease forwards;

  @media (max-width: 576px) {
    padding: 16px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 680px;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;

  thead {
    background-color: #3b82f6;
    color: white;
    font-size: 1rem;
  }

  th, td {
    padding: 14px 18px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.95rem;
  }

  td {
    vertical-align: middle;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 12px;
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 420px;
  padding: 12px 16px;
  margin-bottom: 24px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const ActionButton = styled.button`
  font-size: 0.85rem;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  gap: 6px;

  &.primary {
    background-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
    }
  }

  &.secondary {
    background-color: #e5e7eb;
    color: #111827;

    &:hover {
      background-color: #d1d5db;
    }
  }
`;

const EmptyRow = styled.tr`
  td {
    text-align: center;
    color: #9ca3af;
    padding: 20px;
    font-style: italic;
  }
`;

const UserTable = ({ users, onViewPurchases, onViewPrompts }) => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer>
      <SearchInput
        type="text"
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <StyledTable>
        <thead>
          <tr>
            <th>Email</th>
            <th>Joined Date</th>
            <th>Credits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  {user.createdAt?.toDate
                    ? new Date(user.createdAt.toDate()).toLocaleString()
                    : 'N/A'}
                </td>
                <td>{user.credits}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <ActionButton className="primary" onClick={() => onViewPurchases(user)}>
                      <Eye size={14} /> Purchases
                    </ActionButton>
                    <ActionButton className="secondary" onClick={() => onViewPrompts(user)}>
                      <FileText size={14} /> Prompts
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <EmptyRow>
              <td colSpan="4">No users match your search.</td>
            </EmptyRow>
          )}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default UserTable;
