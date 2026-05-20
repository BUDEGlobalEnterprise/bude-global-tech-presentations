/**
 * BUDE Utils - Device Detection
 * Detects device capabilities and sets quality
 */

function detectDeviceCapabilities() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    ANIMATION_CONFIG.isLowPower = 
        !gl || 
        ANIMATION_CONFIG.isMobile || 
        navigator.hardwareConcurrency <= 2;
    
    // Auto-set quality based on device
    if (ANIMATION_CONFIG.isMobile) {
        ANIMATION_CONFIG.currentQuality = 'LOW';
    } else if (ANIMATION_CONFIG.isLowPower) {
        ANIMATION_CONFIG.currentQuality = 'LOW';
    } else if (window.innerWidth < 1024) {
        ANIMATION_CONFIG.currentQuality = 'MEDIUM';
    } else {
        ANIMATION_CONFIG.currentQuality = 'HIGH';
    }
    
    // Update UI
    const qualitySelect = document.getElementById('quality-select');
    if (qualitySelect) {
        qualitySelect.value = ANIMATION_CONFIG.currentQuality;
    }
}
