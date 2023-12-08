import { readLines } from "../../utils/file";

export const first = (input: string) => {
  const lines = readLines(input);

  const instructions = lines[0].split("");

  const nodes = {} as Record<string, [string, string]>;

  for (const line of lines.slice(2)) {
    const [key, rest] = line.split(" = ");

    const [left, right] = rest.slice(1, -1).split(", ");

    nodes[key] = [left, right];
  }

  let counter = 0;
  let currentNode = nodes["AAA"];
  let i = 0;
  while (true) {
    counter += 1;

    const nextNode = currentNode[instructions[i] === "L" ? 0 : 1];

    if (nextNode === "ZZZ") {
      break;
    }

    currentNode = nodes[nextNode];

    i += 1;

    if (i >= instructions.length) {
      i = 0;
    }
  }

  return counter;
};

export const second = (input: string) => {
  const lines = readLines(input);

  const instructions = lines[0].split("");

  const nodes = {} as Record<string, [string, string]>;

  for (const line of lines.slice(2)) {
    const [key, rest] = line.split(" = ");

    const [left, right] = rest.slice(1, -1).split(", ");

    nodes[key] = [left, right];
  }

  const startingNodes = Object.keys(nodes).filter((key) => key.endsWith("A"));

  const findLoops = (node: [string, string]) => {
    let counter = 0;
    let currentNode = node;
    const previous = [] as Array<[string, number, number]>;
    let i = 0;
    while (true) {
      counter += 1;

      const nextNode = currentNode[instructions[i] === "L" ? 0 : 1];
      if (nextNode.endsWith("Z")) {
        if (previous.some(([a, b]) => a === nextNode && b === i)) {
          return previous;
        }

        previous.push([nextNode, i, counter]);
      }

      currentNode = nodes[nextNode];

      i += 1;

      if (i >= instructions.length) {
        i = 0;
      }
    }
  };

  const loops = [];
  for (const node of startingNodes) {
    loops.push(findLoops(nodes[node]));
  }

  const hcfs = loops.flatMap((loop) => loop.map((a) => a[2]));

  const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));
  const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

  let num = 1;
  for (const hcf of hcfs) {
    num = lcm(num, hcf);
  }

  return num;
};
