import React from 'react';
import Header from '../../components/Header';
import './index.css';

interface IDefaultLayout {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => (
  <div className="page">
    <header className="page-header">
      <Header />
    </header>
    <main className="page-main">{children}</main>
  </div>
);

export default DefaultLayout;
