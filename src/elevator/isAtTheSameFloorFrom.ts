import * as _ from 'lodash';

import { FloorCalledFrom } from '../types';

export function isAtTheSameFloorFrom(floorCall: FloorCalledFrom, elevators) {
  const stoppedElevators = _.filter(elevators, (elevator) => elevator.direction === 0);
  const stoppedElevSameFloor = _.find(
    stoppedElevators,
    (elev) => elev.currentFloor === floorCall.floor
  );
  return !!stoppedElevSameFloor;
}
