import { readLines } from "../../utils/file";
import { getNumbersFromStr } from "../../utils/parsing";

const diffSteps = (sequence: number[]) => {
  let currentSequence = sequence;

  const diffs = [sequence];

  while (true) {
    const numbers = [];

    for (let i = 0; i + 1 < currentSequence.length; i++) {
      numbers.push(currentSequence[i + 1] - currentSequence[i]);
    }

    diffs.push(numbers);

    if (numbers.every((num) => num === 0)) {
      break;
    }

    currentSequence = numbers;
  }

  return diffs;
};

export const first = (input: string) => {
  const sequences = readLines(input).map(getNumbersFromStr);

  const traverceNumbers = (diffs: Array<number[]>) => {
    const reversed = diffs.reverse();

    let num = 0;
    for (let i = 0; i < reversed.length; i++) {
      num += reversed[i][reversed[i].length - 1];
    }

    return num;
  };

  let sum = 0;
  for (const sequence of sequences) {
    sum += traverceNumbers(diffSteps(sequence));
  }

  return sum;
};

export const second = (input: string) => {
  const sequences = readLines(input).map(getNumbersFromStr);

  const traverceNumbers = (diffs: Array<number[]>) => {
    const reversed = diffs.reverse();

    let num = 0;
    for (let i = 0; i < reversed.length; i++) {
      num = reversed[i][0] - num;
    }

    return num;
  };

  let sum = 0;
  for (const sequence of sequences) {
    sum += traverceNumbers(diffSteps(sequence));
  }

  return sum;
};
