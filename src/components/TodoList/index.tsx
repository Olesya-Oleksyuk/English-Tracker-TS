import React, { useEffect, useMemo } from 'react';

import { Task } from '../../store/taskSlice';
import TaskItem from '../TaskItem';
import './TodoList.css';
import Loading from '../Loading';
import { setNumberOfNotesLeftCount } from '../../store/controlPanelSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const TodoList = () => {
  const { tasks, status: tasksStatus } = useAppSelector(
    (state) => state.mainReducer.tasks
  );
  const dispatch = useAppDispatch();

  const { status: filterStatus, category: filterCategory } = useAppSelector(
    (state) => state.mainReducer.controlPanel
  );

  const filteredByCategoryList = useMemo(() => {
    if (!tasks || !tasks.length) return [];

    if (filterCategory === 'ALL') {
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

  const countUncompleted = (list: Task[]) =>
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
      {tasksStatus === 'PENDING' && (
        <Loading style={{ width: '920px', height: '80px' }} />
      )}
      <ul className="todo-list">
        {tasksStatus === 'FULFILLED' &&
          !!filteredByStatusList.length &&
          filteredByStatusList.map((todo) => (
            <TaskItem key={todo.id} todo={todo} />
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
