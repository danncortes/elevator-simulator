import * as _ from 'lodash';

import { InfoLog } from '../types';

export function getLogInfo(elevator): InfoLog {
  const { direction, queue, id, currentFloor, isMoving, next } = elevator;
  const queueList = _.map(queue, (el) => el.floor);
  queueList.shift();
  return {
    id,
    direction,
    currentFloor,
    isMoving,
    next,
    queue: queueList
  };
}
