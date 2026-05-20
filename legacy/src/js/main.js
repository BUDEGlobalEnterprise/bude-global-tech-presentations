/**
 * BUDE Presentation Engine - Main Entry Point
 * Loads all modules and initializes the application
 * 
 * Load order (via script tags in index.html):
 * 1. config.js - Global state
 * 2. utils/device.js - Device detection
 * 3. utils/canvas.js - Canvas utilities
 * 4. animations/*.js - All animation modules
 * 5. animations/animation-manager.js - Animation switcher
 * 6. ui/control-panel.js - UI controls
 * 7. main.js - This file (initialization)
 */

// ============================================================================
// INITIALIZATION
// ============================================================================

window.addEventListener('load', () => {
    // Small delay to let the page render first
    setTimeout(() => {
        createControlPanel();
        detectDeviceCapabilities();
        createAnimatedBackground();
        switchAnimationMode(ANIMATION_CONFIG.currentMode);
    }, 100);
});

// Page Visibility API - pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations to save battery
        if (animationInstances.animationFrameId) {
            cancelAnimationFrame(animationInstances.animationFrameId);
            animationInstances.animationFrameId = null;
        }
    } else {
        // Resume current animation mode
        if (ANIMATION_CONFIG.animationEnabled && ANIMATION_CONFIG.currentMode) {
            switchAnimationMode(ANIMATION_CONFIG.currentMode);
        }
    }
});

// Export API for external access
window.BUDEPresenter = {
    switchAnimation: switchAnimationMode,
    stopAllAnimations: stopAllAnimations,
    getConfig: () => ANIMATION_CONFIG,
    setQuality: (level) => {
        ANIMATION_CONFIG.currentQuality = level;
        switchAnimationMode(ANIMATION_CONFIG.currentMode);
    }
};

// Console info (only in debug mode)
if (DEBUG_MODE) {
    console.log('%c🚀 BUDE Presentation Engine v3.5 Loaded', 'color: #6f42c1; font-size: 16px; font-weight: bold;');
    console.log('%c📊 Animation Controls Available', 'color: #0060a0; font-size: 12px;');
    console.log('%c🎨 8 Animation Modes | 3 Quality Levels | Full Responsive Support', 'color: #0060a0; font-size: 12px;');
    console.log('%c💡 Use the control panel (top-right) or keyboard shortcuts (1-8)', 'color: #0060a0; font-size: 12px;');
    console.log('API: window.BUDEPresenter.switchAnimation("mode-name")');
}
