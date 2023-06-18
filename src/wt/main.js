import { resolve } from 'path';
import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const getWorkerCalculations = (pathToWorker, n) => {
    return new Promise((res, rej) => {
        const worker = new Worker(pathToWorker);

        worker.once('message', res);

        worker.once('error', rej);

        worker.on('exit', (code) => {
            if (code !== 0) {
                rej(new Error(`Worker stopped with exit code ${code}`));
            }
        });

        worker.postMessage(n);
    });
};

const performCalculations = async () => {
    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToWorker = resolve(__dirname, './worker.js');
    const cpusCount = cpus().length;

    const isTargetWorkerDoesNotExists = !(await isFileOrFolderExists(pathToWorker));

    if (isTargetWorkerDoesNotExists) {
        throw new Error('FS operation failed');
    }

    try {
        const workersCalculationsPromises = [];

        for (let i = 0; i < cpusCount; i++) {
            workersCalculationsPromises.push(getWorkerCalculations(pathToWorker, i + 10));
        }

        const workersResults = await Promise.allSettled(workersCalculationsPromises);

        const result = workersResults.map((res) => ({
            status: res.status === 'fulfilled' ? 'resolved' : 'error',
            data: res.status === 'fulfilled' ? res.value : null,
        }));

        console.log(result);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await performCalculations();
