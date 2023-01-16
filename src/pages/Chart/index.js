import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import DefaultLayout from '../../layouts/Default';
import { DoughnutChart } from '../../components/DoughnutChart';

import { getUniqueValues } from '../../helpers';
import './index.css';

const colors = [
  '#faf1e2',
  '#ffcec7',
  '#382c9c',
  '#c1548a',
  '#5eccc9',
  '#94c89c',
  '#31313180',
];

const Chart = () => {
  const taskList = useSelector((state) => state.mainReducer.tasks.tasks);

  const tasksData = useMemo(() => {
    if (!taskList.length) return [];
    const categories = getUniqueValues(taskList.map((task) => task.category));

    const notes = categories.map((category) => {
      const amountByCategory = taskList.reduce((acc, task) => {
        if (task.category === category) {
          return acc + parseInt(task.taskAmount, 10);
        }
        return acc;
      }, 0);
      return { categoryName: category, count: amountByCategory };
    });

    return {
      notes,
      colors,
      totalRows: notes.length,
      totalCount: notes.reduce((prev, curr) => prev + curr.count, 0),
    };
  }, [taskList]);

  return (
    <DefaultLayout>
      {Object.keys(tasksData).length ? (
        <div className="chart-container">
          <DoughnutChart
            countData={tasksData?.notes?.map((i) => i.count)}
            legendData={tasksData?.notes?.map((i) => i.categoryName)}
            total={tasksData?.totalCount}
            colors={tasksData?.colors}
            style={{ height: 300, width: 300 }}
          />
        </div>
      ) : (
        <h1 className="empty-list">Your list is empty!</h1>
      )}
    </DefaultLayout>
  );
};

export default Chart;
