import { useState } from 'react';

// Hook to preserve a list of form elements that have not been filled out or selected
const useCheckSelectedStatus = () => {
  const [notSelectedFields, setNonSelectedFields] = useState([]);

  const addNonSelectedStatus = (fieldId) => {
    setNonSelectedFields((prevState) => [...prevState, fieldId]);
  };
  const removeNonSelectedStatus = (fieldId) => {
    setNonSelectedFields(notSelectedFields.filter((i) => i !== fieldId));
  };
  const isNonSelected = (fieldId) => notSelectedFields.includes(fieldId);

  const nonSelectedClass = (fieldId) =>
    isNonSelected(fieldId) ? 'field-not-selected' : '';

  return {
    nonSelectedClass,
    addNonSelectedStatus,
    removeNonSelectedStatus,
    isNonSelected,
    notSelectedFields,
  };
};

export default useCheckSelectedStatus;
