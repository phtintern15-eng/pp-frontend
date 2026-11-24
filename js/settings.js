// Check authentication on page load
        function initializeSettings() {
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

        // Initialize Settings Management
        document.addEventListener('DOMContentLoaded', function() {
            initializeSettings();
            initializeSettingsManagement();
            initializeAnimations();
        });

        function initializeSettingsManagement() {
            const toggleSwitches = document.querySelectorAll('.toggle-switch');
            const saveButtons = document.querySelectorAll('.save-btn');
            const searchInput = document.querySelector('.search-box input');

            // Toggle switch functionality
            toggleSwitches.forEach(toggle => {
                toggle.addEventListener('click', function() {
                    this.classList.toggle('active');
                });
            });

            // Save button functionality
            saveButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const card = this.closest('.settings-card');
                    const title = card.querySelector('.settings-title').textContent;
                    
                    // Show loading state
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
                    this.disabled = true;
                    
                    // Simulate save operation
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-check"></i> Saved!';
                        this.style.background = '#27ae60';
                        
                        setTimeout(() => {
                            this.innerHTML = '<i class="fas fa-save"></i> Save Changes';
                            this.style.background = '';
                            this.disabled = false;
                        }, 2000);
                    }, 1500);
                });
            });

            // Search functionality
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const cards = document.querySelectorAll('.settings-card');
                
                cards.forEach(card => {
                    const title = card.querySelector('.settings-title').textContent.toLowerCase();
                    const settings = card.querySelectorAll('.setting-label');
                    
                    let show = false;
                    if (title.includes(query)) {
                        show = true;
                    } else {
                        settings.forEach(setting => {
                            if (setting.textContent.toLowerCase().includes(query)) {
                                show = true;
                            }
                        });
                    }
                    
                    card.style.display = show ? '' : 'none';
                });
            });
        }

        function initializeAnimations() {
            // Animate settings cards on scroll
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

            document.querySelectorAll('.settings-card').forEach(card => {
                observer.observe(card);
            });
        }

        // Category Filter Functionality
        function filterSettingsCategory(category, btn) {
            const tabs = document.querySelectorAll('.category-tab');
            tabs.forEach(t => t.classList.remove('active'));
            if (btn) btn.classList.add('active');

            const cards = document.querySelectorAll('.settings-card');
            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Trigger Immediate Backup Simulation
        function triggerImmediateBackup(btn) {
            const origHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Encrypting & Snapshotting...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Snapshot Completed';
                btn.style.borderColor = '#48BB78';
                btn.style.color = '#48BB78';

                const healthPill = document.querySelector('.backup-live-pill');
                if (healthPill) {
                    healthPill.innerHTML = '<i class="fas fa-check-double"></i> Healthy · Just now';
                }

                setTimeout(() => {
                    btn.innerHTML = origHtml;
                    btn.style.borderColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 2500);
            }, 1800);
        }
