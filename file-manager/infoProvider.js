import os from 'os';

export const getSystemInfo = dataObj => {
  switch (dataObj.rest[0]) {
    case '--EOL':
      console.log(os.EOL, '\n');
      break;
    case '--cpus':
      console.log(os.cpus(), '\n');
      break;
    case '--homedir':
      console.log(os.homedir(), '\n');
      break;
    case '--username':
      console.log(os.userInfo({ encoding: 'utf8' }).name, '\n');
      break;
    case '--architecture':
      console.log(os.arch(), '\n');
      break;
    default:
      console.log('can not find such data');
      break;
  }
};
