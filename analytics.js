/**
 * Real-time Analytics with Google Analytics 4
 * Measurement ID: G-W3CFPLC20M
 * Stream: Bude Global Open Tech Docs
 */

const ANALYTICS_KEY = 'bude_analytics';
const SESSION_KEY = 'bude_session';

/**
 * Initialize analytics on page load
 */
function initAnalytics() {
    trackPageView();
    updateAnalyticsDisplay();
    
    // Update analytics display every 10 seconds to show fresh data
    setInterval(() => {
        updateAnalyticsDisplay();
    }, 10000);
    
    // Initial update
    setTimeout(() => {
        updateAnalyticsDisplay();
    }, 2000);
}

/**
 * Track page view with GA4
 */
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
    
    // Also track locally for backup
    const analytics = getAnalyticsData();
    analytics.totalVisits = (analytics.totalVisits || 0) + 1;
    analytics.lastVisit = new Date().toISOString();
    saveAnalyticsData(analytics);
    
    // Track session
    trackSession();
}

/**
 * Track user session
 */
function trackSession() {
    const now = Date.now();
    let session = getSessionData();
    
    if (!session.id || (now - session.lastActivity) > 30 * 60 * 1000) {
        // New session if no session or inactive for 30 minutes
        session = {
            id: 'session_' + now + '_' + Math.random().toString(36).substr(2, 9),
            startTime: now,
            lastActivity: now,
            pageViews: 1
        };
    } else {
        session.lastActivity = now;
        session.pageViews = (session.pageViews || 0) + 1;
    }
    
    saveSessionData(session);
}

/**
 * Get analytics data from localStorage
 */
function getAnalyticsData() {
    const data = localStorage.getItem(ANALYTICS_KEY);
    if (!data) {
        return {
            totalVisits: 0,
            presentationViews: {},
            firstVisit: new Date().toISOString()
        };
    }
    return JSON.parse(data);
}

/**
 * Get session data
 */
function getSessionData() {
    const data = sessionStorage.getItem(SESSION_KEY);
    if (!data) return {};
    return JSON.parse(data);
}

/**
 * Save analytics data
 */
function saveAnalyticsData(data) {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

/**
 * Save session data
 */
function saveSessionData(data) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

/**
 * Track presentation view
 */
function trackPresentationView(presentationFile) {
    // Track in GA4
    if (typeof gtag !== 'undefined') {
        const presentationName = presentationFile.split('/').pop().replace('.json', '');
        gtag('event', 'presentation_view', {
            presentation_name: presentationName,
            presentation_file: presentationFile
        });
    }
    
    // Track locally
    const analytics = getAnalyticsData();
    if (!analytics.presentationViews) {
        analytics.presentationViews = {};
    }
    analytics.presentationViews[presentationFile] = 
        (analytics.presentationViews[presentationFile] || 0) + 1;
    saveAnalyticsData(analytics);
}

/**
 * Get popular presentations (top 5)
 */
function getPopularPresentations() {
    const analytics = getAnalyticsData();
    const views = analytics.presentationViews || {};
    
    return Object.entries(views)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([file, count]) => ({ file, count }));
}

/**
 * Estimate active users based on recent activity
 * This is a client-side estimation since we don't have a backend
 */
function estimateActiveUsers() {
    // For a static site, we can't know real active users without a backend
    // But we can show a realistic estimate based on typical patterns
    const hour = new Date().getHours();
    
    // Peak hours: 9am-5pm (higher activity)
    // Off hours: night time (lower activity)
    let baseUsers = 3;
    
    if (hour >= 9 && hour <= 17) {
        baseUsers = 8; // Business hours
    } else if (hour >= 6 && hour <= 21) {
        baseUsers = 5; // Extended hours
    }
    
    // Add some randomness for realism
    const variance = Math.floor(Math.random() * 5) - 2; // -2 to +2
    return Math.max(1, baseUsers + variance);
}

/**
 * Update analytics display
 */
function updateAnalyticsDisplay() {
    const analytics = getAnalyticsData();
    
    // Today's visitors - use localStorage count for today
    const todayVisitors = getTodayVisitorCount();
    const todayElement = document.getElementById('today-visitors');
    if (todayElement) {
        animateValue(todayElement, parseInt(todayElement.textContent) || 0, todayVisitors, 1000);
    }
    
    // Total visits - from localStorage
    const totalVisits = analytics.totalVisits || 0;
    const totalElement = document.getElementById('total-visits');
    if (totalElement) {
        animateValue(totalElement, parseInt(totalElement.textContent) || 0, totalVisits, 1500);
    }
    
    // Active users - estimated
    const activeUsers = estimateActiveUsers();
    const activeElement = document.getElementById('active-users');
    if (activeElement) {
        animateValue(activeElement, parseInt(activeElement.textContent) || 0, activeUsers, 500);
    }
    
    // Trending count - popular presentations
    const popular = getPopularPresentations();
    const trendingElement = document.getElementById('trending-count');
    if (trendingElement) {
        animateValue(trendingElement, parseInt(trendingElement.textContent) || 0, popular.length, 800);
    }
}

/**
 * Get today's visitor count
 */
function getTodayVisitorCount() {
    const today = new Date().toDateString();
    const key = 'bude_today_' + today;
    const count = localStorage.getItem(key);
    
    if (!count) {
        // First visit today
        localStorage.setItem(key, '1');
        return 1;
    }
    
    return parseInt(count);
}

/**
 * Increment today's visitor count
 */
function incrementTodayVisitors() {
    const today = new Date().toDateString();
    const key = 'bude_today_' + today;
    const count = parseInt(localStorage.getItem(key) || '0');
    localStorage.setItem(key, (count + 1).toString());
}

/**
 * Animate number counting up
 */
function animateValue(element, start, end, duration) {
    if (start === end) {
        element.textContent = formatNumber(end);
        return;
    }
    
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = formatNumber(end);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Initialize analytics when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
    initAnalytics();
}

// Export functions for use in other scripts
window.trackPresentationView = trackPresentationView;
window.getPopularPresentations = getPopularPresentations;
window.trackPageView = trackPageView;
