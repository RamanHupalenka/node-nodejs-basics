import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { access } from 'fs/promises';
import { constants } from 'fs';

export const getCurrentFileInfo = (fileUrl) => {
    const __filename = fileURLToPath(fileUrl);
    const __dirname = dirname(__filename);

    return [__dirname, __filename];
};

export const checkForFileExistence = async (pathToFile) => {
    try {
        await access(pathToFile, constants.R_OK);
    } catch {
        throw new Error('FS operation failed');
    }
};
