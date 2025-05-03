import { chdir, cwd } from 'process';
import { join } from 'path';

import { NODE_ENV } from './env';
import { DEV_MODE } from './constants';

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
