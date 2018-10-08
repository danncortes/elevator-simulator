import runElevator from './elevatorController';
import floorParameters from './floorParameters';

export default function configElevators(nElevators, nFloors) {
  const floorParams = floorParameters(nFloors);
  const engine = {
    floorParameters: floorParams,
    startEngine: runElevator,
  };
  const elevators = [];
  for (let i = 1; i <= nElevators; i++) {
    const elevator = Object.create(engine, {
      elevator: { value: i },
      queue: { value: { 1: [], 0: [] } },
    });
    elevators.push(elevator);
  }
  return elevators;
}
