import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import About from '@/components/About';
import NotFound from '@/components/NotFound';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
