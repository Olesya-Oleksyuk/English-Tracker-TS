/* eslint-disable arrow-body-style */
import { loremIpsum } from 'lorem-ipsum';
import { taskCategory } from '../../components/Dropdown/constants';
import { Task } from './index';

const getRandomValue = (obj: object) => {
  const values = Object.values(obj);
  return values[Math.floor(Math.random() * values.length)];
};

const getRandomDate = (start = new Date(2021, 0, 1), end = new Date()) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const generateRandomNumber = (minLimit = 0, maxLimit = 10) => {
  return Math.floor(Math.random() * (maxLimit - minLimit) + minLimit);
};

export const getMockTasks = (): Task[] => {
  return [...Array(20)].map(() => {
    const date = getRandomDate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ALL, ...randomTaskCategory } = taskCategory;

    return {
      id: date.valueOf(),
      description: loremIpsum({
        count: generateRandomNumber(0, 3),
        units: 'sentences',
      }),
      completed: false,
      category: getRandomValue(randomTaskCategory),
      date: date.valueOf(),
      taskAmount: generateRandomNumber(1, 15),
    };
  });
};
