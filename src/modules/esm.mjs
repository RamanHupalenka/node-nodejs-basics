import { sep } from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { getCurrentFileInfo } from '../utils/fs.js';
import './files/c.js';

const [__dirname, __filename] = getCurrentFileInfo(import.meta.url);

const random = Math.random();

const unknownObject = await import(`./files/${random > 0.5 ? 'a' : 'b'}.json`, {
    assert: {
        type: 'json',
    },
});

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject.default);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
