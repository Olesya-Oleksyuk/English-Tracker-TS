import React from 'react';
import './style.css';

type Style = {
  height: string;
  width?: string;
};

interface ILoading {
  style: Style;
}

const Loading: React.FC<ILoading> = ({ style }) => (
  <div className="loading-box" style={style}>
    <div className="loading" />
  </div>
);

export default Loading;
