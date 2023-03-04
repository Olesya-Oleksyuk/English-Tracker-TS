import React, { useState } from 'react';

import NumberInput from '../NumberInput';
import Dropdown from '../Dropdown';

import useCheckSelectedStatus from '../../hooks/useCheckSelectedStatus';
import { useAppDispatch } from '../../store/hooks';

import { dropdownPlaceholder, taskCategory } from '../Dropdown/constants';
import { addTask } from '../../store/taskSlice';

import './TaskInputPanel.css';

const TaskInputPanel = () => {
  const dispatch = useAppDispatch();

  const formIds = {
    selectCategoryId: 'selected-category',
    selectTaskAmountId: 'selected-task-amount',
  };

  const [inputText, setInputText] = useState('');

  const [selectedCategory, setSelectedCategory] =
    useState<string>(dropdownPlaceholder);

  const [taskAmount, setTaskAmount] = useState('0');
  const handleNonSelected = useCheckSelectedStatus();

  const handlerAddTask = () => {
    dispatch(
      addTask({
        description: inputText,
        category: selectedCategory,
        taskAmount: parseInt(taskAmount, 10),
      })
    );
    setInputText('');
  };

  const inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    const categoryFieldReady = isCategoryReady();
    const taskAmountFieldReady = isTaskAmountReady();

    inputText && categoryFieldReady && taskAmountFieldReady && handlerAddTask();
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
