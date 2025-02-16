import path from 'node:path';

import { expect, test } from 'vitest';

import { getContentFileInfo } from '../translation';


test('get content folder no content', () => {
  const filePath = path.resolve(__dirname, "../../demo/con1tent/docs/ja/index.mdx");
  // const filePathResult = path.resolve(__dirname, "../../demo/content/docs/cn/index.mdx");
  // console.log("get content folder=>: %o", filePath);
  //const pathTranslate = getContentFolder(filePath);

   
  // console.log("get content folder=>: %o", pathTranslate);
  // console.log(pathTranslate);
  // expect(pathTranslate).toBe(pathTranslate);

  expect(() => getContentFileInfo(filePath)).toThrow("No content folder exists.");
});

test('get content folder two content', () => {
  const filePath = path.resolve(__dirname, "../../content/demo/content/docs/ja/index.mdx");
  // const filePathResult = path.resolve(__dirname, "../../demo/content/docs/cn/index.mdx");
  // console.log("get content folder=>: %o", filePath);
  //const pathTranslate = getContentFolder(filePath);

   
  // console.log("get content folder=>: %o", pathTranslate);
  // console.log(pathTranslate);
  // expect(pathTranslate).toBe(pathTranslate);

  expect(() => getContentFileInfo(filePath)).toThrow("More than two content folders exist.");
});


test('get content folder', () => {
  const fileRelPath = "../../demo/contenta/ja/index.mdx";
  const fullPath = path.resolve(__dirname, fileRelPath);
  const pathTranslate = getContentFileInfo(fullPath);

  console.log("get content folder=>: %o", pathTranslate);
  expect(pathTranslate).toBe(pathTranslate);


});


