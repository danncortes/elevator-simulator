import { EnvironmentConfig } from './types';

const environmentConfig: EnvironmentConfig = {
  speed: 1,
  averageQueue: true,
  building: {
    floorHeight: 34,
    elevatorHeight: 34,
    elevatorWidth: 25,
    floorDivHeight: 8,
    elevatorLaneHeight(floors) {
      return floors * this.floorHeight + (floors - 1) * this.floorDivHeight;
    }
  },
  times: {
    speedByFloor: 2000,
    openCloseDoors: 2000,
    waiting: 3500
  }
};

export default environmentConfig;
