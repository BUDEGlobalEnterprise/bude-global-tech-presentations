/**
 * Dynamic Presentation Loader - Pure Category-Based System with Infinite Scroll
 * No keyword detection, purely driven by presentation metadata
 */

let allPresentations = [];
let categorizedPresentations = {};
let categoryMetadata = {};

// Pagination state
let currentPage = 0;
let itemsPerPage = 12; // Load 12 presentations at a time
let isLoading = false;
let hasMoreContent = true;
let scrollObserver = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    showSkeletonLoaders(); // Show skeletons immediately
    await loadPresentations();
    setupEventListeners();
    setupInfiniteScroll();
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
 * Show skeleton loaders while presentations are loading
 */
function showSkeletonLoaders() {
    const container = document.getElementById('categories-container');
    let html = '<div class="presentations-grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; padding: 1rem;">';
    
    // Show 12 skeleton cards
    for (let i = 0; i < 12; i++) {
        html += `
            <div class="skeleton-card">
                <div class="skeleton-header">
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-badge"></div>
                </div>
                <div class="skeleton-title"></div>
                <div class="skeleton-description"></div>
                <div class="skeleton-description"></div>
                <div class="skeleton-tags">
                    <div class="skeleton-tag"></div>
                    <div class="skeleton-tag"></div>
                    <div class="skeleton-tag"></div>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
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
 * Render categories and presentations with pagination support
 * @param {number} page - Current page number (0-indexed)
 * @param {number} limit - Number of presentations to show
 * @param {boolean} append - Whether to append to existing content or replace
 */
function renderCategories(page = 0, limit = itemsPerPage, append = false) {
    const container = document.getElementById('categories-container');
    
    // Flatten all presentations across categories
    let flatPresentations = [];
    Object.entries(categorizedPresentations).forEach(([categoryId, presentations]) => {
        presentations.forEach(pres => {
            if (!flatPresentations.find(p => p.file === pres.file)) {
                flatPresentations.push({ ...pres, categoryId });
            }
        });
    });
    
    // Sort by difficulty
    const difficultyOrder = { 'beginner': 0, 'intermediate': 1, 'advanced': 2 };
    flatPresentations.sort((a, b) => {
        const aDiff = difficultyOrder[a.difficulty] ?? 999;
        const bDiff = difficultyOrder[b.difficulty] ?? 999;
        return aDiff - bDiff;
    });
    
    // Calculate pagination
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    const paginatedPresentations = flatPresentations.slice(startIndex, endIndex);
    
    // Check if there's more content
    hasMoreContent = endIndex < flatPresentations.length;
    
    // Update UI indicators
    const scrollLoader = document.getElementById('scroll-loader');
    const endMessage = document.getElementById('end-message');
    
    if (hasMoreContent) {
        scrollLoader.classList.remove('hidden');
        endMessage.classList.add('hidden');
    } else {
        scrollLoader.classList.add('hidden');
        endMessage.classList.remove('hidden');
    }
    
    if (paginatedPresentations.length === 0) {
        if (!append) {
            container.innerHTML = '<div class="no-results">No presentations available</div>';
        }
        return;
    }
    
    // Group presentations by category for display
    const categorizedBatch = {};
    paginatedPresentations.forEach(pres => {
        const catId = pres.categoryId;
        if (!categorizedBatch[catId]) {
            categorizedBatch[catId] = [];
        }
        categorizedBatch[catId].push(pres);
    });
    
    let html = '';
    
    Object.entries(categorizedBatch).forEach(([categoryId, presentations]) => {
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
    
    if (append) {
        container.insertAdjacentHTML('beforeend', html);
    } else {
        container.innerHTML = html;
    }
}

/**
 * Create HTML for a single presentation card
 */
function createPresentationCard(presentation) {
    const keywordsToShow = presentation.keywords ? presentation.keywords.slice(0, 3) : [];
    
    // Difficulty badge styling
    const difficultyBadges = {
        'beginner': '<span class="difficulty-badge beginner">🟢 Beginner</span>',
        'intermediate': '<span class="difficulty-badge intermediate">🟡 Intermediate</span>',
        'advanced': '<span class="difficulty-badge advanced">🔴 Advanced</span>'
    };
    
    const difficultyBadge = difficultyBadges[presentation.difficulty] || '';

    return `
        <div class="presentation-card" onclick="loadPresentation('${presentation.file}')">
            <div class="card-header">
                <div class="icon">📚</div>
                ${difficultyBadge}
            </div>
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
 * Setup infinite scroll using Intersection Observer
 */
function setupInfiniteScroll() {
    const scrollLoader = document.getElementById('scroll-loader');
    
    if (!scrollLoader) return;
    
    // Create intersection observer
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When scroll loader becomes visible and we're not already loading
            if (entry.isIntersecting && !isLoading && hasMoreContent) {
                loadMorePresentations();
            }
        });
    }, {
        root: null, // viewport
        rootMargin: '100px', // Trigger 100px before reaching the loader
        threshold: 0.1
    });
    
    // Start observing the scroll loader
    scrollObserver.observe(scrollLoader);
}

