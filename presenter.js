/**
 * Presenter.js - Enhanced with Animations and Visual Effects
 */

// Create animated background elements
function createAnimatedBackground() {
    // Remove existing background if any
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
    `;

    // Create multiple animated shapes
    const shapes = ['circle', 'square', 'triangle', 'hexagon'];
    const colors = ['#0060a0', '#6f42c1', '#cb6ce6', '#23a6d5', '#23d5ab'];

    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 80 + 40;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;

        shape.className = `bg-shape ${shapeType}`;
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            opacity: 0.1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-${i} ${duration}s ease-in-out ${delay}s infinite;
        `;

        // Add shape-specific styles
        if (shapeType === 'circle') {
            shape.style.borderRadius = '50%';
        } else if (shapeType === 'triangle') {
            shape.style.background = 'transparent';
            shape.style.borderLeft = `${size/2}px solid transparent`;
            shape.style.borderRight = `${size/2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid ${color}`;
            shape.style.width = '0';
            shape.style.height = '0';
        } else if (shapeType === 'hexagon') {
            shape.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)';
        }

        // Create unique animation keyframes
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes float-${i} {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(styleSheet);

        bgContainer.appendChild(shape);
    }

    document.body.insertBefore(bgContainer, document.body.firstChild);
}

function createFloatingShapes() {
    const colors = ['#0060a0', '#6f42c1', '#cb6ce6', '#23a6d5', '#23d5ab'];
    const shapes = ['circle', 'square', 'triangle'];
    const positions = [
        { top: '2%', left: '2%' },
        { top: '2%', right: '2%' },
        { bottom: '2%', left: '2%' },
        { bottom: '2%', right: '2%' },
        { top: '50%', left: '0%' },
        { top: '0%', left: '50%' },
        { bottom: '50%', right: '0%' },
        { bottom: '0%', right: '50%' }
    ];

    for (let i = 0; i < positions.length; i++) {
        const shape = document.createElement('div');
        const type = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 20 + 20;

        shape.classList.add('floating-shape');
        shape.style.background = type === 'triangle' ? 'transparent' : color;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        shape.style.opacity = 0.6 + Math.random() * 0.3;
        Object.assign(shape.style, positions[i]);

        // Shape customization
        if (type === 'circle') {
            shape.style.borderRadius = '50%';
        } else if (type === 'triangle') {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.borderLeft = `${size / 2}px solid transparent`;
            shape.style.borderRight = `${size / 2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid ${color}`;
        }

        document.body.appendChild(shape);

        // Randomized motion using JS loop
        const randomMove = () => {
            const dx = (Math.random() - 0.5) * 80;
            const dy = (Math.random() - 0.5) * 80;
            shape.animate([
                { transform: 'translate(0, 0) rotate(0deg)' },
                { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg)` }
            ], {
                duration: 6000 + Math.random() * 4000,
                direction: 'alternate',
                iterations: Infinity,
                easing: 'ease-in-out'
            });
        };
        randomMove();
    }
}

createFloatingShapes();

// Create ripple effect
function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(111, 66, 193, 0.4);
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(ripple);
    
    ripple.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(30)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    });
    
    setTimeout(() => ripple.remove(), 600);
}

// Add slide transition effects
function addSlideTransitions() {
    const styles = document.createElement('style');
    styles.textContent = `
        .reveal .slides section {
            transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .reveal .slides section.past {
            transform: scale(0.8) translateX(-100px);
            opacity: 0;
        }

        .reveal .slides section.future {
            transform: scale(0.8) translateX(100px);
            opacity: 0;
        }

        .reveal .slides section.present {
            transform: scale(1) translateX(0);
            opacity: 1;
            animation: slideIn 0.6s ease-out;
        }

        @keyframes slideIn {
            0% {
                transform: scale(0.9) translateY(30px);
                opacity: 0;
            }
            100% {
                transform: scale(1) translateY(0);
                opacity: 1;
            }
        }

        .reveal h1, .reveal h2, .reveal h3 {
            animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
            0% {
                transform: translateY(30px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .reveal .box {
            animation: scaleIn 0.5s ease-out 0.2s both;
        }

        @keyframes scaleIn {
            0% {
                transform: scale(0.95);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }

        .reveal li {
            animation: fadeInLeft 0.5s ease-out both;
        }

        .reveal li:nth-child(1) { animation-delay: 0.3s; }
        .reveal li:nth-child(2) { animation-delay: 0.4s; }
        .reveal li:nth-child(3) { animation-delay: 0.5s; }
        .reveal li:nth-child(4) { animation-delay: 0.6s; }
        .reveal li:nth-child(5) { animation-delay: 0.7s; }
        .reveal li:nth-child(6) { animation-delay: 0.8s; }
        .reveal li:nth-child(7) { animation-delay: 0.9s; }
        .reveal li:nth-child(8) { animation-delay: 1s; }

        @keyframes fadeInLeft {
            0% {
                transform: translateX(-20px);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .reveal .emoji {
            display: inline-block;
            animation: bounce 0.6s ease-out;
        }

        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }

        .reveal code {
            animation: codeAppear 0.8s ease-out 0.4s both;
        }

        @keyframes codeAppear {
            0% {
                transform: translateY(10px);
                opacity: 0;
                filter: blur(5px);
            }
            100% {
                transform: translateY(0);
                opacity: 1;
                filter: blur(0);
            }
        }

        /* Hover effects */
        .reveal .box:hover {
            transform: scale(1.02);
            box-shadow: 0 10px 30px rgba(111, 66, 193, 0.3);
            transition: all 0.3s ease;
        }

        /* Slide number animation */
        .reveal .slide-number {
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
        }
    `;
    document.head.appendChild(styles);
}

// Render slides with animations
async function renderSlides(data) {
    const slidesContainer = document.querySelector('.reveal .slides');
    slidesContainer.innerHTML = '';

    // Add animated background
    createAnimatedBackground();
    
    // Add transition styles
    addSlideTransitions();

    data.presentation.topics.forEach(topic => {
        topic.slides.forEach(slide => {
            const section = createSlide(slide);
            slidesContainer.appendChild(section);
        });
    });

    // Initialize Reveal.js
    Reveal.initialize({
        hash: true,
        slideNumber: true,
        transition: 'slide',
        backgroundTransition: 'fade',
        controls: true,
        progress: true,
        center: true,
        width: 1920,
        height: 1080,
        margin: 0.08,
        minScale: 0.3,
        maxScale: 3.0,
        overflow: 'scroll',
        pdfSeparateFragments: false,
        pdfMaxPagesPerSlide: 1,
        keyboard: {
            40: () => {
                const currentSlide = document.querySelector('.reveal .slides section.present');
                if (currentSlide && currentSlide.scrollHeight > currentSlide.clientHeight) {
                    const isAtBottom = currentSlide.scrollTop + currentSlide.clientHeight >= currentSlide.scrollHeight - 5;
                    if (!isAtBottom) {
                        currentSlide.scrollTop += 50;
                        return false;
                    }
                }
                Reveal.down();
            },
            38: () => {
                const currentSlide = document.querySelector('.reveal .slides section.present');
                if (currentSlide && currentSlide.scrollHeight > currentSlide.clientHeight) {
                    const isAtTop = currentSlide.scrollTop <= 5;
                    if (!isAtTop) {
                        currentSlide.scrollTop -= 50;
                        return false;
                    }
                }
                Reveal.up();
            },
            72: () => {
                if (confirm('Return to homepage?')) {
                    location.reload();
                }
            }
        }
    });

    // Add slide change effects
    Reveal.on('slidechanged', event => {
        // Hide watermark on center slides
        if (event.currentSlide.classList.contains('center')) {
            document.body.classList.add('hide-watermark');
        } else {
            document.body.classList.remove('hide-watermark');
        }

        // Create particle effect at center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        createParticleEffect(centerX, centerY);
        
        // Create ripple effect
        createRipple(centerX, centerY);

        // Animate shapes on slide change
        const shapes = document.querySelectorAll('.bg-shape');
        shapes.forEach(shape => {
            const currentTransform = shape.style.transform || '';
            shape.style.transition = 'transform 0.6s ease-out';
            shape.style.transform = currentTransform + ' scale(1.2)';
            setTimeout(() => {
                shape.style.transform = currentTransform;
            }, 600);
        });
    });

    // Initial watermark check
    const initialSlide = document.querySelector('.reveal .slides section.present');
    if (initialSlide && initialSlide.classList.contains('center')) {
        document.body.classList.add('hide-watermark');
    }
}

function createSlide(slideData) {
    const section = document.createElement('section');

    if (slideData.type === 'title') {
        section.classList.add('center', 'gradient-bg');
        section.innerHTML = `
            <center><img src="assets/images/budeglobal_logo.png" alt="BUDE Logo" class="bude-logo" style="animation: float 3s ease-in-out infinite;"></center>
            <h1 style="font-size: 3em; margin: 0.5em 0;">${slideData.title}</h1>
            <h3 style="color: var(--bude-primary); font-size: 1.4em; margin: 0.5em 0;">${slideData.subtitle}</h3>
        `;
    } else if (slideData.type === 'presenter') {
        section.classList.add('center', 'gradient-bg');
        section.innerHTML = `
        <div style="display: flex; align-items: center; gap: 3em; max-width: 900px;">
            <div style="flex-shrink: 0;">
                <div style="width: 250px; height: 250px; border-radius: 50%; background: linear-gradient(135deg, var(--bude-primary), var(--bude-purple)); display: flex; align-items: center; justify-content: center; color: white; font-size: 4em; font-weight: bold; border: 5px solid white; box-shadow: 0 4px 20px rgba(0,0,0,0.15); animation: float 3s ease-in-out infinite;">
                    AGP
                </div>
            </div>
            <div style="text-align: left;">
                <h2 style="margin: 0 0 0.5em 0; font-size: 2.5em;">${slideData.name}</h2>
                <div style="font-size: 1.1em; line-height: 1.8;">
                    <p style="margin: 0.5em 0;">
                        <span class="emoji">👔</span> ${slideData.title}
                    </p>
                    <p style="margin: 0.5em 0;">
                        <span class="emoji">💻</span> ${slideData.experience}
                    </p>
                    <p style="margin: 0.5em 0;">
                        <span class="emoji">🌟</span> ${slideData.oss_experience}
                    </p>
                    <p style="margin: 1em 0 0.3em 0;">
                        <span class="emoji">🔗</span> <a href="${slideData.github}" target="_blank" style="color: var(--bude-purple);">github.com/aravind-govindhasamy</a>
                    </p>
                    <p style="margin: 0.3em 0;">
                        <span class="emoji">🌐</span> <a href="${slideData.website}" target="_blank" style="color: var(--bude-purple);">aravind-govindhasamy.github.io</a>
                    </p>
                </div>
            </div>
        </div>
        `;
    } else if (slideData.type === 'topic-title') {
        section.classList.add('center');
        section.innerHTML = `
            <h2>${slideData.title}</h2>
            ${slideData.box ? createBox(slideData.box) : ''}
            ${slideData.note ? `<p class="small-text" style="margin-top: ${slideData.note.centered ? '2em; text-align: center' : '1.5em'};">${slideData.note.text}</p>` : ''}
        `;
    } else if (slideData.type === 'content') {
        const emoji = slideData.emoji ? `<span class="emoji">${slideData.emoji}</span> ` : '';
        section.innerHTML = `
            <h3>${emoji}${slideData.title}</h3>
            ${slideData.box ? createBox(slideData.box) : ''}
            ${slideData.list ? createList(slideData.list) : ''}
            ${slideData.note ? `<p class="small-text" style="margin-top: 1.5em;">${slideData.note.text}</p>` : ''}
        `;
    } else if (slideData.type === 'qa') {
        section.classList.add('center', 'gradient-bg');
        section.innerHTML = `
            <h1>${slideData.title}</h1>
            <p style="margin-top: 1.5em; font-size: 1.2em; color: var(--bude-text-dark);">
                ${slideData.content}
            </p>
        `;
    } else if (slideData.type === 'thank-you') {
        section.classList.add('center', 'gradient-bg');
        section.innerHTML = `
            <h1>${slideData.title}</h1>
            <div class="box" style="margin-top: 2em; max-width: 800px; margin-left: auto; margin-right: auto;">
                <p style="font-size: 1.1em; margin-bottom: 1em;">
                    ${slideData.box.content}
                </p>
                <p class="small-text" style="margin-top: 1em;">
                    ${slideData.box.note}
                </p>
            </div>
            <div style="margin-top: 2em;">
                <p style="font-size: 1.2em;">
                    <span class="emoji">🏢</span> <strong style="color: var(--bude-primary);">${slideData.footer.org}</strong>
                </p>
                <p style="margin-top: 0.5em; color: var(--bude-purple);">
                    ${slideData.footer.tagline}
                </p>
            </div>
        `;
    }

    return section;
}

function createBox(boxData) {
    let html = '<div class="box">';

    if (boxData.title) {
        html += `<p><strong>${boxData.title}</strong></p>`;
    }

    if (boxData.content) {
        html += `<p>${boxData.content}</p>`;
    }

    if (boxData.list) {
        if (Array.isArray(boxData.list)) {
            html += '<ul>';
            boxData.list.forEach(item => {
                if (typeof item === 'object' && item.emoji) {
                    html += `<li><span class="emoji">${item.emoji}</span> ${item.text}</li>`;
                } else {
                    html += `<li>${item}</li>`;
                }
            });
            html += '</ul>';
        }
    }

    if (boxData.code) {
        html += `<pre><code class="language-python">${escapeHtml(boxData.code)}</code></pre>`;
    }

    html += '</div>';
    return html;
}

function createList(listData) {
    let html = '<ul style="margin-top: 1.5em;">';

    listData.forEach(item => {
        if (typeof item === 'object' && item.emoji) {
            html += `<li><span class="emoji">${item.emoji}</span> ${item.text}</li>`;
        } else {
            html += `<li>${item}</li>`;
        }
    });

    html += '</ul>';
    return html;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/\'/g, "&#039;");
}

const canvas = document.getElementById('futuristic-bg');
const ctx = canvas.getContext('2d');
let width, height, particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Generate floating particles
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.8,
    dy: (Math.random() - 0.5) * 0.8,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 12;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;
  }

  requestAnimationFrame(draw);
}
draw();

// Add vertical glowing lines
for (let i = 0; i < 5; i++) {
  const line = document.createElement('div');
  line.classList.add('glow-line');
  line.style.left = `${Math.random() * 100}%`;
  line.style.animationDelay = `${Math.random() * 8}s`;
  document.body.appendChild(line);
}