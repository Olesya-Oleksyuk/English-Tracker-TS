import React, { useContext, useState } from 'react';

import NumberInput from '../NumberInput';
import Dropdown from '../Dropdown';

import useCheckSelectedStatus from '../../hooks/useCheckSelectedStatus';
import { useAppDispatch } from '../../store/hooks';

import { dropdownPlaceholder, taskCategory } from '../Dropdown/constants';
import { addTask, TaskCategory } from '../../store/taskSlice';

import './TaskInputPanel.css';
import {
  DictionaryData,
  DictionaryDataIds,
} from '../../multiLanguage/languages';
import {
  getText,
  LanguageContext,
  Text,
} from '../../multiLanguage/LanguageProvider';

const TaskInputPanel = () => {
  const dispatch = useAppDispatch();

  const { dictionary } = useContext(LanguageContext);
  const categories = (dictionary as DictionaryData).CATEGORIES;

  // get text according to id & current language
  const getTextDropdown = (textId: DictionaryDataIds) =>
    Text({
      textId: `CATEGORIES.${textId}` as DictionaryDataIds,
    });

  const formIds = {
    selectCategoryId: 'selected-category',
    selectTaskAmountId: 'selected-task-amount',
  };

  const [inputText, setInputText] = useState('');

  const [selectedCategory, setSelectedCategory] =
    useState<string>(dropdownPlaceholder);

  const selectedCategoryText =
    selectedCategory !== dropdownPlaceholder
      ? getText(`CATEGORIES.${selectedCategory}` as DictionaryDataIds)
      : getText('CONTROL_PANEL.DROPDOWN_PLACEHOLDER');

  const [taskAmount, setTaskAmount] = useState('0');
  const handleNonSelected = useCheckSelectedStatus();

  const handlerAddTask = () => {
    dispatch(
      addTask({
        description: inputText,
        category: selectedCategory as TaskCategory,
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
          // options={categoryList}
          options={categories as Record<string, string>}
          // options={categoryList}
          handleNonSelected={handleNonSelected}
          selected={selectedCategoryText}
          setSelected={setSelectedCategory}
          getText={getTextDropdown as (arg1: string) => JSX.Element}
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
        placeholder={getText('CONTROL_PANEL.INPUT_PLACEHOLDER')}
      />
    </div>
  );
};

export default TaskInputPanel;
