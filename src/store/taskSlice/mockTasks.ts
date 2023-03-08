import { loremIpsum } from 'lorem-ipsum';
import { Task } from './index';
import { taskCategory } from '../../components/Dropdown/constants';

const getRandomValue = (obj: object) => {
  const values = Object.values(obj);
  return values[Math.floor(Math.random() * values.length)];
};

const getRandomDate = (start = new Date(2021, 0, 1), end = new Date()) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const generateRandomNumber = (minLimit = 0, maxLimit = 10) =>
  Math.floor(Math.random() * (maxLimit - minLimit) + minLimit);

export const getMockTasks = (): Task[] =>
  [...Array(20)].map(() => {
    const date = getRandomDate();
    const randomTaskCategory = Object.keys(taskCategory).filter(
      (i) => i !== 'ALL'
    );

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
