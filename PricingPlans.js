import React from 'react';
import '../css/PricingPlans.css'; // Make sure to create this CSS file

const plans = [
    {
        name: 'Free Plan',
        price: '$0',
        features: ['Basic features', 'Community support', 'Limited storage'],
        buttonText: 'Get Started',
        isPopular: false,
    },
    {
        name: 'Premium Plan',
        price: '$9.99/month',
        features: ['All Free features', 'Custom themes', 'Advanced analytics', 'Priority support'],
        buttonText: 'Choose Plan',
        isPopular: true,
    },
    {
        name: 'Pro Plan',
        price: '$19.99/month',
        features: ['All Premium features', 'Custom content controls', 'Full API access'],
        buttonText: 'Go Pro',
        isPopular: false,
    },
];

const PricingPlans = () => {
    return (
        <div className="pricing-container">
            <h1 className="pricing-header">Choose Your Plan</h1>
            <div className="pricing-cards">
                {plans.map((plan, index) => (
                    <div key={index} className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
                        <h2 className="plan-name">{plan.name}</h2>
                        <p className="plan-price">{plan.price}</p>
                        <ul className="plan-features">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="feature-item">{feature}</li>
                            ))}
                        </ul>
                        <button className="plan-button">{plan.buttonText}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingPlans;
