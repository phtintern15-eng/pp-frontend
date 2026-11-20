/**
 * Prime Properties - Architectural Real Estate Experience Controller
 * High-performance UI interactions, dynamic database fetching, filters, modals, and auth
 */

// Initial Data Cache (Synchronized with seed properties)
const propertiesData = [
  {
    id: 1,
    title: "The Bel-Air Glass Pavilion",
    type: "villa",
    category: "villas",
    status: "For Sale",
    purpose: "buy",
    price: "₹4,85,00,000",
    priceRaw: 48500000,
    location: "Beverly Hills, CA",
    beds: 5,
    baths: 6,
    sqft: "6,400",
    image: "/images/hero_luxury_villa.jpg",
    description: "An architectural tour de force featuring panoramic hillside vistas, zero-edge infinity pool, floor-to-ceiling motorized Fleetwood glass doors, and a custom Italian Poliform kitchen.",
    agent: {
      name: "Victoria Stone",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    amenities: ["Infinity Pool", "Wine Cellar", "Smart Automation", "Private Cinema", "EV Charger"]
  },
  {
    id: 2,
    title: "Skyline Horizon Penthouse",
    type: "penthouse",
    category: "penthouses",
    status: "Featured",
    purpose: "buy",
    price: "₹6,20,00,000",
    priceRaw: 62000000,
    location: "Manhattan, New York",
    beds: 4,
    baths: 4.5,
    sqft: "4,950",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description: "Perched high above Central Park, this duplex penthouse features a private wrap-around terrace, 14-foot ceilings, bespoke marble fireplaces, and unmatched skyline panoramas.",
    agent: {
      name: "David Vance",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    amenities: ["Wrap-around Terrace", "Keyed Elevator", "Concierge 24/7", "Marble Baths", "Valet Parking"]
  },
  {
    id: 3,
    title: "Azure Shoreline Ocean Villa",
    type: "waterfront",
    category: "waterfront",
    status: "For Sale",
    purpose: "buy",
    price: "₹5,40,00,000",
    priceRaw: 54000000,
    location: "Miami Beach, FL",
    beds: 6,
    baths: 7,
    sqft: "7,100",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "Private direct dockage with deepwater access, resort-style poolside cabanas, outdoor summer kitchen, and luminous open-plan living designed for ultimate seaside tranquility.",
    agent: {
      name: "Victoria Stone",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    amenities: ["Private Deepwater Dock", "Summer Kitchen", "Heated Pool", "Rooftop Deck", "Spa & Sauna"]
  },
  {
    id: 4,
    title: "Nordic Minimalist Loft",
    type: "condo",
    category: "condos",
    status: "For Rent",
    purpose: "rent",
    price: "₹1,45,000 / mo",
    priceRaw: 145000,
    location: "Tribeca, New York",
    beds: 3,
    baths: 3,
    sqft: "2,850",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Warm minimalist aesthetic with Scandinavian white oak floors, exposed architectural brick accents, custom fluted millwork, and top-tier Gaggenau appliances.",
    agent: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    amenities: ["Exposed Brick", "Gaggenau Kitchen", "Keyed Elevator", "Soundproofing", "Studio Access"]
  },
  {
    id: 5,
    title: "The Aspen Ridge Chalet",
    type: "villa",
    category: "villas",
    status: "For Sale",
    purpose: "buy",
    price: "₹3,95,00,000",
    priceRaw: 39500000,
    location: "Aspen, Colorado",
    beds: 5,
    baths: 5.5,
    sqft: "5,300",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    description: "Ski-in/ski-out luxury residence surrounded by evergreen forest. Highlights include heated stone terraces, indoor spa pool, floor-to-ceiling timber beams, and breathtaking mountain views.",
    agent: {
      name: "David Vance",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    amenities: ["Ski-in / Ski-out", "Heated Driveway", "Indoor Jacuzzi", "Stone Fireplace", "Wine Room"]
  },
  {
    id: 6,
    title: "The Metropolitan Oasis Residence",
    type: "condo",
    category: "condos",
    status: "For Rent",
    purpose: "rent",
    price: "₹1,90,000 / mo",
    priceRaw: 190000,
    location: "Downtown Los Angeles, CA",
    beds: 3,
    baths: 3.5,
    sqft: "3,400",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    description: "Contemporary urban luxury with a sprawling private botanical terrace, integrated Sub-Zero appliances, double rain showers, and 24-hour white-glove security.",
    agent: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    amenities: ["Private Botanical Terrace", "Sub-Zero Suite", "24/7 Doorman", "Rooftop Pool", "Vault Storage"]
  }
];

// State
let savedPropertyIds = (JSON.parse(localStorage.getItem('prime_saved_properties') || '[]')).map(String);
let currentFilter = 'all';
let currentPurpose = 'buy';
let isShowingSaved = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupNavbarScroll();
  setupAuthHeader();
  renderProperties(propertiesData);
  updateSavedBadge();
  setupEventListeners();
  loadBackendProperties();
  initHeroBackgroundSlider();
  init3DSearchBarTilt();
  init3DDropdowns();
});

// Ultra-Luxury Concierge Console Controller
function init3DSearchBarTilt() {
  const searchWrapper = document.getElementById('heroSearchWrapper');
  const searchBox = document.getElementById('heroSearchBox');
  if (!searchWrapper || !searchBox) return;

  // Modern luxury clean interaction (no awkward 3D isometric tilt)
  searchBox.style.transform = 'none';
}

// Interactive 3D Luxury Dropdown Controller
function init3DDropdowns() {
  const dropdowns = document.querySelectorAll('.search-3d-dropdown');
  if (!dropdowns || dropdowns.length === 0) return;

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.search-3d-trigger');
    const valueDisplay = dropdown.querySelector('.search-3d-value');
    const cards = dropdown.querySelectorAll('.search-3d-card');
    const targetSelectId = dropdown.getAttribute('data-target');
    const selectElem = document.getElementById(targetSelectId);

    if (!trigger) return;

    // Toggle dropdown open/close with 3D flip
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('is-open');

      // Close all other dropdowns
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('is-open');
      });

      if (isOpen) {
        dropdown.classList.remove('is-open');
      } else {
        dropdown.classList.add('is-open');
      }
    });

    // 3D Card Selection
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const val = card.getAttribute('data-val');
        const textSpan = card.querySelector('span');
        const text = textSpan ? textSpan.textContent : '';

        // Update selected state
        cards.forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
        if (valueDisplay) valueDisplay.textContent = text;
        dropdown.classList.remove('is-open');

        // Sync hidden select and trigger search filter
        if (selectElem) {
          selectElem.value = val;
          selectElem.dispatchEvent(new Event('change', { bubbles: true }));
        }

        if (typeof applyCurrentFilters === 'function') {
          applyCurrentFilters();
        }
      });
    });
  });

  // Close when clicking outside
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('is-open'));
  });
}

