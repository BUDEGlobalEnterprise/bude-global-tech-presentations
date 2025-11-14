/**
 * Dynamic Presentation Loader - Pure Category-Based System
 * No keyword detection, purely driven by presentation metadata
 */

let allPresentations = [];
let categorizedPresentations = {};
let categoryMetadata = {};

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadPresentations();
    setupEventListeners();
});

/**
 * Load all presentations from PRESENTATIONS_CONFIG
 */
async function loadPresentations() {
    const container = document.getElementById('categories-container');

    // Clear any previous data
    allPresentations.length = 0;

    try {
        // Only store configs (no JSON fetch)
        for (const config of PRESENTATIONS_CONFIG) {
            allPresentations.push({
                ...config,
                valid: true,
                data: null, // Data will be fetched later on demand
            });
        }

       // console.log(PRESENTATIONS_CONFIG);

        if (allPresentations.length === 0) {
            container.innerHTML = '<div class="no-results">⚠️ No presentations found</div>';
            return;
        }

        categorizePresentations();
        updateStats();
        renderCategories();

    } catch (error) {
        console.error("Error loading presentations:", error);
        container.innerHTML = '<div class="no-results">⚠️ Failed to load presentations</div>';
    }
}

/**
 * Categorize presentations based on their category metadata
 * Dynamically creates categories from presentation data
 */
function categorizePresentations() {
    categorizedPresentations = {};
    categoryMetadata = {};

    allPresentations.forEach(presentation => {
        // Get categories from presentation config
        const categories = presentation.category || ['uncategorized'];
       // console.log('Categories in:', presentation);
        categories.forEach(categoryId => {
            const normalizedId = categoryId.toLowerCase().trim();

            // Initialize category if it doesn't exist
            if (!categorizedPresentations[normalizedId]) {
                categorizedPresentations[normalizedId] = [];

                // Create metadata dynamically from category ID
                categoryMetadata[normalizedId] = createCategoryMetadata(normalizedId);
            }

            // Add presentation to category (avoid duplicates)
            if (!categorizedPresentations[normalizedId].includes(presentation)) {
                categorizedPresentations[normalizedId].push(presentation);
            }
        });
    });

  //  console.log('Categories created:', Object.keys(categorizedPresentations));
}

/**
 * Dynamically create category metadata from category ID
 * @param {String} categoryId - Category identifier
 * @returns {Object} Category metadata
 */
function createCategoryMetadata(categoryId) {
    // Define metadata mapping for known categories
    const categoryDefinitions = {
        'programming': {
            name: 'Programming Languages',
            icon: '🔵',
            description: 'Modern programming languages and paradigms'
        },
        'backend': {
            name: 'Backend Frameworks',
            icon: '🟣',
            description: 'Server-side frameworks and APIs'
        },
        'frontend': {
            name: 'Frontend Frameworks',
            icon: '🎨',
            description: 'UI frameworks and libraries'
        },
        'database': {
            name: 'Databases & Storage',
            icon: '🔴',
            description: 'Data storage and management systems'
        },
        'devops': {
            name: 'DevOps & Cloud',
            icon: '🟠',
            description: 'Infrastructure, deployment, and orchestration'
        },
        'security': {
            name: 'Security & Auth',
            icon: '🟡',
            description: 'Security protocols and authentication'
        },
        'ai-data': {
            name: 'AI & Automation',
            icon: '🟢',
            description: 'Artificial intelligence and data processing'
        },
        'tools': {
            name: 'Tools & Productivity',
            icon: '🟤',
            description: 'Development tools and productivity software'
        },
        'business': {
            name: 'Business Applications',
            icon: '🟣',
            description: 'Enterprise and business management systems'
        },
        'uncategorized': {
            name: 'Other Topics',
            icon: '📚',
            description: 'Miscellaneous technical topics'
        }
    };

    // Return predefined metadata or generate from ID
    if (categoryDefinitions[categoryId]) {
        return {
            id: categoryId,
            ...categoryDefinitions[categoryId]
        };
    }

    // Auto-generate metadata for unknown categories
    return {
        id: categoryId,
        name: categoryId.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        icon: '📦',
        description: `${categoryId} related topics`
    };
}

/**
 * Update statistics display
 */
function updateStats() {
    const totalPresentations = allPresentations.length;
    const totalCategories = Object.keys(categorizedPresentations).length;
    const activeCategories = Object.values(categorizedPresentations)
        .filter(arr => arr.length > 0).length;

    document.getElementById('total-presentations').textContent = totalPresentations;
    document.getElementById('total-categories').textContent = totalCategories;
    document.getElementById('active-categories').textContent = activeCategories;
}

/**
 * Render all categories and presentations
 */
