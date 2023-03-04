import React from 'react';
import './Label.css';

type LabelVariant = 'primary' | 'secondary' | 'danger' | 'demo';

interface ILabel {
  variant?: LabelVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Label: React.FC<ILabel> = ({
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  className = '',
  children,
}) => {
  const disabledClass = disabled ? 'disabled' : '';
  const fullWidthClass = fullWidth ? 'full-width' : '';

  return (
    <span
      className={`colored-label ${variant} ${disabledClass} ${fullWidthClass} ${className}`}
    >
      {children}
    </span>
  );
};

export default Label;
