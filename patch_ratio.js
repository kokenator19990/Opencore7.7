const fs = require('fs');

['v3/js/chatbot.js', 'v4/js/chatbot.js'].forEach(file => {
    let content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, 'utf8');

    if (content.includes('<= norm.length * 1.35')) {
        content = content.replace('<= norm.length * 1.35', '<= norm.length * 2.2');
        fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, content, 'utf8');
        console.log("Updated length ratio in " + file);
    } else {
        console.log("No match or already updated in " + file);
    }
});
