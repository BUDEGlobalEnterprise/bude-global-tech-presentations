// github-live.js
(function () {
  const OWNER = 'BUDEGlobalEnterprise'; // replace if needed
  const REPO = 'bude-global-tech-presentations';
  const apiBase = 'https://api.github.com';
  // Optional: set to a proxied endpoint on your server that adds an Authorization header
  // e.g. '/.netlify/functions/github-proxy?path=/repos/...'
  const proxyBase = null; // or '/api/github' if you set up a proxy

  // Cache configuration
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  const cache = {
    repoData: null,
    contributors: null,
    timestamp: 0
  };

  // Helper: build fetch URL (optionally via proxy)
  function buildUrl(path) {
    const url = `${apiBase}${path}`;
    if (proxyBase) return proxyBase + '?url=' + encodeURIComponent(url);
    return url;
  }

  // Optional: If you want to include an auth token in client (NOT recommended), set it here.
  // const GITHUB_TOKEN = 'ghp_XXXX'; // DON'T commit tokens to repo. Use server-proxy instead.
  const GITHUB_TOKEN = null;

  const headers = { Accept: 'application/vnd.github+json' };
  if (GITHUB_TOKEN) headers.Authorization = 'Bearer ' + GITHUB_TOKEN;

  async function fetchRepoInfo() {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cache.repoData && (now - cache.timestamp) < CACHE_DURATION) {
      return cache.repoData;
    }
    
    const url = buildUrl(`/repos/${OWNER}/${REPO}`);
    try {
      const res = await fetch(url, { headers });
      if (!res.ok) throw res;
      const data = await res.json();
      
      // Update cache
      cache.repoData = data;
      cache.timestamp = now;
      
      return data;
    } catch (err) {
      console.error('Repo info fetch failed', err);
      // Return cached data if available, even if expired
      return cache.repoData || { stargazers_count: 0, forks_count: 0 };
    }
  }

  async function fetchContributors(perPage = 30) {
    const now = Date.now();
    
    // Return cached contributors if still valid
    if (cache.contributors && (now - cache.timestamp) < CACHE_DURATION) {
      return cache.contributors;
    }
    
    const url = buildUrl(`/repos/${OWNER}/${REPO}/contributors?per_page=${perPage}`);
    try {
      const res = await fetch(url, { headers });
      if (!res.ok) throw res;
      const data = await res.json();
      
      // Update cache
      cache.contributors = data;
      if (!cache.repoData) cache.timestamp = now; // Only update if not already set by repo fetch
      
      return data;
    } catch (err) {
      console.error('Contributors fetch failed', err);
      // Return cached data if available, even if expired
      return cache.contributors || [];
    }
  }

  // Update UI with repo stars & forks
  async function updateRepoStats() {
    const repo = await fetchRepoInfo();
    if (!repo) return;
    const starEl = document.getElementById('star-count');
    const forkEl = document.getElementById('fork-count');
    if (starEl) starEl.textContent = formatNumber(repo.stargazers_count || repo.stars || 0);
    if (forkEl) forkEl.textContent = formatNumber(repo.forks_count || 0);

    // update hrefs (just in case owner/repo differ)
    const starLink = document.getElementById('gh-star');
    if (starLink) starLink.href = repo.html_url || `https://github.com/${OWNER}/${REPO}`;
    const forkBtn = document.getElementById('fork-btn');
    if (forkBtn) forkBtn.href = `https://github.com/${OWNER}/${REPO}/fork`;
  }

  // Render contributor avatars carousel
  async function renderContributors() {
    const list = document.getElementById('contrib-track');
    if (!list) return;
    const contributors = await fetchContributors(100);

    // map to unique avatars (contributors endpoint may include bots)
    const items = contributors
      .filter(c => c && c.avatar_url)
      .map(c => {
        return {
          login: c.login,
          url: c.html_url,
          avatar: c.avatar_url,
          contributions: c.contributions
        };
      });

    // duplicate list to create seamless loop animation (CSS scroll translates -50%)
    const render = arr => {
      arr.forEach(u => {
        const a = document.createElement('a');
        a.className = 'contrib-item';
        a.href = u.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.role = 'listitem';
        a.innerHTML = `
          <img loading="lazy" class="contrib-avatar" src="${u.avatar}" alt="${u.login}">
          <div class="contrib-name">${u.login}</div>
        `;
        list.appendChild(a);
      });
    };

    // Clear then add
    list.innerHTML = '';
    render(items);
    // duplicate
    render(items.slice(0, Math.min(items.length, 25)));
  }

  // Small helper to format large numbers
  function formatNumber(n) {
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k';
    return String(n);
  }

  // Dropdown accessibility toggle
  function wireDropdown() {
    const dropbtn = document.querySelector('.gh-dropbtn');
    const content = document.querySelector('.gh-dropdown-content');
    if (!dropbtn || !content) return;
    dropbtn.addEventListener('click', () => {
      const expanded = dropbtn.getAttribute('aria-expanded') === 'true';
      dropbtn.setAttribute('aria-expanded', String(!expanded));
      content.style.display = expanded ? 'none' : 'block';
      content.setAttribute('aria-hidden', String(expanded));
    });
    document.addEventListener('click', (e) => {
      if (!dropbtn.contains(e.target) && !content.contains(e.target)) {
        dropbtn.setAttribute('aria-expanded', 'false');
        content.style.display = 'none';
        content.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // init - Delayed for better performance
  (function init() {
    // Delay GitHub API calls to speed up initial page load
    setTimeout(() => {
      updateRepoStats();
      renderContributors();
    }, 1000); // Load after 1 second
    
    wireDropdown();

    // Refresh every 5 minutes to keep counts reasonably fresh
    setInterval(updateRepoStats, 5 * 60 * 1000);
  })();
})();
