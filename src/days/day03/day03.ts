import { readLines } from "../../utils/file";
import { isDigit } from "../../utils/parsing";

const matrixNeighbours = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const isNeighbour = (
  first: [number, number],
  second: [number, number]
): boolean => {
  for (const [yd, xd] of matrixNeighbours) {
    if (first[0] + yd === second[0] && first[1] + xd === second[1]) {
      return true;
    }
  }

  return false;
};

const returnNeighbours = (matrix: string[][], col: number, row: number) => {
  const neighbours: Array<{ value: string; pos: [number, number] }> = [];

  for (const [yd, xd] of matrixNeighbours) {
    if (col + yd < 0 || col + yd > matrix.length - 1) {
      continue;
    }

    if (row + xd < 0 || row + xd > matrix[col + yd].length - 1) {
      continue;
    }

    neighbours.push({
      value: matrix[col + yd][row + xd],
      pos: [col + yd, row + xd],
    });
  }

  return neighbours;
};

const checkNumCollides = (
  matrix: string[][],
  col: number,
  row: number,
  num: string
): boolean => {
  for (let x = row; x > row - num.length; x--) {
    const neighbours = returnNeighbours(matrix, col, x);

    for (const el of neighbours) {
      if (isDigit(el.value)) {
        continue;
      }

      if (el.value == ".") {
        continue;
      }

      return true;
    }
  }

  return false;
};

const getNumber = (matrix: string[][], col: number, row: number): number => {
  let start = row;

  while (start > 0 && isDigit(matrix[col][start - 1])) {
    start -= 1;
  }

  let num = "";
  for (let x = start; x < matrix[col].length; x++) {
    if (isDigit(matrix[col][x])) {
      num += matrix[col][x];
    } else {
      break;
    }
  }

  return Number(num);
};

const checkGearNeighbours = (
  matrix: string[][],
  col: number,
  row: number
): { valid: boolean; first: number; second: number } => {
  const neighbours = returnNeighbours(matrix, col, row);

  const allNumbers: Array<[number, number]> = [];
  const uniqueNumbers: Array<[number, number]> = [];
  for (const el of neighbours) {
    if (isDigit(el.value)) {
      allNumbers.push(el.pos);

      let hasNeighbours = false;

      for (const number of allNumbers) {
        if (isNeighbour(el.pos, number)) {
          hasNeighbours = true;
          break;
        }
      }

      for (const number of uniqueNumbers) {
        if (isNeighbour(el.pos, number)) {
          hasNeighbours = true;
          break;
        }
      }

      if (!hasNeighbours) {
        uniqueNumbers.push(el.pos);
      }
    }
  }

  if (uniqueNumbers.length !== 2) {
    return {
      valid: false,
      first: 0,
      second: 0,
    };
  }

  return {
    valid: true,
    first: getNumber(matrix, uniqueNumbers[0][0], uniqueNumbers[0][1]),
    second: getNumber(matrix, uniqueNumbers[1][0], uniqueNumbers[1][1]),
  };
};

export const first = (input: string) => {
  const matrix = readLines(input).map((line) => line.split(""));

  let sum = 0;
  for (let y = 0; y < matrix.length; y++) {
    let num = "";

    for (let x = 0; x < matrix[y].length; x++) {
      if (isDigit(matrix[y][x])) {
        num += matrix[y][x];
      } else {
        if (num !== "") {
          if (checkNumCollides(matrix, y, x - 1, num)) {
            sum += Number(num);
          }

          num = "";
        }
      }
    }

    if (num !== "") {
      if (checkNumCollides(matrix, y, matrix[y].length - 1, num)) {
        sum += Number(num);
      }

      num = "";
    }
  }

  return sum;
};

export const second = (input: string) => {
  const matrix = readLines(input).map((line) => line.split(""));

  let sum = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const el = matrix[y][x];

      if (el == "*") {
        const result = checkGearNeighbours(matrix, y, x);

        if (result.valid) {
          sum += result.first * result.second;
        }
      }
    }
  }

  return sum;
};
