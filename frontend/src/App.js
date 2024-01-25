// src/App.js
import React, { useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
import PricingCard from './components/PricingCard/PricingCard';
import Header from './components/Header/Header';
import MoreProducts from './components/MoreProducts/MoreProducts'; // Make sure to import MoreProducts
import './App.css';

function App() {

  const [isLoading, setIsLoading] = useState(false);

  const pricingPlans = [
    {
      id:'1',
      title: 'Free',
      price: '₹1.00',
      features: [
        // { text: 'Complimentary 15 Minutes Call with our Financial Experts', available: true },
        { text: 'F2 Financial Advisory', available: true },
        { text: 'Free 15min Expert Session:', available: true },
        { text: '1st call for data gathering with our advisor', available: true },
        { text: '1 Free live sessions', available: true },
        { text: '2nd call with our qualified financial advisor for a plan ', available: true },
        // { text: 'Retirement planning', available: false },
        // { text: 'Tax optimization', available: false },
        // { text: '1-Year Membership Plan', available: false },
        // { text: "Personalized Financial offering's", available: false },
        // { text: '24/7 Priority Support', available: false },
      ],
      isMostPopular: false
    },
    {
      id:2,
      title: 'Basic',
      price: '₹639.00',
      features: [
         { text: 'For individuals looking for lending solutions', available: true },
        { text: 'Eligibility Check Form Multiple Lenders', available: true },
        { text: 'Persoalized Lending Solutions', available: true },
        { text: 'One Year Relationship Management (RM) Support', available: true },
        // { text: 'Investment strategies', available: true },
        // { text: '5 Free live sessions', available: true },
        // { text: 'Debt management', available: true },
      //   { text: 'Retirement planning', available: false },
      //   { text: 'Tax optimization', available: false },
      //   { text: '1-Year Membership Plan', available: false },
      //   { text: "Personalized Financial offering's", available: false },
      //   { text: '24/7 Priority Support', available: false },
      // ],
      ],
      isMostPopular: true // Assuming the Plus plan is the most popular
    },
    {
      id:3,
      title: 'Plus',
      price: '₹1369.00',
      features: [
        { text: 'F2 Financial Advisory ', available: true },
        { text: 'Personalized Loan Solutions', available: true },
        { text: 'Team Sheet For Easy Comparison', available: true },
        { text: '1 Year RM Support', available: true },
        // { text: 'Unlimited live sessions', available: true },
        // { text: 'Debt management', available: true },
        // { text: 'Retirement planning', available: false },
        // { text: 'Tax optimization', available: false },
        // { text: '1-Year Membership Plan', available: false },
        // { text: "Personalized Financial offering's", available: false },
        // { text: '24/7 Priority Support', available: false },
      ],
      isMostPopular: false
    },
    // Add other plans like 'Pro' here...
  ];
  const additionalCards = [
    {
      id: '4',
      title: 'Basic Plan',
      price: '₹499.00',
      features: [
        { text: 'Basic Features', available: true },
        { text: 'Email Support', available: true },
        // Add more features as needed
      ],
      isMostPopular: false,
    },
    {
      id: '5',
      title: 'Pro Plan',
      price: '₹999.00',
      features: [
        { text: 'Advanced Features', available: true },
        { text: '24/7 Support', available: true },
        // Add more features as needed
      ],
      isMostPopular: true,
    },
    {
      id: '6',
      title: 'Enterprise Plan',
      price: '₹1999.00',
      features: [
        { text: 'Enterprise Features', available: true },
        { text: 'Dedicated Support', available: true },
        // Add more features as needed
      ],
      isMostPopular: false,
    },
  ];

  
  // Function to initiate the payment process
   // Function to initiate the payment process
   const initPayment = (data) => {
    const options = {
      key: "rzp_test_JMriPolxLY6EHm", // 
      amount: data.amount,
      currency: data.currency,
      name: "F2 Fintech ",
      description: "Test Transaction",
      // image: "Your Company Logo URL",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8000/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
          // Handle the successful verification of payment
        } catch (error) {
          console.error(error);
          // Handle the verification error
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const handleGetStarted = async (price, title) => {
    setIsLoading(true);
    let priceInPaise = Math.round(parseFloat(price.replace(/₹|,/g, '')) * 100);
    if (priceInPaise < 100) {
      alert('The amount should be at least ₹1.00');
      setIsLoading(false);
      return;
    }
    try {
      // The response from the server should contain the exact amount to be charged
      const response = await axios.post('/api/payment/orders', { amount: priceInPaise });
      setIsLoading(false);
      // Pass the entire response.data which contains the amount to initPayment
      initPayment(response.data);
    } catch (error) {
      console.error('There was an error creating the order: ', error);
      setIsLoading(false);
    }
  };
  
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <div className="pricing-container">
                {pricingPlans.map((plan, index) => (
                  <PricingCard
                    key={index}
                    id={plan.id}
                    title={plan.title}
                    price={plan.price}
                    features={plan.features}
                    isMostPopular={plan.isMostPopular}
                    handleGetStarted={handleGetStarted} 
                  />
                ))}
              </div>
              <div 
              className="next-page-container">
                <Link to="/more-products" className="next-page-link">Next Page for More Products</Link>
              </div>
              {isLoading && <div>Loading...</div>}
            </>
          } />
          <Route path="/more-products" element={<MoreProducts />} />
        </Routes>
      </div>
    </Router>
  );
 }
export default App;