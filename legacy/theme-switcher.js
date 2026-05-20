// Theme Switcher
class ThemeSwitcher {
    constructor() {
        this.THEME_KEY = 'bude-theme-preference';
        this.LIGHT_THEME = 'light';
        this.DARK_THEME = 'dark';
        this.init();
    }

    init() {
        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const themeToUse = savedTheme || (prefersDark ? this.DARK_THEME : this.LIGHT_THEME);
        this.setTheme(themeToUse);
        
        // Listen to system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.THEME_KEY)) {
                this.setTheme(e.matches ? this.DARK_THEME : this.LIGHT_THEME);
            }
        });
        
        // Setup toggle button
        this.setupToggleButton();
    }

    setTheme(theme) {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        localStorage.setItem(this.THEME_KEY, theme);
        this.updateToggleButton(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || this.LIGHT_THEME;
        const newTheme = currentTheme === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;
        this.setTheme(newTheme);
    }

    setupToggleButton() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    updateToggleButton(theme) {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = theme === this.DARK_THEME ? 'ri-sun-line' : 'ri-moon-line';
            }
        }
    }
}

// Initialize theme switcher when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ThemeSwitcher());
} else {
    new ThemeSwitcher();
}
