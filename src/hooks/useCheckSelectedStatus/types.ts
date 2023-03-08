export interface IHandleNonSelected {
  nonSelectedClass: (fieldId: string) => '' | 'field-not-selected';
  addNonSelectedStatus: (fieldId: string) => void;
  removeNonSelectedStatus: (fieldId: string) => void;
  isNonSelected: (fieldId: string) => boolean;
  notSelectedFields: string[];
}
