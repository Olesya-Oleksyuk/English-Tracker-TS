import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';

import {
  DoughnutLegend,
  getDoughnutCustomLegendOptions,
} from './Plugins/DoughnutLegend';
import getDoughnutCustomLabels from './Plugins/DoughnutCustomLabels';

import './DoughnutChart.css';

// Отрисовка центрального лейбла, который равен суммарному значению датасета;
const centerLabel = (total: number) => ({
  // id для регистрации плагина в пропсе графика - plugins
  id: 'centerLabelPlugin',
  // Вызывается перед отрисовкой графика каждого кадра анимации (стадия Rendering);
  beforeDraw: (chart: Chart) => {
    const {
      ctx,
      chartArea: { width, height },
    } = chart;

    // возврат последнего сохраненного состояния
    ctx.restore();
    // const fontSize = (height / 170).toFixed(2);
    const fontSize = (height * 0.15).toFixed(2);
    ctx.font = `bold ${fontSize}px  sans-serif`;
    // ctx.font = `bold ${fontSize}em  sans-serif`;
    ctx.textBaseline = 'middle';

    // font color
    ctx.fillStyle = '#382c9c';

    const text = String(total);
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  },
});

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
          // регестрируем плагины локально, применительно к данному графику
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          plugins={[centerLabel(total), ChartDataLabels, DoughnutLegend]}
          type="doughnut"
        />
      </div>
      {/* Место для отрисовки кастомной легенды */}
      <div id="legend-container" />
    </div>
  );
};

export default DoughnutChart;
