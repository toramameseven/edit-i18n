import path from 'node:path';

import { expect, test } from 'vitest';

import { getTranslationInfo, getTranslationJs, getLang, type LocaleInfo, makeOtherLangFile } from '../translation';

const testLocaleInfo: LocaleInfo = {
  contentFolder: "docs",
  locales: {
      en: {
          label: "English",
          lang: "en"
      },
      ja: {
          label: "日本語",
          lang: "ja "
      },
      cn: {
          label: "中国語",
          lang: "cn "
      }
  }
};


test('finds i18n config file', () => {
  const filePath = path.resolve(__dirname, "../../demo/content/docs/ja/index.mdx");
  const filePathJs = path.resolve(__dirname, "../../demo/.translation.js");

   
  console.log(filePath);
  const configPath = getTranslationJs(filePath);

  expect(configPath).toBe(filePathJs);
});

test('finds lang', () => {
  const filePath = path.resolve(__dirname, "../../demo/content/docs/ja/index.mdx");
  const filePath2 = path.resolve(__dirname, "../../demo/content/docs/index.mdx");
   
  console.log(filePath);
  const configPath = getLang(filePath, testLocaleInfo);
  expect(configPath).toBe('ja');
  expect(getLang(filePath2, testLocaleInfo)).toBe(undefined);
});


test('finds locales inlined in the configuration', () => {
  const myPath = path.resolve(__dirname, "../../demo/.translation.js");
   
  console.log(myPath);
  const locales = getTranslationInfo(myPath);

   
  console.log("%o", locales);
  expect(Object.keys(locales.locales).includes("en")).toBe(true);
});

test('make other lang file', () => {
  const filePath = path.resolve(__dirname, "../../demo/content/docs/ja/index.mdx");
  const filePathResult = path.resolve(__dirname, "../../demo/content/docs/cn/index.mdx");
  const pathTranslate = makeOtherLangFile(filePath, "cn", "docs");

   
  console.log("%o", pathTranslate);

  expect(pathTranslate).toBe(filePathResult);
});