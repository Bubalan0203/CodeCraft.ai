import React, { useState } from 'react';
import styled from 'styled-components';
import { Typewriter } from 'react-simple-typewriter';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../../pages/LoginModal';

const Section = styled.section`
  padding: 10px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
`;

const LeftPanel = styled.div`
  background-color: #f9fafb;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  width: 400px;
`;

const Heading = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const PromptList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PromptItem = styled.li`
  padding: 10px 14px;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: ${props => (props.active ? '#eef2ff' : '#fff')};
  color: ${props => (props.active ? '#4f46e5' : '#111')};
  border: 1px solid #e5e7eb;
  cursor: pointer;
  font-size: 0.95rem;
  transition: 0.2s;

  &:hover {
    background-color: #e0e7ff;
  }
`;

const ActionButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

const CodeContainer = styled.div`
  flex: 1;
  max-width: 700px;
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

const prompts = [
  {
    label: "Create a responsive navbar with a logo, links, and a login button",
    code: `
import React from 'react';

const Navbar = () => (
  <nav className="flex justify-between items-center p-4 bg-white shadow">
    <div className="font-bold text-xl">Logo</div>
    <div className="space-x-4">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </div>
  </nav>
);

export default Navbar;
    `
  },
  {
    label: "Design a pricing page with 3 tiers: Basic, Pro, and Enterprise",
    code: `
const plans = ['Basic', 'Pro', 'Enterprise'];

const Pricing = () => (
  <div className="grid grid-cols-3 gap-6">
    {plans.map(plan => (
      <div className="p-6 shadow-lg rounded bg-white" key={plan}>
        <h2 className="text-xl font-semibold">{plan}</h2>
        <p className="mt-4">$X/month</p>
        <button className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded">Select</button>
      </div>
    ))}
  </div>
);
    `
  },
  {
    label: "Build a dashboard with stats, recent activity, and user profile",
    code: `
const Dashboard = () => (
  <div className="grid grid-cols-3 gap-4">
    <div className="col-span-2 p-4 bg-white rounded shadow">Stats Section</div>
    <div className="p-4 bg-white rounded shadow">User Profile</div>
    <div className="col-span-3 p-4 bg-white rounded shadow mt-4">Recent Activity</div>
  </div>
);
    `
  },
  {
    label: "Generate a contact form with name, email, message, and validation",
    code: `
import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); validate(); }}>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Message"></textarea>
      <button type="submit">Send</button>
    </form>
  );
}
    `
  }
];

const PromptPlayground = () => {
  const [selected, setSelected] = useState(3);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTryPrompt = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <Section>
        <LeftPanel>
          <Heading>Choose a Prompt</Heading>
          <PromptList>
            {prompts.map((item, index) => (
              <PromptItem
                key={index}
                active={selected === index}
                onClick={() => setSelected(index)}
              >
                {item.label}
              </PromptItem>
            ))}
          </PromptList>
          <ActionButton onClick={handleTryPrompt}>
            Try Your Own Prompt
          </ActionButton>
        </LeftPanel>

        <CodeContainer>
          <TerminalHeader>
            <Dot color="#ff5f56" />
            <Dot color="#ffbd2e" />
            <Dot color="#27c93f" />
          </TerminalHeader>
          <CodeBlock>
            <Typewriter
              words={[prompts[selected].code]}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={20}
              deleteSpeed={0}
              delaySpeed={2500}
            />
          </CodeBlock>
        </CodeContainer>
      </Section>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default PromptPlayground;
