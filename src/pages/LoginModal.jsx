import React from 'react';
import styled from 'styled-components';
import { signInWithPopup, fetchSignInMethodsForEmail, linkWithCredential } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background-color: white;
  padding: 40px 30px;
  border-radius: 12px;
  max-width: 480px;
  width: 90%;
  text-align: center;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: #3b82f6;
  margin-bottom: 16px;

  .logo-symbol {
    color: #6366f1;
    margin-right: 6px;
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 24px;
  line-height: 1.4;

  span {
    display: block;
    color: #3b82f6;
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 10px;
  }
`;

const Button = styled.button`
  width: 100%;
  margin: 10px 0;
  padding: 12px 16px;
  font-weight: 600;
  border-radius: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  border: none;
`;

const GoogleButton = styled(Button)`
  background-color: white;
  color: #3c4043;
  border: 1px solid #dadce0;

  &:hover {
    background-color: #f8f9fa;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const GithubButton = styled(Button)`
  background-color: #7e22ce;
  color: white;

  &:hover {
    background-color: #6b21a8;
  }

  svg {
    font-size: 18px;
  }
`;

const GoogleIcon = () => (
  <svg viewBox="0 0 533.5 544.3" width="20" height="20">
    <path fill="#4285F4" d="M533.5 278.4c0-17.2-1.5-34-4.3-50.2H272v95h147.4c-6.4 34.2-25.7 63.1-54.6 82.5v68h88.2c51.6-47.5 80.5-117.6 80.5-195.3z" />
    <path fill="#34A853" d="M272 544.3c73.9 0 135.9-24.5 181.2-66.5l-88.2-68c-24.5 16.4-55.9 26.1-93 26.1-71.5 0-132-48.3-153.6-113.3H29v70.9c45.3 89.5 137.6 150.8 243 150.8z" />
    <path fill="#FBBC04" d="M118.4 322.6c-10.5-30.7-10.5-64 0-94.7v-70.9H29c-36.3 72.2-36.3 157.6 0 229.8l89.4-64.2z" />
    <path fill="#EA4335" d="M272 107.7c39.6-.6 77.5 13.7 106.5 39.8l79.3-79.3C413.5 24.4 344.4-1.3 272 0 166.6 0 74.3 61.2 29 150.7l89.4 70.9c21.6-65 82.1-113.3 153.6-113.9z" />
  </svg>
);

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Login success:", result.user);
      onClose();
      navigate('/dashboard');
    } catch (err) {
      if (err.code === "auth/account-exists-with-different-credential") {
        const pendingCred = err.credential;
        const email = err.customData.email;

        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods[0] === "google.com") {
          alert("This email is linked to Google. Signing in with Google to link GitHub.");
          const googleResult = await signInWithPopup(auth, googleProvider);
          await linkWithCredential(googleResult.user, pendingCred);
          alert("Accounts linked! You can now use both Google and GitHub.");
          navigate('/dashboard');
        } else {
          alert("This email is already registered. Please use the original method.");
        }
      } else {
        console.error("Login error:", err);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Logo>
          <span className="logo-symbol">&lt;/&gt;</span> CodeCraft.ai
        </Logo>
        <Title>
          Transform Your Ideas Into
          <span>
            <Typewriter
              words={['Production-Ready Code', 'Functional UI Components', 'Responsive Layouts']}
              loop={Infinity}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </Title>

        <GoogleButton onClick={() => handleLogin(googleProvider)}>
          <GoogleIcon /> Login with Google
        </GoogleButton>

        <GithubButton onClick={() => handleLogin(githubProvider)}>
          <FaGithub /> Login with GitHub
        </GithubButton>
      </ModalBox>
    </ModalOverlay>
  );
};

export default LoginModal;
