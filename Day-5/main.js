const fs = require("fs");

const inputs = loadInputs();

const HANDLE_PART_ONE = false;

main();

function main() {
    if (HANDLE_PART_ONE) {
        handlePartOneSolution();
    } else {
        handlePartTwoSolution();
    }
}

function handlePartOneSolution() {
    const ranges = inputs.slice(0, inputs.indexOf(''));
    console.log(ranges)
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

    const startTime = performance.now();

    const ranges = inputs.slice(0, inputs.indexOf(''));

    let totalNumberOfFreshIngredientID = 0n;

    let sortedRanges = [];

    ranges.forEach(rng => {

        const splitRange = rng.split('-');

        const min = BigInt(splitRange[0]);
        const max = BigInt(splitRange[1]);

        sortedRanges.push([min, max]);
    });

    // Sort ranges by smallest to largest
    sortedRanges = sortedRanges.sort((a, b) => {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
    });

    let stillOverLappingItems = true;

    while (stillOverLappingItems) {

        stillOverLappingItems = false;

        sortedRanges.forEach((range, index) => {
            if (index === (sortedRanges.length - 1)) { return; }
            
            // Ranges overlap
            if ((range[1] > sortedRanges[index+1][0] && range[1] <= sortedRanges[index+1][1]) && sortedRanges[index+1][0] !== sortedRanges[index+1][1]) {
                // Replace the end of this range, with the end of next range as they overlap[]
                range[1] = sortedRanges[index+1][1];

                // Remove the next range as we now have it handled
                sortedRanges.splice(index+1, 1);

                stillOverLappingItems = true;
                
                return;
            }

            if (range[0] <= sortedRanges[index+1][0] && range[1] >= sortedRanges[index+1][1]) {
                sortedRanges.splice(index+1, 1);
                
                stillOverLappingItems = true;
            }

            if (range[1] === sortedRanges[index+1][0]) {

                range[1] = sortedRanges[index+1][1];

                sortedRanges.splice(index+1, 1);

                stillOverLappingItems = true;
            }
            
            sortedRanges = sortedRanges.sort((a, b) => {
                if (a[0] < b[0]) return -1;
                if (a[0] > b[0]) return 1;
                return 0;
            });
        });

    }

    sortedRanges.forEach(i => {
        const start = BigInt(i[0]);
        const end = BigInt(i[1]);
        totalNumberOfFreshIngredientID += (end - start + 1n)
    })

    const endTime = performance.now();

    console.log(`Finished in ${Math.round((endTime - startTime) * 100) / 100}ms`)
    console.log(`Number of Fresh Ingredient IDs ${totalNumberOfFreshIngredientID}`);

}

function loadInputs() {
    const data = fs.readFileSync("./inputs.txt", "utf8");
    return data.split("\n").map(line => line.trim());
}

