import { resolve } from 'path';
import { open } from 'fs/promises';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const write = async () => {
    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToFile = resolve(__dirname, './files/fileToWrite.txt');

    const isTargetFileDoesNotExists = !(await isFileOrFolderExists(pathToFile));

    if (isTargetFileDoesNotExists) {
        throw new Error('FS operation failed');
    }

    try {
        const fileData = await open(pathToFile, 'w');

        const writeStream = fileData.createWriteStream({
            autoClose: true,
        });

        process.stdin.pipe(writeStream);
    } catch {
        throw new Error('FS operation failed');
    }
};

await write();
