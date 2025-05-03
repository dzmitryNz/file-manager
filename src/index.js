import { homedir } from 'os';
import { chdir, cwd } from 'process';

let username = '';

const args = process.argv.slice(2);
for (const arg of args) {
  if (arg.startsWith('--username=')) {
    username = arg.split('=')[1];
  }
}

if (!username) {
  console.error('Please provide username using --username argument');
  process.exit(1);
}

chdir(homedir());

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${cwd()}`);
