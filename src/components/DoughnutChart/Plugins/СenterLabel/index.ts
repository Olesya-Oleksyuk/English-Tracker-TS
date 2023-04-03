// Отрисовка центрального лейбла, который равен суммарному значению датасета;
import { Chart } from 'chart.js';

// Отрисовка центрального лейбла, который равен суммарному значению датасета;
const CenterLabel = (total: number) => ({
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
    const fontSize = (height * 0.15).toFixed(2);
    ctx.font = `bold ${fontSize}px  sans-serif`;
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

export default CenterLabel;
