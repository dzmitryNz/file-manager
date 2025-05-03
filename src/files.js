import { createReadStream, createWriteStream } from 'fs';
import { writeFile, mkdir as mkdr, rename, unlink } from 'fs/promises';
import { join } from 'path';
import { pipeline } from 'stream/promises';

import { NODE_ENV } from './env.js';
import { DEV_MODE, ENCODING } from './constants.js';

const isDev = NODE_ENV === DEV_MODE ? true : false;

export const cat = async (filePath) => {
  try {
    const stream = createReadStream(filePath, ENCODING);
    stream.pipe(process.stdout);
    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};

export const add = async (fileName) => {
  try {
    await writeFile(join(process.cwd(), fileName), '');
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};

export const mkdir = async (dirName) => {
  try {
    await mkdr(join(process.cwd(), dirName));
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};

export const rn = async (oldPath, newName) => {
  try {
    const newPath = join(process.cwd(), newName);
    await rename(oldPath, newPath);
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};

export const cp = async (sourcePath, destinationPath) => {
  try {
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    await pipeline(readStream, writeStream);
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};

export const mv = async (sourcePath, destinationPath) => {
  try {
    await cp(sourcePath, destinationPath);
    await unlink(sourcePath);
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};

export const rm = async (filePath) => {
  try {
    await unlink(filePath);
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};