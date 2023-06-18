import { resolve } from 'path';
import { open } from 'fs/promises';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const read = async () => {
    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToFile = resolve(__dirname, './files/fileToRead.txt');

    const isTargetFileDoesNotExists = !(await isFileOrFolderExists(pathToFile));

    if (isTargetFileDoesNotExists) {
        throw new Error('FS operation failed');
    }

    try {
        const fileData = await open(pathToFile, 'r');

        const readStream = fileData.createReadStream({
            autoClose: true,
        });

        readStream.pipe(process.stdout);
    } catch {
        throw new Error('Read Stream operation failed');
    }
};

await read();
