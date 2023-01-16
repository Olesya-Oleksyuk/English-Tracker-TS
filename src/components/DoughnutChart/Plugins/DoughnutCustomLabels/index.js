// Выбор цвета шрифта лейбла на основе цвета фона его сектора
const pickColor = (bgColor) => {
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  // Разбиение hex записи цвета на 3 части, для извлечения интенсивности красной, зеленой и синей составляющих.
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB

  // Подсчет общей относительной яркости цвета (она же: luma, Y компонент) по цветовой модели YUV
  const intensity = r * 0.299 + g * 0.587 + b * 0.114;

  // Пределы яркости подобраны эксперементально и могут быть скорректированы по предпочтению
  if (intensity > 175) {
    return '#42403d';
  }
  if (intensity > 160) {
    return 'black';
  }
  return 'white';
};

// Расчет суммарного значения нескрытых элементов датасета в данный момент времени
const totalVisible = (ctx) => {
  const notHiddenItemIndices = ctx.chart.legend.legendItems.flatMap((i) =>
    !i.hidden ? i.index : []
  );

  return ctx.dataset.data.reduce(
    (acc, curr, i) => (notHiddenItemIndices.includes(i) ? acc + curr : acc),
    0
  );
};

const getDoughnutCustomLabels = ({ autoFontColor, autoFitWhenPossible }) => {
  const fontSize = autoFitWhenPossible?.fontSize || 20;
  const minPercentToShow = autoFitWhenPossible?.minPercentToShow || 3;

  // Динамический выбор цвета шрифта лейбла, в зависимости от бэкграунда сектора, на котором он размещен;
  // (для лучшей читаемости)
  const colorDetection = {
    color: (ctx) => {
      // label index
      const { dataIndex } = ctx;
      // sector background color on which the label is positioned
      const labelBackground = ctx.dataset.backgroundColor[dataIndex];
      return pickColor(labelBackground);
    },
  };

  // Динамическое сокрытие лейбла, когда сектор слишком мал для его размещения;
  const sizeDetection = {
    // функция вызывается на каждый элемент датасета (dataset item)
    formatter: (datasetItemValue, ctx) => {
      // какой процент от общего значения нескрытых (в данным момент) элементов датасета составляет текущий элемент
      const currPercentage = (datasetItemValue / totalVisible(ctx)) * 100;

      // скрывать лейбл, если значение элемента составляет меньше настраиваемого minPercentToShow
      return currPercentage < minPercentToShow ? '' : datasetItemValue;
    },
    // размер шрифта лейбла
    font: {
      size: fontSize,
    },
  };

  return {
    datalabels: {
      ...(autoFontColor && colorDetection),
      ...(autoFitWhenPossible && sizeDetection),
    },
  };
};

export default getDoughnutCustomLabels;
