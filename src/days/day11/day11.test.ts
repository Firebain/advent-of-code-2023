import { expect, test, describe } from "bun:test";
import { first, second } from "./day11.ts";

const firstSample = await Bun.file("./src/days/day11/first-sample.txt").text();
const secondSample = await Bun.file(
  "./src/days/day11/second-sample.txt"
).text();
const input = await Bun.file("./src/days/day11/input.txt").text();

describe("day 11", () => {
  test("first part sample", () => expect(first(firstSample)).toBe(374));

  test("first part input", () => expect(first(input)).toBe(9734203));

  test("second part sample", () => expect(second(secondSample)).toBe(82000210));

  test("second part input", () => expect(second(input)).toBe(568914596391));
});
