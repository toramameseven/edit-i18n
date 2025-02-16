/* 
original code is licensed under the MIT License, Copyright © HiDeoo.
See [LICENSE](https://github.com/HiDeoo/starlight-i18n/blob/main/LICENSE) for more information. 
*/

import { getContentFileInfo } from './translation';


import { commands, type ExtensionContext, window, Uri } from 'vscode';
import { pickTranslationGeneral, openFileTranslation, outputLog, openFileSource } from './vsc';
import path from 'node:path';

/**
 * Entry point
 * @param context 
 */
export function activate(context: ExtensionContext): void {
  const extensionName = "edit-i18n";

  context.subscriptions.push(
    commands.registerCommand(`${extensionName}.start`, openOtherLangFile),
  );
  outputLog(`${extensionName} is active.`);
}

/**
 * open files. source and translation
 * @param sourceFile 
 */
async function openOtherLangFile(sourceFile: Uri) {
  try {
    // open source file.
    await openFileSource(sourceFile);

    // get content folder
    const fileInfo = getContentFileInfo(sourceFile.fsPath);

    // select edit locale
    const localePickItem = await pickTranslationGeneral(fileInfo.languages);
    const lang = localePickItem?.localeDirectory;
    if (!lang) {
      throw new Error('No language. language folder or language settings.');
    }

    // open or create file
    const pathInfo = path.join(fileInfo.contentPath, lang, fileInfo.fileRelPath);
    await openFileTranslation(Uri.file(pathInfo));
  } catch (error) {
    const isError = error instanceof Error;
    const message = isError ? error.message : 'Something went wrong!';

    outputLog(message);

    if (isError && error.stack) {
      outputLog(error.stack);
    }

    await window.showErrorMessage(message);
  }
}

