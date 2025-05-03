import { chdir, cwd } from 'process';
import { readdir } from 'fs/promises';
import { stat } from 'fs/promises';
import { join } from 'path';

import { NODE_ENV } from './env.js';
import { DEV_MODE } from './constants.js';

const isDev = NODE_ENV === DEV_MODE ? true : false;

export const up = async () => {
  const currentPath = cwd();
  const parentPath = join(currentPath, '..');
  
  try {
    await chdir(parentPath);
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};

export const cd = async (path) => {
  try {
    await chdir(path);
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};

export const ls = async () => {
  try {
    const items = await readdir(cwd());
    const itemsWithStats = await Promise.all(
      items.map(async (item) => {
        const stats = await stat(join(cwd(), item));
        return {
          name: item,
          isDirectory: stats.isDirectory()
        };
      })
    );

    itemsWithStats.sort((a, b) => {
      if (a.isDirectory === b.isDirectory) {
        return a.name.localeCompare(b.name);
      }
      return a.isDirectory ? -1 : 1;
    });

    console.log('\nCurrent directory content:');
    console.log('Type\t\tName');
    console.log('----------------------------');
    itemsWithStats.forEach(item => {
      console.log(`${item.isDirectory ? 'Directory' : 'File'}\t\t${item.name}`);
    });
    return true;
  } catch (error) {
    if (isDev) console.error(error);
    return false;
  }
};