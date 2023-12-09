import { expect, test, describe } from "bun:test";
import { first, second } from "./day09.ts";

const firstSample = await Bun.file("./src/days/day09/first-sample.txt").text();
const secondSample = await Bun.file("./src/days/day09/first-sample.txt").text();
const input = await Bun.file("./src/days/day09/input.txt").text();

describe("day 9", () => {
  test("first part sample", () => expect(first(firstSample)).toBe(114));

  test("first part input", () => expect(first(input)).toBe(1939607039));

  test("second part sample", () => expect(second(secondSample)).toBe(2));

  test("second part input", () => expect(second(input)).toBe(1041));
});
