/**
 * BUDE Animation - Parallax Layers
 * Creates multi-layer parallax effect
 */

function createParallaxLayers() {
    const container = document.getElementById('animated-background');
    if (!container) return;
    
    const layers = [
        { depth: 1, speed: 0.15, opacity: 0.12, blur: 0 },
        { depth: 2, speed: 0.3, opacity: 0.1, blur: 2 },
        { depth: 3, speed: 0.5, opacity: 0.08, blur: 3 }
    ];
    
    layers.forEach((layer, index) => {
        const layerDiv = document.createElement('div');
        layerDiv.className = `parallax-layer layer-${index}`;
        layerDiv.style.cssText = `
            position: absolute;
            inset: -20%;
            opacity: ${layer.opacity};
            filter: blur(${layer.blur}px);
            will-change: transform;
            transform: translateZ(0);
        `;
        
        for (let i = 0; i < 6; i++) {
            const shape = document.createElement('div');
            const size = Math.random() * 80 + 50;
            shape.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${ANIMATION_CONFIG.colors.primary[i % 5]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            layerDiv.appendChild(shape);
        }
        
        container.appendChild(layerDiv);
        
        let scrollY = 0;
        function animate() {
            if (ANIMATION_CONFIG.currentMode !== ANIMATION_CONFIG.modes.PARALLAX_LAYERS) return;
            scrollY += layer.speed * 0.3;
            layerDiv.style.transform = `translate3d(0, ${scrollY % 100}px, 0)`;
            requestAnimationFrame(animate);
        }
        animate();
    });
}
