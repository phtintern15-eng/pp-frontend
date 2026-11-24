// Check authentication on page load
        function initializeRevenue() {
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

        // Initialize Revenue Management
        document.addEventListener('DOMContentLoaded', function() {
            initializeRevenue();
            initializeRevenueManagement();
            initializeCharts();
            initializeAnimations();
        });

        function initializeRevenueManagement() {
            const filterTabs = document.querySelectorAll('.filter-tab');
            const searchInput = document.querySelector('.search-box input');

            // Filter functionality
            filterTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active tab
                    filterTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter revenue data based on period
                    filterRevenueData(filter);
                });
            });

            // Search functionality
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                console.log(`Searching revenue for: ${query}`);
            });
        }

        function filterRevenueData(filter) {
            console.log(`Filtering revenue data for: ${filter}`);
            // Here you would implement the actual filtering logic
        }

        function initializeCharts() {
            // Revenue Trends Chart
            const revenueCtx = document.getElementById('revenueChart').getContext('2d');
            new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Monthly Revenue',
                        data: [280000, 295000, 310000, 325000, 340000, 355000, 370000, 385000, 400000, 415000, 430000, 345000],
                        borderColor: '#5F7067',
                        backgroundColor: 'rgba(95, 112, 103, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#D4AF37',
                        pointBorderColor: '#5F7067',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value / 1000) + 'K';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });

            // Revenue Sources Chart
            const sourcesCtx = document.getElementById('sourcesChart').getContext('2d');
            new Chart(sourcesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Rent Payments', 'Late Fees', 'Maintenance Fees', 'Other Services'],
                    datasets: [{
                        data: [85, 8, 4, 3],
                        backgroundColor: [
                            '#5F7067',
                            '#D4AF37',
                            '#f39c12',
                            '#718096'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        }

        function initializeAnimations() {
            // Animate stat cards on scroll
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

            document.querySelectorAll('.stat-card').forEach(card => {
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
