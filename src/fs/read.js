import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { access, readFile } from 'fs/promises';
import { constants } from 'fs';

const getCurrentFileInfo = (fileUrl) => {
    const __filename = fileURLToPath(fileUrl);
    const __dirname = dirname(__filename);

    return [__dirname, __filename];
};

const checkForFileExistence = async (pathToFile) => {
    try {
        await access(pathToFile, constants.R_OK);
    } catch {
        throw new Error('FS operation failed');
    }
};

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
