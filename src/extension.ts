/* 
original code is licensed under the MIT License, Copyright © HiDeoo.
See [LICENSE](https://github.com/HiDeoo/starlight-i18n/blob/main/LICENSE) for more information. 
*/

import { getTranslationJs, makeOtherLangFile, getTranslationInfo, getLang } from './translation';


import { commands, type ExtensionContext, window, Uri } from 'vscode';
import { pickTranslationGeneral, openFileTranslation, outputLog, openFileSource } from './vsc';

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

    const translationJs = getTranslationJs(sourceFile.fsPath);
    if (!translationJs) {
      throw new Error('No .translation.js file.');
    }

    const translationInfo = getTranslationInfo(translationJs);
    const lang = getLang(sourceFile.fsPath, translationInfo);
    if (!lang) {
      throw new Error('No language. language folder or language settings.');
    }

    delete translationInfo.locales[lang];
    const locales = translationInfo.locales;
    const localePickItem = await pickTranslationGeneral(locales);
    const pathInfo = makeOtherLangFile(sourceFile.fsPath, localePickItem?.locale.lang ?? "", translationInfo.contentFolder);

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

