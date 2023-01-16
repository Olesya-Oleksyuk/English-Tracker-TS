import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultLayout from '../../layouts/Default';
import ControlPanel from '../../components/ControlPanel';
import TaskInputPanel from '../../components/TaskInputPanel';
import { TodoList } from '../../components/TodoList';

import './index.css';
import { fetchTasks, generateMockTask, STATUS } from '../../store/taskSlice';
import Label, { LabelVariant } from '../../components/Label';

const List = () => {
  const dispatch = useDispatch();
  const { tasks: list, status: fetchingStatus } = useSelector(
    (state) => state.mainReducer.tasks
  );

  useEffect(() => {
    if (fetchingStatus === STATUS.INITIALIZATION) dispatch(fetchTasks());
  }, []);

  const generateMockData = () => dispatch(generateMockTask());

  return (
    <DefaultLayout>
      <div className="main-container">
        <header>
          <h1> Your English Tracker </h1>
        </header>
        <Label className="demo-data-btn" variant={LabelVariant.DEMO}>
          <button type="button" onClick={generateMockData}>
            Демо данные
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
