const fs = require('fs');
const content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/v4/index.html', 'utf8');
const match = content.match(/<a href="#inicio" class="logo".*?<img\s+src="([^"]+)".*?<\/a>/s);
if (match) {
    fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/v4/logo_base64.txt', match[1]);
    console.log('Extracted logo successfully.');
} else {
    console.log('Logo not found.');
}
