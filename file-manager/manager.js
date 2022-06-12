import {} from './compressor.js';
import * as err from './error.js';
import * as fm from './fileManager.js';
import { } from './hash.js';
import { } from './infoProvider.js';

export function manager(dataObj) {
  switch (dataObj.command) {
    case 'up':
      break;
    case 'cd':
      break;     
    case 'ls':
      fm.list(dataObj);
      break;

    case 'cat':
      fm.read(dataObj);
      break;
    case 'add':
      fm.create(dataObj);
      break;
    case 'rn':
      fm.rename(dataObj);
      break;
    case 'cp':
      fm.copy(dataObj);
      break;
    case 'mv':
      fm.move(dataObj);
      break;
    case 'rm':
      fm.remove(dataObj);
      break;

    case 'os':
      break;

    case 'hash':
      break;

    case 'compress':
      break;
    case 'decompress':
      break;

    default:
      console.log(err.WRONG_OPER);
  }
}
