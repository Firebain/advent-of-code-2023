import { expect, test, describe } from "bun:test";
import { first, second } from "./day07.ts";

const firstSample = await Bun.file("./src/days/day07/first-sample.txt").text();
const secondSample = await Bun.file("./src/days/day07/first-sample.txt").text();
const input = await Bun.file("./src/days/day07/input.txt").text();

describe("day 7", () => {
  test("first part sample", () => expect(first(firstSample)).toBe(6440));

  test("first part input", () => expect(first(input)).toBe(251545216));

  test("second part sample", () => expect(second(secondSample)).toBe(5905));

  test("second part input", () => expect(second(input)).toBe(250384185));
});
