import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TaskItem from '../TaskItem';
import './TodoList.css';
import Loading from '../Loading';
import { STATUS } from '../../store/taskSlice';
import { taskCategory } from '../Dropdown/constants';
import { setNumberOfNotesLeftCount } from '../../store/controlPanelSlice';

export const TodoList = () => {
  const { tasks, status: tasksStatus } = useSelector(
    (state) => state.mainReducer.tasks
  );
  const dispatch = useDispatch();

  const { status: filterStatus, category: filterCategory } = useSelector(
    (state) => state.mainReducer.controlPanel
  );

  const filteredByCategoryList = useMemo(() => {
    if (!tasks || !tasks.length) return [];

    if (filterCategory === taskCategory.ALL) {
      return tasks;
    }

    return tasks.filter((task) => task.category === filterCategory);
  }, [tasks, filterCategory]);

  const filteredByStatusList = useMemo(() => {
    if (!filteredByCategoryList.length) return [];

    switch (filterStatus) {
      case 'completed':
        return filteredByCategoryList.filter((task) => task.completed);
      case 'uncompleted':
        return filteredByCategoryList.filter((task) => !task.completed);
      default:
        return filteredByCategoryList;
    }
  }, [filteredByCategoryList, filterStatus]);

  const countUncompleted = (list) =>
    list.filter((task) => !task.completed).length;

  useEffect(() => {
    dispatch(
      setNumberOfNotesLeftCount({
        notesLeftCount: countUncompleted(filteredByCategoryList),
      })
    );
  }, [filteredByCategoryList.length, tasks]);

  return (
    <div className="todo-container">
      {tasksStatus === STATUS.PENDING && (
        <Loading width="920px" height="80px" />
      )}
      <ul className="todo-list">
        {tasksStatus === STATUS.FULFILLED &&
          !!filteredByStatusList.length &&
          filteredByStatusList.map((todo) => (
            <TaskItem key={todo.id} todo={todo} />
          ))}
      </ul>
    </div>
  );
};
