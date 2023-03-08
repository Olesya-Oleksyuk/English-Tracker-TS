import React from 'react';
import { format } from 'date-fns';
import Label from '../Label';

import { changeStatus, deleteTasks, Task } from '../../store/taskSlice';
import { useAppDispatch } from '../../store/hooks';
import { Text } from '../../multiLanguage/LanguageProvider';
import { DictionaryDataIds } from '../../multiLanguage/languages';
import './TaskItem.css';

interface ITaskItem {
  todo: Task;
}

const TaskItem: React.FC<ITaskItem> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const handlerDelete = (taskId: number) => {
    dispatch(deleteTasks({ ids: [taskId] }));
  };
  const handlerComplete = (taskId: number) => {
    dispatch(changeStatus({ ids: [taskId] }));
  };

  const getCategory = (str: string) => {
    const categoryStr = `CATEGORIES.${str.split(' ').join('_')}`;
    return <Text textId={categoryStr as DictionaryDataIds} />;
  };

  return (
    <div className="todo">
      <button
        className="complete-btn"
        type="button"
        onClick={() => handlerComplete(todo.id)}
      >
        <span className="fa-stack complete-btn-icon">
          <i className="far fa-circle fa-stack-2x" />
          {todo.completed ? <i className="fas fa-check fa-stack-1x" /> : null}
        </span>
      </button>
      <li
        className={`todo-item todo-item-description ${
          todo.completed ? 'completed' : ''
        }`}
      >
        {todo.description}
      </li>
      <li
        className={`todo-item todo-item-category ${
          todo.completed ? 'completed' : ''
        }`}
      >
        {getCategory(todo.category)}
      </li>
      <li className="todo-item todo-item-amount">
        <Label disabled={todo.completed} fullWidth>
          {todo.taskAmount}
        </Label>
      </li>
      <li
        className={`todo-item todo-item-date ${
          todo.completed ? 'completed' : ''
        }`}
      >
        {format(todo.date, 'yyyy-MM-dd')}
      </li>
      <button
        className="trash-btn"
        type="button"
        onClick={() => handlerDelete(todo.id)}
      >
        <i className="fas fa-trash-alt" />
      </button>
    </div>
  );
};
export default TaskItem;
