import React from 'react';
import styled from 'styled-components';
import { FaCode, FaBolt, FaRedo, FaTabletAlt, FaClock, FaShieldAlt, FaPalette, FaLayerGroup } from 'react-icons/fa';

const Section = styled.section`
  background-color: #f9fafb;
  padding: 80px 20px;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Subtext = styled.p`
  font-size: 1.1rem;
  color: #555;
  max-width: 700px;
  margin: 0 auto 48px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
  text-align: left;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.08);
  }
`;

const IconWrapper = styled.div`
  background-color: #e0e7ff;
  color: #6366f1;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 18px;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #444;
`;

const featuresData = [
  {
    icon: <FaCode />,
    title: 'Intelligent Code Generation',
    desc: 'Generate production-ready code across multiple languages and frameworks from simple prompts.'
  },
  {
    icon: <FaBolt />,
    title: 'Lightning Fast',
    desc: 'Get complex code snippets in seconds. No more time wasted on boilerplate code.'
  },
  {
    icon: <FaRedo />,
    title: 'Iterative Refinement',
    desc: 'Refine your code through natural conversation. The AI learns your preferences over time.'
  },
  {
    icon: <FaLayerGroup />,
    title: 'Complete UI Solutions',
    desc: 'Generate not just backend logic but complete UI components and designs.'
  },
  {
    icon: <FaTabletAlt />,
    title: 'Responsive By Default',
    desc: 'All generated UIs are responsive and work perfectly across all devices and screen sizes.'
  },
  {
    icon: <FaClock />,
    title: 'Save Development Time',
    desc: 'Reduce development time by up to 80% with AI-assisted code generation.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Secure & Best Practices',
    desc: 'All generated code follows security best practices and modern coding standards.'
  },
  {
    icon: <FaPalette />,
    title: 'Beautiful Design',
    desc: 'Get aesthetically pleasing interfaces with modern design principles built-in.'
  }
];

const Features = () => {
  return (
    <Section>
      <Heading>Powerful Features</Heading>
      <Subtext>
        Our AI platform transforms how you write code, making development faster, easier, and more efficient.
      </Subtext>
      <Grid>
        {featuresData.map((feature, index) => (
          <Card key={index}>
            <IconWrapper>{feature.icon}</IconWrapper>
            <Title>{feature.title}</Title>
            <Description>{feature.desc}</Description>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default Features;
