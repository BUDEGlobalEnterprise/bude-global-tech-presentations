/**
 * BUDE Animation - Cosmic Dust
 * Creates twinkling star field effect
 */

function createCosmicDust() {
    const canvas = animationInstances.canvas;
    const ctx = animationInstances.ctx;
    if (!canvas || !ctx) return;
    
    const quality = ANIMATION_CONFIG.quality[ANIMATION_CONFIG.currentQuality];
    const stars = [];
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;
    
    for (let i = 0; i < quality.particles * 1.5; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 1.5 + 0.5,
            twinkleSpeed: (Math.random() - 0.5) * 0.04,
            alpha: Math.random()
        });
    }
    
    let animating = true;
    
    function animateCosmic() {
        if (!animating || ANIMATION_CONFIG.currentMode !== ANIMATION_CONFIG.modes.COSMIC_DUST) return;
        
        const w = canvas.width / window.devicePixelRatio;
        const h = canvas.height / window.devicePixelRatio;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.fillRect(0, 0, w, h);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
            
            star.alpha += star.twinkleSpeed;
            if (star.alpha > 1) star.alpha = 1;
            if (star.alpha < 0) star.alpha = 0;
            if (star.alpha >= 1 || star.alpha <= 0) {
                star.twinkleSpeed *= -1;
            }
        });
        
        animationInstances.animationFrameId = requestAnimationFrame(animateCosmic);
    }
    
    animateCosmic();
}
