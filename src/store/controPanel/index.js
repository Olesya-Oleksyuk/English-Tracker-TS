import { CHANGE_FILTER } from './constants';

// const initialState = { status: { name: 'All', id: 0 } };
const initialState = { status: { name: 'all' } };

const controlPanelReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return { status: { name: action.payload } };

    default:
      return state;
  }
};

export default controlPanelReducer;
