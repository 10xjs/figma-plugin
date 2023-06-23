import path from 'node:path';
import fs from 'fs-extra';
import type PkgType from '../package.json';
import { Manifest } from './types/manifest';

export async function genManifest() {
  const pkg = (await fs.readJSON(
    path.resolve(process.cwd(), 'package.json')
  )) as typeof PkgType;

  const manifest: Manifest = {
    name: pkg.name,
    id: Date.now().toString(),
    api: '1.0.0',
    main: 'code/index.js',
    ui: 'ui/index.html',
    editorType: ['figma'],
  };

  return manifest;
}
