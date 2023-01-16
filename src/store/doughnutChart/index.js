import { GET_DATA_START, GET_DATA_SUCCESS } from './constants';

const initialState = {
  data: {},
  loading: false,
};

const doughnutChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default doughnutChartReducer;
