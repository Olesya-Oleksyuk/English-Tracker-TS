import { Chart } from 'chart.js';

const getOrCreateLegendList = (id: string, fontColor: string) => {
  const legendContainer = document.getElementById(id);
  if (legendContainer) {
    legendContainer.style.width = '100%';
    legendContainer.style.overflow = 'hidden';
  }

  let listContainer = legendContainer?.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.style.display = 'flex';
    listContainer.style.alignItems = 'flex-end';
    listContainer.style.flexDirection = 'column';
    listContainer.style.margin = '0';
    listContainer.style.padding = '0';
    listContainer.style.marginLeft = '10px';
    listContainer.style.color = fontColor;
    legendContainer?.appendChild(listContainer);
  }

  return listContainer;
};

interface DoughnutLegendOptions {
  containerId: string;
  legendTextColor: string;
  legendFontSize: string;
  legendFontFamily: string;
}
export const DoughnutLegend = {
  // id для регистрации плагина в пропсе графика - plugins
  id: 'doughnutLegend',
  // Вызывается перед рендерингом в момент обновления значений датасета (стадия Chart Update)
  beforeDatasetUpdate(
    chart: Chart,
    args: object,
    options: DoughnutLegendOptions
  ) {
    const ul = getOrCreateLegendList(
      options.containerId,
      options.legendFontSize
    );
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    if (chart.legend?.legendItems) {
      chart.legend?.legendItems.forEach((item) => {
        const li = document.createElement('li');
        li.style.width = '100%';
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.margin = '0 0 8px 0';

        li.onclick = () => {
          if (item.index != null) {
            chart.toggleDataVisibility(item.index);
          }
          chart.update();
        };

        const textContainer = document.createElement('p');
        textContainer.style.width = 'calc(100% - 20px)';
        textContainer.style.whiteSpace = 'nowrap';
        textContainer.style.overflow = 'hidden';
        textContainer.style.textOverflow = 'ellipsis';
        textContainer.style.color = String(item.fontColor);
        textContainer.style.margin = '0';
        textContainer.style.padding = '0';
        textContainer.style.textAlign = 'right';
        textContainer.style.color = options.legendTextColor;
        textContainer.style.opacity = '0.7';
        textContainer.style.fontSize = options.legendFontSize;
        textContainer.style.fontFamily = options.legendFontFamily;
        textContainer.style.lineHeight = '1.21';
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);

        const boxSpan = document.createElement('span');
        boxSpan.style.background = String(item.fillStyle);
        boxSpan.style.borderColor = String(item.strokeStyle);
        boxSpan.style.borderWidth = `${item.lineWidth}px`;
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '12px';
        boxSpan.style.width = '12px';
        boxSpan.style.marginLeft = '8px';
        boxSpan.style.borderRadius = '2px';

        li.appendChild(textContainer);
        li.appendChild(boxSpan);
        ul.appendChild(li);
      });
    }
  },
};

export const getDoughnutCustomLegendOptions = ({
  fontColor = '#313131',
  fontSize = '12px',
  fontFamily = "'Open Sans', sans-serif",
  containerId = 'legend-container',
}) => ({
  plugins: {
    legend: {
      display: false,
    },
    doughnutLegend: {
      containerId,
      // для передачи значений в options аргумент хуков подготовки/отрисовки графика
      legendTextColor: fontColor,
      legendFontSize: fontSize,
      legendFontFamily: fontFamily,
    },
  },
});

export default DoughnutLegend;
