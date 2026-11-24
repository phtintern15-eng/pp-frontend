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

    // Attach listeners on DOM ready
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
