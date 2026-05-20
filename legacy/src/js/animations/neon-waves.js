/**
 * BUDE Animation - Neon Waves
 * Creates animated neon wave patterns
 */

function createNeonWaves() {
    const canvas = animationInstances.canvas;
    const ctx = animationInstances.ctx;
    if (!canvas || !ctx) return;
    
    const colors = ANIMATION_CONFIG.colors.neon;
    const waves = [];
    
    for (let i = 0; i < 5; i++) {
        waves.push({
            y: (canvas.height / window.devicePixelRatio) * (i / 5),
            amplitude: 25 + Math.random() * 35,
            frequency: 0.008 + Math.random() * 0.012,
            phase: Math.random() * Math.PI * 2,
            color: colors[i % colors.length],
            alpha: 0.2
        });
    }
    
    animationInstances.waves = waves;
    
    let animating = true;
    
    function animateWaves() {
        if (!animating || ANIMATION_CONFIG.currentMode !== ANIMATION_CONFIG.modes.NEON_WAVES) return;
        
        const w = canvas.width / window.devicePixelRatio;
        const h = canvas.height / window.devicePixelRatio;
        
        ctx.clearRect(0, 0, w, h);
        
        waves.forEach(wave => {
            ctx.beginPath();
            ctx.strokeStyle = wave.color;
            ctx.globalAlpha = wave.alpha;
            ctx.lineWidth = 2.5;
            
            for (let x = 0; x < w; x += 4) {
                const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
            wave.phase += 0.02;
        });
        
        ctx.globalAlpha = 1;
        animationInstances.animationFrameId = requestAnimationFrame(animateWaves);
    }
    
    animateWaves();
}
