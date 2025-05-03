import { createReadStream } from 'fs';
import { createHash } from 'crypto';

import { NODE_ENV } from './env';
import { DEV_MODE } from './constants';

const isDev = NODE_ENV === DEV_MODE ? true : false;

export const hash = async (filePath) => {
  try {
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);
    
    await new Promise((resolve, reject) => {
      stream.on('data', (chunk) => hash.update(chunk));
      stream.on('end', () => {
        console.log(hash.digest('hex'));
        resolve();
      });
      stream.on('error', reject);
    });
    
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};