const fs = require('fs');
const { format } = require('path');

const testInputs = loadTestInput();
const inputs = loadInput();

const PART_ONE = true;

main();

function main() {

    PART_ONE ? handlePartOneSolution() : handlePartTwoSolution();

}

function handlePartOneSolution() {
    const data = formatDataIntoArray();

    let accessibleRolls = 0;

    let incompatiblePositions = [];

    data.forEach((row, rowInx) => {
        
        row.forEach((col, colInx) => {
            // this column is a roll
            if (col === true) {

                if (checkIfRollCanBeAccessed(data, rowInx, colInx)) {
                    accessibleRolls += 1;
                    incompatiblePositions.push([rowInx, colInx])
                }

            }

        });

    });

    console.log(`Number of Accessible Rolls ${accessibleRolls}`);

}

function checkIfRollCanBeAccessed(data, rowInx, colInx) {

    let rowInxToCheck = [];
    let colInxToCheck = [];

    // Establish which rowIndexes are elgiable to be checked
    if (rowInx === 0) {
        rowInxToCheck = [0, 1];
    } else if (rowInx === (data.length - 1)) {
        rowInxToCheck = [-1, 0];
    } else {
        rowInxToCheck = [-1, 0, 1];
    }

    // Establish which colIndexes are eligable to be checked
    if (colInx === 0) {
        colInxToCheck = [0, 1]
    } else if (colInx === (data[rowInx].length - 1)) {
        colInxToCheck = [-1, 0];
    } else {
        colInxToCheck = [-1, 0, 1];
    }

    let numberOfRollsAdjacent = 0;

    rowInxToCheck.forEach(ri => {

        const rowIndex = rowInx + ri;

        colInxToCheck.forEach(ci => {

            const colIndex = colInx + ci;

            if (ri === 0 && ci === 0) return;

            if (data[rowIndex][colIndex] === true) numberOfRollsAdjacent++;

        })

    });

    return (numberOfRollsAdjacent < 4)

}

function handlePartTwoSolution() {
    
}

function formatDataIntoArray() {
    let formattedData = [];

    inputs.forEach((i, inx) => {
        
        formattedData[inx] = [];

        for (let x = 0; x < i.length; x++) {
            const isRoll = (i[x] === '@');
            formattedData[inx].push(isRoll);
        }
    })

    return formattedData;
}


function loadInput() {
    const data = fs.readFileSync("./inputs.txt", "utf8");
    return data.split("\n").map(line => line.trim());
}

function loadTestInput() {
    const data = fs.readFileSync("./testInput.txt", "utf8");
    return data.split("\n").map(line => line.trim());
}