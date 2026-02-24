const fs = require('fs');
const c = fs.readFileSync('v4/index.html', 'utf8');
const logoMatch = c.match(/<a href=\"#inicio\".*?src=\"(data:image\/png;base64,[^\"]+)\"/);
if (logoMatch) {
    fs.writeFileSync('scripts/base64_logo.txt', logoMatch[1], 'utf8');
    console.log("Logo saved");
} else {
    console.log("Logo not found");
}
