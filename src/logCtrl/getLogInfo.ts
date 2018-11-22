import * as _ from 'lodash';

export function getLogInfo(elevator) {
  const { direction, queue, id, currentFloor, isMoving, next } = elevator;
  const queueList = _.map(queue, el => el.floor);
  queueList.shift()
  const nextFloor = next ? next.floor : next;
  return {
    id,
    direction,
    currentFloor,
    isMoving,
    next: nextFloor,
    queue: queueList
  }
}