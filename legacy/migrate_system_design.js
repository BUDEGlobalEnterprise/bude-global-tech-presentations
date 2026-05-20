const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'presentations', 'intro-system-design.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const transformContent = (slide) => {
    const list = [];
    const addToList = (arr, mapper) => {
        if (arr && Array.isArray(arr)) {
            arr.forEach(item => list.push(mapper(item)));
        }
    };

    addToList(slide.pillars, p => `<strong>${p.pillar}</strong>: ${p.definition}`);
    addToList(slide.load_characteristics, lc => `<strong>${lc.pattern}</strong>: ${lc.read_write_ratio} (${lc.examples.join(', ')})`);
    addToList(slide.principles, p => `<strong>${p.principle}</strong>: ${p.description}`);
    addToList(slide.concepts, c => `<strong>${c.concept}</strong>: ${c.definition}`);
    addToList(slide.components, c => `<strong>${c.name}</strong>: ${c.role || c.mechanism || ''}`);
    addToList(slide.storage_layers, sl => `<strong>${sl.layer}</strong> (${sl.tech}): ${sl.focus}`);
    addToList(slide.flow, step => step);
    addToList(slide.strategies, s => `<strong>${s.strategy}</strong>: ${s.mechanism}`);
    addToList(slide.layers, l => `<strong>${l.layer}</strong>: ${l.function}`);
    addToList(slide.algorithms, a => `<strong>${a.algorithm}</strong>: ${a.mechanism}`);
    addToList(slide.challenges, c => `<strong>${c.challenge}</strong>: ${c.solution}`);
    addToList(slide.stages, s => `<strong>${s.stage}</strong>: ${Array.isArray(s.activities) ? s.activities.join(', ') : s.activities}`);
    
    // For single object structures
    if (slide.mechanism && typeof slide.mechanism === 'object' && !Array.isArray(slide.mechanism)) {
        Object.entries(slide.mechanism).forEach(([k, v]) => list.push(`<strong>${k}</strong>: ${v}`));
    }
    if (slide.solution && typeof slide.solution === 'object' && !Array.isArray(slide.solution)) {
        Object.entries(slide.solution).forEach(([k, v]) => list.push(`<strong>${k}</strong>: ${v}`));
    }
    if (slide.caching_layer && typeof slide.caching_layer === 'object' && !Array.isArray(slide.caching_layer)) {
        Object.entries(slide.caching_layer).forEach(([k, v]) => list.push(`<strong>${k}</strong>: ${v}`));
    }
    if (slide.database_choice && typeof slide.database_choice === 'object' && !Array.isArray(slide.database_choice)) {
        Object.entries(slide.database_choice).forEach(([k, v]) => list.push(`<strong>${k}</strong>: ${v}`));
    }

    return {
        type: 'content',
        title: slide.title,
        box: {
            title: 'Technical Details',
            list: list
        },
        note: slide.summary ? { text: slide.summary } : (slide.note ? slide.note : null)
    };
};

const topics = (data.presentation.topics || data.presentation.modules).map(topic => {
    const newTopic = {
        id: topic.id,
        title: topic.title,
        slides: []
    };

    topic.slides.forEach(slide => {
        if (['content', 'title', 'presenter', 'comparison', 'imageText', 'video', 'chart', 'diagram', 'qa', 'thank-you'].includes(slide.type)) {
            newTopic.slides.push(slide);
        } else if (slide.type === 'quiz' && slide.questions) {
            slide.questions.forEach(q => {
                newTopic.slides.push({
                    type: 'quiz',
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.options.indexOf(q.answer),
                    explanation: q.explanation
                });
            });
        } else if (slide.type === 'quiz' && slide.question) {
             newTopic.slides.push(slide);
        } else {
            newTopic.slides.push(transformContent(slide));
        }
    });

    return newTopic;
});

data.presentation.topics = topics;
if (data.presentation.modules) delete data.presentation.modules;

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('System Design presentation migrated successfully.');
