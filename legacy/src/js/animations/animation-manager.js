/**
 * BUDE Animation Manager
 * Handles switching between animation modes
 */

function switchAnimationMode(mode) {
    if (ANIMATION_CONFIG.isTransitioning) return;
    if (!ANIMATION_CONFIG.animationEnabled) return;
    
    ANIMATION_CONFIG.isTransitioning = true;
    ANIMATION_CONFIG.currentMode = mode;
    
    const container = document.getElementById('animated-background');
    const modeSelect = document.getElementById('animation-mode-select');
    
    if (modeSelect) {
        modeSelect.value = mode;
    }
    
    if (container) {
        container.style.opacity = '0';
    }
    
    stopAllAnimations();
    
    setTimeout(() => {
        if (container) {
            container.innerHTML = '';
        }
        
        const canvas = animationInstances.canvas;
        if (canvas && animationInstances.ctx) {
            const w = canvas.width / window.devicePixelRatio;
            const h = canvas.height / window.devicePixelRatio;
            animationInstances.ctx.clearRect(0, 0, w, h);
        }
        
        switch(mode) {
            case ANIMATION_CONFIG.modes.FLOATING_SHAPES:
                createFloatingShapes();
                break;
            case ANIMATION_CONFIG.modes.GRADIENT_BLOBS:
                createGradientBlobs();
                break;
            case ANIMATION_CONFIG.modes.NEON_WAVES:
                createNeonWaves();
                break;
            case ANIMATION_CONFIG.modes.ANIMATED_GRID:
                createAnimatedGrid();
                break;
            case ANIMATION_CONFIG.modes.PARTICLE_FIELD:
                createParticleField();
                break;
            case ANIMATION_CONFIG.modes.PULSE_RINGS:
                createPulseRings();
                break;
            case ANIMATION_CONFIG.modes.PARALLAX_LAYERS:
                createParallaxLayers();
                break;
            case ANIMATION_CONFIG.modes.COSMIC_DUST:
                createCosmicDust();
                break;
        }
        
        if (container) {
            container.style.opacity = '1';
        }
        
        ANIMATION_CONFIG.isTransitioning = false;
    }, 500);
}
