import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  categories,
  changeCategoryFilter,
} from '../../store/controlPanelSlice';
import { useAppDispatch } from '../../store/hooks';
import { IHandleNonSelected } from '../../hooks/useCheckSelectedStatus/types';
import './style.css';

interface IDropdown {
  id: string;
  selected: string;
  options: Record<string, string>;
  setSelected: Dispatch<SetStateAction<string>>;
  handleNonSelected?: IHandleNonSelected;
  getText?: (arg1: string) => JSX.Element;
}

const Dropdown: React.FC<IDropdown> = ({
  id,
  options,
  selected,
  setSelected,
  handleNonSelected,
  getText,
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
          {Object.keys(options).map((option, index) => (
            <div
              onClick={() => {
                selectDropdownItemHandler(option as categories);
              }}
              onKeyPress={() => {
                selectDropdownItemHandler(option as categories);
              }}
              className="dropdown-item"
              tabIndex={0}
              role="menuitem"
              key={index}
            >
              {getText ? getText(option) : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
