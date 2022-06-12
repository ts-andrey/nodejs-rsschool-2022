import { readFile } from 'fs/promises';
import crypto from 'crypto';

export const calculateHash = async dataObj => {
  const filePath = dataObj.rest[0];
  const hashData = await readFile(filePath);

  const hash = crypto.createHash('sha256').update(hashData).digest('hex');
  console.log(`${hash}\n`);
};
