import React, { useMemo } from 'react';

import DefaultLayout from '../../layouts/Default';
import DoughnutChart from '../../components/DoughnutChart';

import { getUniqueValues } from '../../helpers';
import { sectorsColors } from '../../components/DoughnutChart/constants';
import { useAppSelector } from '../../store/hooks';
import './index.css';

const Chart = () => {
  const taskList = useAppSelector((state) => state.mainReducer.tasks.tasks);

  type TaskChart = {
    countData: number[];
    legendData: string[];
    total: number;
    colors: string[];
  };

  const tasksData: TaskChart | undefined = useMemo(() => {
    if (!taskList.length) return undefined;
    const categories: string[] = getUniqueValues(
      taskList.map((task) => task.category)
    );

    const notes = categories.map((category) => {
      const amountByCategory = taskList.reduce((acc, task) => {
        if (task.category === category) {
          return acc + task.taskAmount;
        }
        return acc;
      }, 0);
      return { categoryName: category, count: amountByCategory };
    });

    return {
      countData: notes.map((i) => i.count),
      legendData: notes?.map((i) => i.categoryName),
      total: notes.reduce((prev, curr) => prev + curr.count, 0),
      colors: sectorsColors,
    };
  }, [taskList]);

  return (
    <DefaultLayout>
      {tasksData === undefined ? (
        <h1 className="empty-list">Your list is empty!</h1>
      ) : (
        <div className="chart-container">
          <DoughnutChart
            countData={tasksData.countData}
            legendData={tasksData.legendData}
            total={tasksData.total}
            colors={tasksData.colors}
            style={{ height: 300, width: 300 }}
          />
        </div>
      )}

      {/* Было */}
      {/* {Object.keys(tasksData).length ? ( */}
      {/*  <div className="chart-container"> */}
      {/*    <DoughnutChart */}
      {/*      countData={tasksData!.notes.map((i) => i.count)} */}
      {/*      legendData={tasksData?.notes?.map((i) => i.categoryName)} */}
      {/*      total={tasksData?.totalCount} */}
      {/*      colors={tasksData?.colors} */}
      {/*      style={{ height: 300, width: 300 }} */}
      {/*    /> */}
      {/*    <DoughnutChart */}
      {/*      countData={tasksData!.notes.map((i) => i.count)} */}
      {/*      legendData={tasksData?.notes?.map((i) => i.categoryName)} */}
      {/*      total={tasksData?.totalCount} */}
      {/*      colors={tasksData?.colors} */}
      {/*      style={{ height: 300, width: 300 }} */}
      {/*    /> */}
      {/*  </div> */}
      {/* ) : ( */}
      {/*  <h1 className="empty-list">Your list is empty!</h1> */}
      {/* )} */}
    </DefaultLayout>
  );
};

export default Chart;
