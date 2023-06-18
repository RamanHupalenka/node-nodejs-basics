const parseEnv = () => {
    const rssRegExp = /^RSS\_/;
    const propsCombinations = [];
    const envProps = process.env;
    const envPropsKeys = Object.keys(envProps);

    for (const propName of envPropsKeys) {
        if (rssRegExp.test(propName)) {
            const propValue = envProps[propName];

            propsCombinations.push(`${propName}=${propValue}`);
        }
    }

    const result = propsCombinations.join('; ');

    console.log(result);
};

parseEnv();
