import { Condition } from '../shared/types';
import Drop from '../icons/drop.svg';
import Sun from '../icons/sun.svg';
import Storm from '../icons/storm.svg';
import Rainy from '../icons/rainy.svg';
import Moon from '../icons/moon.svg';
import Cloud from '../icons/cloud.svg';
import Snow from '../icons/snow.svg';

const conditionMap = {
  [Condition.Clear]: Sun,
  [Condition.Clouds]: Cloud,
  [Condition.Drizzle]: Drop,
  [Condition.Rain]: Rainy,
  [Condition.Snow]: Snow,
  [Condition.Thunderstorm]: Storm,
}

const conditionMapDay = {
  ...conditionMap,
  [Condition.Clear]: Sun
}

const conditionMapNight = {
  ...conditionMap,
  [Condition.Clear]: Moon
}

export function getIconByCondition(condition: Condition, dt: number): React.Component {
  const hours = new Date(dt * 1000).getHours();
  const isDay = Boolean(hours > 6 && hours < 20);
  const iconMap = isDay ? conditionMapDay : conditionMapNight;
  return iconMap[condition];
}
