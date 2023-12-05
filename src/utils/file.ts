export const readLines = (input: string) => {
  return input.trim().split("\n");
};

export const readTextChunks = (input: string, sep: string) => {
  return input.trim().split(sep);
};
