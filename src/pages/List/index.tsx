import React, { useEffect } from 'react';

import DefaultLayout from '../../layouts/Default';
import ControlPanel from '../../components/ControlPanel';
import TaskInputPanel from '../../components/TaskInputPanel';
import TodoList from '../../components/TodoList';
import Label from '../../components/Label';
import Index from '../../components/LanguageSelector';

import {
  clearLocalStorage,
  fetchTasks,
  generateMockTask,
} from '../../store/taskSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Text } from '../../multiLanguage/LanguageProvider';
import './index.css';

const List = () => {
  const dispatch = useAppDispatch();
  const { tasks: list, status: fetchingStatus } = useAppSelector(
    (state) => state.mainReducer.tasks
  );

  useEffect(() => {
    if (fetchingStatus === 'INITIALIZATION' || fetchingStatus === 'PENDING')
      dispatch(fetchTasks());
  }, [list]);

  const generateMockData = () => dispatch(generateMockTask());
  const clearCashData = () => {
    dispatch(clearLocalStorage());
  };

  return (
    <DefaultLayout>
      <div className="main-container">
        <header>
          <h1>
            <Text textId="TITLE" />
          </h1>
        </header>
        <div className="language-selector-container">
          <Index />
        </div>
        <Label className="demo-data-btn" variant="demo">
          <button type="button" onClick={generateMockData}>
            <Text textId="BUTTONS.DEMO" />
          </button>
        </Label>
        <Label className="clear-cash-btn" variant="demo">
          <button type="button" onClick={clearCashData}>
            <Text textId="BUTTONS.CLEAR_CASH" />
          </button>
        </Label>
        <div className="todo-list-container">
          <TaskInputPanel />
          <TodoList />
          {!!list?.length && (
            <ControlPanel
              leftNotes={list.filter((todo) => !todo.completed)}
              anyCompleted={list.filter((todo) => todo.completed)}
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default List;
