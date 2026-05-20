/**
 * Orientation Handler for Mobile Devices
 * Prompts users to rotate to landscape mode for better presentation viewing
 */

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    mobileMaxWidth: 768,
    showPromptDelay: 500, // ms
    hidePromptDelay: 300, // ms
  };
  
  // State
  let orientationPrompt = null;
  let isPresentationMode = false;
  
  /**
   * Detect if device is mobile
   */
  function isMobileDevice() {
    return window.innerWidth <= CONFIG.mobileMaxWidth || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  /**
   * Check if device is in portrait mode
   */
  function isPortrait() {
    return window.innerHeight > window.innerWidth;
  }
  
  /**
   * Create orientation prompt overlay
   */
  function createOrientationPrompt() {
    const prompt = document.createElement('div');
    prompt.id = 'orientation-prompt';
    prompt.className = 'orientation-prompt';
    prompt.innerHTML = `
      <div class="orientation-prompt-content">
        <div class="orientation-icon">
          <i class="ri-smartphone-line"></i>
          <i class="ri-arrow-right-line"></i>
          <i class="ri-landscape-line"></i>
        </div>
        <h3>Rotate Your Device</h3>
        <p>Please rotate your device to landscape mode for the best viewing experience</p>
      </div>
    `;
    document.body.appendChild(prompt);
    return prompt;
  }
  
  /**
   * Show orientation prompt
   */
  function showOrientationPrompt() {
    if (!orientationPrompt) {
      orientationPrompt = createOrientationPrompt();
    }
    
    setTimeout(() => {
      orientationPrompt.classList.add('visible');
    }, CONFIG.showPromptDelay);
  }
  
  /**
   * Hide orientation prompt
   */
  function hideOrientationPrompt() {
    if (orientationPrompt) {
      orientationPrompt.classList.remove('visible');
    }
  }
  
  /**
   * Check orientation and show/hide prompt accordingly
   */
  function checkOrientation() {
    // Only show prompt in presentation mode on mobile devices
    if (!isPresentationMode || !isMobileDevice()) {
      hideOrientationPrompt();
      return;
    }
    
    if (isPortrait()) {
      showOrientationPrompt();
    } else {
      hideOrientationPrompt();
    }
  }
  
  /**
   * Detect when entering presentation mode
   */
  function detectPresentationMode() {
    const observer = new MutationObserver(() => {
      const revealElement = document.querySelector('.reveal');
      const mainSelector = document.querySelector('#main-selector-ui');
      
      // Presentation mode is active when reveal is visible and main selector is hidden
      const wasPresentationMode = isPresentationMode;
      isPresentationMode = revealElement && 
                          window.getComputedStyle(revealElement).display !== 'none' &&
                          mainSelector &&
                          window.getComputedStyle(mainSelector).display === 'none';
      
      // If presentation mode changed, check orientation
      if (wasPresentationMode !== isPresentationMode) {
        checkOrientation();
      }
    });
    
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['style', 'class']
    });
  }
  
  /**
   * Initialize orientation handler
   */
  function init() {
    // Only run on mobile devices
    if (!isMobileDevice()) {
      return;
    }
    
    // Listen for orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(checkOrientation, 100);
    });
    
    // Listen for resize events (backup for orientation change)
    window.addEventListener('resize', () => {
      setTimeout(checkOrientation, 100);
    });
    
    // Detect presentation mode
    detectPresentationMode();
    
    // Initial check
    checkOrientation();
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export for debugging
  window.OrientationHandler = {
    check: checkOrientation,
    show: showOrientationPrompt,
    hide: hideOrientationPrompt
  };
})();
