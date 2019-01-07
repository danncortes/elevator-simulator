import config from '../config';

export function setTravelTime(
  isMoving: boolean,
  elevatorElement: HTMLElement,
  nextYPosition,
  currentFloor: number,
  next
): number {
  let travelTime = 0;
  if (isMoving) {
    const elevatorLaneHeight = elevatorElement.parentElement.offsetHeight;
    const currentElevPosition = elevatorElement.offsetTop;
    const newDistance = Math.abs(
      elevatorLaneHeight - currentElevPosition - config.building.elevatorHeight - nextYPosition
    );
    travelTime = config.times.speedByFloor * (newDistance / config.building.floorHeight);
  } else {
    travelTime = config.times.speedByFloor * Math.abs(currentFloor - next.floor);
  }
  return travelTime;
}
