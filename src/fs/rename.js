import { resolve } from 'path';
import { rename as renameFile } from 'fs/promises';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const rename = async () => {
    const sourceFileFileName = 'wrongFilename.txt';
    const targetFileFileName = 'properFilename.md';

    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToSourceFile = resolve(__dirname, `./files/${sourceFileFileName}`);
    const pathToTargetFile = resolve(__dirname, `./files/${targetFileFileName}`);

    const isTargetFileDoesNotExists = !(await isFileOrFolderExists(pathToSourceFile));
    const isSourceFileExists = await isFileOrFolderExists(pathToTargetFile);

    if (isTargetFileDoesNotExists || isSourceFileExists) {
        throw new Error('FS operation failed');
    }

    try {
        await renameFile(pathToSourceFile, pathToTargetFile);
    } catch {
        throw new Error('FS operation failed');
    }
};

await rename();
