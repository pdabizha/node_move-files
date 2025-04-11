/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function main() {
  const [src, dest] = process.argv.slice(2);

  if (!src || !dest) {
    console.error('Expected 2 arguments: source and destination');

    return;
  }

  if (src === dest) {
    return;
  }

  if (!fs.existsSync(src)) {
    console.error('Source file does not exist');

    return;
  }

  const srcStats = fs.statSync(src);

  if (!srcStats.isFile()) {
    console.error('Source is not a file');

    return;
  }

  let targetPath = dest;

  if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
    const fileName = path.basename(src);

    targetPath = path.join(dest, fileName);
  }

  const targetDir = path.dirname(targetPath);

  if (!fs.existsSync(targetDir)) {
    console.error('Destination directory does not exist');

    return;
  }

  const content = fs.readFileSync(src, 'utf-8');

  fs.writeFileSync(targetPath, content);
  fs.rmSync(src);
}

main();
