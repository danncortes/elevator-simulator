import config from './config';

const {
  messages: {
    nextFloors, closingDoors, waitingMs, arrived, moving,
  },
  times: { openCloseDoors, waiting },
} = config;

export default function runElevator() {
  console.log(`${nextFloors} ${this.queue}`);
  console.log(`${waitingMs}`);
  setTimeout(() => {
    console.log(`${closingDoors}`);
    setTimeout(() => {
      this.queue.splice(0, 2);
      console.log('Moving');
      setTimeout(() => {
        console.log(`${arrived}`);
        if (this.queue.length) runElevator.call(this);
      }, 4000);
    }, openCloseDoors);
  }, waiting);
}
