// Check authentication on page load
        function initializeUsers() {
            const auth = window.authManager || authManager;
            if (!auth || !auth.isAuthenticated()) {
                window.location.href = '/';
                return;
            }
            
            // Update user info if authenticated
            const user = auth.getUser();
            if (user) {
                const userNameElement = document.querySelector('.user-name');
                const userRoleElement = document.querySelector('.user-role');
                if (userNameElement) {
                    userNameElement.textContent = `${user.first_name} ${user.last_name}`;
                }
                if (userRoleElement) {
                    userRoleElement.textContent = user.user_type === 'admin' ? 'System Administrator' : 'User';
                }
            }
        }

        // Initialize User Management
        document.addEventListener('DOMContentLoaded', function() {
            // Wait for authManager to be available
            const checkAuthManager = () => {
                const auth = window.authManager;
                if (!auth) {
                    console.log('Waiting for authManager to initialize...');
                    setTimeout(checkAuthManager, 100);
                    return;
                }
                
                initializeUsers();
                initializeUserManagement();
                loadUserStats();
                loadUsers();
                initializeAnimations();
            };
            
            checkAuthManager();
        });

        let allUsers = [];
        let currentEditingUserId = null;
        let currentDeletingUserId = null;
        let currentDeletingUserName = null;

        // Refresh users and stats
        async function refreshUsers() {
            const refreshBtn = document.getElementById('refreshUsersBtn');
            const refreshIcon = document.getElementById('refreshIcon');
            const tbody = document.getElementById('usersTableBody');
            
            if (!refreshBtn || !refreshIcon) {
                // Fallback if elements not found
                loadUserStats();
                loadUsers();
                return;
            }

            // Disable button and add spinning animation
            refreshBtn.disabled = true;
            refreshIcon.classList.add('spinning');

            // Show loading state in table immediately
            if (tbody) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 3rem;">
                            <i class="fas fa-sync-alt fa-spin" style="font-size: 2rem; color: var(--accent-gold); margin-bottom: 1rem;"></i>
                            <p style="color: var(--text-light);">Refreshing users...</p>
                                </td>
                            </tr>
                `;
            }

            try {
                // Clear existing users array to force fresh data
                allUsers = [];
                
                // Refresh both user stats and user list in parallel
                await Promise.all([
                    loadUserStats(),
                    loadUsers(true) // Pass true to indicate it's a refresh
                ]);
            } catch (error) {
                console.error('Error refreshing users:', error);
                if (tbody) {
                    showUsersError();
                }
            } finally {
                // Re-enable button and remove spinning animation after a short delay
                setTimeout(() => {
                    refreshBtn.disabled = false;
                    refreshIcon.classList.remove('spinning');
                }, 500);
            }
        }

        // Load users from API
        async function loadUsers(isRefresh = false) {
            try {
                const auth = window.authManager;
                if (!auth) {
                    console.error('authManager not available');
                    setTimeout(() => loadUsers(isRefresh), 500);
                    return;
                }

                if (!auth.isAuthenticated()) {
                    console.error('User not authenticated');
                    window.location.href = '/';
                    return;
                }

                const token = auth.getToken();
                if (!token) {
                    console.error('No authentication token found');
                    showUsersError();
                    return;
                }

                // Add cache-busting parameter for refresh
                const cacheBuster = isRefresh ? `&_t=${Date.now()}` : '';
                const response = await fetch(`/api/users/?limit=1000${cacheBuster}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    }
                });

                if (response.status === 401) {
                    console.error('Unauthorized - token may be expired');
                    auth.logout();
                    window.location.href = '/';
                    return;
                }

                if (response.ok) {
                    allUsers = await response.json();
                    renderUsers(allUsers);
                } else {
                    console.error('Failed to load users:', response.status, response.statusText);
                    showUsersError();
                }
            } catch (error) {
                console.error('Error loading users:', error);
                showUsersError();
            }
        }

        // Render users in the table
        function renderUsers(users) {
            const tbody = document.getElementById('usersTableBody');
            if (!tbody) return;

            if (!users || users.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 3rem;">
                            <i class="fas fa-users" style="font-size: 2rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                            <p style="color: var(--text-light);">No users found</p>
                                </td>
                            </tr>
                `;
                return;
            }

            const usersHTML = users.map(user => {
                const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown User';
                const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                const email = user.email || '';
                const userType = user.user_type || 'user';
                
                // Format user type for display
                const userTypeLabels = {
                    'owner': 'Property Owner',
                    'consultant': 'Consultant',
                    'admin': 'Administrator',
                    'tenant': 'Tenant'
                };
                const userTypeLabel = userTypeLabels[userType.toLowerCase()] || userType;
                
                // Session-based status logic - completely based on backend session tracking
                let statusClass, statusText, sessionStatus;
                
                // Status is purely based on active session, not database is_active field
                if (user.is_online === true) {
                    // User has active session - show as Online
                    statusClass = 'status-online';
                    statusText = 'Online';
                    sessionStatus = 'online';
                } else {
                    // User doesn't have active session - show as Offline
                    statusClass = 'status-offline';
                    statusText = 'Offline';
                    sessionStatus = 'offline';
                }
                
                // Format created date
                const createdDate = user.created_at ? formatDate(user.created_at) : 'Unknown';
                
                // Last login (we don't have this data, so show "Never" or "Not available")
                const lastLogin = 'Never'; // TODO: Add last_login field to User model if needed

                return `
                    <tr data-user-id="${user.id}" data-status="${sessionStatus}">
                                <td>
                                    <div class="user-info-cell">
                                <div class="user-avatar-small">${initials}</div>
                                        <div class="user-details">
                                    <div class="user-name-cell">${fullName}</div>
                                    <div class="user-email-cell">${email}</div>
                                        </div>
                                    </div>
                                </td>
                        <td>${userTypeLabel}</td>
                        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                        <td>${lastLogin}</td>
                        <td>${createdDate}</td>
                                <td>
                                    <div class="action-buttons">
                                <button class="action-btn-small btn-view" onclick="viewUser(${user.id})" title="View User">View</button>
                                <button class="action-btn-small btn-delete" onclick="deleteUser(${user.id})" title="Delete User">Delete</button>
                                    </div>
                                </td>
                            </tr>
                `;
            }).join('');

            tbody.innerHTML = usersHTML;
            
            // Re-apply current filter if any
            const activeFilter = document.querySelector('.filter-tab.active')?.getAttribute('data-filter') || 'all';
            filterUsers(activeFilter);
        }

        // Show error message
        function showUsersError() {
            const tbody = document.getElementById('usersTableBody');
            if (tbody) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 3rem;">
                            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #e74c3c; margin-bottom: 1rem;"></i>
                            <p style="color: var(--text-light);">Error loading users. Please refresh the page.</p>
                            <button class="action-btn btn-primary" onclick="loadUsers()" style="margin-top: 1rem;">
                                <i class="fas fa-sync-alt"></i>
                                Retry
                            </button>
                        </td>
                    </tr>
                `;
            }
        }

        // Format date
        function formatDate(dateString) {
            if (!dateString) return 'Unknown';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }

        // View user modal
        let currentViewingUserId = null;

        function viewUser(userId) {
            const user = allUsers.find(u => u.id === userId);
            if (!user) {
                console.error('User not found:', userId);
                return;
            }

            currentViewingUserId = userId;
            populateUserModal(user);
            openViewUserModal();
        }

        function populateUserModal(user) {
            const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown User';
            const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const userEmail = user.email || '';
            
            // Profile Section
            document.getElementById('modalUserAvatar').textContent = initials;
            document.getElementById('modalUserName').textContent = fullName;
            document.getElementById('modalUserEmail').textContent = userEmail || '-';
            
            // Status Badge - Completely based on backend session tracking
            const statusBadge = document.getElementById('modalUserStatus');
            let statusClass, statusText;
            
            // Status is purely based on active session, not database is_active field
            if (user.is_online === true) {
                // User has active session - show as Online
                statusClass = 'modal-user-status-badge status-online';
                statusText = 'Online';
            } else {
                // User doesn't have active session - show as Offline
                statusClass = 'modal-user-status-badge status-offline';
                statusText = 'Offline';
            }
            
            statusBadge.className = statusClass;
            statusBadge.textContent = statusText;
            
            // Contact Information
            document.getElementById('modalUserEmailDetail').textContent = user.email || 'Not provided';
            document.getElementById('modalUserPhone').textContent = user.phone || 'Not provided';
            document.getElementById('modalUserLocation').textContent = user.location || 'Not specified';
            
            // Account Information
            const userTypeLabels = {
                'owner': 'Property Owner',
                'consultant': 'Consultant',
                'admin': 'Administrator',
                'tenant': 'Tenant'
            };
            const userTypeLabel = userTypeLabels[user.user_type?.toLowerCase()] || user.user_type || 'User';
            document.getElementById('modalUserType').textContent = userTypeLabel;
            document.getElementById('modalUserCompany').textContent = user.company || 'Not specified';
            
            // Property count - show only if user is owner or has properties
            const propertyCount = user.property_count || 0;
            document.getElementById('modalUserPropertyCount').textContent = propertyCount > 0 ? propertyCount : 'None';
            
            // Member Since
            document.getElementById('modalUserCreatedAt').textContent = user.created_at ? formatDate(user.created_at) : 'Unknown';
            
            // Set edit button onclick
            document.getElementById('modalEditButton').setAttribute('onclick', `editUserFromModal(${user.id})`);
        }

        function openViewUserModal() {
            const modal = document.getElementById('viewUserModal');
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        }

        function closeViewUserModal() {
            const modal = document.getElementById('viewUserModal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = ''; // Restore scrolling
                currentViewingUserId = null;
            }
        }

        function editUserFromModal(userId) {
            const targetUserId = userId || currentViewingUserId;
            if (targetUserId) {
                closeViewUserModal();
                openEditUserModal(targetUserId);
            }
        }

        function openEditUserModal(userId) {
            currentEditingUserId = userId;
            
            // Find user data
            const user = allUsers.find(u => u.id === userId);
            if (!user) {
                console.error('User not found');
                return;
            }

            // Populate form fields
            document.getElementById('editFirstName').value = user.first_name || '';
            document.getElementById('editLastName').value = user.last_name || '';
            document.getElementById('editEmail').value = user.email || '';
            document.getElementById('editPhone').value = user.phone || '';
            document.getElementById('editCompany').value = user.company || '';
            document.getElementById('editLocation').value = user.location || '';
            document.getElementById('editUserType').value = user.user_type || 'owner';
            document.getElementById('editIsActive').value = user.is_active !== false ? 'true' : 'false';

            // Show modal
            const modal = document.getElementById('editUserModal');
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeEditUserModal() {
            const modal = document.getElementById('editUserModal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                currentEditingUserId = null;
                
                // Reset form
                document.getElementById('editUserForm').reset();
            }
        }

        async function saveUserChanges(event) {
            if (event) {
                event.preventDefault();
            }

            if (!currentEditingUserId) {
                console.error('No user ID for editing');
                return;
            }

            const auth = window.authManager;
            if (!auth || !auth.isAuthenticated()) {
                console.error('User not authenticated');
                window.location.href = '/';
                return;
            }

            const token = auth.getToken();
            if (!token) {
                console.error('No authentication token found');
                return;
            }

            // Get form data
            const updateData = {
                first_name: document.getElementById('editFirstName').value.trim(),
                last_name: document.getElementById('editLastName').value.trim(),
                email: document.getElementById('editEmail').value.trim(),
                phone: document.getElementById('editPhone').value.trim() || null,
                company: document.getElementById('editCompany').value.trim() || null,
                location: document.getElementById('editLocation').value.trim() || null,
                user_type: document.getElementById('editUserType').value,
                is_active: document.getElementById('editIsActive').value === 'true'
            };

            // Disable save button and show loading
            const saveBtn = document.querySelector('#editUserModal .btn-primary');
            const originalText = saveBtn.innerHTML;
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

            try {
                const response = await fetch(`/api/admin/users/${currentEditingUserId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateData)
                });

                if (response.status === 401) {
                    console.error('Unauthorized - token may be expired');
                    auth.logout();
                    window.location.href = '/';
                    return;
                }

                if (response.ok) {
                    const updatedUser = await response.json();
                    
                    // Update user in allUsers array
                    const userIndex = allUsers.findIndex(u => u.id === currentEditingUserId);
                    if (userIndex !== -1) {
                        allUsers[userIndex] = { ...allUsers[userIndex], ...updatedUser };
                        renderUsers(allUsers);
                    }

                    // Refresh stats
                    loadUserStats();

                    // Close modal
                    closeEditUserModal();

                    // Show success message
                    if (window.showNotification) {
                        window.showNotification('User updated successfully!', 'success');
                    } else {
                        alert('User updated successfully!');
                    }
                } else {
                    const errorData = await response.json().catch(() => ({ detail: 'Failed to update user' }));
                    throw new Error(errorData.detail || 'Failed to update user');
                }
            } catch (error) {
                console.error('Error updating user:', error);
                if (window.showNotification) {
                    window.showNotification(error.message || 'Failed to update user', 'error');
                } else {
                    alert(error.message || 'Failed to update user');
                }
            } finally {
                // Re-enable save button
                saveBtn.disabled = false;
                saveBtn.innerHTML = originalText;
            }
        }

        // Close edit modal when clicking outside
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('editUserModal');
            if (modal && e.target === modal) {
                closeEditUserModal();
            }
        });

        // Close edit modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const editModal = document.getElementById('editUserModal');
                if (editModal && editModal.classList.contains('show')) {
                    closeEditUserModal();
                }
                const addModal = document.getElementById('addUserModal');
                if (addModal && addModal.classList.contains('show')) {
                    closeAddUserModal();
                }
                const deleteModal = document.getElementById('deleteUserModal');
                if (deleteModal && deleteModal.classList.contains('show')) {
                    closeDeleteUserModal();
                }
            }
        });

        // Add User Modal Functions
        function openAddUserModal() {
            const modal = document.getElementById('addUserModal');
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeAddUserModal() {
            const modal = document.getElementById('addUserModal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                
                // Reset form
                document.getElementById('addUserForm').reset();
            }
        }

        async function createNewUser(event) {
            if (event) {
                event.preventDefault();
            }

            const auth = window.authManager;
            if (!auth || !auth.isAuthenticated()) {
                console.error('User not authenticated');
                window.location.href = '/';
                return;
            }

            const token = auth.getToken();
            if (!token) {
                console.error('No authentication token found');
                return;
            }

            // Get form data
            const userData = {
                first_name: document.getElementById('addFirstName').value.trim(),
                last_name: document.getElementById('addLastName').value.trim(),
                email: document.getElementById('addEmail').value.trim(),
                password: document.getElementById('addPassword').value,
                phone: document.getElementById('addPhone').value.trim() || null,
                company: document.getElementById('addCompany').value.trim() || null,
                location: document.getElementById('addLocation').value.trim() || null,
                user_type: document.getElementById('addUserType').value
            };

            // Validate password length
            if (userData.password.length < 6) {
                if (window.showNotification) {
                    window.showNotification('Password must be at least 6 characters long', 'error');
                } else {
                    alert('Password must be at least 6 characters long');
                }
                return;
            }

            // Disable create button and show loading
            const createBtn = document.querySelector('#addUserModal .btn-primary');
            const originalText = createBtn.innerHTML;
            createBtn.disabled = true;
            createBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';

            try {
                const response = await fetch('/api/admin/users', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (response.status === 401) {
                    console.error('Unauthorized - token may be expired');
                    auth.logout();
                    window.location.href = '/';
                    return;
                }

                if (response.ok) {
                    const newUser = await response.json();
                    
                    // Add new user to allUsers array
                    allUsers.push(newUser);
                    renderUsers(allUsers);

                    // Refresh stats
                    loadUserStats();

                    // Close modal
                    closeAddUserModal();

                    // Show success message
                    if (window.showNotification) {
                        window.showNotification('User created successfully!', 'success');
                    } else {
                        alert('User created successfully!');
                    }
                } else {
                    const errorData = await response.json().catch(() => ({ detail: 'Failed to create user' }));
                    throw new Error(errorData.detail || 'Failed to create user');
                }
            } catch (error) {
                console.error('Error creating user:', error);
                if (window.showNotification) {
                    window.showNotification(error.message || 'Failed to create user', 'error');
                } else {
                    alert(error.message || 'Failed to create user');
                }
            } finally {
                // Re-enable create button
                createBtn.disabled = false;
                createBtn.innerHTML = originalText;
            }
        }

        // Close add modal when clicking outside
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('addUserModal');
            if (modal && e.target === modal) {
                closeAddUserModal();
            }
        });

        // Close modal when clicking outside
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('viewUserModal');
            if (modal && e.target === modal) {
                closeViewUserModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeViewUserModal();
            }
        });

        // Edit user
        function editUser(userId) {
            openEditUserModal(userId);
        }

        // Delete user
        function deleteUser(userId) {
            const user = allUsers.find(u => u.id === userId);
            if (!user) {
                console.error('User not found');
                return;
            }

            currentDeletingUserId = userId;
            currentDeletingUserName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email || 'this user';
            
            // Update modal with user name
            document.getElementById('deleteUserName').textContent = currentDeletingUserName;
            
            // Show delete confirmation modal
            openDeleteUserModal();
        }

        function openDeleteUserModal() {
            const modal = document.getElementById('deleteUserModal');
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeDeleteUserModal() {
            const modal = document.getElementById('deleteUserModal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                currentDeletingUserId = null;
                currentDeletingUserName = null;
            }
        }

        async function confirmDeleteUser() {
            if (!currentDeletingUserId) {
                console.error('No user ID for deletion');
                return;
            }

            const auth = window.authManager;
            if (!auth || !auth.isAuthenticated()) {
                console.error('User not authenticated');
                window.location.href = '/';
                return;
            }

            const token = auth.getToken();
            if (!token) {
                console.error('No authentication token found');
                return;
            }

            // Disable delete button and show loading
            const deleteBtn = document.getElementById('confirmDeleteBtn');
            const originalText = deleteBtn.innerHTML;
            deleteBtn.disabled = true;
            deleteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';

            try {
                const response = await fetch(`/api/admin/users/${currentDeletingUserId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 401) {
                    console.error('Unauthorized - token may be expired');
                    auth.logout();
                    window.location.href = '/';
                    return;
                }

                if (response.ok) {
                    // Remove user from allUsers array
                    allUsers = allUsers.filter(u => u.id !== currentDeletingUserId);
                    renderUsers(allUsers);

                    // Refresh stats
                    loadUserStats();

                    // Close modal
                    closeDeleteUserModal();

                    // Show success message
                    if (window.showNotification) {
                        window.showNotification('User deleted successfully!', 'success');
                    } else {
                        alert('User deleted successfully!');
                    }
                } else {
                    const errorData = await response.json().catch(() => ({ detail: 'Failed to delete user' }));
                    throw new Error(errorData.detail || 'Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                if (window.showNotification) {
                    window.showNotification(error.message || 'Failed to delete user', 'error');
                } else {
                    alert(error.message || 'Failed to delete user');
                }
            } finally {
                // Re-enable delete button
                deleteBtn.disabled = false;
                deleteBtn.innerHTML = originalText;
            }
        }

        // Close delete modal when clicking outside
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('deleteUserModal');
            if (modal && e.target === modal) {
                closeDeleteUserModal();
            }
        });

        // Close delete modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const deleteModal = document.getElementById('deleteUserModal');
                if (deleteModal && deleteModal.classList.contains('show')) {
                    closeDeleteUserModal();
                }
            }
        });

        // Export users to CSV
        function exportUsers() {
            if (!allUsers || allUsers.length === 0) {
                if (window.showNotification) {
                    window.showNotification('No users to export', 'error');
                } else {
                    alert('No users to export');
                }
                return;
            }

            // Get current filter to export only filtered users
            const activeFilter = document.querySelector('.filter-tab.active')?.getAttribute('data-filter') || 'all';
            let usersToExport = allUsers;

            // Apply filter if not 'all'
            if (activeFilter === 'active') {
                usersToExport = allUsers.filter(u => u.is_active !== false);
            } else if (activeFilter === 'inactive') {
                usersToExport = allUsers.filter(u => u.is_active === false);
            }

            if (usersToExport.length === 0) {
                if (window.showNotification) {
                    window.showNotification('No users to export with current filter', 'error');
                } else {
                    alert('No users to export with current filter');
                }
                return;
            }

            // Format user data for CSV
            const headers = [
                'ID',
                'First Name',
                'Last Name',
                'Email',
                'Phone',
                'User Type',
                'Company',
                'Location',
                'Property Count',
                'Status',
                'Created At'
            ];

            // Format user type labels
            const userTypeLabels = {
                'owner': 'Property Owner',
                'consultant': 'Consultant',
                'tenant': 'Tenant',
                'admin': 'Administrator'
            };

            // Convert users to CSV rows
            const csvRows = [
                headers.join(',')
            ];

            usersToExport.forEach(user => {
                const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
                const userTypeLabel = userTypeLabels[user.user_type?.toLowerCase()] || user.user_type || 'Unknown';
                const status = user.is_active !== false ? 'Active' : 'Inactive';
                const createdDate = user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown';
                
                const row = [
                    user.id || '',
                    `"${(user.first_name || '').replace(/"/g, '""')}"`,
                    `"${(user.last_name || '').replace(/"/g, '""')}"`,
                    `"${(user.email || '').replace(/"/g, '""')}"`,
                    `"${(user.phone || '').replace(/"/g, '""')}"`,
                    `"${userTypeLabel.replace(/"/g, '""')}"`,
                    `"${(user.company || '').replace(/"/g, '""')}"`,
                    `"${(user.location || '').replace(/"/g, '""')}"`,
                    user.property_count || '0',
                    status,
                    createdDate
                ];
                csvRows.push(row.join(','));
            });

            // Create CSV content
            const csvContent = csvRows.join('\n');

            // Create blob and download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            // Generate filename
            const filename = 'prime_users.csv';
            
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success message
            if (window.showNotification) {
                window.showNotification(`Exported ${usersToExport.length} user(s) successfully!`, 'success');
            }
        }

        // Load user statistics from API
        async function loadUserStats() {
            try {
                const auth = window.authManager;
                if (!auth) {
                    console.error('authManager not available');
                    setTimeout(loadUserStats, 500);
                    return;
                }

                if (!auth.isAuthenticated()) {
                    console.error('User not authenticated');
                    return;
                }

                const token = auth.getToken();
                if (!token) {
                    console.error('No authentication token found');
                    return;
                }

                const response = await fetch('/api/admin/users/stats', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 401) {
                    console.error('Unauthorized - token may be expired');
                    auth.logout();
                    window.location.href = '/';
                    return;
                }

                if (response.ok) {
                    const stats = await response.json();
                    updateUserStats(stats);
                } else {
                    console.error('Failed to load user stats:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error loading user stats:', error);
            }
        }

        // Update user statistics in the UI
        function updateUserStats(stats) {
            // Update Total Users
            const totalUsersElement = document.getElementById('totalUsersValue');
            if (totalUsersElement) {
                totalUsersElement.textContent = stats.total_users || 0;
            }

            const totalUsersChange = document.getElementById('totalUsersChange');
            const totalUsersChangeText = document.getElementById('totalUsersChangeText');
            if (totalUsersChange && totalUsersChangeText) {
                const change = stats.monthly_change || 0;
                const isPositive = change >= 0;
                totalUsersChange.className = `stat-change ${isPositive ? 'positive' : 'negative'}`;
                totalUsersChange.querySelector('i').className = isPositive ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
                totalUsersChangeText.textContent = `${isPositive ? '+' : ''}${change} this month`;
            }

            // Update Active Users
            const activeUsersElement = document.getElementById('activeUsersValue');
            if (activeUsersElement) {
                activeUsersElement.textContent = stats.active_users || 0;
            }

            const activeUsersChange = document.getElementById('activeUsersChange');
            const activeUsersChangeText = document.getElementById('activeUsersChangeText');
            if (activeUsersChange && activeUsersChangeText) {
                const change = stats.active_monthly_change || 0;
                const isPositive = change >= 0;
                activeUsersChange.className = `stat-change ${isPositive ? 'positive' : 'negative'}`;
                activeUsersChange.querySelector('i').className = isPositive ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
                activeUsersChangeText.textContent = `${isPositive ? '+' : ''}${change} this month`;
            }

            // Update Inactive Users
            const inactiveUsersElement = document.getElementById('inactiveUsersValue');
            if (inactiveUsersElement) {
                inactiveUsersElement.textContent = stats.inactive_users || 0;
            }

            const inactiveUsersChange = document.getElementById('inactiveUsersChange');
            const inactiveUsersChangeText = document.getElementById('inactiveUsersChangeText');
            if (inactiveUsersChange && inactiveUsersChangeText) {
                const change = stats.inactive_monthly_change || 0;
                const isPositive = change >= 0;
                inactiveUsersChange.className = `stat-change ${isPositive ? 'positive' : 'negative'}`;
                inactiveUsersChange.querySelector('i').className = isPositive ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
                inactiveUsersChangeText.textContent = `${isPositive ? '+' : ''}${change} this month`;
            }
        }

        function initializeUserManagement() {
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
                    
                    // Filter users based on status
                    filterUsers(filter);
                });
            });

            // Search functionality
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const rows = document.querySelectorAll('.user-table tbody tr');
                
                rows.forEach(row => {
                    // Skip loading/error rows
                    if (row.querySelector('td[colspan]')) {
                        return;
                    }
                    
                    const nameCell = row.querySelector('.user-name-cell');
                    const emailCell = row.querySelector('.user-email-cell');
                    
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

            // Action button handlers
            actionButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.textContent;
                    const userName = this.closest('tr').querySelector('.user-name-cell').textContent;
                    
                    switch(action) {
                        case 'View':
                            alert(`Viewing details for: ${userName}`);
                            break;
                        case 'Edit':
                            alert(`Editing user: ${userName}`);
                            break;
                        case 'Delete':
                            if (confirm(`Are you sure you want to delete ${userName}?`)) {
                                alert(`User ${userName} deleted successfully`);
                            }
                            break;
                    }
                });
            });
        }

        function filterUsers(filter) {
            const rows = document.querySelectorAll('.user-table tbody tr');
            
            rows.forEach(row => {
                // Skip loading/error rows
                if (row.querySelector('td[colspan]')) {
                    return;
                }
                
                // Get status from data attribute (more reliable than text content)
                const status = row.getAttribute('data-status') || '';
                
                let show = false;
                
                switch(filter) {
                    case 'all':
                        show = true;
                        break;
                    case 'active':
                        // Show online users (session-based)
                        show = status === 'online';
                        break;
                    case 'inactive':
                        // Show offline users (session-based)
                        show = status === 'offline';
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

        // Navigation handlers - only handle placeholder links, let real links navigate normally
        document.querySelectorAll('.nav-item').forEach(nav => {
            const href = nav.getAttribute('href');
            // Only add event listener for placeholder links (#)
            if (href === '#') {
            nav.addEventListener('click', function(e) {
                    e.preventDefault();
                });
                }
            // For real navigation links, let them work normally - no JavaScript interference
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
        document.addEventListener('DOMContentLoaded', function() {
            const userProfile = document.getElementById('userProfileDropdown');
            const userDropdown = document.getElementById('userDropdown');
            
            if (userProfile && userDropdown) {
                userProfile.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Check if user is authenticated
                    const auth = window.authManager;
                    if (!auth || !auth.isAuthenticated()) {
                        window.location.href = '/';
                        return;
                    }
                    
                    const user = auth.getUser();
                    if (user) {
                        // Update user info display
                        const userNameElement = document.querySelector('.user-name');
                        const userRoleElement = document.querySelector('.user-role');
                        if (userNameElement) {
                            userNameElement.textContent = `${user.first_name} ${user.last_name}`;
                        }
                        if (userRoleElement) {
                            userRoleElement.textContent = user.user_type === 'admin' ? 'System Administrator' : 'User';
                        }
                    }
                    
                    // Toggle dropdown
                    userProfile.classList.toggle('active');
                    userDropdown.classList.toggle('show');
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!userProfile.contains(e.target) && !userDropdown.contains(e.target)) {
                        userProfile.classList.remove('active');
                        userDropdown.classList.remove('show');
                    }
                });
            }
        });

        // Logout function
        function logout() {
            if (confirm('Are you sure you want to logout?')) {
                const auth = window.authManager;
                if (auth) {
                    auth.logout();
                }
            }
        }

        // View profile function - unlocked
        function viewProfile() {
            if (userProfile && userDropdown) {
                userProfile.classList.remove('active');
                userDropdown.classList.remove('show');
            }
            const auth = window.authManager;
            const user = auth ? auth.getUser() : null;
            if (user) {
                if (user.user_type === 'consultant') window.location.href = '/consultant-profile';
                else if (user.user_type === 'owner') window.location.href = '/owner-profile';
                else window.location.href = '/settings';
            } else {
                window.location.href = '/settings';
            }
        }

        // Open settings function
        function openSettings() {
            if (window.showNotification) {
                window.showNotification('Settings feature coming soon!', 'info');
            } else {
                alert('Settings feature coming soon!');
            }
            if (userProfile && userDropdown) {
                userProfile.classList.remove('active');
                userDropdown.classList.remove('show');
            }
        }
