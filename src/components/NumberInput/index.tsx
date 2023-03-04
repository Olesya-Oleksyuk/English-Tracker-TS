import React, { useEffect } from 'react';
import './NumberInput.css';

interface NumberInputProps {
  id: string;
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  handleNonSelected: any;
}

const NumberInput = ({
  id,
  name,
  value,
  setValue,
  handleNonSelected,
}: NumberInputProps) => {
  useEffect(() => {
    if (!handleNonSelected) return;
    const { isNonSelected, removeNonSelectedStatus } = handleNonSelected;
    isNonSelected(id) && value !== '0' && removeNonSelectedStatus(id);
  }, [value]);

  return (
    <div
      className={`custom-input-wrapper ${handleNonSelected?.nonSelectedClass(
        id
      )}`}
    >
      <label htmlFor={id} className="visually-hidden">
        {name.replaceAll('-', ' ')}
      </label>
      <input
        className="custom-input"
        type="number"
        id={id}
        name={name}
        placeholder="0"
        min="0"
        step="5"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default NumberInput;