// Hero Background Looping Slider
function initHeroBackgroundSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-slider-dot');
  if (!slides || slides.length === 0) return;

  const heroSection = document.getElementById('home') || document.querySelector('.hero-section');
  const heroContent = document.querySelector('.hero-content');

  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 3500; // Time per slide

  function applySlideTheme(index) {
    const slide = slides[index];
    if (!slide) return;
    const theme = slide.getAttribute('data-theme') || 'dark';

    if (theme === 'light') {
      if (heroSection) heroSection.classList.add('theme-dark-text');
      if (heroContent) heroContent.classList.add('theme-dark-text');
    } else {
      if (heroSection) heroSection.classList.remove('theme-dark-text');
      if (heroContent) heroContent.classList.remove('theme-dark-text');
    }
  }

  function goToSlide(index) {
    slides.forEach((s, idx) => {
      if (idx === index) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    dots.forEach((d, idx) => {
      if (idx === index) {
        d.classList.add('active');
      } else {
        d.classList.remove('active');
      }
    });

    currentSlide = index;
    applySlideTheme(index);
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function startLoop() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  // Dot click navigation
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      goToSlide(idx);
      startLoop(); // Reset interval on manual selection
    });
  });

  // Apply initial slide theme on load
  applySlideTheme(0);

  // Start automatic rotation
  startLoop();
}

// In case script runs after DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initHeroBackgroundSlider, 100);
  setTimeout(init3DDropdowns, 120);
}

// Universal Mobile & Desktop Navigation Controller
function initGlobalNavigationBar() {
  const toggleBtn = document.getElementById('mobileMenuToggle') || document.querySelector('.mobile-menu-toggle');
  const navList = document.getElementById('navLinks') || document.querySelector('.nav-links');
  if (!toggleBtn || !navList) return;

  function openDrawer() {
    navList.classList.add('mobile-open');
    navList.classList.add('is-open');
    navList.classList.add('open');
    toggleBtn.classList.add('active');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-times';
    }
    document.body.classList.add('mobile-nav-open');
  }

  function closeDrawer() {
    navList.classList.remove('mobile-open');
    navList.classList.remove('is-open');
    navList.classList.remove('open');
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
    if (navList.classList.contains('mobile-open') || navList.classList.contains('is-open') || navList.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  // Bind click toggle
  toggleBtn.onclick = toggleDrawer;

  // Dedicated drawer close button (X) inside mobile drawer header
  const closeBtn = document.getElementById('mobileDrawerClose') || navList.querySelector('.mobile-drawer-close');
  if (closeBtn) {
    closeBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeDrawer();
    };
  }

  // Close when clicking outside of drawer and toggle
  document.addEventListener('click', function(e) {
    if (navList.classList.contains('mobile-open') || navList.classList.contains('is-open') || navList.classList.contains('open')) {
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
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });

  window.openMobileNav = openDrawer;
  window.closeMobileNav = closeDrawer;
  window.toggleMobileNav = toggleDrawer;
}
window.initGlobalNavigationBar = initGlobalNavigationBar;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalNavigationBar);
} else {
  initGlobalNavigationBar();
}

// Scroll detection for sticky nav
function setupNavbarScroll() {
  const header = document.getElementById('navbar');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// User auth state in header
function setupAuthHeader() {
  const container = document.getElementById('navAuthContainer');
  if (!container) return;

  const authManager = new AuthManager();
  const user = authManager.getUser();

  if (authManager.isAuthenticated() && user) {
    let dashboardLink = '/admin-dashboard';
    if (user.user_type === 'owner') dashboardLink = '/owner-profile';
    else if (user.user_type === 'consultant') dashboardLink = '/consultant-profile';
    else if (user.user_type === 'buyer' || !user.is_admin) dashboardLink = '/user-dashboard';

    container.innerHTML = `
      <a href="${dashboardLink}" class="nav-link" style="font-weight: 700; color: #D4AF37; display: inline-flex; align-items: center; gap: 0.45rem;">
        <i class="fas fa-user-circle" style="color: #FFDF73;"></i> ${user.first_name || 'My Portal'}
      </a>
      <button onclick="handleLogout()" class="btn-outline" style="padding: 0.45rem 1rem; font-size: 0.8rem; border-color: rgba(212, 175, 55, 0.4); color: #F0FDF4;">
        Logout
      </button>
    `;
  } else {
    container.innerHTML = `
      <button onclick="openLoginModal()" class="nav-link" style="font-weight: 600; cursor: pointer; background: none; border: none;">
        <i class="fas fa-user"></i> Login
      </button>
      <button onclick="openRegisterModal()" class="btn-primary" style="padding: 0.55rem 1.35rem; font-size: 0.85rem;">
        Register
      </button>
    `;
  }
}

async function handleLogout() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch(e) {}
  const authManager = new AuthManager();
  authManager.clearAuthData();
  showToast('Logged out successfully');
  setTimeout(() => window.location.reload(), 600);
}

// Fetch properties from FastAPI backend
async function loadBackendProperties() {
  try {
    const res = await fetch('/api/properties');
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      propertiesData.length = 0;
      data.forEach(p => {
        let imageUrl = p.images && p.images.length > 0 ? p.images[0].image_url : 
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

        const isRent = (p.listing_type || '').toLowerCase() === 'rent';
        const purposeVal = isRent ? 'rent' : 'buy';
        const statusVal = isRent ? 'For Rent' : (p.is_available ? 'For Sale' : 'Reserved');
        const priceStr = '₹' + Number(p.price || 0).toLocaleString('en-IN') + (isRent ? '/mo' : '');

        const rawType = (p.property_type || '').toLowerCase();
        const titleLower = (p.title || '').toLowerCase();
        const descLower = (p.description || '').toLowerCase();
        
        let archType = 'villa';
        let archCategory = 'villas';
        
        if (titleLower.includes('penthouse') || descLower.includes('penthouse')) {
          archType = 'penthouse';
          archCategory = 'penthouses';
        } else if (titleLower.includes('loft') || titleLower.includes('condo') || descLower.includes('loft') || descLower.includes('condo')) {
          archType = 'condo';
          archCategory = 'condos';
        } else if (titleLower.includes('ocean') || titleLower.includes('shoreline') || titleLower.includes('waterfront') || descLower.includes('waterfront')) {
          archType = 'waterfront';
          archCategory = 'waterfront';
        } else if (rawType === 'commercial') {
          archType = 'commercial';
          archCategory = 'commercial';
        } else if (rawType === 'office') {
          archType = 'office';
          archCategory = 'office';
        }

        propertiesData.push({
          id: p.id,
          title: p.title,
          type: archType,
          category: archCategory,
          status: statusVal,
          purpose: purposeVal,
          price: priceStr,
          priceRaw: Number(p.price || 0),
          location: `${p.city || ''}, ${p.state || ''}`.trim() || p.address || 'Beverly Hills, CA',
          beds: p.bedrooms || 4,
          baths: p.bathrooms || 4,
          sqft: p.area_sqft ? Number(p.area_sqft).toLocaleString() : '5,000',
          image: imageUrl,
          description: p.description || 'Stunning architectural property featuring master craftsmanship and prime positioning.',
          foreign_buyer_eligible: p.foreign_buyer_eligible !== false,
          agent: {
            name: "Prime Properties Concierge",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
          },
          amenities: ["Architectural Design", "Panoramic Views", "Chef Kitchen", "Private Grounds", "Smart Home"]
        });
      });
      applyCurrentFilters();
    }
  } catch (err) {
    console.log("Using local portfolio data.");
  }
}

