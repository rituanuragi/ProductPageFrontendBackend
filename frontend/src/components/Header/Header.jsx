// src/components/Header/Header.jsx

import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        {/* Logo could be an image or text */}
        <div className="logo">FINTECH</div>
        <div className="nav-links">
          <a href="/products">Products</a>
          <a href="/pricing" className="active">Pricing</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
        <button className="sign-up-btn">Sign Up</button>
      </nav>
    </header>
  );
}

export default Header;
