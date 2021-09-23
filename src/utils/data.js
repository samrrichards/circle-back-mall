const sumRowProperty = (row, property) => row.reduce((a, b) => a+b[property], 0);

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getInitialDots = row => {
  const totalEntries = sumRowProperty(row, 'entries');
  const totalExits = sumRowProperty(row, 'exits');
  const totalOccupants = sumRowProperty(row, 'occupants');

  const initialOccupants = totalOccupants + totalExits - totalEntries;

  return Math.ceil(initialOccupants/10);
};

export const parseData = row => ({
  ...row,
  zone: row.zone.split(" ").join('')
});

export const getDotNumber = num => Math.floor(num/10);
