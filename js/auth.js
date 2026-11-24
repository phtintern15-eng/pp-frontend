// Authentication utilities for Prime Property
class AuthManager {
    constructor() {
        this.apiBaseUrl = '/api';
        this.tokenKey = 'prime_property_token';
        this.userKey = 'prime_property_user';
    }

    // Store authentication data
    setAuthData(token, user) {
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.userKey, JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    // Get stored token
    getToken() {
        return localStorage.getItem(this.tokenKey) || localStorage.getItem('token');
    }

    // Get stored user data
    getUser() {
        const userData = localStorage.getItem(this.userKey) || localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    }

    // Check if user is authenticated
    isAuthenticated() {
        const token = this.getToken();
        if (!token) return false;
        
        // Check if token is expired (basic check)
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        } catch (e) {
            return false;
        }
    }

    // Clear authentication data
    clearAuthData() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // Login user
    async login(email, password) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                let errorMsg = 'Incorrect email or password. Please try again.';
                try {
                    const errorData = await response.json();
                    if (errorData.detail) {
                        errorMsg = errorData.detail;
                    }
                } catch (e) {}
                throw new Error(errorMsg);
            }

            const data = await response.json();
            
            // Get user info
            const userResponse = await fetch(`${this.apiBaseUrl}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${data.access_token}`
                }
            });

            if (!userResponse.ok) {
                throw new Error('Failed to get user information');
            }

            const user = await userResponse.json();
            
            // Store auth data
            this.setAuthData(data.access_token, user);
            
            return { success: true, user, token: data.access_token };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    }

    // Register user
    async register(userData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Registration failed');
            }

            const user = await response.json();
            return { success: true, user };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    }

    // Logout user
    async logout() {
        try {
            await fetch(`${this.apiBaseUrl}/auth/logout`, {
                method: 'POST',
                headers: this.getAuthHeaders()
            });
        } catch (e) {
            console.warn('Backend logout request note:', e);
        }
        this.clearAuthData();
        // Redirect to home page
        window.location.href = '/';
    }

    // Verify session status with backend
    async checkSession() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/session`, {
                headers: this.getAuthHeaders()
            });
            if (response.ok) {
                const data = await response.json();
                if (data.authenticated && data.user) {
                    localStorage.setItem(this.userKey, JSON.stringify(data.user));
                    localStorage.setItem('user', JSON.stringify(data.user));
                    return { authenticated: true, user: data.user };
                }
            }
        } catch (e) {
            console.warn('Session verification notice:', e);
        }
        return { authenticated: false, user: null };
    }

    // Get authenticated headers for API requests
    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    }

    // Make authenticated API request
    async authenticatedRequest(url, options = {}) {
        const token = this.getToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await fetch(url, {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        });

        if (response.status === 401) {
            // Token expired or invalid
            this.clearAuthData();
            window.location.href = '/';
            return null;
        }

        return response;
    }
}

// Global auth manager instance
const authManager = new AuthManager();

// Utility functions for templates
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 400px;
            }
            .notification-success {
                background: linear-gradient(135deg, #4CAF50, #45a049);
            }
            .notification-error {
                background: linear-gradient(135deg, #f44336, #d32f2f);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function showLoading(element, show = true) {
    if (show) {
        element.disabled = true;
        element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    } else {
        element.disabled = false;
        element.innerHTML = element.getAttribute('data-original-text') || 'Submit';
    }
}

// Export for use in other scripts
window.authManager = authManager;
window.showNotification = showNotification;
window.showLoading = showLoading;
// Universal Modal Helpers
if (!window.openLoginModal) {
    window.openLoginModal = function() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            window.location.href = '/login';
        }
    };
}

if (!window.closeLoginModal) {
    window.closeLoginModal = function() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
}

if (!window.openRegisterModal) {
    window.openRegisterModal = function() {
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            window.location.href = '/login';
        }
    };
}

if (!window.closeRegisterModal) {
    window.closeRegisterModal = function() {
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
}

if (!window.switchToLogin) {
    window.switchToLogin = function() {
        if (typeof window.closeRegisterModal === 'function') window.closeRegisterModal();
        if (typeof window.openLoginModal === 'function') window.openLoginModal();
    };
}

if (!window.switchToRegister) {
    window.switchToRegister = function() {
        if (typeof window.closeLoginModal === 'function') window.closeLoginModal();
        if (typeof window.openRegisterModal === 'function') window.openRegisterModal();
    };
}

// Global helpers for templates
window.logout = async function() {
    if (typeof authManager !== 'undefined') {
        await authManager.logout();
    } else {
        try { await fetch('/api/auth/logout', { method: 'POST' }); } catch(e) {}
        localStorage.clear();
        window.location.href = '/';
    }
};

window.openSettings = function() {
    window.location.href = '/settings';
};



// ==============================================================================
// Universal Navbar & Drawer Authentication State Synchronizer
// ==============================================================================
function syncAuthUI() {
    const auth = window.authManager || new AuthManager();
    const isAuthed = auth.isAuthenticated();
    const user = auth.getUser();

    if (!isAuthed || !user) {
        if (!window._sessionChecked) {
            window._sessionChecked = true;
            auth.checkSession().then(res => {
                if (res && res.authenticated && res.user) {
                    syncAuthUI();
                }
            });
        }
    }

    // 1. Desktop Nav Auth Container (#navAuthContainer)
    const navAuth = document.getElementById('navAuthContainer');
    if (navAuth) {
        if (isAuthed && user) {
            let dashboardLink = '/admin-dashboard';
            if (user.user_type === 'owner') dashboardLink = '/owner-profile';
            else if (user.user_type === 'consultant') dashboardLink = '/consultant-profile';
            else if (user.user_type === 'buyer' || !user.is_admin) dashboardLink = '/user-dashboard';

            const displayName = user.first_name || (user.email ? user.email.split('@')[0] : 'My Account');
            navAuth.innerHTML = `
                <a href="${dashboardLink}" class="nav-link" style="font-weight: 700; color: #D4AF37; display: inline-flex; align-items: center; gap: 0.45rem;">
                    <i class="fas fa-user-circle" style="color: #FFDF73; font-size: 1.1rem;"></i> 
                    <span>${displayName}</span>
                </a>
                <button type="button" onclick="logout()" class="direct-logout-btn" title="Logout of your account">
                    <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
                </button>
            `;
        }
    }

    // 2. Mobile Nav Drawers (.mobile-drawer-auth)
    const drawerAuthItems = document.querySelectorAll('.mobile-drawer-auth');
    if (drawerAuthItems.length > 0) {
        drawerAuthItems.forEach(drawer => {
            if (isAuthed && user) {
                let dashboardLink = '/admin-dashboard';
                if (user.user_type === 'owner') dashboardLink = '/owner-profile';
                else if (user.user_type === 'consultant') dashboardLink = '/consultant-profile';
                else if (user.user_type === 'buyer' || !user.is_admin) dashboardLink = '/user-dashboard';

                const displayName = user.first_name || (user.email ? user.email.split('@')[0] : 'My Account');
                drawer.innerHTML = `
                    <a href="${dashboardLink}" class="btn-drawer-login" style="text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                        <i class="fas fa-user-circle"></i> <span>${displayName}</span>
                    </a>
                    <button type="button" onclick="logout()" class="btn-drawer-logout">
                        <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
                    </button>
                `;
            }
        });
    }

    // 3. Admin / Dashboard Topbar Profile Dropdowns & Direct Logout Buttons
    const profileDropdowns = document.querySelectorAll('.user-profile');
    profileDropdowns.forEach(profile => {
        const parent = profile.parentElement;
        if (parent && !parent.querySelector('.direct-logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.type = 'button';
            logoutBtn.className = 'direct-logout-btn';
            logoutBtn.title = 'Logout of your account';
            logoutBtn.style.marginLeft = '0.75rem';
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> <span>Logout</span>';
            logoutBtn.onclick = (e) => {
                e.stopPropagation();
                if (window.logout) window.logout();
            };
            profile.insertAdjacentElement('afterend', logoutBtn);
        }

        // Toggle user dropdown if present
        const dropdown = profile.querySelector('.user-dropdown') || (parent && parent.querySelector('.user-dropdown'));
        if (dropdown) {
            profile.style.cursor = 'pointer';
            profile.onclick = (e) => {
                e.stopPropagation();
                profile.classList.toggle('active');
                dropdown.classList.toggle('show');
            };
        }
    });

    // Close any open dropdown on click outside
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.user-dropdown.show').forEach(dd => {
            if (!dd.contains(e.target) && !dd.parentElement.contains(e.target)) {
                dd.classList.remove('show');
                if (dd.parentElement) dd.parentElement.classList.remove('active');
            }
        });
    });

    // 4. Ensure Sidebars on Admin / Dashboard pages have a Logout option
    const sidebarNavs = document.querySelectorAll('.sidebar-nav');
    sidebarNavs.forEach(nav => {
        if (!nav.querySelector('.logout-section')) {
            const sec = document.createElement('div');
            sec.className = 'nav-section logout-section';
            sec.style.cssText = 'margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(212, 175, 55, 0.15);';
            sec.innerHTML = `
                <div class="nav-section-title">Session</div>
                <a href="#" onclick="logout(); return false;" class="nav-item logout-nav-item" style="color: #F87171 !important;">
                    <i class="fas fa-sign-out-alt" style="color: #EF4444 !important;"></i>
                    <span>Logout</span>
                </a>
            `;
            nav.appendChild(sec);
        }
    });

    // 5. Initialize Show Password toggles for modals across public pages
    const isDedicatedLoginPage = window.location.pathname === '/login' ||
                                 window.location.pathname === '/client-login' ||
                                 window.location.pathname === '/portal-login';

    if (!isDedicatedLoginPage) {
        const modalPwd = document.querySelector('#loginModal #password') || document.getElementById('password');
        const modalToggle = document.querySelector('#loginModal #togglePassword') || document.getElementById('togglePassword');
        const modalCheck = document.getElementById('modalShowPasswordCheckbox');

        if (modalPwd && !modalPwd.dataset.pwdVisibilityBound) {
            modalPwd.dataset.pwdVisibilityBound = 'true';

            const setModalPwdVisibility = (show) => {
                modalPwd.setAttribute('type', show ? 'text' : 'password');
                if (modalToggle) {
                    modalToggle.innerHTML = show ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
                    modalToggle.setAttribute('title', show ? 'Hide password' : 'Show password');
                    modalToggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
                }
                if (modalCheck && modalCheck.checked !== show) {
                    modalCheck.checked = show;
                }
            };

            if (modalToggle && !modalToggle.dataset.bound) {
                modalToggle.dataset.bound = 'true';
                modalToggle.setAttribute('title', 'Show password');
                modalToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    setModalPwdVisibility(modalPwd.getAttribute('type') === 'password');
                });
            }

            if (modalCheck && !modalCheck.dataset.bound) {
                modalCheck.dataset.bound = 'true';
                modalCheck.addEventListener('change', () => {
                    setModalPwdVisibility(modalCheck.checked);
                });
            }
        }
    }
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncAuthUI);
} else {
    syncAuthUI();
}

window.syncAuthUI = syncAuthUI;

// ==============================================================================
// Google OAuth Coming Soon Handler
// ==============================================================================
window.handleGoogleAuth = function(action) {
    action = action || 'Sign In';
    let modal = document.getElementById('googleComingSoonModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'googleComingSoonModal';
        modal.className = 'google-coming-soon-overlay';
        modal.innerHTML = `
            <div class="google-coming-soon-dialog" onclick="event.stopPropagation()" style="background: linear-gradient(160deg, #182C22 0%, #0A130E 100%) !important; border: 2px solid #D4AF37 !important; border-radius: 24px !important; padding: 2.5rem 2rem !important; max-width: 440px !important; width: 100% !important; text-align: center !important; position: relative !important; box-shadow: 0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.35) !important; color: #FFFFFF !important;">
                <button type="button" class="google-dialog-close" onclick="closeGoogleComingSoon()" aria-label="Close dialog" style="position: absolute !important; top: 1rem !important; right: 1.25rem !important; background: rgba(255, 255, 255, 0.15) !important; border: 1px solid rgba(255, 255, 255, 0.35) !important; color: #FFFFFF !important; width: 36px !important; height: 36px !important; border-radius: 50% !important; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 1.4rem !important; cursor: pointer !important; line-height: 1 !important; z-index: 5 !important;">&times;</button>
                <div class="google-dialog-icon-wrapper" style="display: flex !important; flex-direction: column !important; align-items: center !important; margin-bottom: 1.25rem !important; gap: 0.65rem !important;">
                    <div class="google-icon-circle" style="width: 72px !important; height: 72px !important; background: #FFFFFF !important; border-radius: 50% !important; display: flex !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), 0 0 20px rgba(212, 175, 55, 0.3) !important; border: 2px solid #D4AF37 !important;">
                        <svg viewBox="0 0 24 24" width="36" height="36">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                    </div>
                    <span class="google-soon-pill" style="display: inline-block !important; background: linear-gradient(135deg, #D4AF37 0%, #AA7842 100%) !important; color: #04100B !important; font-size: 0.72rem !important; font-weight: 800 !important; letter-spacing: 0.12em !important; padding: 0.3rem 0.95rem !important; border-radius: 9999px !important; text-transform: uppercase !important; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.35) !important;">COMING SOON</span>
                </div>
                <h3 class="google-dialog-title" style="color: #FFFFFF !important; font-family: 'Playfair Display', Georgia, serif !important; font-size: 1.75rem !important; font-weight: 800 !important; margin: 0.85rem 0 0.5rem 0 !important; display: block !important; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95) !important; letter-spacing: 0.01em !important;">Google ${action}</h3>
                <p class="google-dialog-subtitle" style="color: #F1F5F9 !important; font-size: 0.96rem !important; line-height: 1.6 !important; margin: 0 0 1.4rem 0 !important; font-weight: 500 !important; display: block !important; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8) !important;">
                    Google One-Tap and OAuth 2.0 biometric sign-on will be available soon. Please proceed with standard email credentials in the meantime.
                </p>
                <div class="google-dialog-bullets" style="background: rgba(5, 12, 8, 0.75) !important; border: 1.5px solid rgba(194, 139, 82, 0.35) !important; border-radius: 14px !important; padding: 1rem 1.25rem !important; margin-bottom: 1.65rem !important; text-align: left !important; display: flex !important; flex-direction: column !important; gap: 0.75rem !important;">
                    <div class="google-dialog-bullet" style="display: flex !important; align-items: center !important; gap: 0.85rem !important; font-size: 0.92rem !important; color: #FFFFFF !important; font-weight: 600 !important;">
                        <i class="fas fa-shield-alt" style="color: #34D399 !important; font-size: 1.1rem !important; flex-shrink: 0 !important;"></i>
                        <span style="color: #FFFFFF !important; font-size: 0.92rem !important; font-weight: 600 !important; line-height: 1.4 !important; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9) !important;">High-security 256-bit OAuth 2.0 encryption</span>
                    </div>
                    <div class="google-dialog-bullet" style="display: flex !important; align-items: center !important; gap: 0.85rem !important; font-size: 0.92rem !important; color: #FFFFFF !important; font-weight: 600 !important;">
                        <i class="fas fa-bolt" style="color: #FBBF24 !important; font-size: 1.1rem !important; flex-shrink: 0 !important;"></i>
                        <span style="color: #FFFFFF !important; font-size: 0.92rem !important; font-weight: 600 !important; line-height: 1.4 !important; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9) !important;">Instant 1-tap estate portfolio access</span>
                    </div>
                </div>
                <div class="google-dialog-actions" style="display: flex !important; flex-direction: column !important; gap: 0.75rem !important;">
                    <button type="button" class="google-dialog-btn-primary" onclick="closeGoogleComingSoon()" style="width: 100% !important; background: linear-gradient(135deg, #C28B52 0%, #9C6C38 100%) !important; color: #FFFFFF !important; border: 1.5px solid rgba(255, 255, 255, 0.3) !important; border-radius: 9999px !important; padding: 0.95rem 1.6rem !important; font-size: 1rem !important; font-weight: 700 !important; cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important; gap: 0.65rem !important; transition: all 0.25s ease !important; box-shadow: 0 8px 24px rgba(156, 108, 56, 0.45) !important;">
                        <span style="color: #FFFFFF !important; font-weight: 700 !important;">Continue with Email & Password</span>
                        <i class="fas fa-arrow-right" style="color: #FFFFFF !important;"></i>
                    </button>
                </div>
            </div>
        `;
        modal.addEventListener('click', window.closeGoogleComingSoon);
        document.body.appendChild(modal);
    } else {
        const titleEl = modal.querySelector('.google-dialog-title');
        if (titleEl) {
            titleEl.textContent = `Google ${action}`;
            titleEl.style.color = '#FFFFFF';
        }
    }

    requestAnimationFrame(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
};

window.closeGoogleComingSoon = function() {
    const modal = document.getElementById('googleComingSoonModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeGoogleComingSoon();
    }
});
