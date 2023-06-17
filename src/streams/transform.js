import { Transform } from 'stream';

const reverseStringExcludeEOL = (str) => {
    const endOfLineCRLFRegExp = /\\r\\n/;
    const endOfLine = endOfLineCRLFRegExp.test(str) ? '\r\n' : '\n';
    const strWithoutEOL = str.replace(endOfLine, '');

    return `${strWithoutEOL.split('').reverse().join('')}${endOfLine}`;
};

const transformStream = new Transform({
    transform(chunk, _, callback) {
        callback(null, reverseStringExcludeEOL(String(chunk)));
    },
});

const transform = async () => {
    try {
        process.stdin.pipe(transformStream).pipe(process.stdout);
    } catch {
        throw new Error('FS operation failed');
    }
};

await transform();
