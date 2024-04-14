# Edit i18n

## Features

Visual Studio Code extension to easily edit a file and the translation file.


## Install

Install this extension.

## Configuration

If you have the document structure below, you create `.translation.js`.

* folder structure

```
└─content
    │  .translation.js
    └─docs
        ├─en
        │      index.mdx
        └─ja
            │  index.mdx
            └─reference
                    edit-translate.png
                    example.md

```


* .translation.js

```js,.translation.js
const locales = {
    contentFolder: "docs",
    locales: {
        en: {
            label: "English",
            lang: "en"
        },
        ja: {
            label: "Japanese",
            lang: "ja"
        },
        "zh-hans": {
            label: "Chinese",
            lang: "zh-hans"
        }
    }
}
module.exports = locales;
```

## Usage

1. You select the `en/index.mdx` in the file Explorer, and Left Click, then select `edit-i18n`.
2. You can select `ja` or `zh-hans`, and both files are displayed. 
3. If selected language file does not exist, you can see a new file.


## License

Licensed under the MIT License.

See [LICENSE](https://github.com/HiDeoo/starlight-i18n/blob/main/LICENSE).
