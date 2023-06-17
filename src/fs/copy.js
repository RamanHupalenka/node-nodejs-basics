import { resolve } from 'path';
import { cp as copyFolder } from 'fs/promises';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const copy = async () => {
    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToSourceFolder = resolve(__dirname, './files');
    const pathToTargetFolder = resolve(__dirname, './files_copy');

    const isSourceFolderDoesNotExists = !(await isFileOrFolderExists(pathToSourceFolder));
    const isTargetFolderExists = await isFileOrFolderExists(pathToTargetFolder);

    if (isSourceFolderDoesNotExists || isTargetFolderExists) {
        throw new Error('FS operation failed');
    }

    try {
        await copyFolder(pathToSourceFolder, pathToTargetFolder, {
            recursive: true,
        });
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await copy();
