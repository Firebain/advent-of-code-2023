use std::{fs, sync::mpsc, thread};

fn get_numbers_from_str(input: &str) -> Vec<u64> {
    let mut numbers = Vec::new();

    let mut num = String::new();
    for char in input.chars() {
        if char.is_digit(10) {
            num.push(char)
        } else {
            if num != "" {
                numbers.push(num.parse::<u64>().unwrap());

                num = String::new();
            }
        }
    }

    if num != "" {
        numbers.push(num.parse::<u64>().unwrap());
    }

    numbers
}

fn first(seeds: Vec<u64>, steps: Vec<Vec<(u64, u64, u64)>>) -> u64 {
    let mut min_location = std::u64::MAX;

    for seed in seeds {
        let mut num = seed;

        for step in &steps {
            for (dest, src, len) in step {
                if num >= *src && num < src + len {
                    num = num - src + dest;

                    break;
                }
            }
        }

        min_location = std::cmp::min(num, min_location);
    }

    min_location
}

fn second(seeds: Vec<u64>, steps: Vec<Vec<(u64, u64, u64)>>) -> u64 {
    let seeds_range = seeds
        .windows(2)
        .step_by(2)
        .map(|vals| (vals[0], vals[0] + vals[1]))
        .collect::<Vec<_>>();

    let mut threads = Vec::new();

    let (sender, receiver) = mpsc::channel::<u64>();

    for seed_range in seeds_range {
        let steps = steps.clone();
        let sender = sender.clone();

        let join_handle = thread::spawn(move || {
            let mut min_location = std::u64::MAX;

            for seed in seed_range.0..seed_range.1 {
                let mut num = seed;

                for step in &steps {
                    for (dest, src, len) in step {
                        if num >= *src && num < src + len {
                            num = num - src + dest;

                            break;
                        }
                    }
                }

                min_location = std::cmp::min(num, min_location);
            }

            sender.send(min_location).unwrap();
        });

        threads.push(join_handle);
    }

    let threads_length = threads.len();

    for join_handle in threads {
        join_handle.join().unwrap();
    }

    let mut min_location = std::u64::MAX;

    for _ in 0..threads_length {
        let num = receiver.recv().unwrap();

        min_location = std::cmp::min(num, min_location);
    }

    min_location
}

fn main() {
    let sample = fs::read_to_string("./sample.txt").unwrap();
    let sample = sample.trim().split("\n\n").collect::<Vec<_>>();

    let sample_seeds = get_numbers_from_str(&sample[0][7..]);
    let sample_steps = sample
        .iter()
        .skip(1)
        .map(|el| {
            el.split("\n")
                .skip(1)
                .map(|str| get_numbers_from_str(str))
                .map(|el| (el[0], el[1], el[2]))
                .collect::<Vec<_>>()
        })
        .collect::<Vec<_>>();

    let input = fs::read_to_string("./input.txt").unwrap();
    let input = input.trim().split("\n\n").collect::<Vec<_>>();

    println!(
        "First sample: {}",
        first(sample_seeds.clone(), sample_steps.clone())
    );
    println!("Second sample: {}", second(sample_seeds, sample_steps));

    let input_seeds = get_numbers_from_str(&input[0][7..]);
    let input_steps = input
        .iter()
        .skip(1)
        .map(|el| {
            el.split("\n")
                .skip(1)
                .map(|str| get_numbers_from_str(str))
                .map(|el| (el[0], el[1], el[2]))
                .collect::<Vec<_>>()
        })
        .collect::<Vec<_>>();

    println!(
        "First input: {}",
        first(input_seeds.clone(), input_steps.clone())
    );
    println!("Second input: {}", second(input_seeds, input_steps));
}
