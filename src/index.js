import { homedir } from 'os';
import { chdir, cwd } from 'process';
import { createInterface } from 'readline';

import { commands } from './commands.js';

let username = '';

import { NODE_ENV } from './env.js';
import { DEV_MODE, ENCODING } from './constants.js';

const isDev = NODE_ENV === DEV_MODE ? true : false;

const args = process.argv.slice(2);
for (const arg of args) {
  if (arg.startsWith('--username=')) username = arg.split('=')[1];
}

if (!username) {
  console.error('Please provide username using --username argument');
  process.exit(1);
}

chdir(homedir());

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${cwd()}`);

rl.on('line', async (input) => {
  if (input === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
    process.exit(0);
  }

  const [command, ...args] = input.trim().split(' ');

  if (commands[command]) {
    try {
      const success = await commands[command](...args);
      if (!success) {
        console.log('Operation failed');
      }
    } catch (error) {
      if (isDev) console.error(error);
      console.log('Operation failed');
    }
  } else {
    console.log('Invalid input');
  }

  console.log(`You are currently in ${cwd()}`);
});

rl.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  rl.close();
  process.exit(0);
});
