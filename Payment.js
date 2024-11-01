import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Assuming payment was successful, save user subscription to Firestore
    await setDoc(doc(db, 'subscriptions', paymentMethod.id), {
      plan: 'premium',
      status: 'active',
      createdAt: new Date(),
    });

    setSuccess(true);
  };

  return (
    <div className="payment-container">
      <h1>Premium Plan Payment</h1>
      {success ? (
        <p>Payment successful! Thank you for your subscription.</p>
      ) : (
        <form onSubmit={handlePayment}>
          <CardElement />
          <button type="submit" disabled={!stripe}>Pay Now</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Payment;
