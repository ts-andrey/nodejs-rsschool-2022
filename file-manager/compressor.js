import path from 'path';
import fs from 'fs';
import zlib from 'zlib';

export const compress = async dataObj => {
  const pathToFile = dataObj.rest[0];
  const fileName = path.basename(pathToFile);
  const pathToResult = dataObj.rest[1];

  const zip = zlib.createGzip();

  const read = fs.createReadStream(pathToFile);
  const write = fs.createWriteStream(path.join(pathToResult, fileName));

  read.pipe(zip).pipe(write);
};

export const decompress = async dataObj => {
  const pathToFile = dataObj.rest[0];
  const fileName = path.basename(pathToFile);
  const pathToResult = dataObj.rest[1];

  const unzip = zlib.createUnzip();

  const read = fs.createReadStream(pathToFile);
  const write = fs.createWriteStream(path.join(pathToResult, fileName));

  read.pipe(unzip).pipe(write);
};
