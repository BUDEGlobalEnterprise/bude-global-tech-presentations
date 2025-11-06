let availablePresentations = [];
let currentPresentation = null;
const INITIAL_LOAD_COUNT = 5; // <-- New: Number of presentations to load first

// Start the app
document.addEventListener("DOMContentLoaded", init);

// Initialize app
async function init() {
  // Setup listeners immediately so search bar is responsive
  setupEventListeners();
  // discoverPresentations will now handle its own display logic
  await discoverPresentations();
}

// --- MODIFIED FUNCTION ---
// Discover and validate available presentations (in two stages)
async function discoverPresentations() {
  const container = document.getElementById("suggestions-container");
  container.innerHTML =
    '<div class="loading">🔍 Discovering presentations...</div>';

  availablePresentations = [];

  // Assuming PRESENTATIONS_CONFIG is sorted newest first
  const initialConfigs = PRESENTATIONS_CONFIG.slice(0, INITIAL_LOAD_COUNT);
  const remainingConfigs = PRESENTATIONS_CONFIG.slice(INITIAL_LOAD_COUNT);

  // --- Helper function to fetch and validate a single config ---
  const fetchAndValidate = async (config) => {
    try {
      const response = await fetch(config.file);
      if (!response.ok) return null; // Fail quietly

      const data = await response.json();
      if (validatePresentationFormat(data)) {
        return {
          ...config,
          data: data,
          valid: true,
        };
      }
    } catch (error) {
      console.warn(`Failed to load ${config.file}:`, error);
    }
    return null; // Return null on any error
  };

  // --- Part 1: Load Initial 5 Presentations (in parallel) ---
  const initialPromises = initialConfigs.map(fetchAndValidate);
  const initialResults = await Promise.all(initialPromises);
  
  // Filter out any nulls (failed fetches/validations)
  availablePresentations = initialResults.filter((p) => p !== null);

  // --- Display Initial Results IMMEDIATELY ---
  // This will show the first 5, or "No presentations found" if all 5 failed.
  displaySuggestions(availablePresentations);

  // --- Part 2: Load Remaining in Background (also in parallel) ---
  const remainingPromises = remainingConfigs.map(fetchAndValidate);
  const remainingResults = await Promise.all(remainingPromises);

  const newlyLoaded = remainingResults.filter((p) => p !== null);

  if (newlyLoaded.length > 0) {
    // Add the new presentations to the main array
    availablePresentations.push(...newlyLoaded);

    // --- Intelligently Update UI ---
    const searchInput = document.getElementById("topic-search");
    const query = searchInput.value.toLowerCase().trim();

    if (query === "") {
      // If user isn't searching, just update the main list with all items
      displaySuggestions(availablePresentations);
    } else {
      // If user IS searching, re-run the search to include new results
      handleSearch({ target: searchInput });
    }
  }

  // --- Final Error Check ---
  // If, after ALL loading is done, we still have nothing, show the final error.
  if (availablePresentations.length === 0) {
    container.innerHTML =
      '<div class="error-message">⚠️ No valid presentations found</div>';
  }
}

// --- ORIGINAL FUNCTIONS (Unchanged) ---

// Validate presentation JSON format
function validatePresentationFormat(data) {
  return (
    data &&
    data.presentation &&
    data.presentation.topics &&
    Array.isArray(data.presentation.topics) &&
    data.presentation.topics.length > 0 &&
    data.presentation.topics[0].slides &&
    Array.isArray(data.presentation.topics[0].slides)
  );
}

// Setup event listeners
function setupEventListeners() {
  const searchInput = document.getElementById("topic-search");
  searchInput.addEventListener("input", handleSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const firstItem = document.querySelector(".suggestion-item");
      if (firstItem) firstItem.click();
    }
  });
}

// Handle search input
function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim();

  // Get the current full list of loaded presentations
  const allLoadedPresentations = availablePresentations;

  if (query === "") {
    displaySuggestions(allLoadedPresentations);
    return;
  }

  const filtered = allLoadedPresentations.filter((pres) => {
    return (
      pres.title.toLowerCase().includes(query) ||
      pres.description.toLowerCase().includes(query) ||
      pres.keywords.some((kw) => kw.includes(query))
    );
  });

  displaySuggestions(filtered);
}

// Display suggestions
function displaySuggestions(presentations) {
  const container = document.getElementById("suggestions-container");

  // This check is now important for the initial load
  if (presentations.length === 0) {
    // Don't show "No presentations found" if we are still loading in the background
    // Only show it if the discoverPresentations function sets the final error message
    // Or if it's a search result
    const isLoading = container.querySelector(".loading");
    if (!isLoading) {
      container.innerHTML =
        '<div class="error-message">🔍 No presentations found</div>';
    }
    return;
  }

  const suggestionsHTML = `
          <div class="suggestions">
            ${presentations
              .map(
                (pres) => `
                <div class="suggestion-item" data-file="${pres.file}">
                  <div class="title">📚 ${pres.title}</div>
                  <div class="description">${pres.description}</div>
                </div>
              `
              )
              .join("")}
          </div>
        `;

  container.innerHTML = suggestionsHTML;

  // Add click handlers
  document.querySelectorAll(".suggestion-item").forEach((item) => {
    item.addEventListener("click", () => {
      const file = item.getAttribute("data-file");
      // Find from the global list, as the 'presentations' arg might be filtered
      const presentation = availablePresentations.find((p) => p.file === file);
      if (presentation) {
        loadPresentation(presentation);
      }
    });
  });
}

// Load selected presentation
async function loadPresentation(presentation) {
  try {
    // Hide selector
    document.getElementById("presentation-selector").classList.add("hidden");

    // Load slides
    currentPresentation = presentation;
    await renderSlides(presentation.data); // Assuming renderSlides is defined elsewhere

    // Update page title
    document.title = `${presentation.title} | Bude Global`;
  } catch (error) {
    console.error("Error loading presentation:", error);
    alert("Failed to load presentation. Please try again.");
    document.getElementById("presentation-selector").classList.remove("hidden");
  }
}