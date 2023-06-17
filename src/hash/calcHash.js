import { resolve } from 'path';
import { createHash } from 'crypto';
import { open } from 'fs/promises';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const calculateHash = async () => {
    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToFile = resolve(__dirname, './files/fileToCalculateHashFor.txt');

    const isTargetFileDoesNotExists = !(await isFileOrFolderExists(pathToFile));

    if (isTargetFileDoesNotExists) {
        throw new Error('FS operation failed');
    }

    try {
        let result = '';

        const fileData = await open(pathToFile, 'r');

        const readStream = fileData.createReadStream({
            autoClose: true,
        });

        readStream.on('data', (chunk) => {
            result += createHash('sha256').update(chunk).digest('hex');
        });

        readStream.on('end', () => {
            console.log(result);
        });
    } catch {
        throw new Error('FS operation failed');
    }
};

await calculateHash();