/**
 * Load more presentations (next page)
 */
async function loadMorePresentations() {
    if (isLoading || !hasMoreContent) return;
    
    isLoading = true;
    currentPage++;
    
    // Show loading indicator
    const scrollLoader = document.getElementById('scroll-loader');
    scrollLoader.classList.remove('hidden');
    
    // Render next batch immediately for instant response
    renderCategories(currentPage, itemsPerPage, true);
    
    isLoading = false;
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
    const scrollLoader = document.getElementById('scroll-loader');
    const endMessage = document.getElementById('end-message');

    if (!lowerQuery) {
        // Restore original categorization with pagination
        currentPage = 0;
        hasMoreContent = true;
        renderCategories(0, itemsPerPage, false);
        
        // Re-enable infinite scroll
        if (scrollObserver && scrollLoader) {
            scrollObserver.observe(scrollLoader);
        }
        return;
    }

    // Disable infinite scroll during search
    if (scrollObserver && scrollLoader) {
        scrollObserver.unobserve(scrollLoader);
    }
    
    // Hide scroll indicators during search
    scrollLoader.classList.add('hidden');
    endMessage.classList.add('hidden');

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

    // Render filtered categories (show all results, no pagination during search)
    const container = document.getElementById('categories-container');
    let html = '';

    Object.entries(filteredCategories)
        .sort((a, b) => b[1].length - a[1].length)
        .forEach(([categoryId, presentations]) => {
            const category = categoryMetadata[categoryId];
            
            // Sort presentations by difficulty: beginner → intermediate → advanced
            const difficultyOrder = { 'beginner': 0, 'intermediate': 1, 'advanced': 2 };
            const sortedPresentations = presentations.sort((a, b) => {
                const aDiff = difficultyOrder[a.difficulty] ?? 999;
                const bDiff = difficultyOrder[b.difficulty] ?? 999;
                return aDiff - bDiff;
            });
            
            const count = sortedPresentations.length;

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
                        ${sortedPresentations.map(pres => createPresentationCard(pres)).join('')}
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

    // Track presentation view for analytics
    if (typeof trackPresentationView === 'function') {
        trackPresentationView(file);
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
        
        // Show user-friendly error message
        const slidesContainer = document.querySelector('.slides');
        if (slidesContainer) {
            slidesContainer.innerHTML = `
                <section class="center" style="text-align: center; padding: 2rem;">
                    <h2 style="color: #e94560; margin-bottom: 1rem;">⚠️ Error Loading Presentation</h2>
                    <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">
                        We couldn't load this presentation. Please try again later.
                    </p>
                    <button onclick="returnToHomepage()" 
                            style="margin-top: 2rem; padding: 1rem 2rem; font-size: 1.1rem; cursor: pointer; 
                                   border-radius: 8px; background: linear-gradient(135deg, #6f42c1, #cb6ce6); 
                                   color: white; border: none; box-shadow: 0 4px 15px rgba(111, 66, 193, 0.4);
                                   transition: transform 0.2s;">
                        ← Back to Home
                    </button>
                </section>
            `;
        }
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