import { expect, test, describe } from "bun:test";
import { first, second } from "./day01.ts";

const firstSample = await Bun.file("./src/days/day01/first-sample.txt").text();
const secondSample = await Bun.file(
  "./src/days/day01/second-sample.txt"
).text();
const input = await Bun.file("./src/days/day01/input.txt").text();

describe("day 1", () => {
  test("first part sample", () => expect(first(firstSample)).toBe(142));

  test("first part input", () => expect(first(input)).toBe(55002));

  test("second part sample", () => expect(second(secondSample)).toBe(281));

  test("second part input", () => expect(second(input)).toBe(55093));
});
