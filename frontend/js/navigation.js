// Navigation utilities for Prime Property



class NavigationManager {



    constructor() {



        this.routes = {



            home: '/',



            about: '/about',



            property: '/property',



            service: '/service',



            'service-requests': '/service-requests',



            pricing: '/pricing',



            ownerProfile: '/owner-profile',



            consultantProfile: '/consultant-profile',



            adminDashboard: '/admin-dashboard',



            userDashboard: '/user-dashboard',



            // Dashboard routes



            analytics: '/analytics',



            notifications: '/notifications',



            users: '/users',



            properties: '/property',



            owners: '/owners',



            revenue: '/revenue',



            invoices: '/invoices',



            reports: '/reports',



            maintenance: '/maintenance',



            settings: '/settings',



            security: '/security',



            backup: '/backup'



        };



        



        this.init();



    }







    init() {



        // Add navigation event listeners



        this.setupNavigationLinks();



        this.setupBackToHome();



        this.setupAuthenticationBasedNavigation();



    }







    setupNavigationLinks() {



        // Handle all navigation links



        document.addEventListener('click', (e) => {

            const link = e.target.closest('a[data-nav]');

            if (link) {

                e.preventDefault();

                const route = link.getAttribute('data-nav');

                this.navigateTo(route);

            }

        });







        // Handle standard href navigation



        document.addEventListener('click', (e) => {



            const link = e.target.closest('a[href^="/"]');



            if (link && !link.hasAttribute('data-nav')) {



                e.preventDefault();



                const href = link.getAttribute('href');



                this.navigateTo(href);



            }



        });



    }







    setupBackToHome() {



        // Add back to home functionality



        const backToHomeButtons = document.querySelectorAll('[data-back-home]');



        backToHomeButtons.forEach(button => {



            button.addEventListener('click', (e) => {



                e.preventDefault();



                this.navigateTo('/');



            });



        });



    }







    setupAuthenticationBasedNavigation() {



        // Handle authentication-based navigation



        document.addEventListener('click', (e) => {



            const link = e.target.closest('a[data-auth-nav]');



            if (link) {



                e.preventDefault();



                const route = link.getAttribute('data-auth-nav');



                this.navigateWithAuth(route);



            }



        });



    }







    navigateTo(route) {



        let targetUrl = '/';



        if (route === '/') {



            targetUrl = '/';



        } else if (this.routes[route]) {



            targetUrl = this.routes[route];



        } else if (route.startsWith('/')) {



            targetUrl = route;



        } else if (route.match(/^[a-zA-Z0-9-_/]+$/)) {



            targetUrl = `/${route}`;



        } else {



            console.warn(`Unknown route: ${route}`);



            return;



        }







        // Trigger luxury page transition exit wipe



        if (document.body && !document.body.classList.contains('page-is-exiting')) {



            document.body.classList.add('page-is-exiting');



            setTimeout(() => {



                window.location.href = targetUrl;



            }, 460);



        } else {



            window.location.href = targetUrl;



        }



    }







    navigateWithAuth(route) {



        // Navigation that requires authentication



        if (window.authManager && window.authManager.isAuthenticated()) {



            this.navigateTo(route);



        } else {



            // Show login modal or redirect to login



            this.showLoginRequired();



        }



    }







    showLoginRequired() {



        if (window.showNotification) {



            window.showNotification('Please login to access this feature', 'error');



        } else {



            alert('Please login to access this feature');



        }



        



        // Try to open login modal if available



        const loginModal = document.getElementById('loginModal');



        if (loginModal) {



            loginModal.classList.add('active');



            document.body.style.overflow = 'hidden';



        } else {



            // Redirect to home page to show login



            window.location.href = '/';



        }



    }







    // Utility methods for common navigation patterns



    goToHome() {



        this.navigateTo('/');



    }







    goToAbout() {



        this.navigateTo('/about');



    }







    goToProperty() {



        this.navigateTo('/property');



    }







    goToService() {



        this.navigateTo('/service');



    }







    goToPricing() {



        this.navigateTo('/pricing');



    }







    goToDashboard() {



        if (window.authManager && window.authManager.isAuthenticated()) {



            const user = window.authManager.getUser();



            if (user) {



                switch (user.user_type) {



                    case 'admin':



                        this.navigateTo('/admin-dashboard');



                        break;



                    case 'owner':



                        this.navigateTo('/owner-profile');



                        break;



                    case 'consultant':



                        this.navigateTo('/consultant-profile');



                        break;



                    default:



                        this.navigateTo('/user-dashboard');



                }



            } else {



                this.navigateTo('/');



            }



        } else {



            this.showLoginRequired();



        }



    }







    // Add navigation breadcrumbs



    addBreadcrumbs(currentPage) {



        const breadcrumbContainer = document.querySelector('.breadcrumbs');



        if (breadcrumbContainer) {



            const breadcrumbs = this.generateBreadcrumbs(currentPage);



            breadcrumbContainer.innerHTML = breadcrumbs;



        }



    }







