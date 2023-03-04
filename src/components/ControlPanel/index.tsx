import React from 'react';
import './ControlPanel.css';
import { useDispatch } from 'react-redux';
import {
  changeStatusFilter,
  filterStatus,
} from '../../store/controlPanelSlice';
import { changeStatus, deleteTasks, Task } from '../../store/taskSlice';
import { useAppSelector } from '../../store/hooks';

interface IControlPanel {
  leftNotes: Task[];
  anyCompleted: Task[];
}

const ControlPanel: React.FC<IControlPanel> = ({ leftNotes, anyCompleted }) => {
  const { notesLeftCount, category } = useAppSelector(
    (state) => state.mainReducer.controlPanel
  );
  const dispatch = useDispatch();
  const controlPanelWithCompleted = anyCompleted.length
    ? 'control-panel__completed'
    : '';

  const completeAllHandler = () => {
    if (category === 'ALL') {
      dispatch(
        changeStatus({
          ids: leftNotes.map((todo) => todo.id),
        })
      );
    }
    dispatch(
      changeStatus({
        ids: leftNotes.flatMap((todo) =>
          todo.category === category ? todo.id : []
        ),
      })
    );
  };

  const clearAllCompletedHandler = () => {
    dispatch(deleteTasks({ ids: anyCompleted.map((todo) => todo.id) }));
  };

  const handlerSetFilterStatus = (checkedFilter: filterStatus) => {
    dispatch(changeStatusFilter({ checkedFilter }));
  };

  return (
    <div className={`control-panel ${controlPanelWithCompleted}`}>
      <span
        className="control-complete-all"
        id="completeAll"
        onClick={completeAllHandler}
        onKeyPress={completeAllHandler}
        role="button"
        tabIndex={0}
      >
        {notesLeftCount} notes left
      </span>
      <form
        className="control-radios"
        name="radios"
        onChange={(e) => handlerSetFilterStatus(e.currentTarget.value)}
      >
        <input
          type="radio"
          value="all"
          id="all-todos"
          className="control-radio"
          name="radios"
          defaultChecked
        />
        <label htmlFor="all-todos">All</label>
        <input
          type="radio"
          value="uncompleted"
          className="control-radio"
          name="radios"
          id="uncompleted-todos"
        />
        <label htmlFor="uncompleted-todos">To do</label>
        <input
          type="radio"
          value="completed"
          className="control-radio"
          name="radios"
          id="completed-todos"
        />
        <label htmlFor="completed-todos">Completed</label>
      </form>
      {!!anyCompleted.length && (
        <span
          className="control-clear-completed"
          id="clearAll"
          onClick={clearAllCompletedHandler}
          onKeyPress={clearAllCompletedHandler}
          role="button"
          tabIndex={0}
        >
          Clear completed
        </span>
      )}
    </div>
  );
};

export default ControlPanel;
