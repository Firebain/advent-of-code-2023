import { readLines } from "../../utils/file";
import { getAxisNeighbours } from "../../utils/matrix";

const PIPES: Record<string, string[]> = {
  "|": ["up", "down"],
  "-": ["left", "right"],
  L: ["up", "right"],
  J: ["up", "left"],
  "7": ["left", "down"],
  F: ["down", "right"],
  S: ["left", "right", "up", "down"],
};

const invertDirection = (dir: string) => {
  switch (dir) {
    case "up":
      return "down";
    case "down":
      return "up";
    case "left":
      return "right";
    case "right":
      return "left";
  }

  throw Error("Unknown direction");
};

const nextCorrectPipes = (
  coord: [number, number],
  map: string[][]
): Array<[number, number]> => {
  const pipe = map[coord[0]][coord[1]];

  if (pipe === ".") {
    return [];
  }

  const locations = PIPES[pipe];

  const neighbours = [] as Array<[number, number]>;
  for (const location of locations) {
    let offset: [number, number];

    switch (location) {
      case "up":
        offset = [-1, 0];
        break;
      case "down":
        offset = [1, 0];
        break;
      case "left":
        offset = [0, -1];
        break;
      case "right":
        offset = [0, 1];
        break;
      default:
        throw new Error("Unknown direction");
    }

    const [y, x] = [coord[0] + offset[0], coord[1] + offset[1]];

    if (y < 0 || y >= map.length) {
      continue;
    }

    if (x < 0 || x >= map[y].length) {
      continue;
    }

    const nextPipe = map[y][x];

    if (nextPipe === ".") {
      continue;
    }

    const nextPipeDirections = PIPES[nextPipe];

    if (!nextPipeDirections.includes(invertDirection(location))) {
      continue;
    }

    neighbours.push([y, x]);
  }

  return neighbours;
};

const findStartPoint = (map: string[][]): [number, number] => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") {
        return [y, x];
      }
    }
  }

  throw new Error("Starting point not found");
};

export const first = (input: string) => {
  const map = readLines(input).map((l) => l.split(""));

  const start = findStartPoint(map);

  const correctPipes = nextCorrectPipes(start, map);
  let count;
  for (const startPipe of correctPipes) {
    count = 1;
    let previousPipe = start;
    let currentPipe = startPipe;
    let startFound = false;

    while (true) {
      const correctPipes = nextCorrectPipes(currentPipe, map);

      for (const pipe of correctPipes) {
        if (pipe[0] === previousPipe[0] && pipe[1] === previousPipe[1]) {
          continue;
        }

        previousPipe = currentPipe;
        currentPipe = pipe;
        count += 1;
        break;
      }

      if (currentPipe[0] === startPipe[0] && currentPipe[1] === startPipe[1]) {
        break;
      }

      if (map[currentPipe[0]][currentPipe[1]] === "S") {
        startFound = true;

        break;
      }
    }

    if (startFound) {
      break;
    }
  }

  return count! / 2;
};

export const second = (input: string) => {
  const map = readLines(input).map((l) => l.split(""));

  const start = findStartPoint(map);

  const correctPipes = nextCorrectPipes(start, map);
  let mainPipe: Array<[number, number]> = [];
  for (const startPipe of correctPipes) {
    mainPipe = [startPipe];
    let previousPipe = start;
    let currentPipe = startPipe;
    let startFound = false;

    while (true) {
      const correctPipes = nextCorrectPipes(currentPipe, map);

      for (const pipe of correctPipes) {
        if (pipe[0] === previousPipe[0] && pipe[1] === previousPipe[1]) {
          continue;
        }

        previousPipe = currentPipe;
        currentPipe = pipe;
        mainPipe.push([pipe[0], pipe[1]]);
        break;
      }

      if (currentPipe[0] === startPipe[0] && currentPipe[1] === startPipe[1]) {
        break;
      }

      if (map[currentPipe[0]][currentPipe[1]] === "S") {
        startFound = true;

        break;
      }
    }

    if (startFound) {
      break;
    }
  }

  const filledSquare = [];
  for (let y = 0; y < map.length; y++) {
    let filling = false;
    for (let x = 0; x < map[y].length; x++) {
      const cell = map[y][x];

      if (!mainPipe.some(([fy, fx]) => fy === y && fx === x) && filling) {
        filledSquare.push([y, x]);

        continue;
      }

      if (
        mainPipe.some(([fy, fx]) => fy === y && fx === x) &&
        ["|", "J", "L", "S"].includes(cell)
      ) {
        filling = !filling;
      }
    }
  }

  return filledSquare.length;
};
