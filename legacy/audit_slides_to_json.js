const fs = require('fs');
const path = require('path');

const dir = 'presentations';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const results = [];

files.forEach(f => {
    try {
        const fullPath = path.join(dir, f);
        const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        if (!data || !data.presentation) return;
        const topics = data.presentation.topics || data.presentation.modules || [];
        let count = 0;
        topics.forEach(t => { if (t.slides) count += t.slides.length; });
        results.push({ file: f, count: count });
    } catch (e) {}
});

fs.writeFileSync('audit_results.json', JSON.stringify(results, null, 2));
console.log('Audit complete. Results in audit_results.json');
