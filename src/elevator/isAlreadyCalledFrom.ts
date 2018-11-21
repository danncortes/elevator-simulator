//import _ from 'lodash';

import {
  FloorCalledFrom,
} from '../types/types';

export function isAlreadyCalledFrom(floorCall: FloorCalledFrom, elevators: {}): boolean {
  //console.log(_);
  // const elevatorAsigned = _.find(elevators, elevator => {
  //   console.log(elevator.queue)
  //   //return elevator.floor === floorCall.floor && elevator.dir === floorCall.dir
  // });
  // return (!!elevatorAsigned && true);
  return false;
}
