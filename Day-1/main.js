const fs = require('fs');

const instructions = loadInstructions();

// set to TRUE to solve Part 2 (false to solve Part 1)
const solve0x434C49434BAlgorithm = true;

let DIAL = 50;

let counterFinishedAtZero = 0;

main();

function main() {
    instructions.forEach(i => {

        const direction = i.substring(0, 1);

        const instruction = i.slice(1, i.length);

        handleInstruction(direction, instruction)
    });

    console.log(`THE PASSWORD IS ${counterFinishedAtZero}`);
}


function handleInstruction (direction, instruction) {
    
    switch (direction) {

        case "L":
            turnDial(-instruction);
            break;

        case "R":
            turnDial(instruction);
            break;

    }

}

function turnDial(numberOfTurns) {

    let currentDial = DIAL;

    // Number of turns is positive = Right turns
    if (numberOfTurns > 0) {
        for (let i=0; i<numberOfTurns; i++) {

            currentDial += 1;

            if (currentDial === 100) {
                currentDial = 0;
            }

            handleZeroCheck(currentDial);

        }
    }

    if (numberOfTurns < 0) {

        for (let i=numberOfTurns; i < 0; i++) {

            currentDial -= 1;

            if (currentDial === -1) {
                currentDial = 99;
            }

            handleZeroCheck(currentDial);

        }
    }

    DIAL = currentDial;

    // PART ONE CODE
    if (DIAL === 0 && !solve0x434C49434BAlgorithm) counterFinishedAtZero+=1;
}

// PART TWO ADDITION
function handleZeroCheck(currentDialStatus)
{   
    if (currentDialStatus === 0 && solve0x434C49434BAlgorithm) {
        counterFinishedAtZero += 1;
    }
}

function loadInstructions()
{
    const data = fs.readFileSync("./inputs.txt", "utf8");
    return data.split("\n").map(line => line.trim());
}