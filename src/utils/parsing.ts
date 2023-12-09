export const isDigit = (char: string) => {
  return char >= "0" && char <= "9";
};

export const getNumbersFromStr = (str: string): number[] => {
  const numbers = [];
  let num = "";

  for (const char of str) {
    if (char === "-" && num === "") {
      num += char;

      continue;
    }

    if (isDigit(char)) {
      num += char;

      continue;
    }

    if (num !== "") {
      numbers.push(Number(num));
      num = "";
    }
  }

  if (num !== "") {
    numbers.push(Number(num));
    num = "";
  }

  return numbers;
};
