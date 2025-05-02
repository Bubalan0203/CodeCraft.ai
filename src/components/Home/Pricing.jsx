import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import LoginModal from '../../pages/LoginModal';
import Modal from 'react-modal';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
Modal.setAppElement('#root');
const Section = styled.section`
  padding: 80px 20px;
  background-color: #ffffff;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 12px;
`;

const Subtext = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 32px;
`;

const CardGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  max-width: 1100px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 32px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  position: relative;
  border: ${props => (props.popular ? '2px solid #6366f1' : 'none')};
`;

const Ribbon = styled.div`
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #6366f1;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 9999px;
`;

const PlanName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
`;

const Price = styled.p`
  font-size: 2rem;
  font-weight: 800;
  margin-top: 16px;

  span {
    font-size: 1.1rem;
    font-weight: 500;
    color: #999;
    margin-left: 4px;
  }
`;

const Highlight = styled.p`
  color: #16a34a;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 20px;
`;

const FeatureList = styled.ul`
  text-align: left;
  margin-top: 16px;
  margin-bottom: 24px;
  padding: 0;
  list-style: none;
  font-size: 0.95rem;

  li {
    margin-bottom: 10px;
    position: relative;
    padding-left: 20px;
  }

  li::before {
    content: "✓";
    color: #10b981;
    position: absolute;
    left: 0;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(to right, #4f46e5, #3b82f6);
  color: white;
  border: none;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
`;
const SuccessModal = styled(Modal)`
  background: white;
  max-width: 400px;
  width: 90%;
  margin: auto;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const pricingPlans = [
  { name: "Starter", price: 100, credits: 20 },
  { name: "Pro", price: 250, credits: 50, popular: true },
  { name: "Enterprise", price: 500, credits: 100 },
];

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBuy = async (plan) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) return alert("Razorpay SDK failed to load.");

    const options = {
      key: 'rzp_test_Hq1wOkaE1A9FW3',
      amount: plan.price * 100,
      currency: "INR",
      name: "CodeCraft.ai",
      description: `Buy ${plan.credits} credits`,
      handler: async function (response) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          credits: increment(plan.credits),
          purchases: arrayUnion({
            credits: plan.credits,
            amount: plan.price,
            time: new Date().toISOString(),
            razorpay_payment_id: response.razorpay_payment_id,
          }),
        });

        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
          navigate('/dashboard');
        }, 5000);
      },
      prefill: {
        name: user.displayName || "User",
        email: user.email,
      },
      theme: { color: "#6366f1" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Section>
      <Heading>Get the Credits You Need</Heading>
      <Subtext>Flexible plans that scale with your usage. No subscriptions—just pay for what you use.</Subtext>

      <CardGrid>
        {pricingPlans.map((plan, index) => (
          <Card key={index} popular={plan.popular}>
            {plan.popular && <Ribbon>Most Popular</Ribbon>}
            <PlanName>{plan.name}</PlanName>
            <Price>₹{plan.price} <span>for {plan.credits} credits</span></Price>
            <Highlight>Instant activation · No expiration</Highlight>
            <FeatureList>
              <li>Use credits for any project type</li>
              <li>Access to all components</li>
              <li>Responsive layouts & clean code</li>
              <li>AI-enhanced suggestions</li>
              <li>Free updates and support</li>
            </FeatureList>
            <CTAButton onClick={() => handleBuy(plan)}>Get Credits</CTAButton>
          </Card>
        ))}
      </CardGrid>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      <SuccessModal
  isOpen={successModal}
  onRequestClose={() => setSuccessModal(false)}
  style={{
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
  }}
>
        <CheckCircle color="#22c55e" size={48} />
        <h3 style={{ marginTop: "16px", marginBottom: "8px" }}>Payment Successful</h3>
        <p>Your credits have been added successfully. Redirecting to Code Console...</p>
      </SuccessModal>
    </Section>
  );
};

export default Pricing;