import config from './config';

export default function floorParameters(floors: number): object {
  const { elevatorHeight, floorDivHeight } = config.building;
  const setting = {};
  for (let i = 1; i <= floors; i++) {
    const pos = (i - 1) * (elevatorHeight + floorDivHeight);
    setting[i] = pos;
  }
  return setting;
}
