import { join } from 'path';
import { fileURLToPath } from 'url';

import { argv } from 'process';

const __dirname = join(fileURLToPath(import.meta.url), '../');

let curDirPath = __dirname;
const curDirMessage = `You are currently in ${curDirPath}`;

const userName = argv.slice(2)[0].split('=')[1];

console.log(`Welcome to the File Manager, ${userName}!`);
console.log(curDirMessage);

