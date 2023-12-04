import { readLines } from "../../utils/file";
import { isDigit } from "../../utils/parsing";

const extractNumbers = (line: string) => {
  const numbers = [];
  let num = "";

  for (const char of line) {
    if (isDigit(char)) {
      num += char;
    } else {
      if (num !== "") {
        numbers.push(Number(num));
        num = "";
      }
    }
  }

  if (num !== "") {
    numbers.push(Number(num));
    num = "";
  }

  return numbers;
};

export const first = (input: string) => {
  const lines = readLines(input);

  let sum = 0;
  for (const line of lines) {
    const [cardStr, gameStr] = line.split(":");

    const [winningNumbersStr, numbersStr] = gameStr.split(" | ");

    const winningNumbers = extractNumbers(winningNumbersStr);
    const numbers = extractNumbers(numbersStr);

    let points = 0;
    for (const num of numbers) {
      if (winningNumbers.includes(num)) {
        if (points === 0) {
          points = 1;
        } else {
          points *= 2;
        }
      }
    }

    sum += points;
  }

  return sum;
};

export const second = (input: string) => {
  const lines = readLines(input);

  const cards = {} as Record<
    string,
    { count: number; winningNumbers: number[]; numbers: number[] }
  >;

  const cardsInOrder = [];

  for (const line of lines) {
    const [cardStr, gameStr] = line.split(":");

    const card = Number(cardStr.slice(4));

    cardsInOrder.push(card);

    const [winningNumbersStr, numbersStr] = gameStr.split(" | ");

    const winningNumbers = extractNumbers(winningNumbersStr);
    const numbers = extractNumbers(numbersStr);

    cards[card] = { count: 1, winningNumbers, numbers };
  }

  for (const card of cardsInOrder) {
    const a = cards[card];

    let contains = 0;
    for (const num of a.numbers) {
      if (a.winningNumbers.includes(num)) {
        contains += 1;
      }
    }

    for (let i = card + 1; i < card + contains + 1; i++) {
      cards[i].count += a.count;
    }
  }

  let sum = 0;
  for (const { count } of Object.values(cards)) {
    sum += count;
  }

  return sum;
};
