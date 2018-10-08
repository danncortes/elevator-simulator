export default {
  speed: 1,
  building: {
    floorHeight: 38,
    elevatorHeight: 38,
    elevatorWidth: 25,
    floorDivHeight: 8,
    elevatorLaneHeight(floors) {
      return floors * this.floorHeight + (floors - 1) * this.floorDivHeight;
    },
  },
  times: {
    timeByFloor: 3000,
    movingTime: floors => floors * this.movingByFloor,
    openCloseDoors: 2000,
    waiting: 3500,
  },
  messages: {
    nextFloors: 'Next Floors:',
    waitingMs: 'Waiting...',
    closingDoors: 'Closing Doors...',
    moving: 'Moving to Floor:',
    arrived: 'Arrived to Floor:',
  },
};
