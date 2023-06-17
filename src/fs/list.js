import { resolve } from 'path';
import { readdir as readFolder } from 'fs/promises';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const list = async () => {
    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToFolder = resolve(__dirname, './files');

    const isTargetFolderDoesNotExists = !(await isFileOrFolderExists(pathToFolder));

    if (isTargetFolderDoesNotExists) {
        throw new Error('FS operation failed');
    }

    try {
        const filesData = await readFolder(pathToFolder);

        console.log(filesData);
    } catch {
        throw new Error('FS operation failed');
    }
};

await list();
