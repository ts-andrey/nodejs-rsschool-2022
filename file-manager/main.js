import path from 'path';
import { fileURLToPath } from 'url';

import { argv } from 'process';

import { manager } from './manager.js';

const __dirname = path.join(fileURLToPath(import.meta.url), '../');

let curDirPath = __dirname;
const curDirMessage = `You are currently in ${curDirPath}`;

const userName = argv.slice(2)[0].split('=')[1];

console.log(`Welcome to the File Manager, ${userName}!\n`);

process.stdin.setEncoding('utf-8');
process.stdin.on('data', data => {
  let arr = data.split(' ');
  arr = arr.map(el => el.trim());
  if (arr[0] === 'up') {
    const tempPath = path.join(curDirPath, '..');
    if (tempPath.length > __dirname.length) {
      curDirPath = tempPath;
    }
    console.log(curDirPath);
  }
  const dataObj = {
    root: __dirname,
    curDir: curDirPath,
    command: arr[0],
    rest: arr.slice(1),
  };
  console.log(dataObj);
  manager(dataObj);
  console.log(`${curDirMessage}\n`);
});
