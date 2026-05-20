/**
 * BUDE Presentation Engine - Configuration
 * Global state and configuration constants
 */

// Debug mode - set to false for production
const DEBUG_MODE = false;

// Animation configuration
const ANIMATION_CONFIG = {
    modes: {
        FLOATING_SHAPES: 'floating-shapes',
        GRADIENT_BLOBS: 'gradient-blobs',
        NEON_WAVES: 'neon-waves',
        ANIMATED_GRID: 'animated-grid',
        PARTICLE_FIELD: 'particle-field',
        PULSE_RINGS: 'pulse-rings',
        PARALLAX_LAYERS: 'parallax-layers',
        COSMIC_DUST: 'cosmic-dust'
    },
    
    quality: {
        HIGH: { particles: 100, shapes: 20, fps: 60 },
        MEDIUM: { particles: 50, shapes: 15, fps: 45 },
        LOW: { particles: 25, shapes: 10, fps: 30 }
    },
    
    colors: {
        primary: ['#0060a0', '#6f42c1', '#cb6ce6', '#23a6d5', '#23d5ab'],
        neon: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0066'],
        cosmic: ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560']
    },
    
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isLowPower: false,
    pixelRatio: window.devicePixelRatio || 1,
    
    currentMode: 'floating-shapes',
    currentQuality: 'HIGH',
    isTransitioning: false,
    animationEnabled: false
};

// Quiz state
const quizState = {};

// Animation instances
let animationInstances = {
    canvas: null,
    ctx: null,
    animationFrameId: null,
    particles: [],
    shapes: [],
    blobs: [],
    waves: [],
    intervalIds: []
};
