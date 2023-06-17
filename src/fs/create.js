import { resolve } from 'path';
import { writeFile } from 'fs/promises';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const create = async () => {
    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToFile = resolve(__dirname, './files/fresh.txt');

    const isTargetFileExists = await isFileOrFolderExists(pathToFile);

    if (isTargetFileExists) {
        throw new Error('FS operation failed');
    }

    try {
        await writeFile(pathToFile, 'I am fresh and young');
    } catch {
        throw new Error('FS operation failed');
    }
};

await create();
