const inputs = ["959516-995437","389276443-389465477","683-1336","15687-26722","91613-136893","4-18","6736-12582","92850684-93066214","65-101","6868676926-6868700146","535033-570760","826141-957696","365650-534331","1502-2812","309789-352254","79110404-79172400","18286593-18485520","34376-65398","26-63","3333208697-3333457635","202007-307147","1859689-1936942","9959142-10053234","2318919-2420944","5142771457-5142940464","1036065-1206184","46314118-46413048","3367-6093","237-481","591751-793578"];

const listOfInvalidId = [];

main(inputs);

function main(inputs)
{
    for(let i=0; i<inputs.length; i++)
    {
        parseInputRange(inputs[i]);
    }

    console.log(listOfInvalidId);
    
    let sumOfInvalidIds = 0;

    listOfInvalidId.forEach(i => {
        sumOfInvalidIds += Number(i);
    });

    console.log(sumOfInvalidIds)
}

function parseInputRange(range)
{
    const splitRange = range.split('-');

    const min = Number(splitRange[0]);
    const max = Number(splitRange[1]);

    for (let i=min; i<=max; i++)
    {
        if (testValidInput(String(i)))
        {
            listOfInvalidId.push(String(i));
        }   
    }
}

function testValidInput(input)
{
    const inxHalf = input.length / 2;
    const firstHalf = input.slice(0, inxHalf);  
    const secondHalf = input.slice(inxHalf, input.length);

    return firstHalf === secondHalf;
}