import { expect, test, describe } from "bun:test";
import { first, second } from "./day03.ts";

const firstSample = await Bun.file("./src/days/day03/first-sample.txt").text();
const secondSample = await Bun.file("./src/days/day03/first-sample.txt").text();
const input = await Bun.file("./src/days/day03/input.txt").text();

describe("day 3", () => {
  test("first part sample", () => expect(first(firstSample)).toBe(4361));

  test("first part input", () => expect(first(input)).toBe(521601));

  test("second part sample", () => expect(second(secondSample)).toBe(467835));

  test("second part input", () => expect(second(input)).toBe(80694070));
});
