import './style.css';

function runElevator() {
  console.log('Next floors', this.queue);
  console.log('Waiting to close doors...');
  setTimeout(() => {
    console.log('Closing doors...');
    setTimeout(() => {
      this.queue.splice(0, 2);
      console.log('Moving');
      setTimeout(() => {
        if (this.queue.length) runElevator.call(this);
        console.log('Arrived!');
      }, 4000);
    }, 2000);
  }, 3000);
}


const elevators = [
  {
    elevator: 1,
    queue: [1, 2, 3, 4, 5, 6, 7, 8],
    startEngine: runElevator,
  },
];

elevators[0].startEngine();
