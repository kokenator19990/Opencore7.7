const fs = require('fs');

const targetFilePath = 'c:/Users/coook/Desktop/Opencore Web7.0/v4/index.html';
let content = fs.readFileSync(targetFilePath, 'utf8');

// The goal is to aggressively optimize CSS transitions that use "all"
// to instead explicitly target the changing properties, and inject will-change
// on heavily animated elements like the chatbot window and header.

let count = 0;

// Update exact "transition: all" to prevent browser layout thrashing
const replacements = [
    {
        regex: /transition:\s*all\s*\.3s/g,
        new: "transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
    },
    {
        regex: /transition:\s*all\s*\.4s/g,
        new: "transition: opacity 0.4s ease, transform 0.4s ease, background-color 0.4s ease, border-color 0.4s ease"
    },
    {
        regex: /transition:\s*all\s*\.5s/g,
        new: "transition: opacity 0.5s ease, transform 0.5s ease"
    }
];

replacements.forEach(r => {
    let originalLength = content.length;
    content = content.replace(r.regex, r.new);
    if (content.length !== originalLength) {
        count++;
    }
});

// Inject hardware acceleration into the core chatbot UI elements
// We will look for .oc-chat-window and add will-change
if (content.includes('.oc-chat-window {') && !content.includes('will-change: transform, opacity')) {
    content = content.replace(
        /\.oc-chat-window\s*\{/,
        ".oc-chat-window {\n      will-change: transform, opacity, bottom, right;\n      backface-visibility: hidden;\n      -webkit-font-smoothing: antialiased;"
    );
    count++;
}

// Optimization for chatbot trigger button
if (content.includes('.oc-chat-trigger {') && !content.includes('will-change: transform')) {
    content = content.replace(
        /\.oc-chat-trigger\s*\{/,
        ".oc-chat-trigger {\n      will-change: transform, box-shadow, background-color;\n      backface-visibility: hidden;"
    );
    count++;
}

// Mobile specific optimizations extending touch targets for the chatbot 
if (!content.includes('/* Mobile Touch Target Optimizations Phase 2 */')) {
    const mobileOverrides = `
    /* Mobile Touch Target Optimizations Phase 2 */
    @media (max-width: 480px) {
      .oc-chat-trigger { width: 56px; height: 56px; bottom: 15px; right: 15px; }
      .oc-chat-window { bottom: 0; right: 0; width: 100%; height: 100%; border-radius: 0; }
      .oc-mode-btn { min-height: 52px; } /* Increase touch target */
      .oc-qr { min-height: 48px; padding: 12px 14px; } /* Finger friendly */
      .oc-chat-send { width: 48px; height: 48px; }
      #ocChatInput { height: 48px; }
    }
    `;

    // Inject right before the closing style tag if we can find it
    content = content.replace(
        /<\/style>/,
        mobileOverrides + "\n  </style>"
    );
    count++;
}

console.log(`Applied ${count} major CSS optimizations to v4/index.html`);
fs.writeFileSync(targetFilePath, content, 'utf8');
