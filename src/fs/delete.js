import { resolve } from 'path';
import { rm as removeFile } from 'fs/promises';
import { isFileExists, getCurrentFileInfo } from '../utils/fs.js';

const remove = async () => {
    const [dirname] = getCurrentFileInfo(import.meta.url);
    const pathToFile = resolve(dirname, './files/fileToRemove.txt');

    const isTargetFileDoesNotExists = !(await isFileExists(pathToFile));

    if (isTargetFileDoesNotExists) {
        throw new Error('FS operation failed');
    }

    try {
        await removeFile(pathToFile);
    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();
