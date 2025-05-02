import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import UserTable from '../components/Admin/UserTable';
import UserPurchasesModal from '../components/Admin/UserPurchasesModal';
import UserPromptsModal from '../components/Admin/UserPromptsModal';
import styled from 'styled-components';
import Footer from '../components/Home/Footer';
import { Users, Zap, DollarSign, Code, IndianRupee} from 'lucide-react';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const ContentWrapper = styled.main`
  flex: 1;
  padding: 100px 0 40px;
  width: 100%;
`;

const InnerContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 32px;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 10px;
  }

  p {
    color: #6b7280;
    font-size: 1.05rem;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const StatCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 30px rgba(59, 130, 246, 0.25);
  }

  svg {
    color: #3b82f6;
    flex-shrink: 0;
  }

  .text-content {
    h4 {
      font-size: 1.15rem;
      color: #1f2937;
      margin-bottom: 4px;
    }

    p {
      font-size: 1.6rem;
      font-weight: 700;
      color: #3b82f6;
    }
  }
`;

const Note = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 0.95rem;
  color: #6b7280;
`;

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [promptModalVisible, setPromptModalVisible] = useState(false);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const userList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);

      const totalGenerated = userList.reduce((sum, u) => sum + (u.history?.length || 0), 0);
      const totalPaid = userList.reduce((sum, u) => sum + ((u.purchases || []).reduce((acc, p) => acc + p.amount, 0)), 0);

      setTotalProjects(totalGenerated);
      setTotalAmount(totalPaid);
    };

    fetchUsers();
  }, []);

  const handleViewPurchases = (user) => {
    setSelectedUser(user);
    setPurchaseModalVisible(true);
  };

  const handleViewPrompts = (user) => {
    setSelectedUser(user);
    setPromptModalVisible(true);
  };

  const totalCredits = users.reduce((sum, u) => sum + (u.credits || 0), 0);

  return (
    <PageWrapper>
      <ContentWrapper>
        <InnerContainer>
          <PageHeader>
            <h2>CodeCraft Admin Dashboard</h2>
            <p>Monitor user activity, manage credits, and gain insights into platform usage.</p>
          </PageHeader>

          <StatsRow>
            <StatCard>
              <Users size={28} />
              <div className="text-content">
                <h4>Total Users</h4>
                <p>{users.length}</p>
              </div>
            </StatCard>
            <StatCard>
              <Zap size={28} />
              <div className="text-content">
                <h4>Total Credits</h4>
                <p>{totalCredits}</p>
              </div>
            </StatCard>
            <StatCard>
              <IndianRupee size={28} />
              <div className="text-content">
                <h4>Total Revenue</h4>
                <p>{totalAmount}</p>
              </div>
            </StatCard>
            <StatCard>
              <Code size={28} />
              <div className="text-content">
                <h4>Projects Generated</h4>
                <p>{totalProjects}</p>
              </div>
            </StatCard>
          </StatsRow>

          <UserTable
            users={users}
            onViewPurchases={handleViewPurchases}
            onViewPrompts={handleViewPrompts}
          />

          <Note>Use the buttons to inspect individual user activity and purchases.</Note>

          {selectedUser && purchaseModalVisible && (
            <UserPurchasesModal
              isOpen={purchaseModalVisible}
              onClose={() => setPurchaseModalVisible(false)}
              user={selectedUser}
              purchases={selectedUser?.purchases || []}
            />
          )}

          {selectedUser && promptModalVisible && (
            <UserPromptsModal
              isOpen={promptModalVisible}
              onClose={() => setPromptModalVisible(false)}
              user={selectedUser}
              history={selectedUser?.history || []}
            />
          )}
        </InnerContainer>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default AdminPanel;
