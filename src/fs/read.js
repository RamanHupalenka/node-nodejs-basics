import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { checkForFileExistence, getCurrentFileInfo } from '../utils/fs.js';

const read = async () => {
    const [dirname] = getCurrentFileInfo(import.meta.url);
    const pathToFile = resolve(dirname, './files/fileToRead.txt');

    await checkForFileExistence(pathToFile);

    try {
        const fileData = await readFile(pathToFile);

        console.log(fileData.toString());
    } catch {
        throw new Error('FS operation failed');
    }
};

await read();
