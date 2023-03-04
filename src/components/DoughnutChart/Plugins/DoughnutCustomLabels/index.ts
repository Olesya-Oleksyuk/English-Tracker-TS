// Выбор цвета шрифта лейбла на основе цвета фона его сектора
// eslint-disable-next-line import/no-unresolved
import { Context } from 'chartjs-plugin-datalabels/types/context';

const pickColor = (bgColor: string) => {
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
const totalVisible = (ctx: Context): number => {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const notHiddenItemIndices = ctx.chart.legend!.legendItems!.flatMap((i) =>
    !i.hidden ? i.index : []
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ctx.dataset.data.reduce(
    (acc, curr, i) =>
      notHiddenItemIndices.includes(i) ? Number(acc) + Number(curr) : acc,
    0
  );
};

export type CustomLabelsFontOptions = {
  fontSize: number;
  minPercentToShow: number;
};

interface IDoughnutCustomLabels {
  autoFontColor: boolean;
  autoFitWhenPossible: CustomLabelsFontOptions;
}

const getDoughnutCustomLabels = ({
  autoFontColor,
  autoFitWhenPossible,
}: IDoughnutCustomLabels) => {
  const fontSize = autoFitWhenPossible?.fontSize || 20;
  const minPercentToShow = autoFitWhenPossible?.minPercentToShow || 3;

  // Динамический выбор цвета шрифта лейбла, в зависимости от бэкграунда сектора, на котором он размещен;
  // (для лучшей читаемости)
  const colorDetection = {
    color: (ctx: Context) => {
      // label index
      const { dataIndex } = ctx;
      // sector background color on which the label is positioned
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const labelBackground = ctx.dataset.backgroundColor[dataIndex];
      return pickColor(labelBackground);
    },
  };

  // Динамическое сокрытие лейбла, когда сектор слишком мал для его размещения;
  const sizeDetection = {
    // функция вызывается на каждый элемент датасета (dataset item)
    formatter: (datasetItemValue: number, ctx: Context) => {
      // какой процент от общего значения нескрытых (в данным момент) элементов датасета составляет текущий элемент
      const totalVisibleValue = ctx ? totalVisible(ctx) : 0;
      const currPercentage =
        totalVisibleValue !== 0
          ? (datasetItemValue / totalVisibleValue) * 100
          : 0;

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
