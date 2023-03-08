import React from 'react';
import Header from '../../components/Header';
import './index.css';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="page">
    <header className="page-header">
      <Header />
    </header>
    <main className="page-main">{children}</main>
  </div>
);

export default DefaultLayout;
