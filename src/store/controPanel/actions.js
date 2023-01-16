import { CHANGE_FILTER } from './constants';

export const changeStatusFilter = (checkedFilter) => ({
  type: CHANGE_FILTER,
  payload: checkedFilter,
});
