/* 
original code is licensed under the MIT License, Copyright © HiDeoo.
See [LICENSE](https://github.com/HiDeoo/starlight-i18n/blob/main/LICENSE) for more information. 
*/

import {
  window, type WorkspaceFolder,
  type Disposable,
  type QuickPick,
  type QuickPickItem,
  ViewColumn,
  workspace,
  type Uri,
} from 'vscode';
import * as fs from 'node:fs';

interface LocaleQuickPickItem extends QuickPickItem {
  localeDirectory: string
}

type TranslationPicker = QuickPick<LocaleQuickPickItem>;

export async function pickTranslationGeneral(locales: string[]
): Promise<LocaleQuickPickItem | undefined> {

  if (locales.length === 1) {
    const r = {
      label: locales[0],
      localeDirectory: locales[0],
    };
    return r;
  }

  const disposables: Disposable[] = [];
  const picker: TranslationPicker = window.createQuickPick();
  picker.title = 'edit-i18n';
  picker.enabled = false;
  picker.busy = true;
  picker.ignoreFocusOut = true;
  picker.placeholder = 'Collecting page translations status…';
  picker.step = 1;
  picker.totalSteps = 1;

  try {
    return await new Promise((resolve, reject) => {
      disposables.push(
        picker.onDidAccept(() => {
          const item = picker.selectedItems[0];
          if (isLocaleQuickPickItem(item)) {
            resolve(item);
          } else {
            resolve(undefined);
          }
        }),
      );

      try {
        picker.items = locales.map((locale) => ({
          label: locale,
          localeDirectory: locale
        }));
      } catch (error) {
        reject(error);
        return;
      }

      picker.show();
      picker.busy = false;
      picker.enabled = true;
      picker.placeholder = 'Select a locale to edit';
    });
  } finally {
    picker.dispose();

    for (const disposable of disposables) {
      disposable.dispose();
    }
  }
}

function isLocaleQuickPickItem(item: unknown): item is LocaleQuickPickItem {
  return typeof item === 'object' && item !== null && 'localeDirectory' in item;
}


export async function openFileSource(file: Uri) {
  await window.showTextDocument(file, { viewColumn: ViewColumn.One });
}

export async function openFileTranslation(file: Uri) {

  if (!fs.existsSync(file.fsPath)) {
    await workspace.fs.writeFile(file, new TextEncoder().encode(`---\n\n---\n`));
  }

  await window.showTextDocument(file, { preview: false, viewColumn: ViewColumn.Two });
}

const logger = window.createOutputChannel('edit-i18n');

export function isWorkspaceWithSingleFolder(
  workspaceFolders: readonly WorkspaceFolder[] | undefined,
): workspaceFolders is readonly [WorkspaceFolder] {
  return workspaceFolders !== undefined && workspaceFolders.length === 1;
}

export function outputLog(message: string) {
  logger.appendLine(message);
}

