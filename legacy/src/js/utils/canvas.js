/**
 * BUDE Utils - Canvas Utilities
 * Canvas initialization and management
 */

function initializeAnimationCanvas() {
    let canvas = document.getElementById('animation-canvas');
    
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'animation-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        document.body.insertBefore(canvas, document.body.firstChild);
    }
    
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
    
    function resizeCanvas() {
        const dpr = Math.min(ANIMATION_CONFIG.pixelRatio, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(dpr, dpr);
    }
    
    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        if (ANIMATION_CONFIG.animationEnabled) {
            switchAnimationMode(ANIMATION_CONFIG.currentMode);
        }
    });
    
    animationInstances.canvas = canvas;
    animationInstances.ctx = ctx;
}

function createAnimatedBackground() {
    const existingBg = document.getElementById('animated-background');
    if (existingBg) existingBg.remove();
    
    const bgContainer = document.createElement('div');
    bgContainer.id = 'animated-background';
    bgContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    `;
    
    document.body.insertBefore(bgContainer, document.body.firstChild);
    initializeAnimationCanvas();
}

function stopAllAnimations() {
    if (animationInstances.animationFrameId) {
        cancelAnimationFrame(animationInstances.animationFrameId);
        animationInstances.animationFrameId = null;
    }
    
    animationInstances.intervalIds.forEach(id => clearInterval(id));
    animationInstances.intervalIds = [];
    
    if (animationInstances.ctx && animationInstances.canvas) {
        animationInstances.ctx.clearRect(0, 0, animationInstances.canvas.width, animationInstances.canvas.height);
    }
    
    const container = document.getElementById('animated-background');
    if (container) {
        container.innerHTML = '';
    }
    
    animationInstances.particles = [];
    animationInstances.shapes = [];
    animationInstances.blobs = [];
    animationInstances.waves = [];
}
