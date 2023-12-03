import { readLines } from "../../utils/file";
import { isDigit } from "../../utils/parsing";

const spelledDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const maxSpelledDigitLen = Math.max(
  ...spelledDigits.map((digit) => digit.length)
);

const isSpelledDigit = (index: number, line: string): [boolean, string] => {
  const sub = line.substring(index, index + maxSpelledDigitLen);

  for (const [index, digit] of spelledDigits.entries()) {
    if (sub.startsWith(digit)) {
      return [true, String(index + 1)];
    }
  }

  return [false, ""];
};

export const first = (input: string) => {
  const lines = readLines(input);

  let sum = 0;
  for (const line of lines) {
    const numbers = [];

    for (const char of line) {
      if (isDigit(char)) {
        numbers.push(char);
      }
    }

    sum += Number(numbers[0] + numbers[numbers.length - 1]);
  }

  return sum;
};

export const second = (input: string) => {
  const lines = readLines(input);

  let sum = 0;
  for (const line of lines) {
    const numbers: string[] = [];

    for (let i = 0; i < line.length; i++) {
      if (isDigit(line[i])) {
        numbers.push(line[i]);

        continue;
      }

      const [truth, digit] = isSpelledDigit(i, line);
      if (truth) {
        numbers.push(digit);

        continue;
      }
    }

    sum += Number(numbers[0] + numbers[numbers.length - 1]);
  }

  return sum;
};
