/**
 * login.js — Dedicated Client-Side Controller for Login Page
 * Conforming strictly to Project Architecture Standard
 */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberCheckbox = document.getElementById("rememberMe");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const showPasswordCheckbox = document.getElementById("showPasswordCheckbox");
  const errorAlert = document.getElementById("loginErrorAlert");
  const submitBtn = document.getElementById("loginSubmitBtn");

  // 1. Password Visibility Controller (Synchronizing Eye Icon Button & Checkbox)
  function setPasswordVisibility(visible) {
    if (!passwordInput) return;
    passwordInput.setAttribute("type", visible ? "text" : "password");

    if (togglePasswordBtn) {
      togglePasswordBtn.innerHTML = visible
        ? '<i class="fas fa-eye-slash"></i>'
        : '<i class="fas fa-eye"></i>';
      togglePasswordBtn.setAttribute("aria-label", visible ? "Hide password" : "Show password");
      togglePasswordBtn.setAttribute("title", visible ? "Hide password" : "Show password");
    }

    if (showPasswordCheckbox && showPasswordCheckbox.checked !== visible) {
      showPasswordCheckbox.checked = visible;
    }
  }

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.setAttribute("title", "Show password");
    togglePasswordBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const isCurrentlyVisible = passwordInput.getAttribute("type") === "text";
      setPasswordVisibility(!isCurrentlyVisible);
    });
  }

  if (showPasswordCheckbox && passwordInput) {
    showPasswordCheckbox.addEventListener("change", function () {
      setPasswordVisibility(this.checked);
    });
  }

  // 2. Load Remembered Credentials
  try {
    const rememberedEmail = localStorage.getItem("prime_property_remember_email");
    const rememberedPassword = localStorage.getItem("prime_property_remember_password");
    if (rememberedEmail && emailInput) {
      emailInput.value = rememberedEmail;
      if (rememberCheckbox) rememberCheckbox.checked = true;
    }
    if (rememberedPassword && passwordInput) {
      passwordInput.value = rememberedPassword;
    }
  } catch (err) {
    console.debug("Remember Me read exception:", err);
  }

  // 3. Clear errors on input
  function clearError() {
    if (errorAlert) {
      errorAlert.classList.remove("show");
      errorAlert.innerHTML = "";
    }
    if (passwordInput) passwordInput.style.borderColor = "";
    if (emailInput) emailInput.style.borderColor = "";
  }

  function showError(message) {
    if (errorAlert) {
      errorAlert.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span>${message}</span>`;
      errorAlert.classList.add("show");
    }
    if (passwordInput) {
      passwordInput.style.borderColor = "#DC2626";
      passwordInput.focus();
    }
  }

  if (emailInput) emailInput.addEventListener("input", clearError);
  if (passwordInput) passwordInput.addEventListener("input", clearError);

  // 4. Quick Demo Account Filler
  window.fillDemoCredentials = function (email, password) {
    clearError();
    if (emailInput) emailInput.value = email;
    if (passwordInput) passwordInput.value = password;
  };

  // 5. Handle Form Submit
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      clearError();

      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";
      const remember = rememberCheckbox ? rememberCheckbox.checked : false;

      if (!email || !password) {
        showError("Please enter both email and password.");
        return;
      }

      const originalBtnText = submitBtn ? submitBtn.innerHTML : "Sign In to Portfolio";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
      }

      try {
        if (typeof window.authManager === "undefined") {
          throw new Error("Authentication module failed to initialize. Please refresh.");
        }

        const res = await window.authManager.login(email, password);

        if (res.success && res.user) {
          // Store or clear Remember Me
          if (remember) {
            localStorage.setItem("prime_property_remember_email", email);
            localStorage.setItem("prime_property_remember_password", password);
          } else {
            localStorage.removeItem("prime_property_remember_email");
            localStorage.removeItem("prime_property_remember_password");
          }

          if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Access Granted';
            submitBtn.style.background = "linear-gradient(135deg, #10B981, #059669)";
          }

          // Role-based redirection
          const user = res.user;
          setTimeout(function () {
            if (user.user_type === "admin" || user.is_admin) {
              window.location.href = "/admin-dashboard";
            } else if (user.user_type === "owner") {
              window.location.href = "/owner-profile";
            } else if (user.user_type === "consultant") {
              window.location.href = "/consultant-profile";
            } else {
              window.location.href = "/user-dashboard";
            }
          }, 450);
        } else {
          showError(res.error || "Incorrect email or password. Please verify credentials.");
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }
        }
      } catch (err) {
        console.error("Login submission error:", err);
        showError("Unable to connect to authentication server. Please verify network and try again.");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  // 6. Auth Mode Switcher (Sign In vs Create Account)
  window.switchAuthMode = function(mode) {
    clearError();
    const isRegister = mode === 'register';
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const tabSignInBtn = document.getElementById('tabSignInBtn');
    const tabSignUpBtn = document.getElementById('tabSignUpBtn');
    const authMainTitle = document.getElementById('authMainTitle');
    const authMainSubtitle = document.getElementById('authMainSubtitle');
    const authFooterNote = document.getElementById('authFooterNote');

    if (isRegister) {
      if (loginSection) loginSection.style.display = 'none';
      if (registerSection) registerSection.style.display = 'block';
      if (tabSignInBtn) tabSignInBtn.classList.remove('active');
      if (tabSignUpBtn) tabSignUpBtn.classList.add('active');
      if (authMainTitle) authMainTitle.innerHTML = 'Join <span style="background: linear-gradient(135deg, #FFFFFF 15%, #F6E7B0 60%, #D4AF37 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: #D4AF37;">Prime Properties</span>';
      if (authMainSubtitle) authMainSubtitle.textContent = 'Create your private investor, owner, or consultant account';
      if (authFooterNote) {
        authFooterNote.innerHTML = `Already have an estate account? <a href="javascript:void(0)" onclick="switchAuthMode('login')" style="color: var(--login-gold-bright, #FFDF73) !important; font-weight: 700; text-decoration: underline;">Sign In here</a>`;
      }
      history.replaceState(null, '', '#register');
    } else {
      if (loginSection) loginSection.style.display = 'block';
      if (registerSection) registerSection.style.display = 'none';
      if (tabSignInBtn) tabSignInBtn.classList.add('active');
      if (tabSignUpBtn) tabSignUpBtn.classList.remove('active');
      if (authMainTitle) authMainTitle.innerHTML = 'Welcome <span style="background: linear-gradient(135deg, #FFFFFF 15%, #F6E7B0 60%, #D4AF37 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: #D4AF37;">Back</span>';
      if (authMainSubtitle) authMainSubtitle.textContent = 'Sign in to your private investor portal & estate dashboard';
      if (authFooterNote) {
        authFooterNote.innerHTML = `Don't have an estate account? <a href="javascript:void(0)" onclick="switchAuthMode('register')" style="color: var(--login-gold-bright, #FFDF73) !important; font-weight: 700; text-decoration: underline;">Create an Account</a>`;
      }
      history.replaceState(null, '', '/login');
    }
  };

  // 7. Register User Type Selector
  window.selectRegisterType = function(type) {
    const input = document.getElementById('registerUserType');
    if (input) input.value = type;

    const btns = {
      buyer: document.getElementById('regBuyerBtn'),
      owner: document.getElementById('regOwnerBtn'),
      consultant: document.getElementById('regConsultantBtn')
    };

    Object.keys(btns).forEach(k => {
      const btn = btns[k];
      if (btn) {
        if (k === type) {
          btn.style.background = '#C28B52';
          btn.style.color = '#FFFFFF';
        } else {
          btn.style.background = 'rgba(194, 139, 82, 0.15)';
          btn.style.color = '#E2E8DE';
        }
      }
    });
  };

  // 8. Handle Dedicated Page Registration Form Submit
  const pageRegisterForm = document.getElementById('pageRegisterForm');
  if (pageRegisterForm) {
    pageRegisterForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      clearError();

      const userType = (document.getElementById('registerUserType')?.value || 'buyer').trim();
      const firstName = document.getElementById('regFirstName')?.value.trim();
      const lastName = document.getElementById('regLastName')?.value.trim();
      const email = document.getElementById('regEmail')?.value.trim();
      const phone = document.getElementById('regPhone')?.value.trim();
      const password = document.getElementById('regPassword')?.value;
      const confirmPassword = document.getElementById('regConfirmPassword')?.value;
      const regSubmitBtn = document.getElementById('regSubmitBtn');

      if (!firstName || !lastName || !email || !password) {
        showError('Please fill in all required fields.');
        return;
      }

      if (password !== confirmPassword) {
        showError('Passwords do not match. Please re-enter.');
        return;
      }

      if (password.length < 6) {
        showError('Password must be at least 6 characters long.');
        return;
      }

      const origText = regSubmitBtn ? regSubmitBtn.innerHTML : 'Create Estate Account';
      if (regSubmitBtn) {
        regSubmitBtn.disabled = true;
        regSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
      }

      try {
        const payload = {
          user_type: userType,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          password: password,
          confirm_password: confirmPassword
        };

        if (typeof window.authManager === 'undefined') {
          throw new Error('Authentication service unavailable. Please refresh.');
        }

        const res = await window.authManager.register(payload);

        if (res.success && res.user) {
          if (regSubmitBtn) {
            regSubmitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Account Created!';
            regSubmitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
          }

          setTimeout(() => {
            const user = res.user;
            if (user.user_type === 'admin' || user.is_admin) {
              window.location.href = '/admin-dashboard';
            } else if (user.user_type === 'owner') {
              window.location.href = '/owner-profile';
            } else if (user.user_type === 'consultant') {
              window.location.href = '/consultant-profile';
            } else {
              window.location.href = '/user-dashboard';
            }
          }, 500);
        } else {
          showError(res.error || 'Failed to create account. Email may already be registered.');
          if (regSubmitBtn) {
            regSubmitBtn.disabled = false;
            regSubmitBtn.innerHTML = origText;
          }
        }
      } catch (err) {
        console.error('Registration error:', err);
        showError('Unable to connect to registration server. Please try again.');
        if (regSubmitBtn) {
          regSubmitBtn.disabled = false;
          regSubmitBtn.innerHTML = origText;
        }
      }
    });
  }

  // Check URL hash or path on load
  if (window.location.hash === '#register' || window.location.pathname.includes('register')) {
    window.switchAuthMode('register');
  }
});

