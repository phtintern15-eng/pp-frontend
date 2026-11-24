/**
 * Prime Property - Pure Smooth Page Crossfade System
 * Smoothly dissolves/fades out page content in 150ms on link clicks with zero intrusive popups or cards.
 */

(function () {
  'use strict';

  // Ensure top gold progress laser bar exists
  function ensureTransitionLine() {
    let line = document.getElementById('primeTransitionLine');
    if (!line) {
      line = document.createElement('div');
      line.id = 'primeTransitionLine';
      line.className = 'prime-transition-line';
      if (document.body) {
        document.body.prepend(line);
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          if (!document.getElementById('primeTransitionLine') && document.body) {
            document.body.prepend(line);
          }
        });
      }
    }
    return line;
  }

  // Trigger smooth crossfade exit to target URL
  function navigateWithTransition(url) {
    if (!url || url === '#' || url.startsWith('javascript:')) return;

    if (document.body.classList.contains('page-is-exiting')) {
      return;
    }

    const line = ensureTransitionLine();
    if (line) {
      line.classList.remove('is-active');
      void line.offsetWidth; // Trigger reflow
      line.classList.add('is-active');
    }

    document.body.classList.add('page-is-exiting');

    // 220ms smooth luxury navigation
    setTimeout(() => {
      window.location.href = url;
    }, 220);

    // Safety timeout: If browser does not navigate away within 1500ms, unlock body
    setTimeout(() => {
      if (document.body) {
        document.body.classList.remove('page-is-exiting');
      }
    }, 1500);
  }

  // Global click interceptor - active across all pages
  function setupUniversalLinkInterception() {
    document.addEventListener('click', (e) => {
      // Find closest anchor tag
      const link = e.target.closest('a');
      if (!link) return;

      // Ignore links with specific targets, downloads, or external links
      if (
        link.hasAttribute('download') ||
        link.getAttribute('target') === '_blank' ||
        link.closest('.modal-overlay') ||
        link.id === 'signupLink' ||
        link.id === 'loginLink'
      ) {
        return;
      }

      const href = link.getAttribute('href');
      const dataNav = link.getAttribute('data-nav');
      let targetUrl = href;

      if (!targetUrl && dataNav) {
        targetUrl = dataNav.startsWith('/') ? dataNav : `/${dataNav}`;
      }

      if (!targetUrl) return;

      // Skip hash anchors and protocols
      if (
        targetUrl.startsWith('#') ||
        targetUrl.startsWith('javascript:') ||
        targetUrl.startsWith('mailto:') ||
        targetUrl.startsWith('tel:')
      ) {
        return;
      }

      // Check if internal route
      const isInternal =
        targetUrl.startsWith('/') ||
        targetUrl.startsWith('./') ||
        targetUrl.startsWith('../') ||
        targetUrl.endsWith('.html') ||
        targetUrl.includes(window.location.host);

      if (isInternal) {
        // Run smooth 150ms crossfade
        e.preventDefault();
        e.stopPropagation();
        navigateWithTransition(targetUrl);
      }
    }, true);
  }

  // Handle pageshow event (bfcache / back button)
  window.addEventListener('pageshow', () => {
    if (document.body) {
      document.body.classList.remove('page-is-exiting');
    }
  });

  // Initialize immediately on all pages
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupUniversalLinkInterception);
  } else {
    setupUniversalLinkInterception();
  }

  // Expose global navigation helper
  window.primeNavigate = navigateWithTransition;
})();