// Render property grid
function renderProperties(list) {
  const container = document.getElementById('propertiesGrid');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4.5rem 1rem; background: var(--color-obsidian-surface); border-radius: var(--radius-md); border: 1px solid var(--color-gold-border);">
        <img src="/images/prime_logo.png" alt="Prime Property" style="width: 56px; height: auto; margin-bottom: 1.25rem; filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.5));">
        <h3 style="font-family: var(--font-serif); font-size: 1.65rem; color: var(--color-gold-light); margin-bottom: 0.5rem;">No Estates Match Your Criteria</h3>
        <p style="color: var(--color-text-muted); max-width: 440px; margin: 0 auto 1.5rem;">Our private portfolio is continually updated. Try broadening your search or speak directly with our concierge.</p>
        <button class="btn-primary" onclick="resetSearchFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(prop => {
    const isSaved = savedPropertyIds.includes(String(prop.id));
    const badgeClass = prop.status === 'For Rent' ? 'badge-for-rent' : (prop.status === 'Featured' ? 'badge-featured' : 'badge-for-sale');
    const isForeignEligible = prop.foreign_buyer_eligible !== false;

    return `
      <article class="property-card" data-id="${prop.id}">
        <div class="property-media">
          <img class="property-image" src="${prop.image}" alt="${prop.title}" loading="lazy">
          <div class="property-badges">
            <span class="badge-status ${badgeClass}">${prop.status}</span>
            ${isForeignEligible ? `
              <span class="badge-foreign-eligible" title="Verified for Foreign Nationals, NRIs &amp; International Capital" style="background: rgba(16, 185, 129, 0.92); color: #04100B; backdrop-filter: blur(8px); padding: 0.25rem 0.65rem; border-radius: 99px; font-size: 0.72rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.35rem; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);">
                <i class="fas fa-globe-americas"></i> Foreign Buyer Eligible
              </span>
            ` : ''}
          </div>
          <button class="saved-heart-btn ${isSaved ? 'is-saved' : ''}" onclick="toggleSaveProperty(${prop.id}, event)" aria-label="Save property" title="${isSaved ? 'Remove from saved' : 'Save property'}">
            <i class="${isSaved ? 'fas' : 'far'} fa-heart"></i>
          </button>
          <div class="property-price-tag">${prop.price}</div>
        </div>

        <div class="property-content">
          <div class="property-location">
            <i class="fas fa-map-marker-alt"></i>
            <span>${prop.location}</span>
          </div>
          <h3 class="property-title">${prop.title}</h3>

          <div class="property-specs">
            <div class="spec-item" title="Bedrooms">
              <i class="fas fa-bed"></i>
              <span>${prop.beds} Beds</span>
            </div>
            <div class="spec-item" title="Bathrooms">
              <i class="fas fa-bath"></i>
              <span>${prop.baths} Baths</span>
            </div>
            <div class="spec-item" title="Living Area">
              <i class="fas fa-vector-square"></i>
              <span>${prop.sqft} sq ft</span>
            </div>
          </div>

          <div class="card-amenities">
            ${(prop.amenities || []).slice(0, 2).map(a => `
              <span class="amenity-tag"><i class="fas fa-check"></i> ${a}</span>
            `).join('')}
          </div>

          <div class="property-footer">
            <button class="btn-card-action" onclick="openPropertyModal(${prop.id})">
              <span>View Architectural Details</span>
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Toggle saved favorite
function toggleSaveProperty(id, e) {
  if (e) e.stopPropagation();
  const strId = String(id);
  const index = savedPropertyIds.indexOf(strId);
  const prop = propertiesData.find(p => String(p.id) === strId);

  if (index > -1) {
    savedPropertyIds.splice(index, 1);
    showToast(`Removed "${prop ? prop.title : 'Property'}" from saved collection`);
  } else {
    savedPropertyIds.push(strId);
    showToast(`Saved "${prop ? prop.title : 'Property'}" to your collection!`);
  }

  localStorage.setItem('prime_saved_properties', JSON.stringify(savedPropertyIds));
  updateSavedBadge();
  renderSavedDrawerItems();

  if (isShowingSaved) {
    applyCurrentFilters();
  } else {
    // Dynamically update both circular heart button and footer save button
    const isSaved = savedPropertyIds.includes(strId);
    document.querySelectorAll(`.property-card[data-id="${id}"] .saved-heart-btn, .property-card[data-id="${strId}"] .saved-heart-btn`).forEach(btn => {
      if (isSaved) {
        btn.classList.add('is-saved');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
        btn.setAttribute('title', 'Remove from saved');
      } else {
        btn.classList.remove('is-saved');
        btn.innerHTML = '<i class="far fa-heart"></i>';
        btn.setAttribute('title', 'Save property');
      }
    });

    document.querySelectorAll(`.property-card[data-id="${id}"] .btn-save-action, .property-card[data-id="${strId}"] .btn-save-action`).forEach(btn => {
      if (isSaved) {
        btn.classList.add('is-saved');
        btn.innerHTML = '<i class="fas fa-heart"></i> <span>Saved</span>';
        btn.setAttribute('title', 'Remove from Saved');
      } else {
        btn.classList.remove('is-saved');
        btn.innerHTML = '<i class="far fa-heart"></i> <span>Save</span>';
        btn.setAttribute('title', 'Save Property');
      }
    });
  }
}

function updateSavedBadge() {
  const count = savedPropertyIds.length;
  const badges = document.querySelectorAll('#savedCountBadge, .saved-badge, .saved-badge-inline');
  badges.forEach(badge => {
    badge.textContent = count;
  });
}

// Saved Drawer Handlers
function openSavedDrawer() {
  const drawer = document.getElementById('savedDrawerOverlay');
  if (drawer) {
    renderSavedDrawerItems();
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeSavedDrawer(e) {
  if (e && e.target && e.target.id !== 'savedDrawerOverlay' && !e.target.closest('.saved-drawer-close')) return;
  const drawer = document.getElementById('savedDrawerOverlay');
  if (drawer) {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function clearAllSavedProperties() {
  if (savedPropertyIds.length === 0) return;
  savedPropertyIds = [];
  localStorage.setItem('prime_saved_properties', JSON.stringify([]));
  updateSavedBadge();
  renderSavedDrawerItems();
  applyCurrentFilters();
  showToast('Cleared all saved properties.');
}

function renderSavedDrawerItems() {
  const container = document.getElementById('savedDrawerList');
  if (!container) return;

  // Refresh latest IDs from storage
  savedPropertyIds = (JSON.parse(localStorage.getItem('prime_saved_properties') || '[]')).map(String);

  if (savedPropertyIds.length === 0) {
    container.innerHTML = `
      <div class="saved-drawer-empty">
        <i class="far fa-heart"></i>
        <h4 style="color: #FFFFFF; font-family: var(--font-serif); margin-bottom: 0.5rem; font-size: 1.25rem;">No Saved Properties Yet</h4>
        <p style="font-size: 0.9rem; line-height: 1.6; margin: 0 auto; max-width: 280px; color: #94A3B8;">
          Tap the bookmark or heart icon on any villa, penthouse, or estate to create your private collection.
        </p>
      </div>
    `;
    return;
  }

  const savedList = propertiesData.filter(p => savedPropertyIds.includes(String(p.id)));

  if (savedList.length === 0) {
    container.innerHTML = `
      <div class="saved-drawer-empty">
        <i class="fas fa-bookmark"></i>
        <h4 style="color: #FFFFFF; font-family: var(--font-serif); margin-bottom: 0.5rem; font-size: 1.25rem;">${savedPropertyIds.length} Saved Collection Item${savedPropertyIds.length > 1 ? 's' : ''}</h4>
        <p style="font-size: 0.9rem; line-height: 1.6; margin: 0 auto 1.25rem; max-width: 280px; color: #94A3B8;">
          Your saved residences are stored. Explore our international portfolio to view more estates.
        </p>
        <a href="/properties" class="btn-primary" style="display: inline-block; padding: 0.65rem 1.4rem; border-radius: 999px; text-decoration: none; color: #FFFFFF;">
          <i class="fas fa-compass"></i> Explore International Portfolio
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = savedList.map(p => `
    <div class="saved-drawer-item" onclick="openPropertyModal(${p.id}); closeSavedDrawer();" style="cursor: pointer;" title="Click to view details">
      <img src="${p.image}" alt="${p.title}">
      <div class="saved-drawer-item-info">
        <div class="saved-drawer-item-title">${p.title}</div>
        <div class="saved-drawer-item-loc"><i class="fas fa-map-marker-alt"></i> ${p.location}</div>
        <div class="saved-drawer-item-price">${p.price}</div>
      </div>
      <button class="saved-drawer-item-remove" onclick="event.stopPropagation(); toggleSaveProperty('${p.id}', event)" title="Remove from collection">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');
}

// Open Property Details Modal
function openPropertyModal(id) {
  const prop = propertiesData.find(p => p.id === id);
  if (!prop) return;

  const modal = document.getElementById('propertyModal');
  const modalMedia = document.getElementById('modalMedia');
  const modalDetails = document.getElementById('modalDetails');

  modalMedia.innerHTML = `
    <img src="${prop.image}" alt="${prop.title}">
    <div class="property-price-tag" style="bottom: 1.5rem; left: 1.5rem; font-size: 1.65rem;">${prop.price}</div>
  `;

  modalDetails.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
      <div>
        <div class="property-location" style="font-size: 0.95rem; margin-bottom: 0.35rem; color: var(--color-gold-light);">
          <i class="fas fa-map-marker-alt"></i> ${prop.location}
        </div>
        <h2 style="font-family: var(--font-serif); font-size: 2.15rem; color: #FFFFFF; line-height: 1.2;">
          ${prop.title}
        </h2>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <button class="saved-heart-btn ${savedPropertyIds.includes(Number(prop.id)) ? 'is-saved' : ''}" 
                onclick="toggleSaveProperty(${prop.id}, event); this.classList.toggle('is-saved'); this.innerHTML = '<i class=\\'fa' + (savedPropertyIds.includes(Number(${prop.id})) ? 's' : 'r') + ' fa-heart\\'></i>';"
                style="position: static; width: 42px; height: 42px;"
                aria-label="Save property" 
                title="${savedPropertyIds.includes(Number(prop.id)) ? 'Remove from saved' : 'Save to collection'}">
          <i class="${savedPropertyIds.includes(Number(prop.id)) ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <span class="badge-status badge-featured" style="padding: 0.5rem 1.15rem; font-size: 0.85rem;">${prop.status}</span>
        <a href="/foreign-investors" target="_blank" style="text-decoration: none; padding: 0.5rem 1rem; font-size: 0.82rem; font-weight: 700; color: #34D399; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 6px; display: inline-flex; align-items: center; gap: 0.4rem;" title="Foreign Buyer & NRI Acquisition Guide">
          <i class="fas fa-passport"></i> Foreign / NRI Guide
        </a>
      </div>
    </div>

    <div class="property-specs" style="margin: 1.5rem 0; padding: 1.25rem 0; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08);">
      <div class="spec-item" style="font-size: 1rem; color: #CBD3DD;"><i class="fas fa-bed" style="color: var(--color-gold);"></i> ${prop.beds} Bedrooms</div>
      <div class="spec-item" style="font-size: 1rem; color: #CBD3DD;"><i class="fas fa-bath" style="color: var(--color-gold);"></i> ${prop.baths} Bathrooms</div>
      <div class="spec-item" style="font-size: 1rem; color: #CBD3DD;"><i class="fas fa-vector-square" style="color: var(--color-gold);"></i> ${prop.sqft} Living Sq Ft</div>
    </div>

    <h4 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 0.75rem; color: var(--color-gold-light);">Architectural Overview</h4>
    <p style="color: var(--color-text-secondary); line-height: 1.85; margin-bottom: 2rem;">${prop.description}</p>

    <h4 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 0.85rem; color: var(--color-gold-light);">Curated Amenities & Highlights</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2.5rem;">
      ${(prop.amenities || []).map(amenity => `
        <span style="background: rgba(22, 27, 36, 0.85); border: 1px solid rgba(212, 175, 55, 0.25); padding: 0.45rem 1rem; border-radius: var(--radius-xs); font-size: 0.85rem; font-weight: 600; color: #F8F9FA; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-check" style="color: var(--color-emerald); font-size: 0.8rem;"></i> ${amenity}
        </span>
      `).join('')}
    </div>

    <div style="background: var(--color-obsidian-card); padding: 1.5rem; border-radius: var(--radius-sm); border: 1px solid var(--color-gold-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.25rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="/images/prime_logo.png" alt="Prime Property" style="width: 44px; height: 44px; object-fit: contain; filter: drop-shadow(0 0 8px rgba(212,175,55,0.4));">
        <div>
          <div style="font-weight: 700; color: #FFFFFF; font-size: 1rem;">Prime Properties Advisory</div>
          <div style="font-size: 0.825rem; color: var(--color-text-muted);">Direct Client Representative Desk</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap;">
        <button class="btn-outline" onclick="if(window.openVirtualTourModal) { window.openVirtualTourModal('${prop.title.replace(/'/g, "\\'")}'); } else { alert('Loading 360 Tour...'); }" style="padding: 0.8rem 1.4rem; font-size: 0.92rem; border-color: rgba(212,175,55,0.6); color: #FFDF73; background: rgba(212,175,55,0.12); cursor: pointer; border-radius: var(--radius-xs); display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.25s ease; font-weight: 700;">
          <i class="fas fa-vr-cardboard"></i> 360° Virtual Tour
        </button>
        <button class="btn-outline" onclick="closePropertyModal()" style="padding: 0.8rem 1.5rem; font-size: 0.95rem; border-color: rgba(255, 255, 255, 0.2); color: #CBD3DD; background: rgba(255, 255, 255, 0.05); cursor: pointer; border-radius: var(--radius-xs); display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.25s ease;">
          <i class="fas fa-times"></i> Cancel
        </button>
        <button class="btn-primary" onclick="inquireAboutProperty('${prop.title.replace(/'/g, "\\'")}')" style="padding: 0.8rem 1.6rem; font-size: 0.95rem;">
          <i class="fas fa-paper-plane"></i> Inquire on This Estate
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePropertyModal() {
  const modal = document.getElementById('propertyModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Global escape key handler to cancel modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePropertyModal();
    if (typeof closeSavedDrawer === 'function') {
      closeSavedDrawer();
    }
  }
});

function inquireAboutProperty(propertyTitle) {
  closePropertyModal();
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    const select = document.getElementById('formProperty');
    if (select) {
      select.value = propertyTitle;
    }
  }
}

// Filter and Search logic
function setupEventListeners() {
  // Purpose tabs (For Sale / For Rent / All Portfolios)
  const tabs = document.querySelectorAll('.search-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentPurpose = tab.getAttribute('data-purpose') || 'all';
      applyCurrentFilters();
      
      const propSec = document.getElementById('properties');
      if (propSec) {
        propSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Filter pills
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      pills.forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.getAttribute('data-category');
      applyCurrentFilters();
    });
  });

  // Search submit and real-time input filter
  const searchForm = document.getElementById('heroSearchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      applyCurrentFilters();
      const propSec = document.getElementById('properties');
      if (propSec) {
        propSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Live filter as user changes select dropdowns (Location, Type, Price, Beds)
  ['searchLocation', 'searchType', 'searchPrice', 'searchBeds'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        applyCurrentFilters();
      });
      el.addEventListener('input', () => {
        applyCurrentFilters();
      });
    }
  });

  // URL query pre-fill (?search=... or ?location=...)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const qSearch = urlParams.get('search') || urlParams.get('location') || urlParams.get('q');
    if (qSearch) {
      const locEl = document.getElementById('searchLocation');
      if (locEl) {
        locEl.value = qSearch;
        setTimeout(applyCurrentFilters, 120);
      }
    }
  } catch (err) {}

  // Saved collection button in navigation
  const savedBtns = document.querySelectorAll('#savedPropertiesBtn, .saved-btn');
  savedBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSavedDrawer();
    });
  });

  // Mobile menu initialized cleanly via dedicated controller
  if (typeof initGlobalNavigationBar === 'function') {
    initGlobalNavigationBar();
  }

  // Private contact form
  const contactForm = document.getElementById('tourContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;

      try {
        const payload = {
          full_name: document.getElementById('formName').value,
          email: document.getElementById('formEmail').value,
          phone: document.getElementById('formPhone').value,
          looking_for: document.getElementById('formProperty').value + ": " + (document.getElementById('formMessage').value || "")
        };
        await fetch('/api/visitor-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {}

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('Your private portfolio inquiry has been sent to our concierge desk.');
      }, 700);
    });
  }

  // Newsletter
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Thank you for subscribing to Prime Properties Gazette.');
    });
  }
}

function applyCurrentFilters() {
  const locationInput = (document.getElementById('searchLocation')?.value || '').trim().toLowerCase();
  const typeSelect = document.getElementById('searchType')?.value || 'all';
  const priceSelect = document.getElementById('searchPrice')?.value || 'all';
  const bedsSelect = document.getElementById('searchBeds')?.value || 'all';

  const filtered = propertiesData.filter(prop => {
    // 1. Category/Tab Filter (villas, penthouses, saved, all)
    if (currentFilter === 'saved') {
      if (!savedPropertyIds.includes(Number(prop.id))) return false;
    } else if (currentFilter !== 'all') {
      const propCat = (prop.category || '').toLowerCase();
      const propType = (prop.type || '').toLowerCase();
      // Match category directly or treat residential appropriately
      if (propCat !== currentFilter && !propCat.startsWith(currentFilter) && propType !== currentFilter) {
        return false;
      }
    }

    // 2. Purpose (buy / rent / all)
    if (currentPurpose !== 'all') {
      const propPurp = (prop.purpose || 'buy').toLowerCase();
      if (propPurp !== currentPurpose.toLowerCase()) return false;
    }

    // 3. Location Search (matches city, state, address, title, zip code)
    if (locationInput && locationInput !== 'all') {
      const locMatch = (prop.location || '').toLowerCase().includes(locationInput);
      const titleMatch = (prop.title || '').toLowerCase().includes(locationInput);
      const descMatch = (prop.description || '').toLowerCase().includes(locationInput);
      if (!locMatch && !titleMatch && !descMatch) {
        return false;
      }
    }

    // 4. Property Type
    if (typeSelect !== 'all') {
      const pType = (prop.type || '').toLowerCase();
      const pTitle = (prop.title || '').toLowerCase();
      const pDesc = (prop.description || '').toLowerCase();
      // Also allow matching keywords if type is generic RESIDENTIAL
      if (pType !== typeSelect && !pTitle.includes(typeSelect) && !pDesc.includes(typeSelect)) {
        if (typeSelect === 'villa' && !pType.includes('res') && !pTitle.includes('villa')) return false;
        else if (typeSelect !== 'villa') return false;
      }
    }

    // 5. Bedrooms
    if (bedsSelect !== 'all') {
      const minBeds = parseInt(bedsSelect);
      if ((prop.beds || 0) < minBeds) return false;
    }

    // 6. Price Range (works with both INR and USD valuations)
    if (priceSelect !== 'all') {
      const price = Number(prop.priceRaw || 0);
      if (priceSelect === 'under-1cr') {
        // Under ₹1 Crore ($1.2M or ₹10,000,000)
        if (price >= 10000000 && price >= 1200000) return false;
      } else if (priceSelect === '1cr-5cr') {
        // ₹1 Crore to ₹5 Crore ($1.2M - $6M or ₹10,000,000 - ₹50,000,000)
        const isINRMatch = price >= 10000000 && price <= 50000000;
        const isUSDMatch = price >= 1200000 && price <= 6000000;
        if (!isINRMatch && !isUSDMatch) return false;
      } else if (priceSelect === 'over-5cr') {
        // Over ₹5 Crore ($6M+ or ₹50,000,000+)
        if (price <= 50000000 && price <= 6000000) return false;
      }
    }

    return true;
  });

  renderProperties(filtered);
}

function resetSearchFilters() {
  currentFilter = 'all';
  currentPurpose = 'buy';

  document.querySelectorAll('.filter-pill').forEach((p, idx) => {
    if (idx === 0) p.classList.add('active');
    else p.classList.remove('active');
  });

  document.querySelectorAll('.search-tab').forEach((t, idx) => {
    if (idx === 0) t.classList.add('active');
    else t.classList.remove('active');
  });

  const form = document.getElementById('heroSearchForm');
  if (form) form.reset();

  renderProperties(propertiesData);
  showToast("Filters reset to default.");
}

// Toast helper
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-message';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--color-bronze-light); font-size: 1.15rem;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Modal opening functions for Auth
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    initModal3DTilt();
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openRegisterModal() {
  const modal = document.getElementById('registerModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    initModal3DTilt();
  }
}

function closeRegisterModal() {
  const modal = document.getElementById('registerModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 3D Perspective Y-Axis Flip between Login and Register Modals
function switchToRegister() {
  const loginModalOverlay = document.getElementById('loginModal');
  const registerModalOverlay = document.getElementById('registerModal');
  const loginCard = loginModalOverlay ? loginModalOverlay.querySelector('.login-modal') : null;
  const registerCard = registerModalOverlay ? registerModalOverlay.querySelector('.register-modal') : null;

  if (!loginModalOverlay || !registerModalOverlay) {
    if (typeof closeLoginModal === 'function') closeLoginModal();
    if (typeof openRegisterModal === 'function') openRegisterModal();
    return;
  }

  if (!loginCard || !registerCard) {
    loginModalOverlay.classList.remove('active', 'show');
    registerModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    return;
  }

  // Clear previous animations
  loginCard.classList.remove('flip-y-enter', 'flip-y-enter-reverse');
  registerCard.classList.remove('flip-y-exit', 'flip-y-exit-reverse');

  // Trigger 3D Y-axis exit flip on login modal
  loginCard.classList.add('flip-y-exit');

  setTimeout(() => {
    loginModalOverlay.classList.remove('active', 'show');
    loginCard.classList.remove('flip-y-exit');

    // Open register modal with 3D Y-axis enter flip
    registerModalOverlay.classList.add('active');
    registerCard.classList.add('flip-y-enter');
    document.body.style.overflow = 'hidden';
    initModal3DTilt();

    setTimeout(() => {
      registerCard.classList.remove('flip-y-enter');
    }, 650);
  }, 350);
}

function switchToLogin() {
  const loginModalOverlay = document.getElementById('loginModal');
  const registerModalOverlay = document.getElementById('registerModal');
  const loginCard = loginModalOverlay ? loginModalOverlay.querySelector('.login-modal') : null;
  const registerCard = registerModalOverlay ? registerModalOverlay.querySelector('.register-modal') : null;

  if (!loginModalOverlay || !registerModalOverlay) {
    if (typeof closeRegisterModal === 'function') closeRegisterModal();
    if (typeof openLoginModal === 'function') openLoginModal();
    return;
  }

  if (!loginCard || !registerCard) {
    registerModalOverlay.classList.remove('active', 'show');
    loginModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    return;
  }

  // Clear previous animations
  registerCard.classList.remove('flip-y-enter', 'flip-y-enter-reverse');
  loginCard.classList.remove('flip-y-exit', 'flip-y-exit-reverse');

  // Trigger 3D Y-axis reverse exit flip on register modal
  registerCard.classList.add('flip-y-exit-reverse');

  setTimeout(() => {
    registerModalOverlay.classList.remove('active', 'show');
    registerCard.classList.remove('flip-y-exit-reverse');

    // Open login modal with 3D Y-axis reverse enter flip
    loginModalOverlay.classList.add('active');
    loginCard.classList.add('flip-y-enter-reverse');
    document.body.style.overflow = 'hidden';
    initModal3DTilt();

    setTimeout(() => {
      loginCard.classList.remove('flip-y-enter-reverse');
    }, 650);
  }, 350);
}

// Global click event delegation for modal links as an extra safeguard
document.addEventListener('click', (e) => {
  const target = e.target.closest('a');
  if (!target) return;

  const text = (target.textContent || '').trim().toLowerCase();
  const id = target.id || '';

  if (id === 'signupLink' || text.includes('create an account') || text.includes('sign up')) {
    const parentLogin = target.closest('#loginModal, .login-modal');
    if (parentLogin) {
      e.preventDefault();
      e.stopPropagation();
      switchToRegister();
    }
  } else if (id === 'loginLink' || text.includes('log in here') || text.includes('sign in here') || text.includes('already have an account') || text.includes('already registered')) {
    const parentRegister = target.closest('#registerModal, .register-modal');
    if (parentRegister) {
      e.preventDefault();
      e.stopPropagation();
      switchToLogin();
    }
  }
});

// Expose globally to window
window.switchToRegister = switchToRegister;
window.switchToLogin = switchToLogin;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.openRegisterModal = openRegisterModal;
window.closeRegisterModal = closeRegisterModal;

// 3D Parallax Tilt Effect for Auth Modals
function initModal3DTilt() {
  const cards = document.querySelectorAll('.login-modal, .register-modal');
  cards.forEach(card => {
    if (card.dataset.tilt3dBound) return;
    card.dataset.tilt3dBound = 'true';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7; // max 7 deg tilt
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Remember Me & Global Login Handler
document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberCheckbox = document.getElementById('rememberMe');
  const loginForm = document.getElementById('loginForm');

  // Load remembered credentials if present
  try {
    const rememberedEmail = localStorage.getItem('prime_property_remember_email');
    const rememberedPassword = localStorage.getItem('prime_property_remember_password');
    if (rememberedEmail && emailInput) {
      emailInput.value = rememberedEmail;
      if (rememberCheckbox) rememberCheckbox.checked = true;
    }
    if (rememberedPassword && passwordInput) {
      passwordInput.value = rememberedPassword;
    }
  } catch (err) {
    console.debug('Remember Me read error:', err);
  }

  // Password visibility toggle (Eye button & Show password checkbox)
  const togglePasswordBtn = document.getElementById('togglePassword');
  const modalShowPasswordCheckbox = document.getElementById('modalShowPasswordCheckbox');
  const pwdInput = document.getElementById('password');

  function setScriptPwdVisibility(visible) {
    if (!pwdInput) return;
    pwdInput.setAttribute('type', visible ? 'text' : 'password');
    if (togglePasswordBtn) {
      togglePasswordBtn.innerHTML = visible ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
      togglePasswordBtn.setAttribute('title', visible ? 'Hide password' : 'Show password');
      togglePasswordBtn.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
    }
    if (modalShowPasswordCheckbox && modalShowPasswordCheckbox.checked !== visible) {
      modalShowPasswordCheckbox.checked = visible;
    }
  }

  if (togglePasswordBtn && !togglePasswordBtn.dataset.bound) {
    togglePasswordBtn.dataset.bound = 'true';
    togglePasswordBtn.setAttribute('title', 'Show password');
    togglePasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (pwdInput) {
        const willShow = pwdInput.getAttribute('type') === 'password';
        setScriptPwdVisibility(willShow);
      }
    });
  }

  if (modalShowPasswordCheckbox && !modalShowPasswordCheckbox.dataset.bound) {
    modalShowPasswordCheckbox.dataset.bound = 'true';
    modalShowPasswordCheckbox.addEventListener('change', function () {
      setScriptPwdVisibility(this.checked);
    });
  }

  // Bind login form across pages that load script.js
  
  function showLoginError(msg) {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    let alertBox = document.getElementById('loginErrorAlert');
    if (!alertBox) {
      alertBox = document.createElement('div');
      alertBox.id = 'loginErrorAlert';
      alertBox.className = 'login-error-alert';
      loginForm.insertBefore(alertBox, loginForm.firstChild);
    }

    alertBox.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span>${msg}</span>`;
    alertBox.classList.add('show');

    const pwdInput = document.getElementById('password');
    if (pwdInput) {
      pwdInput.style.borderColor = '#DC2626';
      pwdInput.focus();
    }
  }

  function clearLoginError() {
    const alertBox = document.getElementById('loginErrorAlert');
    if (alertBox) {
      alertBox.classList.remove('show');
      alertBox.innerHTML = '';
    }
    const pwdInput = document.getElementById('password');
    if (pwdInput) {
      pwdInput.style.borderColor = '';
    }
  }

  if (loginForm && !loginForm.dataset.listenerAttached) {
    loginForm.dataset.listenerAttached = 'true';
    if (emailInput) emailInput.addEventListener('input', clearLoginError);
    if (passwordInput) passwordInput.addEventListener('input', clearLoginError);

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearLoginError();
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';
      const remember = rememberCheckbox ? rememberCheckbox.checked : false;
      const submitBtn = loginForm.querySelector('.modal-btn');
      const originalText = submitBtn ? submitBtn.textContent : 'Sign In';

      if (submitBtn) {
        submitBtn.textContent = 'Authenticating...';
        submitBtn.disabled = true;
      }

      try {
        if (typeof authManager !== 'undefined') {
          const res = await authManager.login(email, password);
          if (res.success) {
            if (remember) {
              localStorage.setItem('prime_property_remember_email', email);
              localStorage.setItem('prime_property_remember_password', password);
            } else {
              localStorage.removeItem('prime_property_remember_email');
              localStorage.removeItem('prime_property_remember_password');
            }

            if (typeof showToast === 'function') {
              showToast('Welcome back, ' + (res.user.first_name || 'Member') + '!');
            }
            closeLoginModal();

            setTimeout(() => {
              if (res.user.user_type === 'admin' || res.user.is_admin) {
                window.location.href = '/admin-dashboard';
              } else if (res.user.user_type === 'owner') {
                window.location.href = '/owner-profile';
              } else if (res.user.user_type === 'consultant') {
                window.location.href = '/consultant-profile';
              } else {
                window.location.href = '/user-dashboard';
              }
            }, 600);
          } else {
            showLoginError(res.error || 'Incorrect email or password. Please try again.');
          }
        }
      } catch (err) {
        showLoginError('Unable to connect to authentication server. Please try again later.');
      } finally {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }

  // Registration tabs switcher (Buyer, Owner, Consultant)
  const buyerTypeBtn = document.getElementById('buyerTypeBtn');
  const ownerTypeBtn = document.getElementById('ownerTypeBtn');
  const consultantTypeBtn = document.getElementById('consultantTypeBtn');
  const buyerForm = document.getElementById('buyerForm');
  const ownerForm = document.getElementById('ownerForm');
  const consultantForm = document.getElementById('consultantForm');

  function switchRegisterTab(activeBtn, activeForm) {
    [buyerTypeBtn, ownerTypeBtn, consultantTypeBtn].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });
    [buyerForm, ownerForm, consultantForm].forEach(form => {
      if (form) form.classList.remove('active');
    });
    if (activeBtn) activeBtn.classList.add('active');
    if (activeForm) activeForm.classList.add('active');
  }

  if (buyerTypeBtn) {
    buyerTypeBtn.addEventListener('click', () => switchRegisterTab(buyerTypeBtn, buyerForm));
  }
  if (ownerTypeBtn) {
    ownerTypeBtn.addEventListener('click', () => switchRegisterTab(ownerTypeBtn, ownerForm));
  }
  if (consultantTypeBtn) {
    consultantTypeBtn.addEventListener('click', () => switchRegisterTab(consultantTypeBtn, consultantForm));
  }

  // Global Consultant Registration Handler
  if (consultantForm && !consultantForm.dataset.listenerAttached) {
    consultantForm.dataset.listenerAttached = 'true';
    consultantForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const p1 = document.getElementById('consultantPassword')?.value || '';
      const p2Input = document.getElementById('consultantConfirmPassword');
      if (p2Input && p1 !== p2Input.value) {
        if (typeof showToast === 'function') showToast('Passwords do not match');
        else alert('Passwords do not match');
        return;
      }

      const submitBtn = consultantForm.querySelector('.modal-btn');
      const origText = submitBtn ? submitBtn.textContent : 'Create Account';
      if (submitBtn) {
        submitBtn.textContent = 'Registering...';
        submitBtn.disabled = true;
      }

      const payload = {
        first_name: document.getElementById('consultantFirstName')?.value.trim() || '',
        last_name: document.getElementById('consultantLastName')?.value.trim() || '',
        email: document.getElementById('consultantEmail')?.value.trim() || '',
        phone: document.getElementById('consultantPhone')?.value.trim() || '',
        password: p1,
        user_type: 'consultant'
      };

      try {
        console.log('[Register Consultant] Submitting payload:', payload);
        if (typeof authManager !== 'undefined') {
          const res = await authManager.register(payload);
          console.log('[Register Consultant] Response received:', res);
          if (res.success) {
            const successMsg = 'Consultant account registered! Please log in.';
            if (typeof showToast === 'function') showToast(successMsg);
            else alert(successMsg);
            closeRegisterModal();
            openLoginModal();
          } else {
            const errMsg = res.error || 'Registration failed';
            console.error('[Register Consultant] Failed:', errMsg);
            alert(errMsg);
            if (typeof showToast === 'function') showToast(errMsg);
          }
        } else {
          alert('Authentication service is not loaded.');
        }
      } catch (err) {
        console.error('[Register Consultant] Unexpected error:', err);
        alert('Registration error: ' + (err.message || 'Network error'));
        if (typeof showToast === 'function') showToast('Registration error occurred');
      } finally {
        if (submitBtn) {
          submitBtn.textContent = origText;
          submitBtn.disabled = false;
        }
      }
    });
  }

  // Global Owner Registration Handler
  if (ownerForm && !ownerForm.dataset.listenerAttached) {
    ownerForm.dataset.listenerAttached = 'true';
    ownerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const p1 = document.getElementById('ownerPassword')?.value || '';
      const p2Input = document.getElementById('ownerConfirmPassword');
      if (p2Input && p1 !== p2Input.value) {
        if (typeof showToast === 'function') showToast('Passwords do not match');
        else alert('Passwords do not match');
        return;
      }

      const submitBtn = ownerForm.querySelector('.modal-btn');
      const origText = submitBtn ? submitBtn.textContent : 'Create Account';
      if (submitBtn) {
        submitBtn.textContent = 'Registering...';
        submitBtn.disabled = true;
      }

      const yesBtn = document.getElementById('isForeignerYes');
      const isForeign = yesBtn?.classList.contains('is-active') || 
                        yesBtn?.style.background.includes('FFDF73') || 
                        yesBtn?.style.background.includes('rgb');
      const residenceCountry = document.getElementById('residenceCountry')?.value || (isForeign ? 'United States' : 'India');
      const targetCountry = document.getElementById('targetPurchaseCountry')?.value || 'India';
      const citizenshipStatus = document.getElementById('citizenshipStatus')?.value || (isForeign ? 'nri' : 'local');

      const payload = {
        first_name: document.getElementById('ownerFirstName')?.value.trim() || '',
        last_name: document.getElementById('ownerLastName')?.value.trim() || '',
        email: document.getElementById('ownerEmail')?.value.trim() || '',
        phone: document.getElementById('ownerPhone')?.value.trim() || '',
        company: document.getElementById('ownerCompany')?.value.trim() || '',
        property_count: document.getElementById('ownerPropertyCount')?.value || '1-5',
        location: document.getElementById('ownerLocation')?.value.trim() || '',
        subscription_plan: document.getElementById('subscriptionPlan')?.value || 'Executive',
        residence_country: residenceCountry,
        target_purchase_country: targetCountry,
        citizenship_status: citizenshipStatus,
        password: p1,
        user_type: 'owner'
      };

      try {
        console.log('[Register] Submitting registration payload:', payload);
        if (typeof authManager !== 'undefined') {
          const res = await authManager.register(payload);
          console.log('[Register] Response received:', res);
          if (res.success) {
            const successMsg = 'Account registered successfully! Please log in.';
            if (typeof showToast === 'function') showToast(successMsg);
            else alert(successMsg);
            closeRegisterModal();
            openLoginModal();
          } else {
            const errMsg = res.error || 'Registration failed';
            console.error('[Register] Failed:', errMsg);
            alert(errMsg);
            if (typeof showToast === 'function') showToast(errMsg);
          }
        } else {
          alert('Authentication service is not loaded.');
        }
      } catch (err) {
        console.error('[Register] Unexpected error:', err);
        alert('Registration error: ' + (err.message || 'Network error'));
        if (typeof showToast === 'function') showToast('Registration error occurred');
      } finally {
        if (submitBtn) {
          submitBtn.textContent = origText;
          submitBtn.disabled = false;
        }
      }
    });
  }

  // Global Buyer / Investor Registration Handler
  if (buyerForm && !buyerForm.dataset.listenerAttached) {
    buyerForm.dataset.listenerAttached = 'true';
    buyerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const p1 = document.getElementById('buyerPassword')?.value || '';
      const p2Input = document.getElementById('buyerConfirmPassword');
      if (p2Input && p1 !== p2Input.value) {
        if (typeof showToast === 'function') showToast('Passwords do not match');
        else alert('Passwords do not match');
        return;
      }

      const submitBtn = buyerForm.querySelector('.modal-btn');
      const origText = submitBtn ? submitBtn.textContent : 'Create Account';
      if (submitBtn) {
        submitBtn.textContent = 'Registering Buyer...';
        submitBtn.disabled = true;
      }

      const yesBtn = document.getElementById('buyerIsForeignerYes');
      const isForeign = yesBtn?.classList.contains('is-active') || 
                        yesBtn?.style.background.includes('FFDF73') || 
                        yesBtn?.style.background.includes('rgb');
      const residenceCountry = document.getElementById('buyerResidenceCountry')?.value || (isForeign ? 'United States' : 'India');
      const targetCountry = document.getElementById('buyerTargetPurchaseCountry')?.value || 'India';
      const citizenshipStatus = document.getElementById('buyerCitizenshipStatus')?.value || (isForeign ? 'nri' : 'local');

      const payload = {
        first_name: document.getElementById('buyerFirstName')?.value.trim() || '',
        last_name: document.getElementById('buyerLastName')?.value.trim() || '',
        email: document.getElementById('buyerEmail')?.value.trim() || '',
        phone: document.getElementById('buyerPhone')?.value.trim() || '',
        location: document.getElementById('buyerPreferredCity')?.value.trim() || 'Global',
        subscription_plan: 'Buyer Executive',
        residence_country: residenceCountry,
        target_purchase_country: targetCountry,
        citizenship_status: citizenshipStatus,
        password: p1,
        user_type: 'buyer'
      };

      try {
        console.log('[Register Buyer] Submitting payload:', payload);
        if (typeof authManager !== 'undefined') {
          const res = await authManager.register(payload);
          console.log('[Register Buyer] Response received:', res);
          if (res.success) {
            const successMsg = 'Buyer account registered successfully! Please log in.';
            if (typeof showToast === 'function') showToast(successMsg);
            else alert(successMsg);
            closeRegisterModal();
            openLoginModal();
          } else {
            const errMsg = res.error || 'Registration failed';
            console.error('[Register Buyer] Failed:', errMsg);
            alert(errMsg);
            if (typeof showToast === 'function') showToast(errMsg);
          }
        } else {
          alert('Authentication service is not loaded.');
        }
      } catch (err) {
        console.error('[Register Buyer] Unexpected error:', err);
        alert('Registration error: ' + (err.message || 'Network error'));
        if (typeof showToast === 'function') showToast('Registration error occurred');
      } finally {
        if (submitBtn) {
          submitBtn.textContent = origText;
          submitBtn.disabled = false;
        }
      }
    });
  }
});

