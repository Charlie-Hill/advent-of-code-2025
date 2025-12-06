const fs = require('fs');

const inputs = loadInputs();

const PART_ONE = true;

main();

function main()
{
    PART_ONE ? handlePartOneSolution() : handlePartTwoSolution();
}

function handlePartOneSolution()
{

    let results = [];

    inputs.forEach((inp, index) => {
        inp = inp.split(' ');

        inp.forEach((i, ind) => { if (i === '') inp.splice(ind, 1) })
        inp.forEach((i, ind) => { if (i === '') inp.splice(ind, 1) })

        inp.forEach((i, ind) => {
            if (ind == inp.length - 1) inp.push('END')
        })

        results.push(...inp);
    })

    console.log(results)

    let final = [[]];

    let levelCount  = 0;
    let posCount = 0;

    let hasEstablishedArray = false;

    results.forEach((i) => {
        if (i === '') return;
        if (i === 'END') { levelCount = 0; posCount++; hasEstablishedArray = true; return; }
        
        if (!hasEstablishedArray) final[levelCount] = [];
        
        final[levelCount][posCount] = i;
        
        levelCount++;
        
    });

    console.log(final);

    let grandTotal = 0;

    // Now run the calculations
    final.forEach(line => {
        const operator = line[line.length - 1];
        
        let lastVal = 0;

        for (let x=0; x<(line.length - 1); x++) {
            const val = Number(line[x]);

            if (x === 0) {lastVal += val; continue;}

            if (operator === '+') lastVal += val
            else if (operator === '*') lastVal *= val;
        }

        grandTotal += lastVal;
    });

    console.log(`Grand Total = ${grandTotal}`);

}

function handlePartTwoSolution()
{

}

function loadInputs()
{
    const data = fs.readFileSync("./inputs.txt", "utf8");
    return data.split("\n").map(line => line.trim());
}