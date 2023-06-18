const parseArgs = () => {
    const passedArgs = process.argv.slice(2);
    const propsCombinations = [];

    for (let i = 0; i < passedArgs.length; i += 2) {
        const propName = passedArgs[i].slice(2);
        const propValue = passedArgs[i + 1];

        propsCombinations.push(`${propName} is ${propValue}`);
    }

    const result = propsCombinations.join(', ');

    console.log(result);
};

parseArgs();
