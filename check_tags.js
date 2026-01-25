const fs = require('fs');
const path = require('path');

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.next')) {
                results = results.concat(getFiles(file));
            }
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const tagsToCheck = ['section', 'main', 'div', 'span', 'article', 'nav', 'header', 'footer', 'aside'];

function checkTags(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Remove comments
    const cleanContent = content.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');

    tagsToCheck.forEach(tag => {
        const openRegex = new RegExp('<' + tag + '(\\b|\\s|>)', 'g');
        const closeRegex = new RegExp('</' + tag + '>', 'g');

        const openMatches = cleanContent.match(openRegex) || [];
        const closeMatches = cleanContent.match(closeRegex) || [];

        if (openMatches.length !== closeMatches.length) {
            console.log(`${filePath}: Unbalanced <${tag}> tag. Found ${openMatches.length} opens and ${closeMatches.length} closes.`);
        }
    });
}

const files = getFiles('frontend');
files.forEach(checkTags);
console.log('Done checking ' + files.length + ' files.');
