import React from 'react';
import './Label.css';

export const LabelVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
  DEMO: 'demo',
};

const Label = ({
  variant = LabelVariant.PRIMARY,
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
