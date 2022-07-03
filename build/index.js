import {readdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const brCode = '\r\n\r\n';
const DocsPath = path.resolve('./Docs');
const ReadmePtah = path.resolve('./README.md');

console.log('DocsPath', DocsPath);

async function build() {
    const files = await readdir(DocsPath);

    let template = `# 目录 ${brCode}`;

    for (const file of files) {
        const {title, detail} = await writeTitle(file);

        template += `## ${title} ${brCode}`

        detail.forEach((name, index) => template += `**${name}** ${brCode}`);
    }

    template += brCode;
    const writeFileRes = await writeFile(ReadmePtah, template, 'utf-8');
    console.log('writeFile', writeFile);
}

async function writeTitle(fileName) {
    const subFiles = await readdir(`${DocsPath}/${fileName}`);
    console.log(fileName, subFiles);

    return {title: fileName, detail: subFiles.map(name => `[${name.replace(/.md/, '')}](./Docs/${fileName}/${name})`)};
}

await build();
