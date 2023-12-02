const day = parseInt(Bun.argv[2], 10);

if (Number.isNaN(day) || day < 1 || day > 25) {
  console.error("You have to choose a day between 1 and 25");
  console.error("For example: deno task gen 1");
  process.exit(1);
}

const paddedDay = day.toString().padStart(2, "0");

const type = Bun.argv[2].slice(-1) === "+" ? "second" : "first";

const test = Bun.argv[3] !== "!";

const code = await import(`../days/day${paddedDay}/day${paddedDay}.ts`);

const callback = code[type];

if (test) {
  const input = await Bun.file(
    `./src/days/day${paddedDay}/${type}-sample.txt`
  ).text();

  console.log(callback(input));
} else {
  const input = await Bun.file(`./src/days/day${paddedDay}/input.txt`).text();

  console.log(callback(input));
}
