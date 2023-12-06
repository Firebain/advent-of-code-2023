import { expect, test, describe } from "bun:test";
import { first, second } from "./day06.ts";

const firstSample = await Bun.file("./src/days/day06/first-sample.txt").text();
const secondSample = await Bun.file("./src/days/day06/first-sample.txt").text();
const input = await Bun.file("./src/days/day06/input.txt").text();

describe("day 6", () => {
  test("first part sample", () => expect(first(firstSample)).toBe(288));

  test("first part input", () => expect(first(input)).toBe(114400));

  test("second part sample", () => expect(second(secondSample)).toBe(71503));

  test("second part input", () => expect(second(input)).toBe(21039729));
});
