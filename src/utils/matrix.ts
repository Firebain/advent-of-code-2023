export const getAllNeighbours = (
  coord: [number, number],
  matrix: string[][]
) => {
  const matrixNeighbours: Array<[number, number]> = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return getNeighbours(coord, matrix, matrixNeighbours);
};

export const getAxisNeighbours = (
  coord: [number, number],
  matrix: string[][]
) => {
  const matrixNeighbours: Array<[number, number]> = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  return getNeighbours(coord, matrix, matrixNeighbours);
};

const getNeighbours = (
  coord: [number, number],
  matrix: string[][],
  offsets: Array<[number, number]>
) => {
  const neighbours: Array<{ value: string; pos: [number, number] }> = [];

  for (const [yd, xd] of offsets) {
    if (coord[0] + yd < 0 || coord[0] + yd > matrix.length - 1) {
      continue;
    }

    if (coord[1] + xd < 0 || coord[1] + xd > matrix[coord[0] + yd].length - 1) {
      continue;
    }

    neighbours.push({
      value: matrix[coord[0] + yd][coord[1] + xd],
      pos: [coord[0] + yd, coord[1] + xd],
    });
  }

  return neighbours;
};
