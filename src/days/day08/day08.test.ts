import { expect, test, describe } from "bun:test";
import { first, second } from "./day08.ts";

const firstSample = await Bun.file("./src/days/day08/first-sample.txt").text();
const secondSample = await Bun.file(
  "./src/days/day08/second-sample.txt"
).text();
const input = await Bun.file("./src/days/day08/input.txt").text();

describe("day 8", () => {
  test("first part sample", () => expect(first(firstSample)).toBe(2));

  test("first part input", () => expect(first(input)).toBe(12083));

  test("second part sample", () => expect(second(secondSample)).toBe(6));

  test("second part input", () => expect(second(input)).toBe(13385272668829));
});
