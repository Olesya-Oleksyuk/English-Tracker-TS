import { useState } from 'react';

/**
 * @typedef {Object} FormElementStatusObserver
 * @property {string} nonSelectedClass - a non-selected class to add to the element when required
 * @property {Function} addNonSelectedStatus - get a field id & add it to the non-selected fields list
 * @property {Function} removeNonSelectedStatus - get a field id & delete it from the non-selected fields list
 * @property {Function} isNonSelected - check whether a field id is non-selected
 * @property {string[]} notSelectedFields - a list of non-selected field ids
 */

/**
 * A hook to preserve a list of form elements that have not been filled out or selected
 *
 * @returns {FormElementStatusObserver}
 */
const useCheckSelectedStatus = () => {
  const [notSelectedFields, setNonSelectedFields] = useState<string[]>([]);

  const addNonSelectedStatus = (fieldId: string) => {
    setNonSelectedFields((prevState) => [...prevState, fieldId]);
  };
  const removeNonSelectedStatus = (fieldId: string) => {
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
