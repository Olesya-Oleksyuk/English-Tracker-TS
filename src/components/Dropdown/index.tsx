import React, { Dispatch, SetStateAction, useState } from 'react';
import { taskCategory } from './constants';
import {
  categories,
  changeCategoryFilter,
} from '../../store/controlPanelSlice';
import { useAppDispatch } from '../../store/hooks';
import './style.css';

interface IDropdown {
  id: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  handleNonSelected?: any;
}

const Dropdown: React.FC<IDropdown> = ({
  id,
  selected,
  setSelected,
  handleNonSelected,
}) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();

  const openDropdownHandler = () => setIsActive(!isActive);

  const selectDropdownItemHandler = (option: categories) => {
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
};

export default Dropdown;
