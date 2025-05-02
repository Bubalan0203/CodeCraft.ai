import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import styled, { keyframes } from 'styled-components';
import { FiUploadCloud, FiX } from 'react-icons/fi';

const DeployButton = ({ code, tech }) => {
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef(null); // 🔁 Track interval to clear on cancel

  const startCountdown = (duration, callback) => {
    setCountdown(duration);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          callback();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleDeploy = async () => {
    const zip = new JSZip();

    if (tech === 'HTML') {
      const htmlMatch = code.match(/(?:index\.html:)?\s*<!DOCTYPE html>[\s\S]*?<\/html>/i);
      const cssMatch = code.match(/style\.css:\s*([\s\S]*?)(?=script\.js:|$)/i);
      const jsMatch = code.match(/script\.js:\s*([\s\S]*)$/i);

      const html = htmlMatch ? htmlMatch[0].replace(/index\.html:\s*/i, '').trim() : '<!DOCTYPE html><html><body></body></html>';
      const css = cssMatch ? cssMatch[1].trim() : '';
      const js = jsMatch ? jsMatch[1].trim() : '';

      zip.file('index.html', html);
      if (css) zip.file('style.css', css);
      if (js) zip.file('script.js', js);
    } else {
      zip.file('README.txt', 'Run npm install && npm run build. Then deploy the /build folder to Netlify.');
      zip.file('src/App.jsx', code);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, tech === 'React' ? 'react-project.zip' : 'html-site.zip');

    setShowModal(true);
    const delay = tech === 'React' ? 30 : 10;
    startCountdown(delay, () => {
      window.open('https://app.netlify.com/drop', '_blank');
      setShowModal(false);
    });
  };

  const handleCloseModal = () => {
    clearInterval(intervalRef.current); // ⛔ cancel countdown
    setShowModal(false);
  };

  return (
    <>
      <StyledButton onClick={handleDeploy}>
        <FiUploadCloud /> Deploy to Netlify
      </StyledButton>

      {showModal && (
        <ModalOverlay>
          <ModalBox>
            <CloseBtn onClick={handleCloseModal}>
              <FiX />
            </CloseBtn>
            <h3>Preparing for Netlify Deployment</h3>
            <p>
              {tech === 'React'
                ? 'Unzip the file, run `npm install && npm run build`, then drop the /build folder to Netlify Drop.'
                : 'Unzip the folder and drop it directly into Netlify Drop.'}
            </p>
            <p style={{ fontSize: '13px', color: '#aaa', marginTop: '10px' }}>
              If you don’t want to deploy, you can close this window.
            </p>
            <CountdownText>Redirecting in {countdown}s...</CountdownText>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
};

export default DeployButton;
const StyledButton = styled.button`
  background-color: #ffbb33;
  color: black;
  border: none;
  padding: 10px 18px;
  font-size: 14px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #ffaa00;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: #1e1e1e;
  color: white;
  padding: 30px;
  max-width: 480px;
  width: 90%;
  border-radius: 12px;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);

  h3 {
    margin-bottom: 12px;
    font-size: 20px;
    font-weight: 600;
  }

  p {
    font-size: 15px;
    line-height: 1.5;
  }
`;

const CountdownText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #ffc107;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  color: #aaa;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;
