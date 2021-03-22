import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { basename, extname } from 'path';

function withHash(n, h) {
  const extension = extname(n);
  return `${basename(n, extension)}-${h}${extension}`;
}

/**
 * NOTE: process.argv
 * [
 *    node,
 *    executing file,
 *    ...args
 * ]
 */
const fileName = process.argv[2];

if (!fileName) {
  console.error('no input file');
  process.exit(1);
}

const hash = createHash('md5');
const input = createReadStream(fileName);

input.on('error', e => {
  console.error(e);
  process.exit(1);
});

input.on('readable', () => {
  const data = input.read();
  if (data) {
    hash.update(data);
  } else {
    const hashString = hash.digest('hex');
    console.log(withHash(fileName, hashString));
  }
});
