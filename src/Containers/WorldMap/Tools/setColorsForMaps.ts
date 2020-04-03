type Color = {
  [key: string]: string;
};
type ColorSet = {
  [key: string]: Color;
};

export const colorSet: ColorSet = {
  confirmed: {
    min: '#FFE082',
    max: '#641E16',
  },
  deaths: {
    min: '#D7CCC8',
    max: '#212121',
  },
  recovered: {
    min: '#DCEDC8',
    max: '#1B5E20',
  },
};
