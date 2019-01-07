export function assignAndSortQueue(calledFrom, currentFloor, elevatorDir, currentQueue) {
  const { dir, floor } = calledFrom;
  let finalQueue = [...currentQueue];

  finalQueue.push(calledFrom);
  if (finalQueue.length > 1) {
    let nextFloorOppositeDir = finalQueue.filter((el) => {
      return el.dir !== elevatorDir;
    });
    if (elevatorDir === 2) {
      let nextFloorsGoingUp = finalQueue.filter((el) => {
        return el.dir === elevatorDir && el.floor > currentFloor;
      });
      nextFloorsGoingUp = nextFloorsGoingUp.sort((a, b) => a.floor - b.floor);

      nextFloorOppositeDir = nextFloorOppositeDir.sort((a, b) => b.floor - a.floor);

      let lastestFloorsGoingUp = finalQueue.filter((el) => {
        return el.dir === elevatorDir && el.floor <= currentFloor;
      });
      lastestFloorsGoingUp = lastestFloorsGoingUp.sort((a, b) => a.floor - b.floor);

      finalQueue = [...nextFloorsGoingUp, ...nextFloorOppositeDir, ...lastestFloorsGoingUp];
    } else if (elevatorDir === 1) {
      let nextFloorsGoingDown = finalQueue.filter((el) => {
        return el.dir === elevatorDir && el.floor < currentFloor;
      });
      nextFloorsGoingDown = nextFloorsGoingDown.sort((a, b) => b.floor - a.floor);

      nextFloorOppositeDir = nextFloorOppositeDir.sort((a, b) => a.floor - b.floor);

      let lastestFloorsGoingDown = finalQueue.filter((el) => {
        return el.dir === elevatorDir && el.floor >= currentFloor;
      });
      lastestFloorsGoingDown = lastestFloorsGoingDown.sort((a, b) => b.floor - a.floor);

      finalQueue = [...nextFloorsGoingDown, ...nextFloorOppositeDir, ...lastestFloorsGoingDown];
    }
  }
  return finalQueue;
}
