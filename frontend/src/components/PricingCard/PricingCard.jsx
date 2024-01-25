
import React from 'react';
import './PricingCard.css';
import axios from 'axios';

function PricingCard({ id, title, price, features, isMostPopular }) {
  const paddedId = `#${String(id).padStart(3, '0')}`;

  // This function is called when the "Get Started" button is clicked
  const handleGetStartedClick = async () => {
    // Assuming price is in the format '₹XXX.XX' and needs to be converted to paise
    const priceInPaise = parseInt(price.replace(/₹|,/g, ''));
  
    try {
      const response = await axios.post('http://localhost:8001/api/payment/orders', {
        amount: priceInPaise,
      });
      const { data } = response;
  
      // Open Razorpay checkout
      const options = {
        key: 'rzp_test_JMriPolxLY6EHm', // Replace with your actual Razorpay key
        amount: 100,
        currency: 'INR',
        name: 'F2 Fintech',
        description: 'Payment for ' + title,
        image: '/your-logo.png',
        order_id: data.id,
        handler: function (response) {
          // Payment was successful, you can call your backend verify function here
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          // You might want to redirect the user or change the state of your app here
        },
        
        theme: {
          color: '#3399cc',
        },
      };
  
      // Create Razorpay instance and open checkout
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('There was an error creating the order: ', error);
    }
  };
  

  return (
    
    <div className={`pricing-card ${isMostPopular ? 'popular' : ''}`}>
      {isMostPopular && <div className="ribbon">Most Popular</div>}
      <div className="card-header">
        <div className="card-id">{paddedId}</div>
        <h2>{title}</h2>
        <p className="price">{price}</p>
      </div>

      <ul className="features">
        {features.map((feature, index) => (
          <li key={index} className={feature.available ? 'included' : 'excluded'}>
            {feature.available ? '✓' : '✕'} {feature.text}
          </li>
        ))}
      </ul>
      <button className="get-started" onClick={handleGetStartedClick}>
        Get started
      </button>
    </div> 
  );
}

export default PricingCard;