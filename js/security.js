// Check authentication on page load
        function initializeSecurity() {
            if (!authManager.isAuthenticated()) {
                window.location.href = '/';
                return;
            }
            
            // Update user info if authenticated
            const user = authManager.getUser();
            if (user) {
                document.querySelector('.user-name').textContent = `${user.first_name} ${user.last_name}`;
                document.querySelector('.user-role').textContent = user.user_type === 'admin' ? 'System Administrator' : 'User';
            }
        }

        // Initialize Security Management
        document.addEventListener('DOMContentLoaded', function() {
            initializeSecurity();
            initializeSecurityManagement();
            initializeAnimations();
        });

        function initializeSecurityManagement() {
            const actionButtons = document.querySelectorAll('.action-btn');
            const searchInput = document.querySelector('.search-box input');

            // Action button handlers
            actionButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.textContent.trim();
                    const securityTitle = this.closest('.security-card').querySelector('.security-title').textContent;
                    
                    switch(action) {
                        case 'Manage Users':
                            alert(`Managing users for ${securityTitle}...`);
                            break;
                        case 'View Logs':
                            alert(`Viewing logs for ${securityTitle}...`);
                            break;
                        case 'Export':
                            alert(`Exporting data for ${securityTitle}...`);
                            break;
                        case 'Configure':
                            alert(`Configuring ${securityTitle}...`);
                            break;
                        case 'Reports':
                            alert(`Generating reports for ${securityTitle}...`);
                            break;
                        case 'Monitor':
                            alert(`Opening monitoring for ${securityTitle}...`);
                            break;
                        case 'Alerts':
                            alert(`Viewing alerts for ${securityTitle}...`);
                            break;
                    }
                });
            });

            // Search functionality
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const cards = document.querySelectorAll('.security-card');
                
                cards.forEach(card => {
                    const title = card.querySelector('.security-title').textContent.toLowerCase();
                    const description = card.querySelector('.security-description').textContent.toLowerCase();
                    
                    if (title.includes(query) || description.includes(query)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }

        function initializeAnimations() {
            // Animate security cards on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.security-card').forEach(card => {
                observer.observe(card);
            });
        }

        // Navigation handlers
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.addEventListener('click', function(e) {
                // Only prevent default for placeholder links (#)
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-box input');
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value;
                if (query.trim()) {
                    console.log(`Searching for: ${query}`);
                }
            }
        });

        // Notification button
        document.querySelector('.notification-btn').addEventListener('click', function() {
            console.log('Opening notifications panel...');
        });

                // User profile dropdown
        const userProf = document.querySelector('.user-profile');
        if (userProf) {
            userProf.addEventListener('click', function(e) {
                e.stopPropagation();
                userProf.classList.toggle('active');
                const dropdown = document.getElementById('userDropdown');
                if (dropdown) dropdown.classList.toggle('show');
            });
        }
