/**
 * BUDE UI - Control Panel
 * Animation settings dropdown in header
 */

function createControlPanel() {
    const headerCenter = document.querySelector('.gh-center');
    if (!headerCenter) {
        return;
    }

    const panelContainer = document.createElement('div');
    panelContainer.className = 'gh-dropdown';

    panelContainer.innerHTML = `
        <button class="gh-dropbtn" aria-haspopup="true" aria-expanded="false">🎨 Animations ▾</button>
        <div class="gh-dropdown-content" id="animation-control-panel" role="menu" aria-hidden="true" style="display: none;">
             <div class="control-panel-content">
                <div class="control-group">
                    <label>Animation Mode:</label>
                    <select id="animation-mode-select">
                        <option value="floating-shapes">Floating Shapes</option>
                        <option value="gradient-blobs">Gradient Blobs</option>
                        <option value="neon-waves">Neon Waves</option>
                        <option value="animated-grid">Animated Grid</option>
                        <option value="particle-field">Particle Field</option>
                        <option value="pulse-rings">Pulse Rings</option>
                        <option value="parallax-layers">Parallax Layers</option>
                        <option value="cosmic-dust">Cosmic Dust</option>
                    </select>
                </div>
                
                <div class="control-group">
                    <label>Quality:</label>
                    <select id="quality-select">
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                </div>
                
                <div class="control-group">
                    <label>
                        <input type="checkbox" id="animation-toggle" checked>
                        Enable Animations
                    </label>
                </div>
                
                <div class="control-group">
                    <button id="refresh-animation" class="action-btn">🔄 Refresh</button>
                </div>
            </div>
        </div>
    `;
    
    headerCenter.appendChild(panelContainer);
    
    // Dropdown toggle logic
    const button = panelContainer.querySelector('.gh-dropbtn');
    const dropdownContent = panelContainer.querySelector('.gh-dropdown-content');

    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const isHidden = dropdownContent.style.display === 'none';
        
        document.querySelectorAll('.gh-dropdown-content').forEach(d => {
            if (d !== dropdownContent) {
                d.style.display = 'none';
                const otherButton = d.previousElementSibling;
                if (otherButton && otherButton.classList.contains('gh-dropbtn')) {
                    otherButton.setAttribute('aria-expanded', 'false');
                    d.setAttribute('aria-hidden', 'true');
                }
            }
        });

        dropdownContent.style.display = isHidden ? 'block' : 'none';
        button.setAttribute('aria-expanded', isHidden);
        dropdownContent.setAttribute('aria-hidden', !isHidden);
    });

    const controlContent = dropdownContent.querySelector('.control-panel-content');
    
    controlContent.querySelector('#animation-mode-select').addEventListener('change', (e) => {
        switchAnimationMode(e.target.value);
    });
    
    controlContent.querySelector('#quality-select').addEventListener('change', (e) => {
        ANIMATION_CONFIG.currentQuality = e.target.value;
        switchAnimationMode(ANIMATION_CONFIG.currentMode);
    });
    
    controlContent.querySelector('#animation-toggle').addEventListener('change', (e) => {
        ANIMATION_CONFIG.animationEnabled = e.target.checked;
        if (!e.target.checked) {
            stopAllAnimations();
        } else {
            switchAnimationMode(ANIMATION_CONFIG.currentMode);
        }
    });
    
    controlContent.querySelector('#refresh-animation').addEventListener('click', () => {
        switchAnimationMode(ANIMATION_CONFIG.currentMode);
    });

    window.addEventListener('click', (event) => {
        if (!panelContainer.contains(event.target)) {
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
                button.setAttribute('aria-expanded', 'false');
                dropdownContent.setAttribute('aria-hidden', 'true');
            }
        }
    });

    dropdownContent.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}
