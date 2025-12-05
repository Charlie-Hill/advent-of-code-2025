const fs = require("fs");

const inputs = loadInputs();

const HANDLE_PART_ONE = true;

main();

function main() {
    if (HANDLE_PART_ONE) {
        handlePartOneSolution();
    } else {
        handlePartTwoSolution();
    }
}

function handlePartOneSolution() {
    const ranges = inputs.slice(0, inputs.indexOf('') - 1);
    const values = inputs.slice(inputs.indexOf('') + 1, inputs.indexOf('').length)

    const valuesAsNum = values.map(BigInt);

    let numberOfFreshIngredients = 0;

    const rangeArray = new Array();

    let valuesCounted = [];

    ranges.forEach(rng => {

        const splitRange = rng.split('-');

        const min = BigInt(splitRange[0]);
        const max = BigInt(splitRange[1]);

        rangeArray.push([min, max]);

        valuesAsNum.forEach(value => {

            if (value < min || value > max || valuesCounted.includes(value)) return; // Can't be true if it's out of bounds

            valuesCounted.push(value);
            numberOfFreshIngredients++;
        });

    });

    console.log(`Number of Fresh Ingredients ${numberOfFreshIngredients}`);
}

function handlePartTwoSolution() {

}

function loadInputs() {
    const data = fs.readFileSync("./inputs.txt", "utf8");
    return data.split("\n").map(line => line.trim());
}
