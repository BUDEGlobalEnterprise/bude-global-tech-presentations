// Configuration for available presentations
        const PRESENTATIONS_CONFIG = [
            {
                file: 'presentations/intro-python.json',
                title: 'Introduction to Python',
                description: 'Complete Python guide from basics to advanced topics, OOP, and libraries',
                keywords: ['python', 'programming', 'code', 'django', 'flask', 'data science']
            },
            {
                file: 'presentations/intro-keycloak.json',
                title: 'Introduction to Keycloak',
                description: 'Learn about Keycloak, an open source identity and access management solution',
                keywords: ['keycloak', 'iam', 'identity', 'access management', 'sso', 'oauth2', 'oidc']
            },
            {
                file: 'presentations/intro-metabase.json',
                title: 'Introduction to Metabase',
                description: 'Discover Metabase, an open source business intelligence and data visualization tool',
                keywords: ['metabase', 'bi', 'business intelligence', 'data visualization', 'analytics', 'dashboards']
            }
            // Add more presentations here as you create them
        ];

        let availablePresentations = [];
        let currentPresentation = null;

        // Initialize app
        async function init() {
            await discoverPresentations();
            setupEventListeners();
            displaySuggestions(availablePresentations);
        }

        // Discover and validate available presentations
        async function discoverPresentations() {
            const container = document.getElementById('suggestions-container');
            container.innerHTML = '<div class="loading">🔍 Discovering presentations...</div>';

            availablePresentations = [];

            for (const config of PRESENTATIONS_CONFIG) {
                try {
                    const response = await fetch(config.file);
                    if (!response.ok) continue;

                    const data = await response.json();

                    // Validate JSON structure
                    if (validatePresentationFormat(data)) {
                        availablePresentations.push({
                            ...config,
                            data: data,
                            valid: true
                        });
                    }
                } catch (error) {
                    console.warn(`Failed to load ${config.file}:`, error);
                }
            }

            if (availablePresentations.length === 0) {
                container.innerHTML = '<div class="error-message">⚠️ No valid presentations found</div>';
            }
        }

        // Validate presentation JSON format
        function validatePresentationFormat(data) {
            return data &&
                data.presentation &&
                data.presentation.topics &&
                Array.isArray(data.presentation.topics) &&
                data.presentation.topics.length > 0 &&
                data.presentation.topics[0].slides &&
                Array.isArray(data.presentation.topics[0].slides);
        }

        // Setup event listeners
        function setupEventListeners() {
            const searchInput = document.getElementById('topic-search');
            searchInput.addEventListener('input', handleSearch);
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const firstItem = document.querySelector('.suggestion-item');
                    if (firstItem) firstItem.click();
                }
            });
        }

        // Handle search input
        function handleSearch(e) {
            const query = e.target.value.toLowerCase().trim();

            if (query === '') {
                displaySuggestions(availablePresentations);
                return;
            }

            const filtered = availablePresentations.filter(pres => {
                return pres.title.toLowerCase().includes(query) ||
                    pres.description.toLowerCase().includes(query) ||
                    pres.keywords.some(kw => kw.includes(query));
            });

            displaySuggestions(filtered);
        }

        // Display suggestions
        function displaySuggestions(presentations) {
            const container = document.getElementById('suggestions-container');

            if (presentations.length === 0) {
                container.innerHTML = '<div class="error-message">🔍 No presentations found</div>';
                return;
            }

            const suggestionsHTML = `
                <div class="suggestions">
                    ${presentations.map(pres => `
                        <div class="suggestion-item" data-file="${pres.file}">
                            <div class="title">📚 ${pres.title}</div>
                            <div class="description">${pres.description}</div>
                        </div>
                    `).join('')}
                </div>
            `;

            container.innerHTML = suggestionsHTML;

            // Add click handlers
            document.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const file = item.getAttribute('data-file');
                    const presentation = presentations.find(p => p.file === file);
                    loadPresentation(presentation);
                });
            });
        }

        // Load selected presentation
        async function loadPresentation(presentation) {
            try {
                // Hide selector
                document.getElementById('presentation-selector').classList.add('hidden');

                // Load slides
                currentPresentation = presentation;
                await renderSlides(presentation.data);

                // Update page title
                document.title = `${presentation.title} | Bude Global`;

            } catch (error) {
                console.error('Error loading presentation:', error);
                alert('Failed to load presentation. Please try again.');
                document.getElementById('presentation-selector').classList.remove('hidden');
            }
        }

        // Start the app
        document.addEventListener('DOMContentLoaded', init);