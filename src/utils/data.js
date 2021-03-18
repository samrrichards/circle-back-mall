const getTotalEntries = row => row.reduce((a, b) => a + b.entries, 0);

const getTotalExits = row => row.reduce((a, b) => a + b.exits, 0);

const getTotalOccupants = row => row.reduce((a, b) => a + b.occupancy, 0);

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getInitialDots = row => {
  const totalEntries = getTotalEntries(row);
  const totalExits = getTotalExits(row);
  const totalOccupants = getTotalOccupants(row);

  const initialOccupants = totalOccupants + totalExits - totalEntries;

  return Math.ceil(initialOccupants/10);
};

export const parseData = row => ({
  ...row,
  zone: row.zone.split(" ").join('')
});

export const getDotNumber = num => Math.floor(num/10);
