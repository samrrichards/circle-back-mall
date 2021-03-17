import { moveToCenter,
         moveToExit,
         removeDots,
         switchClassToCenter,
         clearZone,
         drawDot
       } from './movement.js';

import {  getInitialDots,
          getDotNumber
        } from './data.js';

const initVisuals = row => {
  const numDots = getInitialDots(row.row);

  removeDots();

  for (let i = 0; i < numDots; i++) {
    drawDot("center", i);
  }
};

const simulateEntries = zone => {
  const numDots = getDotNumber(zone.entries);

  for (let i = 0; i < numDots; i++) {
    drawDot(zone.zone, i);
    moveToCenter(zone.zone, i);
  }
};

const simulateExits = zone => {
  const numDots = getDotNumber(zone.exits);
  switchClassToCenter(zone.zone);

  for (let i = 0; i < numDots; i++) {
    moveToExit(zone.zone);
  }
};

const startMovement = row => {
  row.row.forEach(clearZone);
  row.cb(row.row);
  row.row.forEach(simulateEntries);
  setTimeout(() => row.row.forEach(simulateExits), 2500);
};

const simulateHourlyMovement = (row, index) => {
  setTimeout(() => startMovement(row), index * 12500);
};


export const runSimulation = (data, cb) => {
  data = data.map(row => ({
    row,
    cb
  }));

  initVisuals(data[0]);

  data.forEach(simulateHourlyMovement);
};
