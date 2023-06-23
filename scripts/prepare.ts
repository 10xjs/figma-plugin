import path from 'node:path';
import childProcess from 'node:child_process';
import chokidar from 'chokidar';

function writeManifest() {
  childProcess.execSync('yarn ts-node ./scripts/manifest.ts', {
    stdio: 'inherit',
  });
}

writeManifest();

if (process.env.NODE_ENV === 'development') {
  chokidar
    .watch([
      path.resolve(process.cwd(), 'src/manifest.ts'),
      path.resolve(process.cwd(), 'package.json'),
    ])
    .on('change', () => {
      writeManifest();
    });
}
