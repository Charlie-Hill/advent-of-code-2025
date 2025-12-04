const fs = require('fs');

const testInputs = [];

const PART_ONE = true;

main();

function main() {

    PART_ONE ? handlePartOneSolution() : handlePartTwoSolution();

}

function handlePartOneSolution() {

}

function handlePartTwoSolution() {
    
}


function loadInput() {
    const data = fs.readFileSync("./inputs.txt", "utf8");
    return data.split("\n").map(line => line.trim());
}