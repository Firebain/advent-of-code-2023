import { readLines } from "../../utils/file";
import { getNumbersFromStr } from "../../utils/parsing";

export const first = (input: string) => {
  const lines = readLines(input);

  const timeNumbers = getNumbersFromStr(lines[0].slice(4));
  const distanceNumbers = getNumbersFromStr(lines[1].slice(8));

  const races = timeNumbers.map((time, index) => [
    time,
    distanceNumbers[index],
  ]);

  const results = [];
  for (const race of races) {
    let count = 0;

    for (let ms = 1; ms < race[0]; ms++) {
      const timeLeft = race[0] - ms;

      const distance = ms * timeLeft;

      if (distance > race[1]) {
        count += 1;
      }
    }

    results.push(count);
  }

  return results.reduce((a, b) => a * b);
};

export const second = (input: string) => {
  const lines = readLines(input);

  const time = getNumbersFromStr(lines[0].slice(4).replaceAll(" ", ""));
  const distance = getNumbersFromStr(lines[1].slice(8).replaceAll(" ", ""));

  const race = [time[0], distance[0]];

  let count = 0;

  for (let ms = 1; ms < race[0]; ms++) {
    const timeLeft = race[0] - ms;

    const distance = ms * timeLeft;

    if (distance > race[1]) {
      count += 1;
    }
  }

  return count;
};
