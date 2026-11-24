function calculateYield() {
      const curr = document.getElementById('calcCurrency') ? document.getElementById('calcCurrency').value : 'USD';
      const symbols = { USD: '$', AED: 'AED ', EUR: '€', GBP: '£', SGD: 'S$', INR: '₹' };
      const sym = symbols[curr] || '$';

      const price = parseFloat(document.getElementById('calcPriceUSD').value) || 0;
      const grossYield = parseFloat(document.getElementById('calcRentYield').value) || 0;
      const years = parseInt(document.getElementById('calcHorizon').value) || 1;
      const capGrowth = parseFloat(document.getElementById('calcCapGrowth').value) || 0;
      const expenses = parseFloat(document.getElementById('calcExpenses').value) || 0;

      // Net Yield % = Gross Yield - Maintenance/Taxes
      const netYield = Math.max(0, grossYield - expenses);
      const annualRentNet = price * (netYield / 100);
      const cumulativeRent = annualRentNet * years;

      // Compounded Capital Appreciation
      const exitValue = price * Math.pow(1 + (capGrowth / 100), years);
      const capitalGains = exitValue - price;

      const totalNetGain = cumulativeRent + capitalGains;
      const totalROI = price > 0 ? ((totalNetGain / price) * 100) : 0;

      document.getElementById('outAnnualRent').innerText = sym + Math.round(annualRentNet).toLocaleString() + ' / yr';
      document.getElementById('outExitValue').innerText = sym + Math.round(exitValue).toLocaleString();
      document.getElementById('outTotalReturns').innerText = sym + Math.round(totalNetGain).toLocaleString();
      document.getElementById('outTotalROI').innerText = '+' + totalROI.toFixed(1) + '%';
    }

    document.addEventListener('DOMContentLoaded', () => {
      calculateYield();
      initFemaTableInteractions();
    });

    // Modal Open & Close Functions
    function openLoginModal() {
      const modal = document.getElementById('loginModal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
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
      }
    }

    function closeRegisterModal() {
      const modal = document.getElementById('registerModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    function switchToRegister() {
      closeLoginModal();
      openRegisterModal();
    }

    function switchToLogin() {
      closeRegisterModal();
      openLoginModal();
    }

    // Role tabs switcher
    function selectUserType(type) {
      const buyerForm = document.getElementById('buyerForm');
      const ownerForm = document.getElementById('ownerForm');
      const consultantForm = document.getElementById('consultantForm');
      const buyerBtn = document.getElementById('buyerTypeBtn');
      const ownerBtn = document.getElementById('ownerTypeBtn');
      const consultantBtn = document.getElementById('consultantTypeBtn');
      
      [buyerBtn, ownerBtn, consultantBtn].forEach(b => { if (b) b.classList.remove('active'); });
      [buyerForm, ownerForm, consultantForm].forEach(f => { if (f) f.classList.remove('active'); });

      if (type === 'buyer') {
        if (buyerBtn) buyerBtn.classList.add('active');
        if (buyerForm) buyerForm.classList.add('active');
      } else if (type === 'owner') {
        if (ownerBtn) ownerBtn.classList.add('active');
        if (ownerForm) ownerForm.classList.add('active');
      } else if (type === 'consultant') {
        if (consultantBtn) consultantBtn.classList.add('active');
        if (consultantForm) consultantForm.classList.add('active');
      }
    }

    // Attach registration listeners & backdrop close
    document.addEventListener('DOMContentLoaded', () => {
      const buyerBtn = document.getElementById('buyerTypeBtn');
      const ownerBtn = document.getElementById('ownerTypeBtn');
      const consultantBtn = document.getElementById('consultantTypeBtn');

      if (buyerBtn) buyerBtn.onclick = () => selectUserType('buyer');
      if (ownerBtn) ownerBtn.onclick = () => selectUserType('owner');
      if (consultantBtn) consultantBtn.onclick = () => selectUserType('consultant');

      const loginModal = document.getElementById('loginModal');
      const registerModal = document.getElementById('registerModal');
      if (loginModal) {
        loginModal.addEventListener('click', (e) => {
          if (e.target === loginModal) closeLoginModal();
        });
      }
      if (registerModal) {
        registerModal.addEventListener('click', (e) => {
          if (e.target === registerModal) closeRegisterModal();
        });
      }
    });

// ==========================================================================
// FEMA Statutory Matrix Interactive Scrolling & Drag Controls
// ==========================================================================
function scrollFemaTable(offset) {
  const container = document.getElementById('femaTableContainer');
  if (container) {
    container.scrollBy({ left: offset, behavior: 'smooth' });
  }
}

function updateFemaScrollIndicators() {
  const container = document.getElementById('femaTableContainer');
  if (!container) return;
  const leftBtn = document.getElementById('femaScrollLeftBtn');
  const rightBtn = document.getElementById('femaScrollRightBtn');
  const thumbVisual = document.getElementById('femaScrollThumbVisual');
  
  const maxScroll = container.scrollWidth - container.clientWidth;
  if (maxScroll <= 0) {
    if (leftBtn) leftBtn.style.opacity = '0.4';
    if (rightBtn) rightBtn.style.opacity = '0.4';
    if (thumbVisual) {
      thumbVisual.style.width = '100%';
      thumbVisual.style.transform = 'translateX(0)';
    }
    return;
  }
  
  const scrollLeft = container.scrollLeft;
  if (leftBtn) leftBtn.style.opacity = scrollLeft <= 8 ? '0.35' : '1';
  if (rightBtn) rightBtn.style.opacity = scrollLeft >= maxScroll - 8 ? '0.35' : '1';
  
  if (thumbVisual) {
    const ratio = container.clientWidth / container.scrollWidth;
    const progress = Math.min(1, Math.max(0, scrollLeft / maxScroll));
    const thumbWidth = Math.max(25, ratio * 100);
    const maxTranslatePercent = (100 - thumbWidth);
    thumbVisual.style.width = thumbWidth + '%';
    thumbVisual.style.transform = `translateX(${progress * (container.clientWidth > 0 ? (140 * (maxTranslatePercent / 100)) : 0)}px)`;
  }
}

function initFemaTableInteractions() {
  const container = document.getElementById('femaTableContainer');
  if (!container) return;

  // 1. Mouse Drag-to-Scroll
  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;

  container.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Only primary mouse button
    isDown = true;
    container.classList.add('is-dragging');
    startX = e.pageX - container.offsetLeft;
    startScrollLeft = container.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      container.classList.remove('is-dragging');
    }
  });

  container.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      container.classList.remove('is-dragging');
    }
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = startScrollLeft - walk;
    updateFemaScrollIndicators();
  });

  // 2. Mouse Wheel Translation (Vertical wheel over table scrolls horizontally)
  container.addEventListener('wheel', (e) => {
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll > 2 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const atLeft = container.scrollLeft <= 0;
      const atRight = container.scrollLeft >= maxScroll - 2;
      if ((e.deltaY > 0 && !atRight) || (e.deltaY < 0 && !atLeft)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 1.1;
        updateFemaScrollIndicators();
      }
    }
  }, { passive: false });

  // 3. Keyboard Arrow Navigation
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollFemaTable(180);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollFemaTable(-180);
    }
  });

  // 4. Scroll & Resize Events
  container.addEventListener('scroll', updateFemaScrollIndicators, { passive: true });
  window.addEventListener('resize', updateFemaScrollIndicators, { passive: true });
  updateFemaScrollIndicators();
}
