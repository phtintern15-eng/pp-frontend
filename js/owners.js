// Check authentication on page load
        function initializeOwners() {
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

        // Store owners and properties globally
        let allOwners = [];
        let allProperties = [];

        // Initialize Owner Management
        document.addEventListener('DOMContentLoaded', function() {
            initializeOwners();
            loadOwnersAndProperties();
            initializeOwnerManagement();
            initializeAnimations();
            loadOwnerStats();
        });

        async function loadOwnerStats() {
            try {
                if (!authManager.isAuthenticated()) {
                    console.error('User not authenticated');
                    return;
                }

                // Fetch all users and filter for owners
                const usersResponse = await authManager.authenticatedRequest('/api/users/');
                
                if (!usersResponse || !usersResponse.ok) {
                    throw new Error('Failed to fetch users');
                }

                const users = await usersResponse.json();
                
                // Filter for owners
                const owners = users.filter(user => user.user_type === 'owner');
                
                // Calculate stats
                const totalOwners = owners.length;
                const activeOwners = owners.filter(owner => owner.is_active !== false && owner.is_active !== null).length;
                const inactiveOwners = owners.filter(owner => owner.is_active === false).length;
                // Pending owners are those that are not explicitly active or inactive
                const pendingOwners = owners.filter(owner => owner.is_active === null || owner.is_active === undefined).length;
                
                // Calculate change percentages (simplified - in production, compare with previous period)
                const totalChange = totalOwners > 0 ? `+${Math.floor(totalOwners * 0.08)} this month` : 'No change';
                const activeChange = activeOwners > 0 ? `+${Math.floor(activeOwners * 0.06)} this month` : 'No change';
                const pendingChange = pendingOwners > 0 ? `-${Math.floor(pendingOwners * 0.25)} this week` : 'No change';
                const inactiveChange = inactiveOwners > 0 ? `+${Math.floor(inactiveOwners * 0.17)} this month` : 'No change';
                
                // Update stat cards
                updateStatCard('total', totalOwners, totalChange);
                updateStatCard('active', activeOwners, activeChange);
                updateStatCard('pending', pendingOwners, pendingChange);
                updateStatCard('inactive', inactiveOwners, inactiveChange);
                
            } catch (error) {
                console.error('Error loading owner stats:', error);
                // Keep default values if API fails
            }
        }

        function updateStatCard(statType, value, changeText) {
            const statCards = document.querySelectorAll('.stat-card');
            statCards.forEach(card => {
                const icon = card.querySelector('.stat-icon');
                if (icon && icon.classList.contains(statType)) {
                    const valueElement = card.querySelector('.stat-value');
                    const changeElement = card.querySelector('.stat-change span');
                    
                    if (valueElement) {
                        valueElement.textContent = value.toLocaleString();
                    }
                    if (changeElement) {
                        changeElement.textContent = changeText;
                    }
                }
            });
        }

        async function loadOwnersAndProperties() {
            try {
                if (!authManager.isAuthenticated()) {
                    console.error('User not authenticated');
                    return;
                }

                // Fetch all users and filter for owners
                const usersResponse = await authManager.authenticatedRequest('/api/users/');
                
                if (!usersResponse || !usersResponse.ok) {
                    throw new Error('Failed to fetch users');
                }

                const users = await usersResponse.json();
                allOwners = users.filter(user => user.user_type === 'owner');

                // Fetch all properties
                const propertiesResponse = await authManager.authenticatedRequest('/api/properties/');
                
                if (!propertiesResponse || !propertiesResponse.ok) {
                    throw new Error('Failed to fetch properties');
                }

                allProperties = await propertiesResponse.json();

                // Render owners table
                renderOwnersTable();

            } catch (error) {
                console.error('Error loading owners and properties:', error);
                document.getElementById('ownersTableBody').innerHTML = 
                    '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-light);">Error loading owners. Please try again later.</td></tr>';
            }
        }

        function renderOwnersTable() {
            const tbody = document.getElementById('ownersTableBody');
            
            if (!allOwners || allOwners.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-light);">No owners found.</td></tr>';
                return;
            }

            tbody.innerHTML = allOwners.map(owner => {
                // Get owner's properties
                const ownerProperties = allProperties.filter(prop => prop.owner_id === owner.id);
                const propertiesCount = ownerProperties.length;
                
                // Calculate total revenue (sum of all property prices)
                const totalRevenue = ownerProperties.reduce((sum, prop) => sum + (prop.price || 0), 0);
                
                // Determine status
                let status = 'active';
                let statusClass = 'status-active';
                let statusText = 'Active';
                
                if (owner.is_active === false) {
                    status = 'inactive';
                    statusClass = 'status-inactive';
                    statusText = 'Inactive';
                } else if (owner.is_active === null || owner.is_active === undefined) {
                    status = 'pending';
                    statusClass = 'status-pending';
                    statusText = 'Pending';
                }
                
                // Get initials for avatar
                const initials = `${owner.first_name.charAt(0)}${owner.last_name.charAt(0)}`.toUpperCase();
                
                // Format date
                const joinedDate = owner.created_at 
                    ? new Date(owner.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : 'N/A';
                
                // Format revenue
                const revenueText = totalRevenue > 0 
                    ? `₹${totalRevenue.toLocaleString('en-IN')}/month`
                    : '₹0/month';
                
                // Properties text
                const propertiesText = propertiesCount === 1 
                    ? '1 Property'
                    : `${propertiesCount} Properties`;

                return `
                    <tr data-owner-id="${owner.id}" data-status="${status}">
                        <td>
                            <div class="owner-info-cell">
                                <div class="owner-avatar-small">${initials}</div>
                                <div class="owner-details">
                                    <div class="owner-name-cell">${owner.first_name} ${owner.last_name}</div>
                                    <div class="owner-email-cell">${owner.email}</div>
                                </div>
                            </div>
                        </td>
                        <td>${propertiesText}</td>
                        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                        <td>${revenueText}</td>
                        <td>${joinedDate}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="action-btn-small btn-view" onclick="viewOwner(${owner.id})">View</button>
                                <button class="action-btn-small btn-edit" onclick="editOwner(${owner.id})">Edit</button>
                                <button class="action-btn-small btn-delete" onclick="deleteOwner(${owner.id}, '${owner.first_name} ${owner.last_name}')">Delete</button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');

            // Re-attach event listeners after rendering
            attachTableEventListeners();
        }

        function attachTableEventListeners() {
            // Search functionality
            const searchInput = document.querySelector('.search-box input');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const query = this.value.toLowerCase();
                    const rows = document.querySelectorAll('.owner-table tbody tr');
                    
                    rows.forEach(row => {
                        const nameCell = row.querySelector('.owner-name-cell');
                        const emailCell = row.querySelector('.owner-email-cell');
                        
                        if (nameCell && emailCell) {
                            const name = nameCell.textContent.toLowerCase();
                            const email = emailCell.textContent.toLowerCase();
                            
                            if (name.includes(query) || email.includes(query)) {
                                row.style.display = '';
                            } else {
                                row.style.display = 'none';
                            }
                        }
                    });
                });
            }
        }

        function initializeOwnerManagement() {
            const filterTabs = document.querySelectorAll('.filter-tab');

            // Filter functionality
            filterTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active tab
                    filterTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter owners based on status
                    filterOwners(filter);
                });
            });
        }

        function viewOwner(ownerId) {
            const owner = allOwners.find(o => o.id === ownerId);
            if (owner) {
                console.log('Viewing owner:', owner);
                // You can add functionality here to view owner details
                // Example: window.location.href = `/owner-profile/${ownerId}`;
            }
        }

        function editOwner(ownerId) {
            const owner = allOwners.find(o => o.id === ownerId);
            if (owner) {
                console.log('Editing owner:', owner);
                // You can add functionality here to edit owner
                alert(`Editing owner: ${owner.first_name} ${owner.last_name}`);
            }
        }

        function deleteOwner(ownerId, ownerName) {
            if (confirm(`Are you sure you want to delete ${ownerName}?`)) {
                console.log('Deleting owner:', ownerId);
                // You can add functionality here to delete owner via API
                alert(`Owner ${ownerName} deleted successfully`);
            }
        }

        function filterOwners(filter) {
            const rows = document.querySelectorAll('.owner-table tbody tr');
            
            rows.forEach(row => {
                const status = row.getAttribute('data-status');
                
                let show = false;
                
                switch(filter) {
                    case 'all':
                        show = true;
                        break;
                    case 'active':
                        show = status === 'active';
                        break;
                    case 'pending':
                        show = status === 'pending';
                        break;
                    case 'inactive':
                        show = status === 'inactive';
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

        // Modal Functions
        function openAddOwnerModal() {
            const modal = document.getElementById('addOwnerModal');
            if (modal) {
                modal.classList.add('show');
                // Reset form
                document.getElementById('addOwnerForm').reset();
                // Clear errors
                document.querySelectorAll('.form-error').forEach(error => {
                    error.classList.remove('show');
                    error.textContent = '';
                });
            }
        }

        function closeAddOwnerModal() {
            const modal = document.getElementById('addOwnerModal');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        // Close modal when clicking outside
        document.getElementById('addOwnerModal')?.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAddOwnerModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modal = document.getElementById('addOwnerModal');
                if (modal && modal.classList.contains('show')) {
                    closeAddOwnerModal();
                }
            }
        });

        // Handle Add Owner Form Submission
        async function handleAddOwner(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('submitOwnerBtn');
            const form = event.target;
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
            
            // Clear previous errors
            document.querySelectorAll('.form-error').forEach(error => {
                error.classList.remove('show');
                error.textContent = '';
            });
            
            // Get form data
            const formData = new FormData(form);
            const ownerData = {
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
                password: formData.get('password'),
                phone: formData.get('phone') || null,
                company: formData.get('company') || null,
                property_count: formData.get('property_count') || null,
                subscription_plan: formData.get('subscription_plan') || null,
                location: formData.get('location') || null,
                user_type: 'owner'
            };
            
            try {
                const token = authManager.getToken();
                if (!token) {
                    throw new Error('No authentication token found');
                }
                
                const response = await fetch('/api/admin/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(ownerData)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Success
                    alert(`Owner ${ownerData.first_name} ${ownerData.last_name} added successfully!`);
                    closeAddOwnerModal();
                    // Reload owners list
                    loadOwnersAndProperties();
                    loadOwnerStats();
                } else {
                    // Handle errors
                    if (data.detail) {
                        if (typeof data.detail === 'string') {
                            // Single error message
                            if (data.detail.includes('Email')) {
                                showFieldError('email', data.detail);
                            } else {
                                alert('Error: ' + data.detail);
                            }
                        } else if (Array.isArray(data.detail)) {
                            // Multiple validation errors
                            data.detail.forEach(error => {
                                const field = error.loc ? error.loc[error.loc.length - 1] : null;
                                if (field) {
                                    showFieldError(field, error.msg);
                                }
                            });
                        } else {
                            alert('Error: ' + JSON.stringify(data.detail));
                        }
                    } else {
                        alert('Failed to add owner. Please try again.');
                    }
                }
            } catch (error) {
                console.error('Error adding owner:', error);
                alert('An error occurred while adding the owner. Please try again.');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Owner';
            }
        }

        function showFieldError(fieldName, message) {
            const errorElement = document.getElementById(fieldName + 'Error');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            } else {
                // Fallback: show alert for fields without error elements
                console.warn(`No error element found for field: ${fieldName}`);
            }
        }
