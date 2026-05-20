/**
 * BUDE Animation - Gradient Blobs
 * Creates morphing gradient blobs in the background
 */

function createGradientBlobs() {
    const container = document.getElementById('animated-background');
    if (!container) return;
    
    const quality = ANIMATION_CONFIG.quality[ANIMATION_CONFIG.currentQuality];
    const colors = ANIMATION_CONFIG.colors.primary;
    const blobCount = Math.floor(quality.shapes * 0.5);
    
    for (let i = 0; i < blobCount; i++) {
        const blob = document.createElement('div');
        const size = Math.random() * 250 + 200;
        const color1 = colors[Math.floor(Math.random() * colors.length)];
        const color2 = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 12 + 15;
        
        blob.className = 'gradient-blob';
        blob.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 40%, ${color1}44, ${color2}22);
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            filter: blur(35px);
            opacity: 0.5;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: blob-morph-${i} ${duration}s ease-in-out infinite;
            will-change: transform, border-radius;
            transform: translateZ(0);
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blob-morph-${i} {
                0%, 100% {
                    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
                    transform: translate3d(0, 0, 0) rotate(0deg);
                }
                33% {
                    border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%;
                    transform: translate3d(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px, 0) rotate(120deg);
                }
                66% {
                    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
                    transform: translate3d(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px, 0) rotate(240deg);
                }
            }
        `;
        document.head.appendChild(style);
        
        container.appendChild(blob);
        animationInstances.blobs.push(blob);
    }
}
