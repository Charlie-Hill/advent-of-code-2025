const fs = require('fs');

let inputs = [];
const testInputs = [987654321111111,811111111111119,234234234234278,818181911112111];
// const testInputs = [811111111111119];

const PART_ONE = false;

inputs = loadInput();

main();

function main()
{
    let sum = 0;

    if (PART_ONE) {
        inputs.forEach(i => sum+=findLargestJoltage(i));
    } else {
        inputs.forEach(i => sum+=findLargestJoltagePartTwo(i));
    }

    console.log(sum)
}

function findLargestJoltage(input)
{
    let firstHighestNumber = -1;
    
    // find first highest number
    for (let i=0; i < String(input).length - 1; i++)
    {
        if (String(input)[i] > firstHighestNumber) firstHighestNumber = Number(String(input)[i])
    }

    let secondHighestNumber = -1;
    let pastFirstHighestNumber = false;

    for (let i=0; i < String(input).length; i++)
    {
        if (String(input)[i] == firstHighestNumber && pastFirstHighestNumber == false) { pastFirstHighestNumber = true; continue; }

        if (pastFirstHighestNumber) {
            if (Number(String(input)[i]) > secondHighestNumber) secondHighestNumber = Number(String(input)[i]);
        }
    }

    return Number(`${firstHighestNumber}${secondHighestNumber}`);
}

function findLargestJoltagePartTwo(bank)
{
    let selectedDigits = '';

    for (let i=1; i<=12; i++)
    {
        let digit = 0;

        [digit, bank] = extractNextDigit(i, String(bank));

        selectedDigits = `${selectedDigits}${digit}`;
    }

    return Number(selectedDigits)
}

function extractNextDigit(num, bank) {
    let digitsRemaining = (12 - num);

    let strBank = String(bank);

    let maximum = 0, position = 0;

    for (let i=0; i < (strBank.length - digitsRemaining); i++) {
        if (BigInt(strBank[i]) > maximum) {
            maximum = BigInt(strBank[i]);
            position = i;
        }
    }

    return [maximum, BigInt(bank.slice(position+1, strBank.length))];
}

function loadInput() {
    const data = fs.readFileSync("./inputs.txt", "utf8");
    return data.split("\n").map(line => line.trim());
}