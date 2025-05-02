import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import styled from 'styled-components';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel'; // ✅ Add this
import AdminRoute from './components/ProtectedRoutes/AdminRoute'; // ✅ Add this
import Navbar from './components/Home/Navbar';
import Footer from './components/Home/Footer';
const BottomNote = styled.div`
  background-color: #ffffff;
  color: #1f2937;
  padding: 10px;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 15px;
  margin-bottom: 15px;

  a {
    color: #3b82f6;
    text-decoration: none;

    &:hover {
      color: #2563eb;
      text-decoration: underline;
    }
  }
`;
const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
     
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* ✅ Protected admin route */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />
    </Routes>
    <Footer />
    <BottomNote>
        Created & Developed by&nbsp;
        <a href="https://bubalan.netlify.app/" target="_blank" rel="noopener noreferrer">
          Bubalan S
        </a>
      </BottomNote>
    </>
  );
};

export default App;
