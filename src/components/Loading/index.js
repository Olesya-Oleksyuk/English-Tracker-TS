import React from 'react';
import './style.css';

const Loading = (props = { height: '20px' }) => (
  <div className="loading-box" style={props}>
    <div className="loading" />
  </div>
);

export default Loading;
