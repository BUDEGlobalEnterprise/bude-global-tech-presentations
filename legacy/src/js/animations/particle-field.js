/**
 * BUDE Animation - Particle Field
 * Creates connected floating particles
 */

function createParticleField() {
    const canvas = animationInstances.canvas;
    const ctx = animationInstances.ctx;
    if (!canvas || !ctx) return;
    
    const quality = ANIMATION_CONFIG.quality[ANIMATION_CONFIG.currentQuality];
    const particles = [];
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;
    
    for (let i = 0; i < quality.particles; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.6,
            speedY: (Math.random() - 0.5) * 0.6,
            color: ANIMATION_CONFIG.colors.primary[Math.floor(Math.random() * 5)]
        });
    }
    
    animationInstances.particles = particles;
    let animating = true;
    
    function animateParticles() {
        if (!animating || ANIMATION_CONFIG.currentMode !== ANIMATION_CONFIG.modes.PARTICLE_FIELD) return;
        
        const w = canvas.width / window.devicePixelRatio;
        const h = canvas.height / window.devicePixelRatio;
        
        ctx.clearRect(0, 0, w, h);
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.7;
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
        });
        
        ctx.globalAlpha = 0.15;
        ctx.strokeStyle = '#6f42c1';
        ctx.lineWidth = 0.8;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        ctx.globalAlpha = 1;
        animationInstances.animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}
