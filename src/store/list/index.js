import { ADD_TODO, DELETE_TODO, CHANGE_STATUS } from './constants';

const initialState = {
  list: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const id = new Date().valueOf();
      return {
        ...state,
        list: [...state.list, { id, ...action.payload }],
      };
    }
    case CHANGE_STATUS: {
      return {
        ...state,
        list: state.list.map((todo) =>
          action.payload.includes(todo.id)
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo
        ),
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        list: state.list.filter((todo) => !action.payload.includes(todo.id)),
      };
    }
    default:
      return state;
  }
};

export default todosReducer;
