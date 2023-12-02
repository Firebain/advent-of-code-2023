# Advent Of Code 2023

## Scripts

### Gen

Generates a template for the specified day

```
bun gen [1-25]
         ^ Day
```

### Day

Runs the solutions for the specified day

```
bun day [1-25][+] [!]
         ^ Day
               ^ Adding a plus after the number starts the second part
                   ^ The exclamation point will start a script with puzzle input data
```

## Tests

After solving the puzzles and getting answers to them, you can write answers to the tests and get satisfying output to the console

```
bun test
```
