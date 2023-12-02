import { expect, test, describe } from "bun:test";
import { first, second } from "./day02.ts";

const firstSample = await Bun.file("./src/days/day02/first-sample.txt").text();
const secondSample = await Bun.file("./src/days/day02/first-sample.txt").text();
const input = await Bun.file("./src/days/day02/input.txt").text();

describe("day 2", () => {
  test("first part sample", () => expect(first(firstSample)).toBe(8));

  test("first part input", () => expect(first(input)).toBe(2810));

  test("second part sample", () => expect(second(secondSample)).toBe(2286));

  test("second part input", () => expect(second(input)).toBe(69110));
});