    generateBreadcrumbs(currentPage) {



        const breadcrumbs = [



            { name: 'Home', url: '/' },



            { name: currentPage, url: null }



        ];







        return breadcrumbs.map((crumb, index) => {



            if (index === breadcrumbs.length - 1) {



                return `<span class="breadcrumb-current">${crumb.name}</span>`;



            } else {



                return `<a href="${crumb.url}" class="breadcrumb-link">${crumb.name}</a> <span class="breadcrumb-separator">/</span>`;



            }



        }).join(' ');



    }







    // Handle browser back/forward



    handleBrowserNavigation() {



        window.addEventListener('popstate', (e) => {



            // Handle browser navigation



            if (e.state && e.state.route) {



                this.navigateTo(e.state.route);



            }



        });



    }







    // Add smooth scrolling for anchor links



    setupSmoothScrolling() {



        document.addEventListener('click', (e) => {



            const link = e.target.closest('a[href^="#"]');



            if (link) {



                const href = link.getAttribute('href');



                if (href === '#' || href.length <= 1) return;



                const targetId = href.substring(1);



                const targetElement = document.getElementById(targetId);



                if (targetElement) {



                    e.preventDefault();



                    targetElement.scrollIntoView({



                        behavior: 'smooth',



                        block: 'start'



                    });



                }



            }



        });



    }



}







// Initialize navigation when DOM is loaded



document.addEventListener('DOMContentLoaded', () => {



    window.navigationManager = new NavigationManager();



});







window.addEventListener('pageshow', (e) => {



    if (e.persisted) {



        document.body.classList.remove('page-is-exiting');



    }



});







// Export for use in other scripts



window.NavigationManager = NavigationManager;











// Global Mobile Navigation & Sidebar Responsive Toggle



function initGlobalMobileNavigation() {

    // 1. Mobile Hamburger Menu Toggle (Public Site & Portals)



    const toggleBtn = document.getElementById('mobileMenuToggle');



    const navLinks = document.getElementById('navLinks');



    if (toggleBtn && navLinks) {



        toggleBtn.addEventListener('click', function(e) {



            e.stopPropagation();



            navLinks.classList.toggle('mobile-open');



        });







        document.addEventListener('click', function(e) {



            if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {



                navLinks.classList.remove('mobile-open');



            }



        });







        navLinks.querySelectorAll('a').forEach(function(link) {



            link.addEventListener('click', function() {



                navLinks.classList.remove('mobile-open');



            });



        });







        // Ensure Mobile Drawer has Login & Register Action Row



        if (!navLinks.querySelector('.mobile-drawer-auth')) {



            const authRow = document.createElement('li');



            authRow.className = 'mobile-drawer-auth';



            authRow.innerHTML = `



                <button type="button" onclick="if(window.openLoginModal){openLoginModal();}else{window.location.href='/login';}" class="btn-drawer-login">



                    <i class="fas fa-user"></i> Login



                </button>



                <button type="button" onclick="if(window.openRegisterModal){openRegisterModal();}else{window.location.href='/login#register';}" class="btn-drawer-register">



                    <i class="fas fa-user-plus"></i> Register



                </button>



            `;



            navLinks.appendChild(authRow);



            if (window.syncAuthUI) window.syncAuthUI();



        }



    }







    // 2. Dashboard Sidebar Toggle (Admin / Executive / Management)



    const sidebar = document.querySelector('.sidebar') || document.querySelector('.portal-sidebar');



    const sidebarToggles = document.querySelectorAll('.mobile-menu-toggle, #sidebarToggle, #mobileSidebarToggle');



    



    if (sidebar && sidebarToggles.length > 0) {



        sidebarToggles.forEach(function(btn) {



            btn.addEventListener('click', function(e) {



                e.stopPropagation();



                sidebar.classList.toggle('open');



                sidebar.classList.toggle('show');



            });



        });







        document.addEventListener('click', function(e) {



            if (window.innerWidth <= 820 && 



                sidebar && 



                (sidebar.classList.contains('open') || sidebar.classList.contains('show')) &&



                !sidebar.contains(e.target)) {



                let clickedToggle = false;



                sidebarToggles.forEach(function(btn) {



                    if (btn.contains(e.target)) clickedToggle = true;



                });



                if (!clickedToggle) {



                    sidebar.classList.remove('open');



                    sidebar.classList.remove('show');



                }



            }



        });



    }







    // 3. Auto-Inject Sticky Mobile Bottom Bar on Public Pages if missing



    if (!document.getElementById('mobileActionBar') && !document.querySelector('.portal-sidebar') && !document.querySelector('.sidebar')) {



        const bar = document.createElement('div');



        bar.className = 'mobile-action-bar';



        bar.id = 'mobileActionBar';



        bar.innerHTML = `



            <a href="/" class="mobile-action-btn">



              <i class="fas fa-home"></i>



              <span>Home</span>



            </a>



            <a href="/property" class="mobile-action-btn">



              <i class="fas fa-building"></i>



              <span>Properties</span>



            </a>



            <a href="https://wa.me/918045678900" target="_blank" class="mobile-action-btn primary">



              <i class="fab fa-whatsapp"></i>



              <span>WhatsApp</span>



            </a>



            <a href="tel:+918045678900" class="mobile-action-btn">



              <i class="fas fa-phone-alt"></i>



              <span>Concierge</span>



            </a>



        `;



        document.body.appendChild(bar);



    }



}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalMobileNavigation);
} else {
    initGlobalMobileNavigation();
}



