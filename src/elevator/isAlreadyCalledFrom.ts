import * as _ from 'lodash';

import { FloorCalledFrom } from '../types';

export function isAlreadyCalledFrom(floorCall: FloorCalledFrom, elevators): boolean {
  const elevatorAsigned = _.findKey(elevators, (elevator) => {
    let res = _.find(elevator.queue, (ele) => {
      return ele.floor === floorCall.floor && ele.dir === floorCall.dir;
    });
    return !!res;
  });
  return !!elevatorAsigned;
}
