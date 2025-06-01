// Floating Buttons for CSRGO Tools
(function() {
  // Utility: Detect if on tool page
  function isToolPage() {
    return /\/tools\//.test(window.location.pathname) && !!window.CSRGO_TOOL_INFO;
  }
  // Utility: Get tool info (should be set on tool pages)
  function getToolInfo() {
    // Tool pages should set window.CSRGO_TOOL_INFO = { name, url, icon }
    if (window.CSRGO_TOOL_INFO) return window.CSRGO_TOOL_INFO;
    // Fallback: try to guess from title
    const name = document.title.replace(/ - Free Online Tool.*$/, '');
    return {
      name,
      url: window.location.href,
      icon: 'star',
    };
  }
  // Utility: Get/Set favourites in localStorage
  function getFavourites() {
    try {
      return JSON.parse(localStorage.getItem('csrgo_favourites') || '[]');
    } catch { return []; }
  }
  function setFavourites(favs) {
    localStorage.setItem('csrgo_favourites', JSON.stringify(favs));
  }
  function isFavourite(tool) {
    return getFavourites().some(f => f.url === tool.url);
  }
  function addFavourite(tool) {
    const favs = getFavourites();
    if (!isFavourite(tool)) favs.push(tool);
    setFavourites(favs);
  }
  function removeFavourite(tool) {
    setFavourites(getFavourites().filter(f => f.url !== tool.url));
  }
  // Utility: Social share links
  function getShareLinks(url, text) {
    return [
      { name: 'WhatsApp', icon: 'message-circle', url: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}` },
      { name: 'Telegram', icon: 'send', url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
      { name: 'Messenger', icon: 'message-square', url: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(url)}` },
      { name: 'Instagram', icon: 'instagram', url: `https://www.instagram.com/share?url=${encodeURIComponent(url)}` },
      { name: 'Copy Link', icon: 'copy', url: '#', action: 'copy' }
    ];
  }
  // Utility: Copy to clipboard
  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }
  // Inject modern styles for share popup
  function injectSharePopupStyles() {
    if (document.getElementById('csrgo-share-popup-style')) return;
    const style = document.createElement('style');
    style.id = 'csrgo-share-popup-style';
    style.textContent = `
      #csrgo-share-popup {
        background: rgba(255,255,255,0.85);
        backdrop-filter: blur(16px) saturate(180%);
        border-radius: 1.5rem;
        box-shadow: 0 8px 32px rgba(37,99,235,0.18);
        border: 1.5px solid #e0e7ef;
        padding: 2rem 1.5rem 1.5rem 1.5rem;
        animation: fade-in .25s cubic-bezier(.4,0,.2,1);
        transition: box-shadow .2s;
      }
      #csrgo-share-popup .absolute.top-2.right-2 {
        top: 1rem; right: 1rem;
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        transition: color .2s;
      }
      #csrgo-share-popup .absolute.top-2.right-2:hover {
        color: #7c3aed;
      }
      #csrgo-share-popup .flex.gap-2.mb-4 {
        margin-bottom: 1.25rem;
        gap: 0.5rem;
      }
      #csrgo-share-popup .flex-1.py-2.rounded-lg.font-semibold {
        border-radius: 0.5rem;
        padding: 0.5rem 0.8rem;
        font-weight: 700;
        font-size: 0.98rem;
        background: none;
        border: none;
        cursor: pointer;
        transition: background .2s, color .2s, box-shadow .2s;
      }
      #csrgo-share-popup .csrgo-tab-active,
      #csrgo-share-popup .csrgo-tab-active:focus,
      #csrgo-share-popup .csrgo-tab-active:hover,
      #csrgo-share-popup button.csrgo-tab-active:hover,
      #csrgo-share-popup button.csrgo-tab-active:focus {
        background: linear-gradient(90deg,#2563eb,#7c3aed) !important;
        color: #fff !important;
        box-shadow: 0 2px 8px rgba(124,60,237,0.10) !important;
        transform: none !important;
        cursor: default !important;
      }
      #csrgo-share-popup .csrgo-tab-inactive:hover,
      #csrgo-share-popup button.csrgo-tab-inactive:hover {
        color: #222 !important;
        background: #e5e7eb !important;
      }
      #csrgo-share-popup .flex.flex-wrap.gap-3.mb-4.justify-center {
        gap: 1.5rem;
        margin-bottom: 1.5rem;
        border-top: 1px solid #e0e7ef;
        padding-top: 1.25rem;
      }
      #csrgo-share-popup a, #csrgo-share-popup button {
        background: none;
        border: none;
        outline: none;
        box-shadow: none;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        color: #222;
        font-size: 1rem;
        transition: color .18s, transform .18s;
      }
      /* Icon default colors */
      #csrgo-share-popup .icon-whatsapp { color: #25D366; }
      #csrgo-share-popup .icon-telegram { color: #229ED9; }
      #csrgo-share-popup .icon-messenger { color: #0084FF; }
      #csrgo-share-popup .icon-instagram { color: #E1306C; }
      #csrgo-share-popup .icon-copy { color: #64748b; }
      /* Icon hover colors */
      #csrgo-share-popup a:hover .icon-whatsapp, #csrgo-share-popup button:hover .icon-whatsapp { color: #128C7E; }
      #csrgo-share-popup a:hover .icon-telegram, #csrgo-share-popup button:hover .icon-telegram { color: #1769aa; }
      #csrgo-share-popup a:hover .icon-messenger, #csrgo-share-popup button:hover .icon-messenger { color: #005fa3; }
      #csrgo-share-popup a:hover .icon-instagram, #csrgo-share-popup button:hover .icon-instagram { color: #C13584; }
      #csrgo-share-popup a:hover .icon-copy, #csrgo-share-popup button:hover .icon-copy { color: #334155; }
      #csrgo-share-popup a:hover, #csrgo-share-popup button:hover {
        transform: scale(1.13);
      }
      #csrgo-share-popup i[class^="w-7"], #csrgo-share-popup i.w-7 {
        font-size: 2.1rem;
        width: 2.1rem;
        height: 2.1rem;
        margin-bottom: 0.1rem;
      }
      #csrgo-share-popup .text-xs {
        font-size: 0.93rem;
        font-weight: 500;
        letter-spacing: 0.01em;
      }
      @media (max-width: 500px) {
        #csrgo-share-popup {
          width: 95vw !important;
          padding: 1.2rem 0.5rem 1rem 0.5rem;
        }
        #csrgo-share-popup .flex.flex-wrap.gap-3.mb-4.justify-center {
          gap: 1rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
  // Render floating buttons
  function renderButtons() {
    const container = document.getElementById('floating-buttons');
    if (!container) return;
    container.innerHTML = '';
    // Button order: share (bottom), favourite (middle, if tool), scroll-to-top (top)
    const baseBottom = 24; // px (bottom-6)
    const btnSize = 56; // 14*4 px
    const gap = 20;
    let btnIndex = 0;
    let buttons = [];
    // Share button (always, bottom)
    buttons.push({
      id: 'csrgo-share-btn',
      html: `<button id="csrgo-share-btn" class="fixed z-50" style="bottom:${baseBottom + (btnSize+gap)*btnIndex}px; right:24px; width:${btnSize}px; height:${btnSize}px; background:linear-gradient(90deg,#2563eb,#7c3aed); color:white; box-shadow:0 4px 24px rgba(79,70,229,0.12); border-radius:9999px; display:flex; align-items:center; justify-content:center; transition:all .2s;" title="Share"><i data-lucide="share-2" class="w-7 h-7" style="color:white;"></i></button>`
    });
    btnIndex++;
    // Favourite button (tool pages only, middle)
    if (isToolPage()) {
      const tool = getToolInfo();
      const fav = isFavourite(tool);
      buttons.push({
        id: 'csrgo-favourite-btn',
        html: `<button id="csrgo-favourite-btn" class="fixed z-50" style="bottom:${baseBottom + (btnSize+gap)*btnIndex}px; right:24px; width:${btnSize}px; height:${btnSize}px; background:linear-gradient(90deg,#2563eb,#7c3aed); color:white; box-shadow:0 4px 24px rgba(79,70,229,0.12); border-radius:9999px; display:flex; align-items:center; justify-content:center; transition:all .2s;" title="${fav ? 'Added to Favourites' : 'Add to Favourites'}"><i data-lucide="${fav ? 'star-off' : 'star'}" class="w-7 h-7" style="color:white;"></i></button>`
      });
      btnIndex++;
    }
    // Scroll to top button (top)
    buttons.push({
      id: 'csrgo-scroll-top',
      html: `<button id="csrgo-scroll-top" class="fixed z-50" style="bottom:${baseBottom + (btnSize+gap)*btnIndex}px; right:24px; width:${btnSize}px; height:${btnSize}px; background:linear-gradient(90deg,#2563eb,#7c3aed); color:white; box-shadow:0 4px 24px rgba(79,70,229,0.12); border-radius:9999px; display:flex; align-items:center; justify-content:center; transition:all .2s; opacity:0; pointer-events:none;" title="Go to top"><i data-lucide="arrow-up" class="w-7 h-7" style="color:white;"></i></button>`
    });
    // Render all buttons
    container.innerHTML = buttons.map(b => b.html).join('') + `<div id="csrgo-share-popup" class="fixed z-50" style="bottom:${baseBottom + (btnSize+gap)*(btnIndex+1)}px; right:24px; background:white; border-radius:1rem; box-shadow:0 8px 32px rgba(37,99,235,0.10); border:1px solid #f1f5f9; padding:1.5rem; width:20rem; max-width:90vw; display:none; animation:fade-in .2s;"><div id="csrgo-share-content"></div></div>`;
    if (window.lucide) lucide.createIcons();
    // Scroll-to-top logic
    const scrollBtn = document.getElementById('csrgo-scroll-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollBtn.style.opacity = 1;
        scrollBtn.style.pointerEvents = 'auto';
      } else {
        scrollBtn.style.opacity = 0;
        scrollBtn.style.pointerEvents = 'none';
      }
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    // Favourite logic
    if (isToolPage()) {
      const favBtn = document.getElementById('csrgo-favourite-btn');
      favBtn.addEventListener('click', () => {
        const tool = getToolInfo();
        if (isFavourite(tool)) {
          removeFavourite(tool);
        } else {
          addFavourite(tool);
        }
        // Show feedback (icon stays, color/tooltip updates)
        renderButtons();
      });
    }
    // Share logic
    const shareBtn = document.getElementById('csrgo-share-btn');
    const sharePopup = document.getElementById('csrgo-share-popup');
    const shareContent = document.getElementById('csrgo-share-content');
    
    shareBtn.addEventListener('click', () => {
      // Toggle popup visibility
      if (sharePopup.style.display === 'none') {
        sharePopup.style.display = 'block';
      } else {
        sharePopup.style.display = 'none';
      }
      
      // Detect page type
      if (isToolPage()) {
        // Two tabs: site/tool
        shareContent.innerHTML = `
          <div class="flex gap-2 mb-4">
            <button id="csrgo-tab-site" class="flex-1 py-2 rounded-lg font-semibold csrgo-tab-active">Share CSRGO</button>
            <button id="csrgo-tab-tool" class="flex-1 py-2 rounded-lg font-semibold csrgo-tab-inactive">Share Tool</button>
          </div>
          <div id="csrgo-tab-content"></div>
        `;
        const tabSite = document.getElementById('csrgo-tab-site');
        const tabTool = document.getElementById('csrgo-tab-tool');
        const tabContent = document.getElementById('csrgo-tab-content');
        function showTab(which) {
          if (which === 'site') {
            tabSite.classList.add('csrgo-tab-active');
            tabSite.classList.remove('csrgo-tab-inactive');
            tabTool.classList.remove('csrgo-tab-active');
            tabTool.classList.add('csrgo-tab-inactive');
            renderShareTab('https://csrgo.com', 'CSRGO Tools - Free Online Utilities');
          } else {
            tabTool.classList.add('csrgo-tab-active');
            tabTool.classList.remove('csrgo-tab-inactive');
            tabSite.classList.remove('csrgo-tab-active');
            tabSite.classList.add('csrgo-tab-inactive');
            const tool = getToolInfo();
            renderShareTab(tool.url, tool.name);
          }
        }
        function renderShareTab(url, text) {
          const links = getShareLinks(url, text);
          tabContent.innerHTML = `
            <div class="flex flex-wrap gap-3 mb-4 justify-center">
              ${links.map(l => {
                let iconClass = '';
                if (l.name === 'WhatsApp') iconClass = 'icon-whatsapp';
                if (l.name === 'Telegram') iconClass = 'icon-telegram';
                if (l.name === 'Messenger') iconClass = 'icon-messenger';
                if (l.name === 'Instagram') iconClass = 'icon-instagram';
                if (l.name === 'Copy Link') iconClass = 'icon-copy';
                if (l.action === 'copy') {
                  return `<button class=\"flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600\" data-copy-url=\"${url}\">
                    <i data-lucide=\"${l.icon}\" class=\"w-7 h-7 ${iconClass}\"></i>
                    <span class=\"text-xs\">${l.name}</span>
                  </button>`;
                }
                return `<a href=\"${l.url}\" target=\"_blank\" rel=\"noopener\" class=\"flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600\" onclick=\"window.open(this.href, '_blank', 'width=600,height=400'); return false;\">
                  <i data-lucide=\"${l.icon}\" class=\"w-7 h-7 ${iconClass}\"></i>
                  <span class=\"text-xs\">${l.name}</span>
                </a>`;
              }).join('')}
            </div>
          `;
          if (window.lucide) lucide.createIcons();
          // Add event listener for copy button
          tabContent.querySelectorAll('button[data-copy-url]').forEach(btn => {
            btn.onclick = function() {
              const copyUrl = btn.getAttribute('data-copy-url');
              copyToClipboard(copyUrl);
              const span = btn.querySelector('span');
              const originalText = span.textContent;
              span.textContent = 'Copied!';
              setTimeout(() => { span.textContent = originalText; }, 1200);
            };
          });
        }
        tabSite.onclick = () => showTab('site');
        tabTool.onclick = () => showTab('tool');
        showTab('site');
      } else {
        // Only site share
        const url = 'https://csrgo.com';
        const text = 'CSRGO Tools - Free Online Utilities';
        const links = getShareLinks(url, text);
        shareContent.innerHTML = `
          <div class="flex gap-2 mb-4">
            <button class="flex-1 py-2 rounded-lg font-semibold csrgo-tab-active" style="width:100%">Share CSRGO</button>
          </div>
          <div class="flex flex-wrap gap-3 mb-4 justify-center">
            ${links.map(l => {
              let iconClass = '';
              if (l.name === 'WhatsApp') iconClass = 'icon-whatsapp';
              if (l.name === 'Telegram') iconClass = 'icon-telegram';
              if (l.name === 'Messenger') iconClass = 'icon-messenger';
              if (l.name === 'Instagram') iconClass = 'icon-instagram';
              if (l.name === 'Copy Link') iconClass = 'icon-copy';
              if (l.action === 'copy') {
                return `<button class=\"flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600\" data-copy-url=\"${url}\">
                  <i data-lucide=\"${l.icon}\" class=\"w-7 h-7 ${iconClass}\"></i>
                  <span class=\"text-xs\">${l.name}</span>
                </button>`;
              }
              return `<a href=\"${l.url}\" target=\"_blank\" rel=\"noopener\" class=\"flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600\" onclick=\"window.open(this.href, '_blank', 'width=600,height=400'); return false;\">
                <i data-lucide=\"${l.icon}\" class=\"w-7 h-7 ${iconClass}\"></i>
                <span class=\"text-xs\">${l.name}</span>
              </a>`;
            }).join('')}
          </div>
        `;
        // Add event listener for copy button
        shareContent.querySelectorAll('button[data-copy-url]').forEach(btn => {
          btn.onclick = function() {
            const copyUrl = btn.getAttribute('data-copy-url');
            copyToClipboard(copyUrl);
            const span = btn.querySelector('span');
            const originalText = span.textContent;
            span.textContent = 'Copied!';
            setTimeout(() => { span.textContent = originalText; }, 1200);
          };
        });
        if (window.lucide) lucide.createIcons();
      }
    });

    document.addEventListener('mousedown', function handler(e) {
      if (!sharePopup.contains(e.target) && e.target !== shareBtn) {
        sharePopup.style.display = 'none';
        document.removeEventListener('mousedown', handler);
      }
    });
  }
  // On DOM ready, render
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectSharePopupStyles();
      renderButtons();
    });
  } else {
    injectSharePopupStyles();
    renderButtons();
  }
  // Expose for manual re-render if needed
  window.renderFloatingButtons = renderButtons;
})(); 