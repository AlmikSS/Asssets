import {access, rm} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {join} from 'node:path';

const apiDirectory = join('static', 'api');
const xmlDirectory = join('static', 'xml');
const apiIndex = join(apiDirectory, 'index.html');

await Promise.all([
  rm(apiDirectory, {force: true, recursive: true}),
  rm(xmlDirectory, {force: true, recursive: true}),
]);

const doxygen = spawnSync('doxygen', ['Doxyfile'], {stdio: 'inherit'});

if (doxygen.error?.code === 'ENOENT') {
  console.error('Error: Doxygen is not installed or is not available on PATH. Install Doxygen before generating the API.');
  process.exit(1);
}

if (doxygen.error) {
  console.error(`Error: Failed to run Doxygen: ${doxygen.error.message}`);
  process.exit(1);
}

if (doxygen.status !== 0) {
  console.error(`Error: Doxygen failed with exit code ${doxygen.status ?? 'unknown'}.`);
  process.exit(1);
}

try {
  await access(apiIndex);
} catch {
  console.error(`Error: Doxygen completed, but the expected API entry point was not generated: ${apiIndex}.`);
  process.exit(1);
}
