import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { generateCode } from '../services/openai';
import JSZip from "jszip";
import { saveAs } from "file-saver";
import UserHeader from '../components/UserHeader/UserHeader';
import PromptForm from '../components/PromptForm/PromptForm';
import CodePreview from '../components/CodePreview/CodePreview';
import CopyButton from '../components/Buttons/CopyButton';
import DownloadButton from '../components/Buttons/DownloadButton';
import DeployButton from '../components/Buttons/DeployButton';
import useUserCredits from '../hooks/useUserCredits';
import CreditsHistory from '../components/Credits/CreditsHistory';
import { doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  
  min-height: 100vh;
  flex-direction: row;
  padding: 20px;
  background-color: #f7fafc;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #3b82f6;
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    padding: 15px;
  }
`;

const SidebarItem = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 15px 0;
  cursor: pointer;
  &:hover {
    color: #2563eb;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [tech, setTech] = useState("React");
  const [generatedCode, setGeneratedCode] = useState(null);
  const { credits, deductCredit } = useUserCredits(user);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!user) {
    navigate("/");
    return null;
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a project description.");
      return;
    }
    if (credits <= 0) {
      alert("Out of credits! Please buy more.");
      return;
    }

    try {
      const basePrompt = prompt.trim();
      const forcedPrompt =
        tech === "React"
          ? `${basePrompt}\n\nUse react-router-dom v6+ (with Routes and Route, not Switch). Structure it with proper component files like App.js, Home.js, etc.`
          : `${basePrompt}\n\nONLY return full working HTML with <style> and <script> tags if needed, no markdown formatting. Do NOT use React.`;

      const rawCode = await generateCode(forcedPrompt, tech);
      const code = rawCode
        .replace(/```html|```css|```javascript|```js|```/gi, "")
        .replace(/^x\s*\n?/gm, "")
        .trim();

      if (tech === "HTML" && /---\s?.+\.js\s?---/.test(code)) {
        alert("⚠️ Unexpected React-style code detected. Please re-generate or switch to React.");
        return;
      }

      setGeneratedCode(code);
      await deductCredit();

      // ✅ Save prompt history to Firestore with correct fields
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        history: arrayUnion({
          prompt: basePrompt,
          code: code,
          time: Timestamp.now()
        })
      });

    } catch (err) {
      console.error("Error generating code:", err);
      alert("Failed to generate code. Try again.");
    }
  };

  return (
    <DashboardContainer>
<UserHeader user={user} onLogout={handleLogout} />
      <ContentSection>
      
        <h2></h2>
        <PromptForm
          prompt={prompt}
          setPrompt={setPrompt}
          tech={tech}
          setTech={setTech}
          credits={credits}
          onGenerate={handleGenerate}
        />

        {generatedCode && (
          <>
            <CodePreview code={generatedCode} tech={tech} />
            <div className="mt-3 d-flex gap-3 flex-wrap">
              <CopyButton code={generatedCode} />
              <DownloadButton code={generatedCode} tech={tech} />
              <DeployButton code={generatedCode} tech={tech} />
            </div>
          </>
        )}

        <CreditsHistory />
      </ContentSection>
    </DashboardContainer>
  );
};

export default Dashboard;
