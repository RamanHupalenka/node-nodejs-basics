import { resolve } from 'path';
import { spawn } from 'child_process';
import { isFileOrFolderExists, getCurrentFileInfo } from '../utils/fs.js';

const spawnChildProcess = async (args) => {
    const [__dirname] = getCurrentFileInfo(import.meta.url);
    const pathToScript = resolve(__dirname, './files/script.js');

    const isTargetScriptDoesNotExists = !(await isFileOrFolderExists(pathToScript));

    if (isTargetScriptDoesNotExists) {
        throw new Error('FS operation failed');
    }

    try {
        const cp = spawn('node', [pathToScript, ...args]);

        process.stdin.pipe(cp.stdin);

        cp.stdout.pipe(process.stdout);
    } catch {
        throw new Error('Child Process operation failed');
    }
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
