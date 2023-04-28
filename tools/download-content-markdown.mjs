/*  fetches existing Sharepoint documents as Markdown and stores them in a folder structure.
    I use this to research existing blocks for certain content.
    
    $ node --experimental-modules ./download-content-markdown.mjs
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const fqdn = 'main--zeiss--hlxsites.hlx.page';

const indexPaths = [
    '/en/semiconductor-manufacturing-technology/news-and-events/query-index.json',
    '/de/semiconductor-manufacturing-technology/news-und-events/query-index.json'
];

async function createFolder(url) {
    const folderPath = `./mirror${new URL(url).pathname.replace('/.*$', '')}`;
    try {
        await fs.promises.mkdir(folderPath, {recursive: true});
    } catch (ignore) {
    }
    return folderPath;
}

async function getPageUrls(indexPath) {
    const indexUrl = `https://${fqdn}${indexPath}`;
    const response = await fetch(indexUrl);
    const document = await response.json();
    return document.data
        .map((page) => page.path)
        .map((pagePath) => `https://${fqdn}${pagePath}.md`);
}

async function fetchPage(url) {
    const response = await fetch(url);
    if (response.ok) {
        const folderPath = await createFolder(url);
        response.body.pipe(fs.createWriteStream(`${folderPath}/${path.basename(url)}`));
        console.log('ok: ', url);
    } else {
        console.log('failed: ', url);
    }
}

async function fetchPages(indexPath) {
    const urls = await getPageUrls(indexPath);
    urls.map((url) => fetchPage(url));
}

async function main() {
    await Promise.all(indexPaths.map((indexPath) => fetchPages(indexPath)));
}

main();
