import config from './config';

import {
  FormParam
} from './types/types';

export default function floorParameters(floors: number): FormParam {
  const { elevatorHeight, floorDivHeight } = config.building;
  const setting = {};
  for (let i = 1; i <= floors; i++) {
    const pos = (i - 1) * (elevatorHeight + floorDivHeight);
    setting[i] = pos;
  }

  return setting;
}
