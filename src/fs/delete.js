import { resolve } from 'path';
import { rm as removeFile } from 'fs/promises';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const remove = async () => {
    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToFile = resolve(__dirname, './files/fileToRemove.txt');

    const isTargetFileDoesNotExists = !(await isFileOrFolderExists(pathToFile));

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
