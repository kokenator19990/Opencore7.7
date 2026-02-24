const fs = require('fs');
const c = fs.readFileSync('v4/index.html', 'utf8');
const lines = c.split('\n');
let inLogo = false;
let logoSVG = '';

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('class="logo"')) {
        inLogo = true;
    }
    if (inLogo) {
        logoSVG += lines[i] + '\n';
        if (lines[i].includes('</a>')) {
            break;
        }
    }
}

console.log(logoSVG.trim());
