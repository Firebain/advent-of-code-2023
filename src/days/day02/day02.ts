import { readLines } from "../../utils/file";

export const first = (input: string) => {
  const lines = readLines(input);

  const limit = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let sum = 0;
  for (const line of lines) {
    const [gameStr, bagStr] = line.split(":");

    const game = Number(gameStr.substring(4));

    const sets = bagStr.split(";").map((setStr) => setStr.trim().split(", "));

    const dict = {
      red: 0,
      green: 0,
      blue: 0,
    } as Record<string, number>;

    for (const set of sets) {
      for (const box of set) {
        const [amount, color] = box.split(" ");

        dict[color] = Math.max(dict[color], Number(amount));
      }
    }

    if (!Object.entries(limit).some(([key, value]) => dict[key] > value)) {
      sum += game;
    }
  }

  return sum;
};

export const second = (input: string) => {
  const lines = readLines(input);

  let sum = 0;
  for (const line of lines) {
    const [gameStr, bagStr] = line.split(":");

    const sets = bagStr.split(";").map((setStr) => setStr.trim().split(", "));

    const dict = {
      red: 0,
      green: 0,
      blue: 0,
    } as Record<string, number>;

    for (const set of sets) {
      for (const box of set) {
        const [amount, color] = box.split(" ");

        dict[color] = Math.max(dict[color], Number(amount));
      }
    }

    sum += dict["red"] * dict["green"] * dict["blue"];
  }

  return sum;
};
