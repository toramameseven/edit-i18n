import fs from "node:fs";
import path from "node:path";


export function getContentFileInfo(fileFullPath: string) {
    const splitPaths = fileFullPath.split('\\');
    const indices = splitPaths.map((str, index) => str.startsWith("content") ? index : -1).filter(index => index !== -1);
    if (indices.length > 1) {
        throw new Error(`More than two content folders exist.`);
    }
    if (indices.length === 0) {
        throw new Error(`No content folder exists.`);
    }
    const contentPath = path.join(...splitPaths.slice(0, indices[0] + 1));
    const language = splitPaths[indices[0] + 1];
    const allLanguages = getFolders(contentPath);
    const languages = allLanguages.filter(l => l !== language);
    const fileRelPath = path.join(...splitPaths.slice(indices[0] + 2));

    return {
        contentPath,
        languages,
        language,
        fileRelPath
    };
}

function getFolders(currentFolder: string) {
    // get files and folders
    const entries = fs.readdirSync(currentFolder);

    // select only folders
    const directories = entries.filter((entry) => {
        const fullPath = path.join(currentFolder, entry);
        return fs.statSync(fullPath).isDirectory();
    });

    return directories;
}





