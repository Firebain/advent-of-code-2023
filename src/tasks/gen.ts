import fs from "fs/promises";

const day = parseInt(Bun.argv[2], 10);

if (Number.isNaN(day) || day < 1 || day > 25) {
  console.error("You have to choose a day between 1 and 25");
  console.error("For example: deno task gen 1");
  process.exit(1);
}

const paddedDay = day.toString().padStart(2, "0");

const folderExists = await fs.exists(`./src/days/day${paddedDay}`);
if (folderExists) {
  console.error(`Looks like day${paddedDay} already created`);
  process.exit(1);
}

await fs.mkdir(`./src/days/day${paddedDay}`);

const sourceTemplate = `export const first = (input: string) => {
  return 1;
};

export const second = (input: string) => {
  return 2;
};
`;

await Bun.write(`./src/days/day${paddedDay}/day01.ts`, sourceTemplate);

const testTemplate = `import { expect, test, describe } from "bun:test";
import { first, second } from "./day01.ts";

const firstSample = await Bun.file("./src/days/day01/first-sample.txt").text();
const secondSample = await Bun.file("./src/days/day01/first-sample.txt").text();
const input = await Bun.file("./src/days/day01/input.txt").text();

describe("day 1", () => {
//  test("first part sample", () => expect(first(firstSample)).toBe(1));

//  test("first part input", () => expect(first(input)).toBe(1));

//  test("second part sample", () => expect(second(secondSample)).toBe(2));

//  test("second part input", () => expect(second(input)).toBe(2));
});
`;

await Bun.write(`./src/days/day${paddedDay}/day01.test.ts`, testTemplate);

await Bun.write(`./src/days/day${paddedDay}/input.txt`, "");
await Bun.write(`./src/days/day${paddedDay}/first-sample.txt`, "");
await Bun.write(`./src/days/day${paddedDay}/second-sample.txt`, "");
