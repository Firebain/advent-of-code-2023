import { expect, test, describe } from "bun:test";
import { first, second } from "./day05.ts";

const firstSample = await Bun.file("./src/days/day05/first-sample.txt").text();
const secondSample = await Bun.file("./src/days/day05/first-sample.txt").text();
const input = await Bun.file("./src/days/day05/input.txt").text();

describe("day 5", () => {
  test("first part sample", () => expect(first(firstSample)).toBe(35));

  test("first part input", () => expect(first(input)).toBe(457535844));

  test("second part sample", () => expect(second(secondSample)).toBe(46));

  //  test("second part input", () => expect(second(input)).toBe(2));
});
