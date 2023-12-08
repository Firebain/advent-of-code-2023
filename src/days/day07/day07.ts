import { readLines } from "../../utils/file";

export const first = (input: string) => {
  const detectSecondRank = (hand: string): number[] => {
    const CARD_LABELS = [
      "A",
      "K",
      "Q",
      "J",
      "T",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
    ];

    const REVERSED_CARD_LABELS = CARD_LABELS.reverse();

    return hand.split("").map((val) => REVERSED_CARD_LABELS.indexOf(val));
  };

  const detectRank = (hand: string): [number, number[]] => {
    const chars = {} as Record<string, number>;

    for (const char of hand) {
      if (char in chars) {
        chars[char] += 1;
      } else {
        chars[char] = 1;
      }
    }

    const values = Object.values(chars);

    if (values.includes(5)) {
      return [6, detectSecondRank(hand)];
    }

    if (values.includes(4)) {
      return [5, detectSecondRank(hand)];
    }

    if (values.includes(3)) {
      if (values.includes(2)) {
        return [4, detectSecondRank(hand)];
      } else {
        return [3, detectSecondRank(hand)];
      }
    }

    const pairs = {} as Record<number, number>;

    for (const value of values) {
      if (value in pairs) {
        pairs[value] += 1;
      } else {
        pairs[value] = 1;
      }
    }

    if (pairs[2] === 2) {
      return [2, detectSecondRank(hand)];
    }

    if (pairs[2] === 1) {
      return [1, detectSecondRank(hand)];
    }

    if (pairs[1] === 5) {
      return [0, detectSecondRank(hand)];
    }

    throw new Error("Rank not matched");
  };

  const lines = readLines(input);

  const hands = lines.map((line) => {
    const [left, right] = line.split(" ");

    return [left, Number(right)] as [string, number];
  });

  const ranks = [];
  for (const hand of hands) {
    ranks.push([hand[1], detectRank(hand[0])] as [number, [number, number[]]]);
  }

  ranks.sort((a, b) => {
    const result = a[1][0] - b[1][0];

    if (result === 0) {
      for (let i = 0; i < 5; i++) {
        const rank = a[1][1][i] - b[1][1][i];

        if (rank === 0) {
          continue;
        }

        return rank;
      }
    }

    return result;
  });

  return ranks.reduce((acc, val, index) => val[0] * (index + 1) + acc, 0);
};

export const second = (input: string) => {
  const detectSecondRank = (hand: string): number[] => {
    const CARD_LABELS = [
      "A",
      "K",
      "Q",
      "T",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "J",
    ];

    const REVERSED_CARD_LABELS = CARD_LABELS.reverse();

    return hand.split("").map((val) => REVERSED_CARD_LABELS.indexOf(val));
  };

  const normalDetectRank = (hand: string): [number, number[]] => {
    const chars = {} as Record<string, number>;

    for (const char of hand) {
      if (char in chars) {
        chars[char] += 1;
      } else {
        chars[char] = 1;
      }
    }

    const values = Object.values(chars);

    if (values.includes(5)) {
      return [6, detectSecondRank(hand)];
    }

    if (values.includes(4)) {
      return [5, detectSecondRank(hand)];
    }

    if (values.includes(3)) {
      if (values.includes(2)) {
        return [4, detectSecondRank(hand)];
      } else {
        return [3, detectSecondRank(hand)];
      }
    }

    const pairs = {} as Record<number, number>;

    for (const value of values) {
      if (value in pairs) {
        pairs[value] += 1;
      } else {
        pairs[value] = 1;
      }
    }

    if (pairs[2] === 2) {
      return [2, detectSecondRank(hand)];
    }

    if (pairs[2] === 1) {
      return [1, detectSecondRank(hand)];
    }

    if (pairs[1] === 5) {
      return [0, detectSecondRank(hand)];
    }

    throw new Error("Rank not matched");
  };

  const detectRank = (hand: string): [number, number[]] => {
    let chars = {} as Record<string, number>;
    let jokerChars = 0;

    for (const char of hand) {
      if (char === "J") {
        jokerChars += 1;

        continue;
      }

      if (char in chars) {
        chars[char] += 1;
      } else {
        chars[char] = 1;
      }
    }

    if (jokerChars === 0) {
      return normalDetectRank(hand);
    }

    if (jokerChars === 5 || jokerChars === 4) {
      // JJJJJ or JJJJ2
      return [6, detectSecondRank(hand)];
    }

    const values = Object.values(chars);

    if (jokerChars === 3) {
      if (values.includes(2)) {
        // JJJ22
        return [6, detectSecondRank(hand)];
      }

      // JJJ23
      return [5, detectSecondRank(hand)];
    }

    if (jokerChars === 2) {
      // JJ222
      if (values.includes(3)) {
        return [6, detectSecondRank(hand)];
      }

      // JJ223
      if (values.includes(2)) {
        return [5, detectSecondRank(hand)];
      }

      // JJ234
      return [3, detectSecondRank(hand)];
    }

    if (values.includes(4)) {
      // J2222
      return [6, detectSecondRank(hand)];
    }

    if (values.includes(3)) {
      // J2223
      return [5, detectSecondRank(hand)];
    }

    const pairs = {} as Record<number, number>;

    for (const value of values) {
      if (value in pairs) {
        pairs[value] += 1;
      } else {
        pairs[value] = 1;
      }
    }

    if (values.includes(2) && pairs[2] === 2) {
      // J2233
      return [4, detectSecondRank(hand)];
    }

    if (values.includes(2) && pairs[2] === 1) {
      // J2234
      return [3, detectSecondRank(hand)];
    }

    // J2345
    return [1, detectSecondRank(hand)];
  };

  const lines = readLines(input);

  const hands = lines.map((line) => {
    const [left, right] = line.split(" ");

    return [left, Number(right)] as [string, number];
  });

  const ranks = [];
  for (const hand of hands) {
    ranks.push([hand[1], detectRank(hand[0])] as [number, [number, number[]]]);
  }

  ranks.sort((a, b) => {
    const result = a[1][0] - b[1][0];

    if (result === 0) {
      for (let i = 0; i < 5; i++) {
        const rank = a[1][1][i] - b[1][1][i];

        if (rank === 0) {
          continue;
        }

        return rank;
      }
    }

    return result;
  });

  return ranks.reduce((acc, val, index) => val[0] * (index + 1) + acc, 0);
};