// Interactive Contact Suite Inquiry Type Switcher
function switchInquiryType(btn, typeName) {
  const tabs = document.querySelectorAll('.inquiry-tab');
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const textarea = document.getElementById('formMessage');
  if (textarea) {
    if (typeName === 'Private Tour') {
      textarea.placeholder = 'Please specify your preferred viewing dates, privacy escort requirements, or virtual walkthrough preferences...';
    } else if (typeName === 'Portfolio Acquisition') {
      textarea.placeholder = 'Specify your acquisition timeline, target budget (e.g. $10M - $50M), or 1031 exchange requirements...';
    } else {
      textarea.placeholder = 'Describe your architectural interests (e.g. Mid-Century Modern, Cantilevered Waterfront, Sustainable LEED Platinum)...';
    }
  }
}

// Quick Filter Hero Portfolios
function quickFilterHero(tag) {
  const typeSelect = document.getElementById('searchType');
  const locationSelect = document.getElementById('searchLocation');
  
  if (tag === 'bangalore' && locationSelect) {
    locationSelect.value = 'bangalore';
  } else if (typeSelect) {
    if (tag === 'waterfront') typeSelect.value = 'waterfront';
    else if (tag === 'penthouse') typeSelect.value = 'penthouse';
    else if (tag === 'villa') typeSelect.value = 'villa';
  }

  // Also activate matching category pill in properties section if present
  const categoryPills = document.querySelectorAll('.filter-pill');
  categoryPills.forEach(pill => {
    const cat = pill.getAttribute('data-category');
    if ((tag === 'villa' && cat === 'villas') || 
        (tag === 'penthouse' && cat === 'penthouses') || 
        (tag === 'waterfront' && cat === 'waterfront')) {
      pill.click();
    }
  });

  // Smooth scroll down to curated listings
  const propSection = document.getElementById('properties');
  if (propSection) {
    propSection.scrollIntoView({ behavior: 'smooth' });
  }
}

