import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #0f172a;
  color: #d1d5db;
  padding: 60px 40px 0 40px;
`;

const TopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Column = styled.div`
  min-width: 180px;

  h4 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 16px;
    color: #ffffff;
  }

  ul {
    list-style: none;
    padding: 0;
    font-size: 0.95rem;

    li {
      margin-bottom: 10px;
      cursor: pointer;
      color: #d1d5db;

      &:hover {
        color: #ffffff;
      }
    }
  }
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  color: #3b82f6;
  margin-bottom: 12px;

  span {
    color: #6366f1;
  }
`;

const Description = styled.p`
  max-width: 280px;
  font-size: 0.95rem;
  margin-bottom: 12px;
  color: #d1d5db;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;

  svg {
    font-size: 1.2rem;
    color: #9ca3af;
    cursor: pointer;

    &:hover {
      color: #ffffff;
    }
  }
`;



const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigationOrScroll = (id) => {
    if (location.pathname === '/') {
      scrollToSection(id);
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <FooterContainer>
      <TopRow>
        <Column>
          <Logo>&lt;<span>/&gt;</span> CodeCraft.ai</Logo>
          <Description>
            Transform your ideas into production-ready code with our AI-powered platform. Save time and build faster.
          </Description>
          <SocialIcons>
            <FaTwitter />
            <FaGithub />
            <FaLinkedin />
          </SocialIcons>
        </Column>

        <Column>
          <h4>Explore Us</h4>
          <ul>
            <li onClick={() => handleNavigationOrScroll('features')}>Features</li>
            <li onClick={() => handleNavigationOrScroll('pricing')}>Pricing</li>
            <li onClick={() => handleNavigationOrScroll('examples')}>Examples</li>
            <li onClick={() => handleNavigationOrScroll('console')}>Code Console</li>
          </ul>
        </Column>

        <Column>
          <h4>Our Mission</h4>
          <ul>
            <li>Velocity</li>
            <li>Empowerment</li>
            <li>Scalability</li>
            <li>Innovation</li>
            <li>Excellence</li>
          </ul>
        </Column>

        <Column>
          <h4>Our Vision</h4>
          <ul>
            <li>Clarity</li>
            <li>Trust</li>
            <li>Integrity</li>
            <li>Futurism</li>
            <li>Simplicity</li>
          </ul>
        </Column>
      </TopRow>

     
    </FooterContainer>
  );
};

export default Footer;
