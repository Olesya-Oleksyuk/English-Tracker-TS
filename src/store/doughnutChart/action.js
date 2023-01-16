import { GET_DATA_START, GET_DATA_SUCCESS } from './constants';

export const getDataStart = () => ({
  type: GET_DATA_START,
});

export const getDataSuccess = (data) => ({
  type: GET_DATA_SUCCESS,
  payload: data,
});
