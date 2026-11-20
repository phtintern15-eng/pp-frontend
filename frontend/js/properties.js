// Real-Time Device Auto-Detection
    (function detectDeviceMode() {
      function checkDevice() {
        const isMobileScreen = window.innerWidth <= 768;
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

      // Mobile Menu Toggle logic
      function initPropertiesNav() {
        const toggleBtn = document.getElementById('mobileMenuToggle');
        const navList = document.getElementById('navLinks');
        if (toggleBtn && navList) {
          function openDrawer() {
            navList.classList.add('mobile-open');
            navList.classList.add('open');
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-times';
            document.body.classList.add('mobile-nav-open');
          }
          function closeDrawer() {
            navList.classList.remove('mobile-open');
            navList.classList.remove('open');
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
            document.body.classList.remove('mobile-nav-open');
          }
          toggleBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (navList.classList.contains('mobile-open') || navList.classList.contains('open')) {
              closeDrawer();
            } else {
              openDrawer();
            }
          };

          const closeBtn = document.getElementById('mobileDrawerClose');
          if (closeBtn) {
            closeBtn.onclick = function(e) {
              e.preventDefault();
              e.stopPropagation();
              closeDrawer();
            };
          }

          document.addEventListener('click', function(e) {
            if (navList.classList.contains('mobile-open') || navList.classList.contains('open')) {
              if (!navList.contains(e.target) && !toggleBtn.contains(e.target)) {
                closeDrawer();
              }
            }
          });

          navList.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
              closeDrawer();
            });
          });
        }
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPropertiesNav);
      } else {
        initPropertiesNav();
      }
    })();

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

    // Role selector tabs inside register modal (Buyer, Owner, Consultant)
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

    // Foreign Buyer Mode Toggle
    window.setForeignBuyerMode = function(isForeign, prefix = '') {
      const yesId = prefix ? prefix + 'IsForeignerYes' : 'isForeignerYes';
      const noId = prefix ? prefix + 'IsForeignerNo' : 'isForeignerNo';
      const containerId = prefix ? prefix + 'ForeignFieldsContainer' : 'foreignFieldsContainer';

      const yesBtn = document.getElementById(yesId);
      const noBtn = document.getElementById(noId);
      const container = document.getElementById(containerId);

      if (yesBtn && noBtn) {
        if (isForeign) {
          yesBtn.classList.add('is-active');
          noBtn.classList.remove('is-active');
          if (container) container.style.display = 'block';
        } else {
          noBtn.classList.add('is-active');
          yesBtn.classList.remove('is-active');
          if (container) container.style.display = 'none';
        }
      }
    };

    // Foreign Buyer Questionnaire Yes/No Option Toggler
    window.toggleQuizOption = function(btn, questionKey, answer) {
      const parent = btn.closest('.foreign-quiz-options');
      if (parent) {
        parent.querySelectorAll('.foreign-quiz-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const hiddenInput = document.getElementById('quiz_' + questionKey);
        if (hiddenInput) {
          hiddenInput.value = answer;
        }
      }
    };

    // Attach listeners for tabs & registration form submissions
    function setupRegistrationLogic() {
      const buyerBtn = document.getElementById('buyerTypeBtn');
      const ownerBtn = document.getElementById('ownerTypeBtn');
      const consultantBtn = document.getElementById('consultantTypeBtn');

      if (buyerBtn) buyerBtn.onclick = () => selectUserType('buyer');
      if (ownerBtn) ownerBtn.onclick = () => selectUserType('owner');
      if (consultantBtn) consultantBtn.onclick = () => selectUserType('consultant');

      // 1. Buyer Form Submission
      const buyerForm = document.getElementById('buyerForm');
      if (buyerForm && !buyerForm.dataset.listenerAttached) {
        buyerForm.dataset.listenerAttached = 'true';
        buyerForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          const p1 = document.getElementById('buyerPassword')?.value || '';
          const p2 = document.getElementById('buyerConfirmPassword')?.value || '';
          if (p1 !== p2) {
            alert('Passwords do not match');
            return;
          }

          const submitBtn = buyerForm.querySelector('.modal-btn');
          const origText = submitBtn ? submitBtn.textContent : 'Create Buyer Account';
          if (submitBtn) {
            submitBtn.textContent = 'Registering Buyer...';
            submitBtn.disabled = true;
          }

          const yesBtn = document.getElementById('buyerIsForeignerYes');
          const isForeign = yesBtn?.classList.contains('is-active');
          const payload = {
            first_name: document.getElementById('buyerFirstName')?.value.trim() || '',
            last_name: document.getElementById('buyerLastName')?.value.trim() || '',
            email: document.getElementById('buyerEmail')?.value.trim() || '',
            phone: document.getElementById('buyerPhone')?.value.trim() || '',
            location: document.getElementById('buyerPreferredCity')?.value.trim() || 'Global',
            subscription_plan: 'Buyer Executive',
            residence_country: document.getElementById('buyerResidenceCountry')?.value || (isForeign ? 'United States' : 'India'),
            target_purchase_country: document.getElementById('buyerTargetPurchaseCountry')?.value || 'India',
            citizenship_status: document.getElementById('buyerCitizenshipStatus')?.value || (isForeign ? 'nri' : 'local'),
            password: p1,
            user_type: 'buyer'
          };

          try {
            if (typeof authManager !== 'undefined') {
              const res = await authManager.register(payload);
              if (res.success) {
                alert('Registration successful! Please sign in with your credentials.');
                closeRegisterModal();
                openLoginModal();
              } else {
                alert(res.error || 'Registration failed');
              }
            } else {
              alert('Auth service unavailable.');
            }
          } catch (err) {
            alert('Registration error: ' + (err.message || 'Network error'));
          } finally {
            if (submitBtn) {
              submitBtn.textContent = origText;
              submitBtn.disabled = false;
            }
          }
        });
      }

      // 2. Owner Form Submission
      const ownerForm = document.getElementById('ownerForm');
      if (ownerForm && !ownerForm.dataset.listenerAttached) {
        ownerForm.dataset.listenerAttached = 'true';
        ownerForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          const p1 = document.getElementById('ownerPassword')?.value || '';
          const p2 = document.getElementById('ownerConfirmPassword')?.value || '';
          if (p1 !== p2) {
            alert('Passwords do not match');
            return;
          }

          const submitBtn = ownerForm.querySelector('.modal-btn');
          const origText = submitBtn ? submitBtn.textContent : 'Create Owner Account';
          if (submitBtn) {
            submitBtn.textContent = 'Registering Owner...';
            submitBtn.disabled = true;
          }

          const yesBtn = document.getElementById('isForeignerYes');
          const isForeign = yesBtn?.classList.contains('is-active');
          const payload = {
            first_name: document.getElementById('ownerFirstName')?.value.trim() || '',
            last_name: document.getElementById('ownerLastName')?.value.trim() || '',
            email: document.getElementById('ownerEmail')?.value.trim() || '',
            phone: document.getElementById('ownerPhone')?.value.trim() || '',
            company: document.getElementById('ownerCompany')?.value.trim() || '',
            property_count: document.getElementById('ownerPropertyCount')?.value || '1-5',
            location: document.getElementById('ownerLocation')?.value.trim() || '',
            subscription_plan: document.getElementById('subscriptionPlan')?.value || 'Executive',
            residence_country: document.getElementById('residenceCountry')?.value || (isForeign ? 'United States' : 'India'),
            target_purchase_country: document.getElementById('targetPurchaseCountry')?.value || 'India',
            citizenship_status: document.getElementById('citizenshipStatus')?.value || (isForeign ? 'nri' : 'local'),
            password: p1,
            user_type: 'owner'
          };

          try {
            if (typeof authManager !== 'undefined') {
              const res = await authManager.register(payload);
              if (res.success) {
                alert('Owner account created! Please sign in.');
                closeRegisterModal();
                openLoginModal();
              } else {
                alert(res.error || 'Registration failed');
              }
            } else {
              alert('Auth service unavailable.');
            }
          } catch (err) {
            alert('Registration error: ' + (err.message || 'Network error'));
          } finally {
            if (submitBtn) {
              submitBtn.textContent = origText;
              submitBtn.disabled = false;
            }
          }
        });
      }

      // 3. Consultant Form Submission
      const consultantForm = document.getElementById('consultantForm');
      if (consultantForm && !consultantForm.dataset.listenerAttached) {
        consultantForm.dataset.listenerAttached = 'true';
        consultantForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          const p1 = document.getElementById('consultantPassword')?.value || '';
          const p2 = document.getElementById('consultantConfirmPassword')?.value || '';
          if (p1 !== p2) {
            alert('Passwords do not match');
            return;
          }

          const submitBtn = consultantForm.querySelector('.modal-btn');
          const origText = submitBtn ? submitBtn.textContent : 'Create Consultant Account';
          if (submitBtn) {
            submitBtn.textContent = 'Registering Consultant...';
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
            if (typeof authManager !== 'undefined') {
              const res = await authManager.register(payload);
              if (res.success) {
                alert('Consultant account created! Please sign in.');
                closeRegisterModal();
                openLoginModal();
              } else {
                alert(res.error || 'Registration failed');
              }
            } else {
              alert('Auth service unavailable.');
            }
          } catch (err) {
            alert('Registration error: ' + (err.message || 'Network error'));
          } finally {
            if (submitBtn) {
              submitBtn.textContent = origText;
              submitBtn.disabled = false;
            }
          }
        });
      }

      // 4. Login Form Submission
      const loginForm = document.getElementById('loginForm');
      if (loginForm && !loginForm.dataset.listenerAttached) {
        loginForm.dataset.listenerAttached = 'true';
        loginForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          const email = document.getElementById('email')?.value.trim() || '';
          const password = document.getElementById('password')?.value || '';
          const remember = document.getElementById('rememberMe')?.checked || false;
          const submitBtn = loginForm.querySelector('.modal-btn');
          const origText = submitBtn ? submitBtn.textContent : 'Sign In to Portfolio';

          if (submitBtn) {
            submitBtn.textContent = 'Signing in...';
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
                alert('Welcome back, ' + (res.user.first_name || 'Member') + '!');
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
                }, 400);
              } else {
                let alertBox = document.getElementById('loginErrorAlert');
                if (!alertBox) {
                  alertBox = document.createElement('div');
                  alertBox.id = 'loginErrorAlert';
                  alertBox.className = 'login-error-alert';
                  loginForm.insertBefore(alertBox, loginForm.firstChild);
                }
                alertBox.innerHTML = '<i class="fas fa-exclamation-circle"></i> <span>' + (res.error || 'Incorrect email or password. Please try again.') + '</span>';
                alertBox.classList.add('show');
                const pwdInput = document.getElementById('password');
                if (pwdInput) { pwdInput.style.borderColor = '#DC2626'; pwdInput.focus(); }
              }
            } else {
              alert('Auth service unavailable.');
            }
          } catch (err) {
            let alertBox = document.getElementById('loginErrorAlert');
            if (alertBox) {
              alertBox.innerHTML = '<i class="fas fa-exclamation-circle"></i> <span>' + (err.message || 'Network error') + '</span>';
              alertBox.classList.add('show');
            } else {
              alert('Login error: ' + (err.message || 'Network error'));
            }
          } finally {
            if (submitBtn) {
              submitBtn.textContent = origText;
              submitBtn.disabled = false;
            }
          }
        });
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupRegistrationLogic);
    } else {
      setupRegistrationLogic();
    }

    // Close on backdrop click
    document.addEventListener('DOMContentLoaded', function() {
      const loginModal = document.getElementById('loginModal');
      const registerModal = document.getElementById('registerModal');
      
      if (loginModal) {
        loginModal.addEventListener('click', function(e) {
          if (e.target === loginModal) closeLoginModal();
        });
      }
      if (registerModal) {
        registerModal.addEventListener('click', function(e) {
          if (e.target === registerModal) closeRegisterModal();
        });
      }
    });

// Properties Page Background Slider Rotation (Exact Home Page Timing & Preload)
      (function initPropertiesHeroSlider() {
        const slides = document.querySelectorAll('.properties-hero-slide');
        if (!slides || slides.length === 0) return;
        let currentSlide = 0;
        const slideDuration = 3500; // 3.5 seconds like Home Page

        function nextSlide() {
          slides[currentSlide].classList.remove('active');
          currentSlide = (currentSlide + 1) % slides.length;
          slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideDuration);
      })();
