/**
 * index.js - Dedicated JavaScript for Home Landing Page
 * Prime Properties Architectural Luxury Estates
 */

function navigateToCountryProperties() {
  const sel = document.getElementById('homeCountrySelect');
  const country = sel ? sel.value : 'in';
  window.location.href = '/property?country=' + encodeURIComponent(country);
}
window.navigateToCountryProperties = navigateToCountryProperties;

// Global Mobile & Desktop Menu Controller
function initGlobalNavigationBar() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navList = document.getElementById('navLinks');
  if (!toggleBtn || !navList) return;

  function openDrawer() {
    navList.classList.add('mobile-open');
    toggleBtn.classList.add('active');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-times';
    }
    document.body.classList.add('mobile-nav-open');
  }

  function closeDrawer() {
    navList.classList.remove('mobile-open');
    toggleBtn.classList.remove('active');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-bars';
    }
    document.body.classList.remove('mobile-nav-open');
  }

  function toggleDrawer(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (navList.classList.contains('mobile-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  // Use direct onclick property to eliminate multiple clashing listeners
  toggleBtn.onclick = toggleDrawer;

  // Dedicated drawer close button (X)
  const closeBtn = document.getElementById('mobileDrawerClose');
  if (closeBtn) {
    closeBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeDrawer();
    };
  }

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (navList.classList.contains('mobile-open')) {
      if (!navList.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeDrawer();
      }
    }
  });

  // Close when clicking any nav link
  navList.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navList.classList.contains('mobile-open')) {
      closeDrawer();
    }
  });

  window.openMobileNav = openDrawer;
  window.closeMobileNav = closeDrawer;
  window.toggleMobileNav = toggleDrawer;
}

// Real-Time Device Auto-Detection
(function detectDeviceMode() {
  function checkDevice() {
    const isMobileScreen = window.innerWidth <= 992;
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isMobileUA = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobileScreen || (isTouch && isMobileUA)) {
      document.documentElement.classList.add('device-mobile');
      document.documentElement.classList.remove('device-desktop');
    } else {
      document.documentElement.classList.add('device-desktop');
      document.documentElement.classList.remove('device-mobile');
    }
  }

  checkDevice();
  window.addEventListener('resize', checkDevice);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalNavigationBar);
  } else {
    initGlobalNavigationBar();
  }
})();
