import { EOL, cpus, homedir, userInfo, arch } from 'os';

export const os = async (param) => {
  try {
    switch (param) {
      case '--EOL':
        console.log(JSON.stringify(EOL));
        break;
      case '--cpus':
        const cpuInfo = cpus();
        console.log(`Overall amount of CPUs: ${cpuInfo.length}`);
        cpuInfo.forEach((cpu, index) => {
          console.log(`CPU ${index + 1}:`);
          console.log(`  Model: ${cpu.model}`);
          console.log(`  Clock rate: ${cpu.speed / 1000} GHz`);
        });
        break;
      case '--homedir':
        console.log(homedir());
        break;
      case '--username':
        console.log(userInfo().username);
        break;
      case '--architecture':
        console.log(arch());
        break;
      default:
        return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};