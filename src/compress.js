import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';

import { NODE_ENV } from './env.js';
import { DEV_MODE } from './constants.js';

const isDev = NODE_ENV === DEV_MODE ? true : false;

export const compress = async (sourcePath, destinationPath) => {
  try {
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    const compressStream = createBrotliCompress();
    
    await pipeline(readStream, compressStream, writeStream);
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};

export const decompress = async (sourcePath, destinationPath) => {
  try {
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    const decompressStream = createBrotliDecompress();
    
    await pipeline(readStream, decompressStream, writeStream);
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};