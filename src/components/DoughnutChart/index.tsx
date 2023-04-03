import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  DoughnutLegend,
  getDoughnutCustomLegendOptions,
} from './Plugins/DoughnutLegend';
import getDoughnutCustomLabels from './Plugins/DoughnutCustomLabels';
import CenterLabel from './Plugins/СenterLabel';

import './DoughnutChart.css';

export type doughnutStyle = {
  height?: number;
  width?: number;
  marginRight?: number;
};

interface IDoughnutChart {
  countData: number[];
  legendData: string[];
  total: number;
  colors: string[];
  style?: doughnutStyle;
}

const DoughnutChart: React.FC<IDoughnutChart> = ({
  countData,
  legendData,
  total,
  colors,
  style,
}) => {
  const { height = 400, width = 400, marginRight = 0 } = { ...style };
  const doughnutCustomLabels = getDoughnutCustomLabels({
    autoFontColor: true,
    autoFitWhenPossible: { fontSize: 20, minPercentToShow: 3 },
  });

  const data = {
    labels: legendData,
    datasets: [
      {
        data: countData,
        backgroundColor: colors,
        // chartjs-plugin-datalabels: найстройка плагина кастомных лейблов относительно датасета
        ...doughnutCustomLabels,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    ...getDoughnutCustomLegendOptions({
      fontSize: '14',
    }),
  };

  return (
    <div className="chart-wrapper-plugin">
      <div
        className="doughnut-container"
        style={{ width, height, marginRight }}
      >
        <Doughnut
          data={data}
          options={options}
          // регистрируем плагины локально, применительно к данному графику
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          plugins={[CenterLabel(total), ChartDataLabels, DoughnutLegend]}
          type="doughnut"
        />
      </div>
      {/* Место для отрисовки кастомной легенды */}
      <div id="legend-container" />
    </div>
  );
};

export default DoughnutChart;
