// const inputs = ["959516-995437","389276443-389465477","683-1336","15687-26722","91613-136893","4-18","6736-12582","92850684-93066214","65-101","6868676926-6868700146","535033-570760","826141-957696","365650-534331","1502-2812","309789-352254","79110404-79172400","18286593-18485520","34376-65398","26-63","3333208697-3333457635","202007-307147","1859689-1936942","9959142-10053234","2318919-2420944","5142771457-5142940464","1036065-1206184","46314118-46413048","3367-6093","237-481","591751-793578"];

// const testInputs = ["11-22", "95-115", "998-1012", "1188511880-1188511890","222220-222224","1698522-1698528","446443-446449","38593856-38593862","565653-565659","824824821-824824827","2121212118-2121212124"]
const testInputs = ["11-22"]

const PART_ONE = false;

const listOfInvalidId = [];

main(testInputs);

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