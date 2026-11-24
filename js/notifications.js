// Check authentication on page load
        function initializeNotifications() {
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

        // Initialize Notifications
        document.addEventListener('DOMContentLoaded', function() {
            initializeNotifications();
            loadNotifications();
            initializeNotificationFeatures();
            initializeAnimations();
        });

        let currentFilter = 'all';
        let notifications = [];

        // Load notifications from API
        async function loadNotifications(filter = 'all') {
            try {
                const token = authManager.getToken();
                if (!token) {
                    console.error('No authentication token found');
                    return;
                }

                currentFilter = filter;
                const response = await fetch(`/api/admin/notifications?filter_type=${filter}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    notifications = await response.json();
                    renderNotifications(notifications);
                    updateNotificationBadge();
                } else {
                    console.error('Failed to load notifications');
                    showNotificationError();
                }
            } catch (error) {
                console.error('Error loading notifications:', error);
                showNotificationError();
            }
        }

        // Render notifications
        function renderNotifications(notificationsData) {
            const container = document.getElementById('notificationItems');
            if (!container) return;

            if (!notificationsData || notificationsData.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-bell-slash"></i>
                        <h3>No Notifications</h3>
                        <p>You're all caught up! There are no notifications to display.</p>
                        </div>
                `;
                return;
            }

            const notificationsHTML = notificationsData.map(notification => {
                const isUnread = !notification.is_read;
                const isCritical = notification.is_critical || false;
                const category = notification.category || 'system';
                const type = notification.type || 'info';
                
                // Determine icon class based on type
                let iconClass = notification.icon || 'fas fa-info-circle';
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
                
                // Format time
                const timeAgo = formatTimeAgo(notification.timestamp);
                
                // Category label
                const categoryLabels = {
                    'system': 'System',
                    'payment': 'Payment',
                    'maintenance': 'Maintenance',
                    'user': 'User'
                };
                const categoryLabel = categoryLabels[category] || 'System';
                
                return `
                    <div class="notification-item ${isUnread ? 'unread' : ''} ${isCritical ? 'critical' : ''}" 
                         data-category="${category}" 
                         data-id="${notification.id}"
                         data-read="${isUnread ? 'false' : 'true'}">
                        <div class="notification-icon ${iconBgClass}">
                            <i class="${iconClass}"></i>
                        </div>
                        <div class="notification-content">
                            <div class="notification-title">${notification.title || 'Notification'}</div>
                            <div class="notification-message">${notification.message || ''}</div>
                            <div class="notification-meta">
                                <div class="notification-time">
                                    <i class="fas fa-clock"></i>
                                    <span>${timeAgo}</span>
                                </div>
                                <div class="notification-category category-${category}">${categoryLabel}</div>
                            </div>
                        </div>
                        <div class="notification-actions-item">
                            <div class="notification-status">
                                ${isUnread ? '<div class="unread-indicator"></div>' : '<div class="read-indicator"></div>'}
                            </div>
                            <button class="notification-action-btn" title="Mark as read" onclick="markNotificationAsRead('${notification.id}')">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="notification-action-btn" title="Delete" onclick="deleteNotificationById('${notification.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            container.innerHTML = notificationsHTML;
            
            // Re-attach event listeners
            attachNotificationListeners();
        }

        // Format time ago
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

        // Show notification error
        function showNotificationError() {
            const container = document.getElementById('notificationItems');
            if (container) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle" style="color: #e74c3c;"></i>
                        <h3>Error Loading Notifications</h3>
                        <p>Failed to load notifications. Please refresh the page.</p>
                        <button class="action-btn btn-primary" onclick="loadNotifications(currentFilter)" style="margin-top: 1rem;">
                            <i class="fas fa-sync-alt"></i>
                            Retry
                            </button>
                        </div>
                `;
            }
        }

        // Mark notification as read
        function markNotificationAsRead(notificationId) {
            const notificationItem = document.querySelector(`[data-id="${notificationId}"]`);
            if (notificationItem) {
                notificationItem.classList.remove('unread');
                notificationItem.setAttribute('data-read', 'true');
                const unreadIndicator = notificationItem.querySelector('.unread-indicator');
                const readIndicator = notificationItem.querySelector('.read-indicator');
                if (unreadIndicator) unreadIndicator.style.display = 'none';
                if (readIndicator) readIndicator.style.display = 'block';
                
                // Update in notifications array
                const notification = notifications.find(n => n.id === notificationId);
                if (notification) {
                    notification.is_read = true;
                }
                updateNotificationBadge();
            }
        }

        // Delete notification by ID
        function deleteNotificationById(notificationId) {
            const notificationItem = document.querySelector(`[data-id="${notificationId}"]`);
            if (notificationItem) {
                notificationItem.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    notificationItem.remove();
                    // Remove from notifications array
                    notifications = notifications.filter(n => n.id !== notificationId);
                    updateNotificationBadge();
                    
                    // Show empty state if no notifications left
                    const container = document.getElementById('notificationItems');
                    if (container && container.children.length === 0) {
                        container.innerHTML = `
                            <div class="empty-state">
                                <i class="fas fa-bell-slash"></i>
                                <h3>No Notifications</h3>
                                <p>You're all caught up! There are no notifications to display.</p>
                            </div>
                        `;
                    }
                }, 300);
            }
        }

        // Attach notification listeners
        function attachNotificationListeners() {
            const notificationItems = document.querySelectorAll('.notification-item');
            notificationItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    // Don't trigger if clicking on action buttons
                    if (e.target.closest('.notification-action-btn')) return;
                    
                    if (this.classList.contains('unread')) {
                        const notificationId = this.getAttribute('data-id');
                        markNotificationAsRead(notificationId);
                    }
                });
            });
        }

        function initializeNotificationFeatures() {
            const filterTabs = document.querySelectorAll('.filter-tab');
            const notificationItems = document.querySelectorAll('.notification-item');
            const markAllReadBtn = document.getElementById('markAllRead');
            const clearAllBtn = document.getElementById('clearAll');
            const searchInput = document.querySelector('.search-box input');

            // Filter functionality
            filterTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active tab
                    filterTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Reload notifications with filter
                    loadNotifications(filter);
                });
            });

            // Mark all as read
            markAllReadBtn.addEventListener('click', function() {
                const unreadItems = document.querySelectorAll('.notification-item.unread');
                unreadItems.forEach(item => {
                    const notificationId = item.getAttribute('data-id');
                    if (notificationId) {
                        markNotificationAsRead(notificationId);
                    }
                });
                updateNotificationBadge();
                showMessage('All notifications marked as read', 'success');
            });

            // Clear all notifications
            clearAllBtn.addEventListener('click', function() {
                const notificationItems = document.querySelectorAll('.notification-item');
                if (notificationItems.length === 0) {
                    showMessage('No notifications to clear', 'info');
                    return;
                }
                
                if (confirm('Are you sure you want to clear all notifications?')) {
            notificationItems.forEach(item => {
                        const notificationId = item.getAttribute('data-id');
                        if (notificationId) {
                            deleteNotificationById(notificationId);
                        }
                    });
                        updateNotificationBadge();
                    showMessage('All notifications cleared', 'success');
                    }
            });

            // Individual notification actions are handled in attachNotificationListeners()
            // which is called after notifications are loaded

            // Search functionality
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                notificationItems.forEach(item => {
                    const title = item.querySelector('.notification-title').textContent.toLowerCase();
                    const message = item.querySelector('.notification-message').textContent.toLowerCase();
                    
                    if (title.includes(query) || message.includes(query)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }


        function updateNotificationBadge() {
            const notificationBadge = document.querySelector('.notification-badge');
            const unreadCount = document.querySelectorAll('.notification-item.unread').length;
            
            if (notificationBadge) {
                if (unreadCount > 0) {
                    notificationBadge.textContent = unreadCount;
                    notificationBadge.style.display = 'block';
                } else {
                    notificationBadge.style.display = 'none';
                }
            }
            
            // Also update nav badge
            const navBadge = document.querySelector('.nav-badge');
            if (navBadge) {
                if (unreadCount > 0) {
                    navBadge.textContent = unreadCount;
                    navBadge.style.display = 'inline-block';
                } else {
                    navBadge.style.display = 'none';
                }
            }
        }

        function showMessage(message, type = 'info') {
            const messageDiv = document.createElement('div');
            messageDiv.className = `notification-message notification-message-${type}`;
            messageDiv.textContent = message;
            messageDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                z-index: 1002;
                font-weight: 500;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            
            document.body.appendChild(messageDiv);
            
            setTimeout(() => {
                messageDiv.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                messageDiv.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.parentNode.removeChild(messageDiv);
                    }
                }, 300);
            }, 3000);
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
                e.preventDefault();
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

        // Add fadeOut animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-100%);
                }
            }
        `;
        document.head.appendChild(style);
