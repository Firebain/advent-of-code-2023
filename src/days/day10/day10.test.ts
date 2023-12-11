import { expect, test, describe } from "bun:test";
import { first, second } from "./day10.ts";

const firstSample = await Bun.file("./src/days/day10/first-sample.txt").text();
const secondSample = await Bun.file(
  "./src/days/day10/second-sample.txt"
).text();
const input = await Bun.file("./src/days/day10/input.txt").text();

describe("day 10", () => {
  test("first part sample", () => expect(first(firstSample)).toBe(8));

  test("first part input", () => expect(first(input)).toBe(6733));

  test("second part sample", () => expect(second(secondSample)).toBe(10));

  test("second part input", () => expect(second(input)).toBe(435));
});
