/*  fetches existing Sharepoint documents as Markdown and stores them in a folder structure.
    I use this to research existing blocks for certain content.
 */

import fetch from 'node-fetch';
import fs from "fs";
import path from "path";

async function createFolder(url) {
    const folderPath = `./mirror${new URL(url).pathname.replace('/.*$', '')}`;
    try {
        await fs.promises.mkdir(folderPath, {recursive: true});
    } catch (ignore) {
    }
    return folderPath;
}

function getLocale(url) {
  if (url.includes('www.zeiss.de')) {
    return 'de';
  }
  return 'en';
};

async function getPaths() {
    const response = await fetch("https://main--zeiss--hlxsites.hlx.page/drafts/import-report.json");
    const json = await response.json();
    return json.data.filter(row => !row.status.includes("removed"))
        .map(row => `/${getLocale(row.URL)}${row.path}`);
}

async function main() {
    const paths = await getPaths();
    await Promise.all(paths.map(async (p) => {
        const url = `https://main--zeiss--hlxsites.hlx.page${p}.md`;
        const response = await fetch(url);
        if (response.ok) {
            const folderPath = await createFolder(url);
            await response.body.pipe(fs.createWriteStream(`${folderPath}/${path.basename(url)}`));
            console.log('ok: ', url);
        } else {
            console.log('failed: ', url);
        }
    }));
}

main();
