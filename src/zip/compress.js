import { resolve } from 'path';
import { open, rm as removeFile } from 'fs/promises';
import { createGzip } from 'zlib';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const compress = async () => {
    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToSourceFile = resolve(__dirname, './files/fileToCompress.txt');
    const pathToTargetArchive = resolve(__dirname, './files/archive.gz');

    const isSourceFileDoesNotExists = !(await isFileOrFolderExists(pathToSourceFile));
    const isTargetArchiveExists = await isFileOrFolderExists(pathToTargetArchive);

    if (isSourceFileDoesNotExists || isTargetArchiveExists) {
        throw new Error('FS operation failed');
    }

    try {
        const fileData = await open(pathToSourceFile, 'r');
        const archiveData = await open(pathToTargetArchive, 'w');

        const gzip = createGzip();

        const readStream = fileData.createReadStream({
            autoClose: true,
        });

        const writeStream = archiveData.createWriteStream({
            autoClose: true,
        });

        readStream.pipe(gzip).pipe(writeStream);

        readStream.on('end', () => {
            removeFile(pathToSourceFile);
        });
    } catch {
        throw new Error('Archive Compress operation failed');
    }
};

await compress();
