import { resolve } from 'path';
import { open, rm as removeFile } from 'fs/promises';
import { gunzip } from 'zlib';
import { Transform } from 'stream';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const gunzipCallback = (err, chunk, callback) => {
    if (err) {
        throw new Error('Gunzip operation failed');
    }

    callback(null, String(chunk));
};

const transformStream = new Transform({
    transform(chunk, _, callback) {
        gunzip(chunk, (err, chunk) => gunzipCallback(err, chunk, callback));
    },
});

const decompress = async () => {
    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToSourceArchive = resolve(__dirname, './files/archive.gz');
    const pathToTargetFile = resolve(__dirname, './files/fileToCompress.txt');

    const isSourceArchiveDoesNotExists = !(await isFileOrFolderExists(pathToSourceArchive));
    const isTargetFileExists = await isFileOrFolderExists(pathToTargetFile);

    if (isSourceArchiveDoesNotExists || isTargetFileExists) {
        throw new Error('FS operation failed');
    }

    try {
        const archiveData = await open(pathToSourceArchive, 'r');
        const fileData = await open(pathToTargetFile, 'w');

        const readStream = archiveData.createReadStream({
            autoClose: true,
        });

        const writeStream = fileData.createWriteStream({
            autoClose: true,
        });

        readStream.pipe(transformStream).pipe(writeStream);

        readStream.on('end', () => {
            removeFile(pathToSourceArchive);
        });
    } catch (err) {
        throw new Error('Archive Decompress operation failed');
    }
};

await decompress();
