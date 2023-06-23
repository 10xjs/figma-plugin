/**
 * @see https://www.figma.com/plugin-docs/manifest/
 */
export interface Manifest {
  name: string;
  id?: string;
  main: string;
  api: string;
  ui?: string | Record<string, string>;
  parameters?: Parameter[];
  parameterOnly?: boolean;
  editorType: ('figma' | 'figjam')[];
  menu?: ManifestMenuItem[];
  relaunchButtons?: ManifestRelaunchButton[];
  enableProposedApi?: boolean;
  enablePrivatePluginApi?: boolean;
  build?: string;
  permissions?: PluginPermissionType[];
}

export interface Parameter {
  name: string;
  key: string;
  description?: string;
  allowFreeform?: boolean;
  optional?: boolean;
}

export type ManifestMenuItem =
  | { name: string; command: string }
  | { separator: true }
  | { name: string; menu: ManifestMenuItem[] };

export interface ManifestRelaunchButton {
  command: string;
  name: string;
  multipleSelection?: boolean;
}

export type PluginPermissionType = 'currentuser' | 'activeusers';
