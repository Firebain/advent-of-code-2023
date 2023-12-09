import { describe, expect, test } from "bun:test";
import { getNumbersFromStr, isDigit } from "./parsing";

describe("parsing", () => {
  test("isDigit", () => {
    expect(isDigit("0")).toBeTrue();
    expect(isDigit("9")).toBeTrue();
    expect(isDigit("5")).toBeTrue();

    expect(isDigit("!")).toBeFalse();
    expect(isDigit("+")).toBeFalse();
    expect(isDigit("a")).toBeFalse();
    expect(isDigit("z")).toBeFalse();
  });

  test("getNumbersFromStr", () => {
    expect(getNumbersFromStr("1 2 3")).toEqual([1, 2, 3]);
    expect(getNumbersFromStr("13 2 43")).toEqual([13, 2, 43]);
    expect(getNumbersFromStr("32  2 63")).toEqual([32, 2, 63]);
    expect(getNumbersFromStr("55 -43 -22")).toEqual([55, -43, -22]);
  });
});
