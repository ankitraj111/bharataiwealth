const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'frontend');
const searchPatterns = [
    'grid.svg',
    'bg-[url',
    'noise.svg'
];

function scanDir(dir) {
    if (!fs.existsSync(dir)) return;

    // Safety check to avoid scanning massive directories if logic fails
    if (dir.includes('node_modules') || dir.includes('.next') || dir.includes('out') || dir.includes('.git')) return;

    let files;
    try {
        files = fs.readdirSync(dir);
    } catch (e) {
        return;
    }

    for (const file of files) {
        const filePath = path.join(dir, file);
        let stat;
        try {
            stat = fs.statSync(filePath);
        } catch (e) { continue; }

        if (stat.isDirectory()) {
            if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'out') continue;
            scanDir(filePath);
        } else {
            // Check all text-ish files or just try to read everything
            // Skip known binary extensions to avoid noise/errors
            if (/\.(png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|pdf|mp4|webm)$/i.test(file)) continue;

            try {
                const content = fs.readFileSync(filePath, 'utf8');
                for (const pattern of searchPatterns) {
                    if (content.toLowerCase().includes(pattern.toLowerCase())) {
                        console.log(`MATCH [${pattern}] in: ${filePath}`);
                        const lines = content.split('\n');
                        lines.forEach((line, idx) => {
                            if (line.toLowerCase().includes(pattern.toLowerCase())) {
                                console.log(`  Line ${idx + 1}: ${line.trim().substring(0, 200)}`);
                            }
                        });
                    }
                }
            } catch (err) {
                // Ignore read errors (e.g. binary files treated as text)
            }
        }
    }
}

console.log('Starting Aggressive search in:', rootDir);
scanDir(rootDir);
console.log('Search complete.');
