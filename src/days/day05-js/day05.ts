import { readLines, readTextChunks } from "../../utils/file";
import { getNumbersFromStr } from "../../utils/parsing";

export const first = (input: string) => {
  const chunks = readTextChunks(input, "\n\n");

  const seed = getNumbersFromStr(chunks[0].slice(6));
  let minLocation = Infinity;

  for (const startNum of seed) {
    let num = startNum;

    for (const chunk of chunks.slice(1)) {
      const lines = readLines(chunk).slice(1);

      const ranges = lines.map(getNumbersFromStr);

      for (const [dest, src, len] of ranges) {
        if (num >= src && num < src + len) {
          num = num - src + dest;

          break;
        }
      }
    }

    minLocation = Math.min(num, minLocation);
  }

  return minLocation;
};

export const second = (input: string) => {
  const chunks = readTextChunks(input, "\n\n");

  const steps: Array<Array<[number, number, number]>> = chunks
    .slice(1)
    .map(
      (chunk) =>
        readLines(chunk).slice(1).map(getNumbersFromStr) as Array<
          [number, number, number]
        >
    );

  const seeds = getNumbersFromStr(chunks[0].slice(6));

  const seedRanges = [];

  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([seeds[i], seeds[i] + seeds[i + 1]] as [number, number]);
  }

  let minLocation = Infinity;

  for (const seedRange of seedRanges) {
    for (let seed = seedRange[0]; seed < seedRange[1]; seed++) {
      let num = seed;

      for (const step of steps) {
        for (const [dest, src, len] of step) {
          if (num >= src && num < src + len) {
            num = num - src + dest;

            break;
          }
        }
      }

      minLocation = Math.min(num, minLocation);
    }
  }

  return minLocation;
};
