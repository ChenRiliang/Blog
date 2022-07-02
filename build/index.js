import {readdir, writeFile} from 'node:fs/promises';

const brCode = '\r\n\r\n';

async function build() {
    const files = await readdir('../Docs/');

    let template = `# 目录 ${brCode}`;

    for (const file of files) {
        const {title, detail} = await writeTitle(file);

        template += `## ${title} ${brCode}`

        detail.forEach((name, index) => {
            template += `**${name}** ${brCode}`;
        })
    }

    template += brCode;
    const writeFileRes = await writeFile('../README.md', template, 'utf-8');
    console.log('writeFile', writeFile);
}

async function writeTitle(fileName) {
    const subFiles = await readdir(`../Docs/${fileName}`);
    console.log(fileName, subFiles);

    return {title: fileName, detail: subFiles.map(name => `[${name.replace(/.md/, '')}](./Docs/${fileName}/${name})`)};
}

await build();
