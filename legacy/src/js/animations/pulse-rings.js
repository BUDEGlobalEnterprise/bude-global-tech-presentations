/**
 * BUDE Animation - Pulse Rings
 * Creates expanding ring pulses
 */

function createPulseRings() {
    const canvas = animationInstances.canvas;
    const ctx = animationInstances.ctx;
    if (!canvas || !ctx) return;
    
    const rings = [];
    let animating = true;
    
    function addRing() {
        const w = canvas.width / window.devicePixelRatio;
        const h = canvas.height / window.devicePixelRatio;
        
        rings.push({
            x: Math.random() * w,
            y: Math.random() * h,
            radius: 0,
            maxRadius: Math.random() * 150 + 100,
            speed: Math.random() * 1.5 + 1,
            color: ANIMATION_CONFIG.colors.primary[Math.floor(Math.random() * 5)],
            alpha: 0.6
        });
    }
    
    for (let i = 0; i < 4; i++) {
        setTimeout(() => addRing(), i * 800);
    }
    
    function animateRings() {
        if (!animating || ANIMATION_CONFIG.currentMode !== ANIMATION_CONFIG.modes.PULSE_RINGS) return;
        
        const w = canvas.width / window.devicePixelRatio;
        const h = canvas.height / window.devicePixelRatio;
        
        ctx.clearRect(0, 0, w, h);
        
        rings.forEach((ring, index) => {
            ctx.beginPath();
            ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
            ctx.strokeStyle = ring.color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = ring.alpha * (1 - ring.radius / ring.maxRadius);
            ctx.stroke();
            
            ring.radius += ring.speed;
            
            if (ring.radius > ring.maxRadius) {
                rings.splice(index, 1);
                addRing();
            }
        });
        
        ctx.globalAlpha = 1;
        animationInstances.animationFrameId = requestAnimationFrame(animateRings);
    }
    
    animateRings();
}
