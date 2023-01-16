import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Dropdown from '../Dropdown';
import NumberInput from '../NumberInput';

import useCheckSelectedStatus from '../../hooks/useCheckSelectedStatus';
import { dropdownPlaceholder, taskCategory } from '../Dropdown/constants';
import { addTask } from '../../store/taskSlice';
import './TaskInputPanel.css';

const TaskInputPanel = () => {
  const dispatch = useDispatch();

  const formIds = {
    selectCategoryId: 'selected-category',
    selectTaskAmountId: 'selected-task-amount',
  };

  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    'Choose task category'
  );
  const [taskAmount, setTaskAmount] = useState('0');
  const handleNonSelected = useCheckSelectedStatus();

  const handlerAddTask = () => {
    dispatch(
      addTask({
        description: inputText,
        category: selectedCategory,
        date: Date.now(),
        taskAmount,
      })
    );
    setInputText('');
  };

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const isCategoryReady = () => {
    if (
      selectedCategory === dropdownPlaceholder ||
      selectedCategory === taskCategory.ALL
    ) {
      handleNonSelected.addNonSelectedStatus(formIds.selectCategoryId);
      return false;
    }
    return true;
  };

  const isTaskAmountReady = () => {
    if (!parseInt(taskAmount, 10)) {
      handleNonSelected.addNonSelectedStatus(formIds.selectTaskAmountId);
      return false;
    }
    return true;
  };

  const onKeyPress = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    const categoryFieldReady = isCategoryReady();
    const taskAmountFieldReady = isTaskAmountReady();

    inputText &&
      categoryFieldReady &&
      taskAmountFieldReady &&
      handlerAddTask(selectedCategory, taskAmount);
  };

  return (
    <div className="todo-form">
      <section className="input-options-wrapper">
        <Dropdown
          id={formIds.selectCategoryId}
          handleNonSelected={handleNonSelected}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <NumberInput
          id={formIds.selectTaskAmountId}
          name="completed-task-amount"
          value={taskAmount}
          setValue={setTaskAmount}
          handleNonSelected={handleNonSelected}
        />
      </section>
      <input
        value={inputText}
        onChange={inputTextHandler}
        onKeyPress={onKeyPress}
        type="text"
        className="todo-input"
        placeholder="Enter your task description here and choose amount of tasks you've done above"
      />
    </div>
  );
};

export default TaskInputPanel;
