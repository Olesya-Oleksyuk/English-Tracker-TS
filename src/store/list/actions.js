import { ADD_TODO, DELETE_TODO, CHANGE_STATUS } from './constants';

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: content,
});

export const deleteTodo = (ids) => ({
  type: DELETE_TODO,
  payload: ids,
});

export const changeStatus = (id) => ({
  type: CHANGE_STATUS,
  payload: id,
});