function renderCategories() {
    const container = document.getElementById('categories-container');
    let html = '';

    // Sort categories by presentation count (descending)
    const sortedCategories = Object.entries(categorizedPresentations);
       // .sort((a, b) => b[1].length - a[1].length);

    sortedCategories.forEach(([categoryId, presentations]) => {
        const category = categoryMetadata[categoryId];
        const count = presentations.length;

        if (count === 0) return;

        html += `
            <div class="category-section" data-category="${categoryId}">
                <div class="category-header" onclick="toggleCategory('${categoryId}')">
                    <div class="category-title">
                        <span class="category-icon">${category.icon}</span>
                        <div class="category-info">
                            <h2>${category.name}</h2>
                            <p>${category.description}</p>
                        </div>
                        <span class="category-badge">${count} ${count === 1 ? 'presentation' : 'presentations'}</span>
                    </div>
                    <div class="category-controls">
                        <span class="collapse-toggle">▼</span>
                    </div>
                </div>
                <div class="presentations-grid">
                    ${presentations.map(pres => createPresentationCard(pres)).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html || '<div class="no-results">No presentations available</div>';
}

/**
 * Create HTML for a single presentation card
 */
function createPresentationCard(presentation) {
    const keywordsToShow = presentation.keywords ? presentation.keywords.slice(0, 3) : [];

    return `
        <div class="presentation-card" onclick="loadPresentation('${presentation.file}')">
            <div class="icon">📚</div>
            <div class="title">${presentation.title}</div>
            <div class="description">${presentation.description}</div>
            ${keywordsToShow.length > 0 ? `
                <div class="keywords">
                    ${keywordsToShow.map(kw =>
        `<span class="keyword-tag">${kw}</span>`
    ).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Toggle category collapse state
 */
function toggleCategory(categoryId) {
    const section = document.querySelector(`[data-category="${categoryId}"]`);
    if (section) {
        section.classList.toggle('collapsed');
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    const searchInput = document.getElementById('topic-search');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterPresentations(e.target.value);
        }, 300);
    });

    // ESC key to return to homepage
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('presentation-mode')) {
            if (confirm('Return to homepage?')) {
                returnToHomepage();
            }
        }
    });
}

/**
 * Filter presentations based on search query
 */
function filterPresentations(query) {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
        // Restore original categorization
        renderCategories();
        return;
    }

    // Filter presentations
    const filtered = allPresentations.filter(pres => {
        const titleMatch = pres.title.toLowerCase().includes(lowerQuery);
        const descMatch = pres.description.toLowerCase().includes(lowerQuery);
        const keywordMatch = pres.keywords && pres.keywords.some(kw =>
            kw.toLowerCase().includes(lowerQuery)
        );
        return titleMatch || descMatch || keywordMatch;
    });

    if (filtered.length === 0) {
        document.getElementById('categories-container').innerHTML =
            `<div class="no-results">🔍 No presentations found for "${query}"</div>`;
        return;
    }

    // Re-categorize filtered presentations
    const filteredCategories = {};

    filtered.forEach(pres => {
        const categories = pres.category || ['uncategorized'];
        categories.forEach(catId => {
            const normalizedId = catId.toLowerCase().trim();
            if (!filteredCategories[normalizedId]) {
                filteredCategories[normalizedId] = [];
            }
            if (!filteredCategories[normalizedId].includes(pres)) {
                filteredCategories[normalizedId].push(pres);
            }
        });
    });

    // Render filtered categories
    const container = document.getElementById('categories-container');
    let html = '';

    Object.entries(filteredCategories)
        .sort((a, b) => b[1].length - a[1].length)
        .forEach(([categoryId, presentations]) => {
            const category = categoryMetadata[categoryId];
            const count = presentations.length;

            html += `
                <div class="category-section" data-category="${categoryId}">
                    <div class="category-header" onclick="toggleCategory('${categoryId}')">
                        <div class="category-title">
                            <span class="category-icon">${category.icon}</span>
                            <div class="category-info">
                                <h2>${category.name}</h2>
                                <p>${category.description}</p>
                            </div>
                            <span class="category-badge">${count} ${count === 1 ? 'result' : 'results'}</span>
                        </div>
                        <div class="category-controls">
                            <span class="collapse-toggle">▼</span>
                        </div>
                    </div>
                    <div class="presentations-grid">
                        ${presentations.map(pres => createPresentationCard(pres)).join('')}
                    </div>
                </div>
            `;
        });

    container.innerHTML = html;
}

/**
 * Validate presentation JSON format
 */
function validatePresentationFormat(data) {
    return data &&
        data.presentation &&
        data.presentation.topics &&
        Array.isArray(data.presentation.topics) &&
        data.presentation.topics.length > 0 &&
        data.presentation.topics[0].slides &&
        Array.isArray(data.presentation.topics[0].slides);
}

/**
 * Load and display a presentation
 */
async function loadPresentation(file) {
    const presentation = allPresentations.find(p => p.file === file);
    if (!presentation) {
        alert("Presentation not found.");
        return;
    }

    try {
        // Fetch JSON only now (on-demand)
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to fetch ${file}`);
        const data = await response.json();

        if (!validatePresentationFormat(data)) {
            throw new Error(`Invalid presentation format in ${file}`);
        }

        // Cache loaded data (optional)
        presentation.data = data;

        // Switch to presentation mode
        document.body.classList.add('presentation-mode');
        document.querySelector('.reveal').classList.add('active');

        // Render slides
        await renderSlides(data);

        // Update document title
        document.title = `${presentation.title} | Bude Global`;

    } catch (error) {
        console.error("Error loading presentation:", error);
        alert("Failed to load presentation. Please try again.");
        returnToHomepage();
    }
}

/**
 * Return to homepage from presentation
 */
function returnToHomepage() {
    document.body.classList.remove('presentation-mode');
    document.querySelector('.reveal').classList.remove('active');
    document.title = 'Bude Global Tech Presentations | Dynamic, Open-Source Knowledge Platform';
    location.reload();
}

// Export functions for global access
window.toggleCategory = toggleCategory;
window.loadPresentation = loadPresentation;