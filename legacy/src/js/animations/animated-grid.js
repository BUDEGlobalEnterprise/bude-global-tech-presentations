/**
 * BUDE Animation - Animated Grid
 * Creates an animated moving grid pattern
 */

function createAnimatedGrid() {
    const canvas = animationInstances.canvas;
    const ctx = animationInstances.ctx;
    if (!canvas || !ctx) return;
    
    const gridSize = ANIMATION_CONFIG.isMobile ? 50 : 35;
    const lineColor = '#0060a0';
    let offset = 0;
    let animating = true;
    
    function animateGrid() {
        if (!animating || ANIMATION_CONFIG.currentMode !== ANIMATION_CONFIG.modes.ANIMATED_GRID) return;
        
        const w = canvas.width / window.devicePixelRatio;
        const h = canvas.height / window.devicePixelRatio;
        
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.2;
        
        for (let x = offset % gridSize; x < w; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        
        for (let y = offset % gridSize; y < h; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
        
        ctx.fillStyle = '#6f42c1';
        ctx.globalAlpha = 0.4;
        for (let x = offset % gridSize; x < w; x += gridSize) {
            for (let y = offset % gridSize; y < h; y += gridSize) {
                if (Math.random() > 0.98) {
                    ctx.beginPath();
                    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        
        ctx.globalAlpha = 1;
        offset += 0.4;
        
        animationInstances.animationFrameId = requestAnimationFrame(animateGrid);
    }
    
    animateGrid();
}
