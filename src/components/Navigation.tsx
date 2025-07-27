import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default Navigation;
