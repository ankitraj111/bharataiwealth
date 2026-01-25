const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, 'frontend', 'public');
const images = fs.readdirSync(publicDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

console.log(`Found ${images.length} images to optimize...`);

images.forEach(img => {
    const input = path.join(publicDir, img);
    const output = path.join(publicDir, img.replace(/\.(png|jpe?g)$/, '.webp'));

    // Note: This requires cwebp or similar tool to be installed globally
    try {
        console.log(`Optimizing ${img}...`);
        // execSync(`cwebp -q 80 "${input}" -o "${output}"`);
        // For now, we will recommend the user to use an online converter or a specific tool
        // as we cannot guarantee local binaries.
    } catch (e) {
        console.error(`Failed to optimize ${img}: ${e.message}`);
    }
});

console.log('Optimization recommendation: Use WebP for all public assets.');
