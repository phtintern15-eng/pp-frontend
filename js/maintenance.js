// Check authentication on page load
        function initializeMaintenance() {
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

        // Load maintenance requests from API
        async function loadMaintenanceRequests() {
            try {
                const token = authManager.getToken();
                if (!token) {
                    console.error('No authentication token found');
                    showEmptyState();
                    return;
                }

                const response = await fetch('/api/services/admin/all', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const maintenanceRequests = await response.json();
                    updateMaintenanceRequestsList(maintenanceRequests);
                    updateMaintenanceStats(maintenanceRequests);
                } else {
                    console.error('Failed to load maintenance requests');
                    showEmptyState();
                }
            } catch (error) {
                console.error('Error loading maintenance requests:', error);
                showEmptyState();
            }
        }

        // Update maintenance requests list
        function updateMaintenanceRequestsList(maintenanceRequests) {
            const requestsList = document.getElementById('maintenanceRequestsList');
            if (!requestsList) return;
            
            if (!maintenanceRequests || maintenanceRequests.length === 0) {
                requestsList.innerHTML = `
                    <div class="request-item">
                        <div class="request-icon general">
                            <i class="fas fa-inbox"></i>
                        </div>
                        <div class="request-details">
                            <div class="request-title">No Maintenance Requests</div>
                            <div class="request-description">There are no maintenance requests at this time</div>
                            <div class="request-meta">
                                <span><i class="fas fa-info-circle"></i> Check back later</span>
                            </div>
                        </div>
                    </div>
                `;
                return;
            }
            
            const requestsHTML = maintenanceRequests.map((request, index) => {
                const iconClass = getMaintenanceIconClass(request.service_type);
                const icon = getMaintenanceIcon(request.service_type);
                const statusClass = getStatusClass(request.status);
                const statusText = getStatusText(request.status);
                const urgencyClass = request.urgency || 'medium';
                
                return `
                    <div class="request-item" data-status="${request.status}" data-urgency="${urgencyClass}">
                        <div class="request-icon ${iconClass}">
                            <i class="${icon}"></i>
                        </div>
                        <div class="request-details">
                            <div class="request-title">${request.service_type || 'Maintenance Request'}</div>
                            <div class="request-description">${request.description || 'No description provided'}</div>
                            <div class="request-meta">
                                <span><i class="fas fa-user"></i> User ID: ${request.user_id}</span>
                                ${request.property_id ? `<span><i class="fas fa-building"></i> Property ID: ${request.property_id}</span>` : ''}
                                <span><i class="fas fa-calendar"></i> ${formatTimeAgo(request.created_at)}</span>
                                ${request.urgency ? `<span><i class="fas fa-exclamation-triangle"></i> ${request.urgency}</span>` : ''}
                            </div>
                        </div>
                        <div class="request-status ${statusClass}">${statusText}</div>
                        <div class="request-actions">
                            ${request.status === 'pending' ? '<button class="request-action-btn btn-assign" onclick="assignRequest(' + request.id + ')">Assign</button>' : ''}
                            ${request.status === 'assigned' || request.status === 'in_progress' ? '<button class="request-action-btn btn-complete" onclick="completeRequest(' + request.id + ')">Complete</button>' : ''}
                            <button class="request-action-btn btn-view" onclick="viewRequest(' + request.id + ')">View</button>
                        </div>
                    </div>
                `;
            }).join('');
            
            requestsList.innerHTML = requestsHTML;
        }

        // Update maintenance stats
        function updateMaintenanceStats(maintenanceRequests) {
            if (!maintenanceRequests || !Array.isArray(maintenanceRequests)) return;
            
            const total = maintenanceRequests.length;
            const pending = maintenanceRequests.filter(r => r.status === 'pending').length;
            const inProgress = maintenanceRequests.filter(r => r.status === 'in_progress').length;
            const completed = maintenanceRequests.filter(r => r.status === 'completed').length;
            
            const totalEl = document.getElementById('totalMaintenanceRequests');
            if (totalEl) totalEl.textContent = total;
            
            const pendingEl = document.getElementById('pendingMaintenanceRequests');
            if (pendingEl) pendingEl.textContent = pending;
            
            const inProgressEl = document.getElementById('inProgressMaintenanceRequests');
            if (inProgressEl) inProgressEl.textContent = inProgress;
            
            const completedEl = document.getElementById('completedMaintenanceRequests');
            if (completedEl) completedEl.textContent = completed;
        }

        // Helper functions
        function getMaintenanceIconClass(serviceType) {
            if (!serviceType) return 'general';
            const type = serviceType.toLowerCase();
            if (type.includes('plumb') || type.includes('water') || type.includes('sink') || type.includes('toilet')) return 'plumbing';
            if (type.includes('electric') || type.includes('electrical') || type.includes('outlet')) return 'electrical';
            if (type.includes('hvac') || type.includes('ac') || type.includes('heating') || type.includes('cooling')) return 'hvac';
            return 'general';
        }

        function getMaintenanceIcon(serviceType) {
            if (!serviceType) return 'fas fa-tools';
            const type = serviceType.toLowerCase();
            if (type.includes('plumb') || type.includes('water') || type.includes('sink')) return 'fas fa-wrench';
            if (type.includes('toilet')) return 'fas fa-toilet';
            if (type.includes('electric') || type.includes('electrical') || type.includes('outlet')) return 'fas fa-bolt';
            if (type.includes('hvac') || type.includes('ac') || type.includes('heating') || type.includes('cooling')) return 'fas fa-thermometer-half';
            if (type.includes('door') || type.includes('lock')) return 'fas fa-home';
            return 'fas fa-tools';
        }

        function getStatusClass(status) {
            if (!status) return 'status-pending';
            const s = status.toLowerCase();
            if (s === 'pending') return 'status-pending';
            if (s === 'assigned') return 'status-in-progress';
            if (s === 'in_progress' || s === 'in-progress') return 'status-in-progress';
            if (s === 'completed') return 'status-completed';
            return 'status-pending';
        }

        function getStatusText(status) {
            if (!status) return 'Pending';
            const s = status.toLowerCase();
            if (s === 'in_progress' || s === 'in-progress') return 'In Progress';
            return s.charAt(0).toUpperCase() + s.slice(1);
        }

        function formatTimeAgo(timestamp) {
            if (!timestamp) return 'Unknown';
            const now = new Date();
            const time = new Date(timestamp);
            const diffInSeconds = Math.floor((now - time) / 1000);
            
            if (diffInSeconds < 60) {
                return `${diffInSeconds} seconds ago`;
            } else if (diffInSeconds < 3600) {
                const minutes = Math.floor(diffInSeconds / 60);
                return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else if (diffInSeconds < 86400) {
                const hours = Math.floor(diffInSeconds / 3600);
                return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            } else {
                const days = Math.floor(diffInSeconds / 86400);
                return `${days} day${days > 1 ? 's' : ''} ago`;
            }
        }

        function showEmptyState() {
            const requestsList = document.getElementById('maintenanceRequestsList');
            if (requestsList) {
                requestsList.innerHTML = `
                    <div class="request-item">
                        <div class="request-icon general">
                            <i class="fas fa-inbox"></i>
                        </div>
                        <div class="request-details">
                            <div class="request-title">No Maintenance Requests</div>
                            <div class="request-description">Unable to load maintenance requests at this time</div>
                            <div class="request-meta">
                                <span><i class="fas fa-exclamation-circle"></i> Please try again later</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Action functions
        function assignRequest(requestId) {
            alert(`Assigning maintenance request #${requestId}`);
            // TODO: Implement assignment functionality
        }

        function completeRequest(requestId) {
            if (confirm(`Mark maintenance request #${requestId} as completed?`)) {
                alert(`Maintenance request #${requestId} marked as completed`);
                // TODO: Implement completion functionality
                loadMaintenanceRequests();
            }
        }

        function viewRequest(requestId) {
            alert(`Viewing maintenance request #${requestId}`);
            // TODO: Implement view details functionality
        }

        // Initialize Service Maintenance
        document.addEventListener('DOMContentLoaded', function() {
            initializeMaintenance();
            initializeServiceMaintenance();
            initializeAnimations();
            initializeNotificationPanel();
            loadMaintenanceRequests();
        });

        function initializeServiceMaintenance() {
            const filterTabs = document.querySelectorAll('.filter-tab');
            const searchInput = document.querySelector('.search-box input');

            // Filter functionality
            filterTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active tab
                    filterTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter requests based on status
                    filterRequests(filter);
                });
            });

            // Search functionality
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const query = this.value.toLowerCase();
                    const requests = document.querySelectorAll('.request-item');
                    
                    requests.forEach(request => {
                        const title = request.querySelector('.request-title')?.textContent.toLowerCase() || '';
                        const description = request.querySelector('.request-description')?.textContent.toLowerCase() || '';
                        
                        if (title.includes(query) || description.includes(query)) {
                            request.style.display = '';
                        } else {
                            request.style.display = 'none';
                        }
                    });
                });
            }
        }

        function filterRequests(filter) {
            const requests = document.querySelectorAll('.request-item');
            
            requests.forEach(request => {
                const status = request.getAttribute('data-status') || '';
                
                let show = false;
                
                switch(filter) {
                    case 'all':
                        show = true;
                        break;
                    case 'pending':
                        show = status === 'pending';
                        break;
                    case 'in-progress':
                        show = status === 'in_progress' || status === 'in-progress';
                        break;
                    case 'completed':
                        show = status === 'completed';
                        break;
                }
                
                request.style.display = show ? '' : 'none';
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

        // Notification Panel Functionality
        function initializeNotificationPanel() {
            const notificationBtn = document.getElementById('notificationBtn');
            const notificationPanel = document.getElementById('notificationPanel');
            const closePanelBtn = document.getElementById('closePanelBtn');
            const markAllReadBtn = document.getElementById('markAllReadBtn');

            if (notificationBtn && notificationPanel) {
                notificationBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleNotificationPanel();
                });

                if (closePanelBtn) {
                    closePanelBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        closeNotificationPanel();
                    });
                }

                if (markAllReadBtn) {
                    markAllReadBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        markAllNotificationsAsRead();
                    });
                }

                // Close panel when clicking outside
                document.addEventListener('click', function(e) {
                    if (notificationPanel && notificationPanel.classList.contains('show')) {
                        if (!notificationPanel.contains(e.target) && !notificationBtn.contains(e.target)) {
                            closeNotificationPanel();
                        }
                    }
                });

                // Close panel on Escape key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && notificationPanel && notificationPanel.classList.contains('show')) {
                        closeNotificationPanel();
                    }
                });
            }
        }

        function toggleNotificationPanel() {
            const notificationPanel = document.getElementById('notificationPanel');
            if (notificationPanel) {
                if (notificationPanel.classList.contains('show')) {
                    closeNotificationPanel();
                } else {
                    openNotificationPanel();
                }
            }
        }

        function openNotificationPanel() {
            const notificationPanel = document.getElementById('notificationPanel');
            if (notificationPanel) {
                notificationPanel.classList.add('show');
                loadNotifications();
            }
        }

        function closeNotificationPanel() {
            const notificationPanel = document.getElementById('notificationPanel');
            if (notificationPanel) {
                notificationPanel.classList.remove('show');
            }
        }

        async function loadNotifications() {
            try {
                const token = authManager.getToken();
                if (!token) {
                    console.error('No authentication token found');
                    return;
                }

                const response = await fetch('/api/admin/notifications?filter_type=all&limit=10', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const notifications = await response.json();
                    renderNotifications(notifications);
                    updateNotificationBadge(notifications);
                } else {
                    showNotificationError();
                }
            } catch (error) {
                console.error('Error loading notifications:', error);
                showNotificationError();
            }
        }

        function renderNotifications(notificationsData) {
            const container = document.getElementById('notificationList');
            if (!container) return;

            if (!notificationsData || notificationsData.length === 0) {
                container.innerHTML = `
                    <div class="notification-empty">
                        <i class="fas fa-bell-slash"></i>
                        <p>No notifications</p>
                    </div>
                `;
                return;
            }

            const notificationsHTML = notificationsData.map(notification => {
                const isUnread = !notification.is_read;
                const type = notification.type || 'info';
                
                let iconClass = 'fas fa-info-circle';
                let iconBgClass = 'system';
                if (type === 'critical') {
                    iconBgClass = 'critical';
                    iconClass = 'fas fa-exclamation-triangle';
                } else if (type === 'warning') {
                    iconBgClass = 'warning';
                    iconClass = 'fas fa-exclamation-circle';
                } else if (type === 'success') {
                    iconBgClass = 'success';
                    iconClass = 'fas fa-check-circle';
                } else if (type === 'info') {
                    iconBgClass = 'info';
                    iconClass = notification.icon || 'fas fa-info-circle';
                }
                
                const timeAgo = formatTimeAgo(notification.timestamp);
                
                return `
                    <div class="notification-item ${isUnread ? 'unread' : ''}" data-id="${notification.id}">
                        <div class="notification-icon ${iconBgClass}">
                            <i class="${iconClass}"></i>
                        </div>
                        <div class="notification-content">
                            <div class="notification-title">${notification.title || 'Notification'}</div>
                            <div class="notification-message">${notification.message || ''}</div>
                            <div class="notification-time">${timeAgo}</div>
                        </div>
                        <div class="notification-status">
                            ${isUnread ? '<div class="unread-indicator"></div>' : '<div class="read-indicator"></div>'}
                        </div>
                    </div>
                `;
            }).join('');

            container.innerHTML = notificationsHTML;
            
            // Attach click handlers
            container.querySelectorAll('.notification-item').forEach(item => {
                item.addEventListener('click', function() {
                    const notificationId = this.getAttribute('data-id');
                    if (notificationId) {
                        markNotificationAsRead(notificationId);
                        this.classList.remove('unread');
                        const indicator = this.querySelector('.unread-indicator');
                        if (indicator) {
                            indicator.outerHTML = '<div class="read-indicator"></div>';
                        }
                    }
                });
            });
        }

        function formatTimeAgo(timestamp) {
            if (!timestamp) return 'Unknown time';
            
            const date = new Date(timestamp);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
            if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
            if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
            
            return date.toLocaleDateString();
        }

        function updateNotificationBadge(notifications) {
            const badge = document.getElementById('notificationBadge');
            if (badge && notifications) {
                const unreadCount = notifications.filter(n => !n.is_read).length;
                if (unreadCount > 0) {
                    badge.textContent = unreadCount;
                    badge.style.display = 'flex';
                } else {
                    badge.style.display = 'none';
                }
            }
        }

        function markNotificationAsRead(notificationId) {
            // Optimistically update UI
            const item = document.querySelector(`[data-id="${notificationId}"]`);
            if (item) {
                item.classList.remove('unread');
            }
            
            // Update badge
            const badge = document.getElementById('notificationBadge');
            if (badge) {
                const currentCount = parseInt(badge.textContent) || 0;
                if (currentCount > 0) {
                    badge.textContent = currentCount - 1;
                    if (badge.textContent === '0') {
                        badge.style.display = 'none';
                    }
                }
            }
        }

        async function markAllNotificationsAsRead() {
            const container = document.getElementById('notificationList');
            if (container) {
                container.querySelectorAll('.notification-item.unread').forEach(item => {
                    item.classList.remove('unread');
                    const indicator = item.querySelector('.unread-indicator');
                    if (indicator) {
                        indicator.outerHTML = '<div class="read-indicator"></div>';
                    }
                });
            }
            
            const badge = document.getElementById('notificationBadge');
            if (badge) {
                badge.textContent = '0';
                badge.style.display = 'none';
            }
        }

        function showNotificationError() {
            const container = document.getElementById('notificationList');
            if (container) {
                container.innerHTML = `
                    <div class="notification-empty">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Failed to load notifications</p>
                    </div>
                `;
            }
        }

        // Initialize notification panel
        document.addEventListener('DOMContentLoaded', function() {
            initializeNotificationPanel();
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
