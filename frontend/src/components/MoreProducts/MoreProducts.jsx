import React from 'react';
import PricingCard from '../PricingCard/PricingCard'; // Import PricingCard component
import './MoreProducts.css'; // 
import '../PricingCard/PricingCard.css'; // Import the CSS file for PricingCard
import { Link } from 'react-router-dom';

// More products data array (similar structure to your pricingPlans array)
const moreProducts = [
  {
    id: '4',
    title: 'Advanced',
    price: '₹1499.00',
    features: [
      { text: 'Priority Support', available: true },
      { text: 'Advanced Analytics', available: true },
      // ... more features
    ],
    isMostPopular: false,
  },
  {
    id: '5',
    title: 'Professional',
    price: '₹2499.00',
    features: [
      { text: 'All Advanced Features', available: true },
      { text: 'Personal Account Manager', available: true },
      // ... more features
    ],
    isMostPopular: true,
  },
  {
    id: '6',
    title: 'Enterprise',
    price: '₹4999.00',
    features: [
      { text: 'Dedicated Infrastructure', available: true },
      { text: 'Enterprise-grade Security', available: true },
      // ... more features
    ],
    isMostPopular: false,
  },
  // ... more products as needed
];


function MoreProducts() {
  return (
    <div className="more-products-container">
       <div className="back">
      <Link to="/">Back to Main Page</Link>
      </div>
      
      {/* Loop through more products and display them */}
      {moreProducts.map((product, index) => (
        <PricingCard
          key={index}
          id={product.id}
          title={product.title}
          price={product.price}
          features={product.features}
          isMostPopular={product.isMostPopular}
        />
      ))}
   
    </div>
   
  

  );
}

export default MoreProducts;
