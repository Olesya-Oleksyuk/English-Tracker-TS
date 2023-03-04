import { useState } from 'react';

// Hook to preserve a list of form elements that have not been filled out or selected
const useCheckSelectedStatus = () => {
  const [notSelectedFields, setNonSelectedFields] = useState<string[]>([]);

  const addNonSelectedStatus = (fieldId: string) => {
    setNonSelectedFields((prevState) => [...prevState, fieldId]);
  };
  const removeNonSelectedStatus = (
    fieldId: (typeof notSelectedFields)[number]
  ) => {
    setNonSelectedFields(notSelectedFields.filter((i) => i !== fieldId));
  };
  const isNonSelected = (fieldId: string) =>
    notSelectedFields.includes(fieldId);

  const nonSelectedClass = (fieldId: string) =>
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
