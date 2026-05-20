/**
 * BUDE Animation - Floating Shapes
 * Creates floating geometric shapes in the background
 */

function createFloatingShapes() {
    const container = document.getElementById('animated-background');
    if (!container) return;
    
    const quality = ANIMATION_CONFIG.quality[ANIMATION_CONFIG.currentQuality];
    const shapes = ['circle', 'square', 'triangle', 'hexagon'];
    const colors = ANIMATION_CONFIG.colors.primary;
    
    const numShapes = Math.min(quality.shapes, 15);
    
    for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        const type = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 60 + 40;
        const duration = Math.random() * 15 + 10;
        
        shape.className = `floating-shape ${type}`;
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            opacity: ${0.12 + Math.random() * 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-shape-${i} ${duration}s ease-in-out infinite;
            will-change: transform;
            transform: translateZ(0);
        `;
        
        if (type === 'circle') {
            shape.style.borderRadius = '50%';
        } else if (type === 'triangle') {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.background = 'transparent';
            shape.style.borderLeft = `${size/2}px solid transparent`;
            shape.style.borderRight = `${size/2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid ${color}`;
        } else if (type === 'hexagon') {
            shape.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)';
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-shape-${i} {
                0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
                25% { transform: translate3d(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px, 0) rotate(90deg); }
                50% { transform: translate3d(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px, 0) rotate(180deg); }
                75% { transform: translate3d(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px, 0) rotate(270deg); }
            }
        `;
        document.head.appendChild(style);
        
        container.appendChild(shape);
        animationInstances.shapes.push(shape);
    }
}
