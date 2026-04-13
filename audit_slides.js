const fs = require('fs');
const path = require('path');

const dir = 'presentations';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const results = [];

files.forEach(f => {
    try {
        const fullPath = path.join(dir, f);
        const content = fs.readFileSync(fullPath, 'utf8');
        const data = JSON.parse(content);
        
        if (!data || !data.presentation) return;
        
        const topics = data.presentation.topics || data.presentation.modules || [];
        let count = 0;
        topics.forEach(t => {
            if (t.slides && Array.isArray(t.slides)) {
                count += t.slides.length;
            }
        });
        
        results.push({ file: f, count: count });
    } catch (e) {
        // Skip invalid files
    }
});

results.sort((a, b) => a.count - b.count);

console.log('--- Presentations needing Upgrade (< 50 slides) ---');
results.filter(r => r.count < 50).forEach(r => {
    console.log(`${r.file}: ${r.count} slides`);
});

console.log('\n--- Already (>= 50 slides) ---');
results.filter(r => r.count >= 50).forEach(r => {
    console.log(`${r.file}: ${r.count} slides`);
});

