import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { CheckCircle } from 'lucide-react'; // Import icons for success
import { useAuth } from '../../context/AuthContext';

const suggestions = [
  "Build a portfolio website with a contact form",
  "Create a blog with categories and comments",
  "Design a landing page for a mobile app",
  "Build a responsive e-commerce homepage",
  "Create a login/signup page with validation"
];

// Styled components for the updated design
const FormContainer = styled.div`
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  color: #333;
  margin-bottom: 20px;
  resize: vertical;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.85rem;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 90px;
  transition: color 0.3s;

  &:hover {
    color: #ef4444;
  }
`;

const SpeakButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
  transition: all 0.3s;

  &:hover {
    background: #2563eb;
  }
`;

const SuggestionsContainer = styled.div`
  margin-top: 20px;
`;

const SuggestionButton = styled.button`
  background: none;
  border: 1px solid #d1d5db;
  color: #333;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #3b82f6;
    color: white;
  }
`;

const TechStackSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const SelectTech = styled.select`
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease-in-out;
  width: 100%;
  
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const CreditsText = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 10px;
`;

const GenerateButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

const ModalContent = styled.div`
  text-align: center;
  padding: 20px;
`;

const LoadingModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 350px;
  margin: auto;
  padding: 40px;
  border-radius: 12px;
  background-color: #fff;
  z-index: 9999;
`;

const SuccessModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 350px;
  width: 100%;
  padding: 40px;
  border-radius: 12px;
  background-color: #fff;
  z-index: 9999;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
`;

const DotWave = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  div {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #3b82f6;
    animation: wave 1.5s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.3s;
    }
    &:nth-child(3) {
      animation-delay: 0.6s;
    }
  }

  @keyframes wave {
    0%, 100% {
      transform: scale(0.6);
    }
    50% {
      transform: scale(1);
    }
  }
`;

const PromptForm = ({ prompt, setPrompt, tech, setTech, credits, onGenerate }) => {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Sorry, your browser doesn't support voice input.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(prev => prev ? `${prev} ${transcript}` : transcript);
    };

    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const handleSuggestionClick = (text) => setPrompt(text);
  const handleClear = () => setPrompt('');

  const handleGenerate = async () => {
    setIsLoading(true);
    await onGenerate(); // Call onGenerate function from parent
    setIsLoading(false);
    setIsSuccessModalOpen(true);

    // Close success modal after 5 seconds
    setTimeout(() => {
      setIsSuccessModalOpen(false);
    }, 2500);
  };

  return (
    <FormContainer>
      

      <div style={{ position: 'relative' }}>
        <Textarea
          rows="2"
          placeholder="e.g., Build a portfolio website with a contact form"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <ClearButton onClick={handleClear}>Clear</ClearButton>

        <SpeakButton onClick={listening ? stopListening : startListening}>
          {listening ? 'Stop' : 'Speak'}
        </SpeakButton>
      </div>

      <SuggestionsContainer>
        <h6>Suggestions:</h6>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {suggestions.map((s, i) => (
            <SuggestionButton key={i} onClick={() => handleSuggestionClick(s)}>
              {s}
            </SuggestionButton>
          ))}
        </div>
      </SuggestionsContainer>

      <TechStackSelector>
        <div>
          <label htmlFor="tech-stack">Select Tech Stack:</label>
          <SelectTech
            id="tech-stack"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
          >
            <option>React</option>
            <option>HTML</option>
          </SelectTech>
        </div>

        <CreditsText>Credits: {credits}</CreditsText>
      </TechStackSelector>

      <GenerateButton onClick={handleGenerate}>
        Generate Project
      </GenerateButton>

      {/* Loading Modal */}
      <LoadingModal isOpen={isLoading} onRequestClose={() => setIsLoading(false)}>
        <ModalContent>
          <DotWave>
            <div />
            <div />
            <div />
          </DotWave>
          <p>Generating code...</p>
        </ModalContent>
      </LoadingModal>

      {/* Success Modal */}
      <SuccessModal isOpen={isSuccessModalOpen} onRequestClose={() => setIsSuccessModalOpen(false)}>
        <ModalContent>
          <CheckCircle color="#16a34a" size={50} />
          <h3>Code Generated Successfully!</h3>
          <p>Your project has been generated. You can now copy, download, or deploy the code.</p>
        </ModalContent>
      </SuccessModal>
    </FormContainer>
  );
};

export default PromptForm;
