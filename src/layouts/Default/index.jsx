import React from 'react';
import Header from '../../components/Header';
import './index.css';
// import Header from '../../components/Header';

const DefaultLayout = ({ children }) => (
  <div className="page">
    <header className="page-header">
      <Header />
    </header>
    <main className="page-main">{children}</main>
  </div>
);

export default DefaultLayout;
