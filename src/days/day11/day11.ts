import { readLines } from "../../utils/file";

export const first = (input: string) => {
  const matrix = readLines(input).map((line) => line.split(""));

  const atEmptyLineX = (coord: number) => {
    for (let y = 0; y < matrix.length; y++) {
      if (matrix[y][coord] === "#") {
        return false;
      }
    }

    return true;
  };

  const atEmptyLineY = (coord: number) => {
    for (let x = 0; x < matrix[coord].length; x++) {
      if (matrix[coord][x] === "#") {
        return false;
      }
    }

    return true;
  };

  const galaxies: Array<[number, number]> = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "#") {
        galaxies.push([y, x]);
      }
    }
  }

  const pairs = [];
  for (const [index, src] of galaxies.entries()) {
    for (const dst of galaxies.slice(index)) {
      if (src[0] === dst[0] && src[1] === dst[1]) {
        continue;
      }

      pairs.push([src, dst]);
    }
  }

  let counter = 0;
  for (const [galaxy, destGalaxy] of pairs) {
    if (galaxy[0] === destGalaxy[0] && galaxy[1] === destGalaxy[1]) {
      continue;
    }

    let yCounter = 0;

    const minY = Math.min(galaxy[0], destGalaxy[0]);
    const maxY = Math.max(galaxy[0], destGalaxy[0]);

    for (let y = minY; y < maxY; y++) {
      if (atEmptyLineY(y)) {
        yCounter += 2;
      } else {
        yCounter += 1;
      }
    }

    let xCounter = 0;

    const minX = Math.min(galaxy[1], destGalaxy[1]);
    const maxX = Math.max(galaxy[1], destGalaxy[1]);

    for (let x = minX; x < maxX; x++) {
      if (atEmptyLineX(x)) {
        xCounter += 2;
      } else {
        xCounter += 1;
      }
    }

    counter += yCounter + xCounter;
  }

  return counter;
};

export const second = (input: string) => {
  const matrix = readLines(input).map((line) => line.split(""));

  const atEmptyLineX = (coord: number) => {
    for (let y = 0; y < matrix.length; y++) {
      if (matrix[y][coord] === "#") {
        return false;
      }
    }

    return true;
  };

  const atEmptyLineY = (coord: number) => {
    for (let x = 0; x < matrix[coord].length; x++) {
      if (matrix[coord][x] === "#") {
        return false;
      }
    }

    return true;
  };

  const galaxies: Array<[number, number]> = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "#") {
        galaxies.push([y, x]);
      }
    }
  }

  const pairs = [];
  for (const [index, src] of galaxies.entries()) {
    for (const dst of galaxies.slice(index)) {
      if (src[0] === dst[0] && src[1] === dst[1]) {
        continue;
      }

      pairs.push([src, dst]);
    }
  }

  let counter = 0;
  for (const [galaxy, destGalaxy] of pairs) {
    if (galaxy[0] === destGalaxy[0] && galaxy[1] === destGalaxy[1]) {
      continue;
    }

    let yCounter = 0;

    const minY = Math.min(galaxy[0], destGalaxy[0]);
    const maxY = Math.max(galaxy[0], destGalaxy[0]);

    for (let y = minY; y < maxY; y++) {
      if (atEmptyLineY(y)) {
        yCounter += 1_000_000;
      } else {
        yCounter += 1;
      }
    }

    let xCounter = 0;

    const minX = Math.min(galaxy[1], destGalaxy[1]);
    const maxX = Math.max(galaxy[1], destGalaxy[1]);

    for (let x = minX; x < maxX; x++) {
      if (atEmptyLineX(x)) {
        xCounter += 1_000_000;
      } else {
        xCounter += 1;
      }
    }

    counter += yCounter + xCounter;
  }

  return counter;
};
