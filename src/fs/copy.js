import { resolve } from 'path';
import { cp as copyFolder } from 'fs/promises';
import { isFileExists, getCurrentFileInfo } from '../utils/fs.js';

const copy = async () => {
    const [dirname] = getCurrentFileInfo(import.meta.url);
    const pathToSourceFolder = resolve(dirname, './files');
    const pathToTargetFolder = resolve(dirname, './files_copy');

    const isSourceFolderDoesNotExists = !(await isFileExists(pathToSourceFolder));
    const isTargetFolderExists = await isFileExists(pathToTargetFolder);

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
