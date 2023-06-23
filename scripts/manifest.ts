import path from 'node:path';
import fs from 'fs-extra';
import * as manifest from '../src/manifest';

export async function writeManifest() {
  await fs
    .access(path.resolve(process.cwd(), 'plugin'))
    .catch(() => fs.mkdir(path.resolve(process.cwd(), 'plugin')));
  await fs.writeJSON(
    path.resolve(process.cwd(), 'plugin/manifest.json'),
    await manifest.genManifest(),
    {
      spaces: 2,
    }
  );
  console.log('write manifest.json');
}

writeManifest();
