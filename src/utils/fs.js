import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { access } from 'fs/promises';
import { constants } from 'fs';

export const getCurrentFileInfo = (fileUrl) => {
    const __filename = fileURLToPath(fileUrl);
    const __dirname = dirname(__filename);

    return [__dirname, __filename];
};

export const isFileExists = async (pathToFile) => {
    try {
        await access(pathToFile, constants.F_OK);

        return true;
    } catch {
        return false;
    }
};
