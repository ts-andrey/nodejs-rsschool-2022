import path from 'path';
import { readdir, rename as fsRename, readFile, copyFile, appendFile, unlink } from 'fs/promises';
import * as error from './error.js';

export const copy = async dataObj => {
  try {
    const filePath = dataObj.rest[0];
    const fileName = path.basename(filePath);
    const resultPath = dataObj.rest[1];

    await copyFile(filePath, path.join(resultPath, fileName));
  } catch (err) {
    console.log(error.FILE_OPER_FAIL);
  }
};

export const move = async dataObj => {
  try {
    const filePath = dataObj.rest[0];
    const fileName = path.basename(filePath);
    const movePath = dataObj.rest[1];
    await copyFile(filePath, path.join(movePath, fileName));
    await unlink(filePath);
  } catch (err) {
    console.log(error.FILE_OPER_FAIL);
  }
};

export const create = async dataObj => {
  try {
    const filePath = dataObj.curDir;
    const fileName = dataObj.rest[0];
    await appendFile(path.join(filePath, fileName), '');
  } catch (err) {
    console.log(error.FILE_OPER_FAIL);
  }
};

export const remove = async dataObj => {
  try {
    const filePath = getPath(dataObj);
    await unlink(filePath);
  } catch (err) {
    console.log(error.FILE_OPER_FAIL);
  }
};

export const list = async dataObj => {
  try {
    const path = dataObj.curDir;
    const files = await readdir(path).catch(err => {
      console.log(error.FILE_OPER_FAIL);
    });
    console.log(files);
  } catch (err) {
    console.log(error.FILE_OPER_FAIL);
  }
};

export const read = async dataObj => {
  try {
    const filePath = getPath(dataObj);
    const fileContent = await readFile(filePath, { encoding: 'utf8' });
    console.log(fileContent);
  } catch (err) {
    console.log(error.FILE_OPER_FAIL);
  }
};

export const rename = async dataObj => {
  const filePath = dataObj.rest[0];
  const fileName = dataObj.rest[1];
  const newFilePath = path.join(path.dirname(filePath), fileName);
  try {
    await fsRename(filePath, newFilePath);
  } catch (err) {
    console.log(error.FILE_OPER_FAIL);
  }
};

function getPath(pathObj) {
  if (path.isAbsolute(pathObj.rest[0])) {
    return pathObj.rest[0];
  }
  return path.join(path.curDir, pathObj.rest[0]);
}
