import { up } from './navigation.js';
import { cd } from './navigation.js';
import { ls } from './navigation.js';
import { cat } from './files.js';
import { add } from './files.js';
import { mkdir } from './files.js';
import { rn } from './files.js';
import { cp } from './files.js';
import { mv } from './files.js';
import { rm } from './files.js';
import { os } from './os.js';
import { hash } from './hash.js';
import { compress } from './compress.js';
import { decompress } from './compress.js';

export const commands = {
  up,
  cd,
  ls,
  cat,
  add,
  mkdir,
  rn,
  cp,
  mv,
  rm,
  os,
  hash,
  compress,
  decompress
};