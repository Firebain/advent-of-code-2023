import { expect, test, describe } from "bun:test";
import { first, second } from "./day04.ts";

const firstSample = await Bun.file("./src/days/day04/first-sample.txt").text();
const secondSample = await Bun.file(
  "./src/days/day04/second-sample.txt"
).text();
const input = await Bun.file("./src/days/day04/input.txt").text();

describe("day 4", () => {
  test("first part sample", () => expect(first(firstSample)).toBe(13));

  test("first part input", () => expect(first(input)).toBe(18619));

  test("second part sample", () => expect(second(secondSample)).toBe(30));

  test("second part input", () => expect(second(input)).toBe(8063216));
});
