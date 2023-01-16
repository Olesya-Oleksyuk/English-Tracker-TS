import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskCategory } from './constants';
import './style.css';
import { changeCategoryFilter } from '../../store/controlPanelSlice';

function Dropdown({ id, selected, setSelected, handleNonSelected }) {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const openDropdownHandler = () => setIsActive(!isActive);

  const selectDropdownItemHandler = (option) => {
    setSelected(option);
    dispatch(changeCategoryFilter({ checkedCategory: option }));

    if (handleNonSelected) {
      handleNonSelected.isNonSelected(id) &&
        handleNonSelected.removeNonSelectedStatus(id);
    }
    setIsActive(false);
  };

  return (
    <div className="dropdown">
      <div
        id={id}
        className={`dropdown-btn ${handleNonSelected?.nonSelectedClass(id)}`}
        onClick={openDropdownHandler}
        onKeyPress={openDropdownHandler}
        tabIndex={0}
        role="menu"
      >
        {selected}
        <span className="fas fa-caret-down" />
      </div>
      {isActive && (
        <div className="dropdown-content">
          {Object.values(taskCategory).map((option) => (
            <div
              onClick={() => {
                selectDropdownItemHandler(option);
              }}
              onKeyPress={() => {
                selectDropdownItemHandler(option);
              }}
              className="dropdown-item"
              tabIndex={0}
              role="menuitem"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
