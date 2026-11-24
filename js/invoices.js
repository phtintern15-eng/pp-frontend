// Check authentication on page load
        function initializeInvoices() {
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

        // Initialize Invoice Management
        document.addEventListener('DOMContentLoaded', function() {
            initializeInvoices();
            initializeInvoiceManagement();
            initializeAnimations();
        });

        function initializeInvoiceManagement() {
            const filterTabs = document.querySelectorAll('.filter-tab');
            const searchInput = document.querySelector('.search-box input');
            const actionButtons = document.querySelectorAll('.action-btn-small');

            // Filter functionality
            filterTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active tab
                    filterTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter invoices based on status
                    filterInvoices(filter);
                });
            });

            // Search functionality
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const rows = document.querySelectorAll('.invoice-table tbody tr');
                
                rows.forEach(row => {
                    const invoiceNum = row.cells[0].textContent.toLowerCase();
                    const tenant = row.cells[1].textContent.toLowerCase();
                    const property = row.cells[2].textContent.toLowerCase();
                    
                    if (invoiceNum.includes(query) || tenant.includes(query) || property.includes(query)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });

            // Action button handlers
            actionButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.textContent;
                    const invoiceNum = this.closest('tr').cells[0].textContent;
                    
                    switch(action) {
                        case 'View':
                            alert(`Viewing invoice: ${invoiceNum}`);
                            break;
                        case 'Edit':
                            alert(`Editing invoice: ${invoiceNum}`);
                            break;
                        case 'Delete':
                            if (confirm(`Are you sure you want to delete ${invoiceNum}?`)) {
                                alert(`Invoice ${invoiceNum} deleted successfully`);
                            }
                            break;
                    }
                });
            });
        }

        function filterInvoices(filter) {
            const rows = document.querySelectorAll('.invoice-table tbody tr');
            
            rows.forEach(row => {
                const statusBadge = row.querySelector('.status-badge');
                const status = statusBadge.textContent.toLowerCase();
                
                let show = false;
                
                switch(filter) {
                    case 'all':
                        show = true;
                        break;
                    case 'pending':
                        show = status === 'pending';
                        break;
                    case 'overdue':
                        show = status === 'overdue';
                        break;
                    case 'paid':
                        show = status === 'paid';
                        break;
                }
                
                row.style.display = show ? '' : 'none';
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
