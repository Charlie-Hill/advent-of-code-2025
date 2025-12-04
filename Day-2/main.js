const fs = require('fs');

const inputs = loadInput();
const testInputs = ["11-22"]

const PART_ONE = true;

const listOfInvalidId = [];

main(inputs);

function main(inputs)
{
    for(let i=0; i<inputs.length; i++)
    {
        if (PART_ONE)
        {
            handlePartOne(inputs[i]);
        }
        else // PART_TWO
        {
            handlePartTwo(inputs[i]);
        }
    }

    console.log(listOfInvalidId);
    
    const sumOfInvalidIds = listOfInvalidId.reduce((a, b) => Number(a) + Number(b), 0);

    console.log(sumOfInvalidIds)
}

function handlePartOne(range)
{
    const splitRange = range.split('-');

    const min = Number(splitRange[0]);
    const max = Number(splitRange[1]);

    for (let i=min; i<=max; i++)
    {
        if (testValidInputForPartOne(String(i)))
        {
            listOfInvalidId.push(String(i));
        }
    }
}

function testValidInputForPartOne(input)
{
    const inxHalf = input.length / 2;
    const firstHalf = input.slice(0, inxHalf);  
    const secondHalf = input.slice(inxHalf, input.length);

    return firstHalf === secondHalf;
}

function handlePartTwo(range)
{
    const splitRange = range.split('-');

    const min = Number(splitRange[0]);
    const max = Number(splitRange[1]);

    const results = [];

    for (let i=min; i<=max; i++)
    {
        testValidInputForPartTwo(String(i), results);
    }

    const maxResults = {};

    // Loop through all results
    for (let i = 0; i < results.length; i++) {
        const item = results[i];
        
        // If we haven’t seen this value before, or this occurrence is higher, save it
        if (!maxResults[item.value] || item.numberOfOccurances > maxResults[item.value].numberOfOccurances) {
            maxResults[item.value] = item;
        }
    }

    // Convert back to array if needed
    const uniqueMaxResults = Object.values(maxResults);

    uniqueMaxResults.forEach(i => {
        let finalString = '';
        if (i.numberOfOccurances > 1) {
            for (let x=0; x<i.numberOfOccurances;x++)
            {
                finalString += String(i.value);
            }

            listOfInvalidId.push(Number(finalString));
        }

    })

}

function testValidInputForPartTwo(input, results)
{
    let smallestChunkSize = 0;

    for (let chunkSize = 1; chunkSize <= input.length / 2; chunkSize++)
    {
        if (input.length % chunkSize === 0 && chunkSize > 0)
        {
            if (chunkSize < smallestChunkSize || smallestChunkSize == 0) smallestChunkSize = chunkSize;
        }
    }

    if (smallestChunkSize > 0) {
        results.push(handleChunkSliceCheck(input, smallestChunkSize))
    }
}

function handleChunkSliceCheck(input, chunkSize)
{
    let chunkPattern = '';
    for (let i=0; i < chunkSize; i++)
    {
        chunkPattern += String(input[i]);
    }

    const numberOfOccurances = (input.match(new RegExp(chunkPattern, "g") || []).length);

    return {
        value: chunkPattern,
        numberOfOccurances: numberOfOccurances
    }
}

function loadInput() {
    const data = fs.readFileSync("./inputs.txt", "utf8");
    return data.split("\n").map(line => line.trim());
}