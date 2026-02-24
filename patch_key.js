const fs = require('fs');

const filesToUpdate = [
    'c:/Users/coook/Desktop/Opencore Web7.0/v3/config.php',
    'c:/Users/coook/Desktop/Opencore Web7.0/v4/config.php',
    'c:/Users/coook/Desktop/Opencore Web7.0/v5/config.php'
];

const newKey = "AIzaSyCvxngXbJUPyWbUnepX31kjhwbwqvwfs-M";

filesToUpdate.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/define\('GEMINI_API_KEY',\s*'[^']+'\);/, `define('GEMINI_API_KEY', '${newKey}');`);
        fs.writeFileSync(file, content, 'utf8');
        console.log("Updated: " + file);
    } catch (e) {
        console.error("Error updating " + file, e);
    }
});
