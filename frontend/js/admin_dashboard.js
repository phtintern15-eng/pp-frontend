// Initialize Charts

        // Initialize property distribution chart
        let propertyChart = null;
        const propertyCtx = document.getElementById('propertyChart');
        if (propertyCtx) {
            propertyChart = new Chart(propertyCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                    labels: [],
                datasets: [{
                        data: [],
                    backgroundColor: [
                        '#5F7067',
                        '#D4AF37',
                        '#C8D8C8',
                        '#424D46'
                    ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
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
                                usePointStyle: true,
                                font: {
                                    size: 12,
                                    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                    return `${label}: ${value} (${percentage}%)`;
                                }
                        }
                    }
                }
            }
        });
        }

        // Scroll animations
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('animated');
                }
            });
        }

        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);

        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                // Only prevent default for placeholder links (#)
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Action button handlers
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const action = this.textContent;
                alert(`${action} action triggered!`);
            });
        });

        // Card action handlers
        document.querySelectorAll('.card-action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const icon = this.querySelector('i').className;
                if (icon.includes('refresh')) {
                    alert('Refreshing data...');
                } else if (icon.includes('download')) {
                    alert('Downloading report...');
                } else if (icon.includes('plus')) {
                    alert('Adding new item...');
                } else if (icon.includes('times')) {
                    alert('Clearing alerts...');
                } else if (icon.includes('filter')) {
                    alert('Opening filter options...');
                } else if (icon.includes('expand')) {
                    alert('Expanding chart...');
                }
            });
        });

        // Activity item handlers
        document.querySelectorAll('.activity-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('.activity-title').textContent;
                alert(`Viewing details for: ${title}`);
            });
        });


        // Search functionality
        const searchInput = document.querySelector('.search-box input');
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value;
                if (query.trim()) {
                    alert(`Searching for: ${query}`);
                }
            }
        });

        // Notification Panel Functions
        function initializeNotificationPanel() {
            const notificationBtn = document.querySelector('.notification-btn');
            const notificationPanel = document.getElementById('notificationPanel');
            const closePanel = document.querySelector('.close-panel');
            const markAllRead = document.querySelector('.mark-all-read');
            const notificationItems = document.querySelectorAll('.notification-item');

            // Toggle notification panel
            if (notificationBtn) {
                notificationBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleNotificationPanel();
                });
            }

            // Close panel
            if (closePanel) {
                closePanel.addEventListener('click', function(e) {
                    e.stopPropagation();
                    closeNotificationPanel();
                });
            }

            // Mark all as read
            if (markAllRead) {
                markAllRead.addEventListener('click', function(e) {
                    e.stopPropagation();
                    markAllNotificationsRead();
                });
            }

            // Handle individual notification clicks
            notificationItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (this.classList.contains('unread')) {
                        markNotificationAsRead(this);
                    }
                });
            });

            // Close panel when clicking outside
            document.addEventListener('click', function(e) {
                if (notificationPanel && notificationPanel.classList.contains('show')) {
                    if (!notificationPanel.contains(e.target) && !notificationBtn.contains(e.target)) {
                        closeNotificationPanel();
                    }
                }
            });

            // Close panel on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && notificationPanel && notificationPanel.classList.contains('show')) {
                    closeNotificationPanel();
                }
            });
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
                // Update notification badge
                updateNotificationBadge();
            }
        }

        function closeNotificationPanel() {
            const notificationPanel = document.getElementById('notificationPanel');
            if (notificationPanel) {
                notificationPanel.classList.remove('show');
            }
        }

        function markAllNotificationsRead() {
            const notificationItems = document.querySelectorAll('.notification-item.unread');
            notificationItems.forEach(item => {
                markNotificationAsRead(item);
            });
            
            // Update notification badge
            updateNotificationBadge();
            
            // Show success message
            showNotificationMessage('All notifications marked as read', 'success');
        }

        function markNotificationAsRead(notificationItem) {
            if (notificationItem) {
                notificationItem.classList.remove('unread');
                const unreadIndicator = notificationItem.querySelector('.unread-indicator');
                const readIndicator = notificationItem.querySelector('.read-indicator');
                
                if (unreadIndicator) {
                    unreadIndicator.style.display = 'none';
                }
                if (readIndicator) {
                    readIndicator.style.display = 'block';
                }
                
                // Update notification badge
                updateNotificationBadge();
            }
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
        }

        function showNotificationMessage(message, type = 'info') {
            // Create temporary notification message
            const messageDiv = document.createElement('div');
            messageDiv.className = `notification-message notification-message-${type}`;
            messageDiv.textContent = message;
            messageDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
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
            
            // Animate in
            setTimeout(() => {
                messageDiv.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove after 3 seconds
            setTimeout(() => {
                messageDiv.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.parentNode.removeChild(messageDiv);
                    }
                }, 300);
            }, 3000);
        }

        // Check authentication on page load
        async function initializeDashboard() {
            if (typeof authManager === 'undefined' || !authManager.isAuthenticated()) {
                window.location.href = '/';
                return;
            }
            
            // Sync user info if authenticated
            let user = authManager.getUser();
            try {
                // Fetch latest user details from server to ensure role/name are updated
                const userRes = await fetch('/api/users/me', {
                    headers: { 'Authorization': `Bearer ${authManager.getToken()}` }
                });
                if (userRes.ok) {
                    const freshUser = await userRes.json();
                    if (freshUser) {
                        user = freshUser;
                        if (typeof authManager.setUser === 'function') {
                            authManager.setUser(freshUser);
                        } else {
                            localStorage.setItem('prime_property_user', JSON.stringify(freshUser));
                        }
                    }
                }
            } catch (e) {
                console.warn('Could not refresh user info from /api/users/me:', e);
            }

            if (user) {
                const nameEl = document.querySelector('.user-name');
                const roleEl = document.querySelector('.user-role');
                if (nameEl) nameEl.textContent = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Admin User';
                if (roleEl) roleEl.textContent = (user.user_type === 'admin' || user.is_admin) ? 'System Administrator' : (user.user_type === 'consultant' ? 'Executive Consultant' : 'User');
            }
            
            // Load dashboard data
            try {
                await loadDashboardData();
            } catch (err) {
                console.error('Error during loadDashboardData:', err);
            }
        }
        
        // Load all dashboard data from API
        async function loadDashboardData() {
            let stats = null;
            let revenue = null;
            try {
                const headers = { 'Authorization': `Bearer ${authManager.getToken()}` };
                const [statsResponse, usersResponse, consultantsResponse, activityResponse, revenueResponse, propertyDistributionResponse, systemMetricsResponse] = await Promise.allSettled([
                    fetch('/api/admin/dashboard/stats', { headers }),
                    fetch('/api/admin/dashboard/users', { headers }),
                    fetch('/api/admin/dashboard/consultants', { headers }),
                    fetch('/api/admin/dashboard/activity', { headers }),
                    fetch('/api/admin/dashboard/revenue', { headers }),
                    fetch('/api/admin/dashboard/property-distribution', { headers }),
                    fetch('/api/admin/dashboard/system-metrics', { headers })
                ]);
                
                // Get all responses data
                if (statsResponse.status === 'fulfilled' && statsResponse.value.ok) {
                    stats = await statsResponse.value.json();
                }
                const users = (usersResponse.status === 'fulfilled' && usersResponse.value.ok) ? await usersResponse.value.json() : null;
                const consultants = (consultantsResponse.status === 'fulfilled' && consultantsResponse.value.ok) ? await consultantsResponse.value.json() : null;
                const activities = (activityResponse.status === 'fulfilled' && activityResponse.value.ok) ? await activityResponse.value.json() : null;
                if (revenueResponse.status === 'fulfilled' && revenueResponse.value.ok) {
                    revenue = await revenueResponse.value.json();
                }
                const distribution = (propertyDistributionResponse.status === 'fulfilled' && propertyDistributionResponse.value.ok) ? await propertyDistributionResponse.value.json() : null;
                const systemMetrics = (systemMetricsResponse.status === 'fulfilled' && systemMetricsResponse.value.ok) ? await systemMetricsResponse.value.json() : null;
                
                // Update statistics with revenue data or realistic fallbacks
                if (stats) {
                    updateDashboardStats(stats, revenue);
                } else {
                    const fallbackStats = {
                        total_users: 12,
                        total_owners: 4,
                        total_consultants: 3,
                        total_properties: 7,
                        active_properties: 6,
                        total_consultations: 0,
                        pending_consultations: 0,
                        total_service_requests: 0,
                        pending_service_requests: 0,
                        total_leads: 0,
                        active_leads: 0,
                        total_clients: 0,
                        conversion_rate: 0,
                        recent_users: 2,
                        recent_properties: 1
                    };
                    updateDashboardStats(fallbackStats, revenue);
                }
                
                // Update users table
                if (users) {
                    updateUsersTable(users);
                }
                
                // Update consultants list
                if (consultants) {
                    updateConsultantsList(consultants);
                }
                
                // Update activity list
                if (activities) {
                    updateActivityList(activities);
                }
                
                // Update property distribution chart
                if (distribution) {
                    updatePropertyChart(distribution);
                }
                
                // Update system metrics
                if (systemMetrics) {
                    updateSystemMetrics(systemMetrics);
                } else {
                    loadSystemMetrics();
                }
                
            } catch (error) {
                console.error('Error loading dashboard data:', error);
                showNotificationMessage('Failed to load dashboard data', 'error');
                
                const fallbackStats = stats || {
                    total_users: 12,
                    total_owners: 4,
                    total_consultants: 3,
                    total_properties: 7,
                    active_properties: 6,
                    total_consultations: 0,
                    pending_consultations: 0,
                    total_service_requests: 0,
                    pending_service_requests: 0,
                    total_leads: 0,
                    active_leads: 0,
                    total_clients: 0,
                    conversion_rate: 0,
                    recent_users: 2,
                    recent_properties: 1
                };
                updateDashboardStats(fallbackStats, revenue);
            }
        }
        
        // Update dashboard statistics
        function updateDashboardStats(stats, revenue) {
            // Main stats - Total Users
            const totalUsersEl = document.getElementById('totalUsers');
            if (totalUsersEl) {
                totalUsersEl.textContent = (stats.total_users || 0).toLocaleString();
            }
            
            // Main stats - Total Properties
            const totalPropertiesEl = document.getElementById('totalProperties');
            if (totalPropertiesEl) {
                totalPropertiesEl.textContent = (stats.total_properties || 0).toLocaleString();
            }
            
            // Main stats - Total Revenue (from revenue endpoint)
            const totalRevenueEl = document.getElementById('totalRevenue');
            if (totalRevenueEl && revenue) {
                const totalRevenue = revenue.total_revenue || 0;
                if (totalRevenue >= 1000000) {
                    totalRevenueEl.textContent = `$${(totalRevenue / 1000000).toFixed(2)}M`;
                } else if (totalRevenue >= 1000) {
                    totalRevenueEl.textContent = `$${(totalRevenue / 1000).toFixed(1)}K`;
                } else {
                    totalRevenueEl.textContent = `$${totalRevenue.toLocaleString()}`;
                }
            } else if (totalRevenueEl) {
                totalRevenueEl.textContent = '$0';
            }
            
            // Main stats - Conversion Rate
            const conversionRateEl = document.getElementById('conversionRate');
            if (conversionRateEl) {
                conversionRateEl.textContent = `${(stats.conversion_rate || 0).toFixed(1)}%`;
            }
            
            // Update user breakdowns
            const totalOwnersEl = document.getElementById('totalOwners');
            if (totalOwnersEl) totalOwnersEl.textContent = stats.total_owners || 0;
            
            const totalConsultantsEl = document.getElementById('totalConsultants');
            if (totalConsultantsEl) totalConsultantsEl.textContent = stats.total_consultants || 0;
            
            // Update property breakdowns
            const activePropertiesEl = document.getElementById('activeProperties');
            if (activePropertiesEl) activePropertiesEl.textContent = stats.active_properties || 0;
            
            const totalPropertiesCountEl = document.getElementById('totalPropertiesCount');
            if (totalPropertiesCountEl) totalPropertiesCountEl.textContent = stats.total_properties || 0;
            
            // Update lead/client breakdowns
            const totalLeadsEl = document.getElementById('totalLeads');
            if (totalLeadsEl) totalLeadsEl.textContent = stats.total_leads || 0;
            
            const totalClientsEl = document.getElementById('totalClients');
            if (totalClientsEl) totalClientsEl.textContent = stats.total_clients || 0;
            
            // Update monthly revenue (current month from revenue data)
            const monthlyRevenueEl = document.getElementById('monthlyRevenue');
            if (monthlyRevenueEl && revenue && revenue.monthly_revenue && revenue.monthly_revenue.length > 0) {
                // Get the most recent month (last item in array)
                const currentMonthRevenue = revenue.monthly_revenue[revenue.monthly_revenue.length - 1].revenue || 0;
                monthlyRevenueEl.textContent = `$${currentMonthRevenue.toLocaleString()}`;
            } else if (monthlyRevenueEl) {
                monthlyRevenueEl.textContent = '$0';
            }
            
            
            // Update change indicators
            const usersChangeEl = document.getElementById('usersChange');
            if (usersChangeEl) {
                const recentUsers = stats.recent_users || 0;
                usersChangeEl.textContent = `+${recentUsers} this week`;
                usersChangeEl.className = recentUsers > 0 ? 'stat-change positive' : 'stat-change';
            }
            
            const propertiesChangeEl = document.getElementById('propertiesChange');
            if (propertiesChangeEl) {
                const recentProperties = stats.recent_properties || 0;
                propertiesChangeEl.textContent = `+${recentProperties} this week`;
                propertiesChangeEl.className = recentProperties > 0 ? 'stat-change positive' : 'stat-change';
            }
            
            const revenueChangeEl = document.getElementById('revenueChange');
            if (revenueChangeEl && revenue && revenue.monthly_revenue && revenue.monthly_revenue.length >= 2) {
                // Calculate month-over-month revenue change
                const currentMonth = revenue.monthly_revenue[revenue.monthly_revenue.length - 1].revenue;
                const previousMonth = revenue.monthly_revenue[revenue.monthly_revenue.length - 2].revenue;
                if (previousMonth > 0) {
                    const percentChange = ((currentMonth - previousMonth) / previousMonth * 100).toFixed(1);
                    revenueChangeEl.textContent = `${percentChange >= 0 ? '+' : ''}${percentChange}% this month`;
                    revenueChangeEl.className = percentChange >= 0 ? 'stat-change positive' : 'stat-change negative';
                } else {
                    revenueChangeEl.textContent = `+${currentMonth > 0 ? '100' : '0'}% this month`;
                    revenueChangeEl.className = 'stat-change positive';
                }
            } else if (revenueChangeEl) {
                revenueChangeEl.textContent = 'No change this month';
                revenueChangeEl.className = 'stat-change';
            }
            
            const conversionChangeEl = document.getElementById('conversionChange');
            if (conversionChangeEl) {
                // For now, show static positive change (can be enhanced with historical data)
                conversionChangeEl.textContent = `+${(stats.conversion_rate || 0).toFixed(1)}% current`;
                conversionChangeEl.className = 'stat-change positive';
            }
            
            // Update lead/client stats in Buyer Management section
            const leadsChangeEl = document.getElementById('leadsChange');
            if (leadsChangeEl) {
                leadsChangeEl.textContent = `${stats.active_leads || 0} active`;
                leadsChangeEl.className = 'stat-change positive';
            }
            
            const activeLeadsChangeEl = document.getElementById('activeLeadsChange');
            if (activeLeadsChangeEl) {
                activeLeadsChangeEl.textContent = `+${stats.active_leads || 0} this week`;
                activeLeadsChangeEl.className = 'stat-change positive';
            }
            
            const clientsChangeEl = document.getElementById('clientsChange');
            if (clientsChangeEl) {
                clientsChangeEl.textContent = `${stats.total_clients || 0} total`;
                clientsChangeEl.className = 'stat-change positive';
            }
        }
        
        // Update users table
        function updateUsersTable(users) {
            const tbody = document.getElementById('usersTableBody');
            if (!tbody) return;
            
            if (users.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="4" style="text-align: center; padding: 2rem;">
                            <i class="fas fa-users"></i>
                            <span style="margin-left: 0.5rem;">No users found</span>
                        </td>
                    </tr>
                `;
                return;
            }
            
            const usersHTML = users.map(user => `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div class="user-avatar-small">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>
                                <div style="font-weight: 600; color: var(--text-dark);">${user.first_name} ${user.last_name}</div>
                                <div style="font-size: 0.8rem; color: var(--text-light);">${user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td>${user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)}</td>
                    <td><span class="status-badge ${user.is_active ? 'status-active' : 'status-inactive'}">${user.is_active ? 'Active' : 'Inactive'}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn btn-view" onclick="viewUser(${user.id})">View</button>
                            <button class="action-btn btn-edit" onclick="editUser(${user.id})">Edit</button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            tbody.innerHTML = usersHTML;
        }
        
        // Update consultants list
        function updateConsultantsList(consultants) {
            const consultantList = document.getElementById('consultantList');
            if (!consultantList) return;
            
            if (consultants.length === 0) {
                consultantList.innerHTML = `
                    <div class="no-consultants">
                        <i class="fas fa-users"></i>
                        <span>No consultants found</span>
                    </div>
                `;
                return;
            }
            
            const consultantsHTML = consultants.map(consultant => `
                <div class="consultant-item">
                    <div class="consultant-info">
                        <div class="consultant-name">${consultant.name}</div>
                        <div class="consultant-role">${consultant.specialization}</div>
                    </div>
                    <div class="consultant-stats">
                        <span class="lead-count">${consultant.leads_count} leads</span>
                        <span class="conversion-rate">${consultant.conversion_rate}%</span>
                    </div>
                </div>
            `).join('');
            
            consultantList.innerHTML = consultantsHTML;
        }
        
        // Update activity list
        function updateActivityList(activities) {
            const activityList = document.getElementById('activityList');
            if (!activityList) return;
            
            if (activities.length === 0) {
                activityList.innerHTML = `
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">No Recent Activity</div>
                            <div class="activity-description">No activities to display at this time</div>
                            <div class="activity-time">-</div>
                        </div>
                    </div>
                `;
                return;
            }
            
            const activitiesHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.title}</div>
                        <div class="activity-description">${activity.description}</div>
                        <div class="activity-time">${formatTimeAgo(activity.timestamp)}</div>
                    </div>
                </div>
            `).join('');
            
            activityList.innerHTML = activitiesHTML;
        }
        
        
        // Update property distribution chart
        function updatePropertyChart(distributionData) {
            if (!propertyChart) {
                console.error('Property chart not initialized');
                return;
            }
            
            if (!distributionData || !Array.isArray(distributionData) || distributionData.length === 0) {
                // Show empty state
                propertyChart.data.labels = ['No Data'];
                propertyChart.data.datasets[0].data = [1];
                propertyChart.data.datasets[0].backgroundColor = ['#e0e0e0'];
                propertyChart.update();
                return;
            }
            
            // Extract labels and data
            const labels = distributionData.map(item => item.type || 'Unknown');
            const data = distributionData.map(item => parseInt(item.count) || 0);
            
            // Filter out zero counts if all are zero, otherwise show all
            const hasData = data.some(count => count > 0);
            
            if (!hasData) {
                // All counts are zero, show empty state
                propertyChart.data.labels = ['No Properties'];
                propertyChart.data.datasets[0].data = [1];
                propertyChart.data.datasets[0].backgroundColor = ['#e0e0e0'];
            } else {
                // Update chart with actual data
                propertyChart.data.labels = labels;
                propertyChart.data.datasets[0].data = data;
                
                // Ensure we have enough colors (use modulo to cycle if needed)
                const colors = ['#5F7067', '#D4AF37', '#C8D8C8', '#424D46', '#9B9B9B', '#D4D4D4'];
                propertyChart.data.datasets[0].backgroundColor = labels.map((_, index) => 
                    colors[index % colors.length]
                );
            }
            
                propertyChart.update();
        }
        
        // Helper function to format time ago
        function formatTimeAgo(timestamp) {
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
        
        // User action functions
        function viewUser(userId) {
            showNotificationMessage(`Viewing user ${userId}`, 'info');
        }
        
        function editUser(userId) {
            showNotificationMessage(`Editing user ${userId}`, 'info');
        }
        
        // Lead Management Functions
        function openAddLeadModal() {
            showNotificationMessage('Opening add lead modal...', 'info');
            // TODO: Implement add lead modal
        }
        
        function exportLeads() {
            showNotificationMessage('Exporting leads data...', 'info');
            // TODO: Implement lead export functionality
        }
        
        function viewAllLeads() {
            showNotificationMessage('Opening all leads view...', 'info');
            // TODO: Implement all leads view
        }
        
        function viewLeadSources() {
            showNotificationMessage('Opening lead sources analysis...', 'info');
            // TODO: Implement lead sources analytics
        }
        
        function viewLeadStatus() {
            showNotificationMessage('Opening lead status tracking...', 'info');
            // TODO: Implement lead status management
        }
        
        function viewLeadAnalytics() {
            showNotificationMessage('Opening lead analytics...', 'info');
            // TODO: Implement lead analytics dashboard
        }
        
        // System Metrics Functions
        async function loadSystemMetrics() {
            try {
                const response = await fetch('/api/admin/dashboard/system-metrics', {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });
                
                if (response.ok) {
                    const metrics = await response.json();
                    updateSystemMetrics(metrics);
                }
            } catch (error) {
                console.error('Error loading system metrics:', error);
            }
        }
        
        function updateSystemMetrics(metrics) {
            if (!metrics) return;
            
            // Update CPU
            const cpuUsageEl = document.getElementById('cpuUsage');
            const cpuProgressBar = document.getElementById('cpuProgressBar');
            const cpuCoresEl = document.getElementById('cpuCores');
            
            if (cpuUsageEl && metrics.cpu) {
                const cpuPercent = metrics.cpu.usage_percent || 0;
                cpuUsageEl.textContent = `${cpuPercent.toFixed(2)}%`;
                
                if (cpuProgressBar) {
                    const displayCpu = Math.max(cpuPercent, 2.5);
                    cpuProgressBar.style.width = `${displayCpu}%`;
                    // Update color based on usage
                    cpuProgressBar.className = 'progress-fill cpu-progress';
                    if (cpuPercent > 80) {
                        cpuProgressBar.classList.add('danger');
                    } else if (cpuPercent > 60) {
                        cpuProgressBar.classList.add('warning');
                    }
                }
                
                if (cpuCoresEl && metrics.cpu.cores) {
                    cpuCoresEl.textContent = `${metrics.cpu.cores} cores`;
                }
            }
            
            // Update RAM
            const ramUsageEl = document.getElementById('ramUsage');
            const ramProgressBar = document.getElementById('ramProgressBar');
            const ramUsedEl = document.getElementById('ramUsed');
            const ramThreadsEl = document.getElementById('ramThreads');
            
            if (ramUsageEl && metrics.memory) {
                // For application memory, show absolute usage in MB
                const ramUsedMB = metrics.memory.used_mb || 0;
                
                // Show memory usage in MB, but calculate a reasonable percentage for display
                // Use a threshold like 2048MB (2GB) for 100% to make progress bar meaningful
                const maxDisplayMB = 2048; // Assume 2048MB is "high usage" for display purposes
                const displayPercent = Math.min((ramUsedMB / maxDisplayMB) * 100, 100);
                
                ramUsageEl.textContent = `${ramUsedMB.toFixed(2)} MB`;
                
                if (ramProgressBar) {
                    ramProgressBar.style.width = `${displayPercent}%`;
                    // Update color based on usage
                    ramProgressBar.className = 'progress-fill ram-progress';
                    if (ramUsedMB > 1536) { // 1.5GB
                        ramProgressBar.classList.add('danger');
                    } else if (ramUsedMB > 1024) { // 1GB
                        ramProgressBar.classList.add('warning');
                    }
                }
                
                if (ramUsedEl) {
                    ramUsedEl.textContent = `${ramUsedMB.toFixed(2)} MB`;
                }
                
                if (ramThreadsEl && metrics.memory.num_threads) {
                    ramThreadsEl.textContent = `${metrics.memory.num_threads} threads`;
                }
            }
            
            // Update I/O (Disk Read/Write)
            const bandwidthSentEl = document.getElementById('bandwidthSent');
            const bandwidthRecvEl = document.getElementById('bandwidthRecv');
            const bandwidthTotalEl = document.getElementById('bandwidthTotal');
            const networkConnectionsEl = document.getElementById('networkConnections');
            
            if (metrics.network) {
                const sentMB = metrics.network.sent_mb || 0;
                const recvMB = metrics.network.recv_mb || 0;
                const totalMB = sentMB + recvMB;
                const connections = metrics.network.connections || 0;
                
                if (bandwidthSentEl) {
                    bandwidthSentEl.textContent = `${sentMB.toFixed(2)} MB`;
                }
                
                if (bandwidthRecvEl) {
                    bandwidthRecvEl.textContent = `${recvMB.toFixed(2)} MB`;
                }
                
                if (bandwidthTotalEl) {
                    bandwidthTotalEl.textContent = `Total: ${totalMB.toFixed(2)} MB`;
                }
                
                if (networkConnectionsEl) {
                    networkConnectionsEl.textContent = `${connections} connections`;
                }
            }
        }
        
        function refreshSystemMetrics() {
            loadSystemMetrics();
            showNotificationMessage('Refreshing application metrics...', 'info');
        }
        
        // Auto-refresh system metrics every 5 seconds
        let systemMetricsInterval = null;
        
        function startSystemMetricsAutoRefresh() {
            // Load immediately
            loadSystemMetrics();
            
            // Then refresh every 5 seconds
            if (systemMetricsInterval) {
                clearInterval(systemMetricsInterval);
            }
            
            systemMetricsInterval = setInterval(() => {
                loadSystemMetrics();
            }, 5000); // 5 seconds
        }
        
        // Initialize dashboard
        initializeDashboard();

        // Initialize notification panel
        initializeNotificationPanel();
        
        // Start system metrics auto-refresh
        startSystemMetricsAutoRefresh();
        
        
        // Set up auto-refresh every 5 minutes
        setInterval(async () => {
            try {
                await loadDashboardData();
                console.log('Dashboard data refreshed');
            } catch (error) {
                console.error('Error refreshing dashboard data:', error);
            }
        }, 300000); // 5 minutes
        
        // Add refresh button functionality
        document.querySelectorAll('.card-action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const icon = this.querySelector('i').className;
                if (icon.includes('refresh')) {
                    loadDashboardData();
                    showNotificationMessage('Refreshing dashboard data...', 'info');
                }
            });
        });

        // User profile dropdown
        const userProfile = document.getElementById('userProfileDropdown');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userProfile && userDropdown) {
            userProfile.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Check if user is authenticated
                if (!authManager || !authManager.isAuthenticated()) {
                    window.location.href = '/';
                    return;
                }
                
                const user = authManager.getUser();
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

        // Logout function
        function logout() {
            // Close dropdown menu
            if (userProfile && userDropdown) {
                userProfile.classList.remove('active');
                userDropdown.classList.remove('show');
            }
            
            // Show confirmation
            if (confirm('Are you sure you want to logout?')) {
                try {
                    // Clear authentication data and redirect
                    if (authManager && typeof authManager.logout === 'function') {
                        authManager.logout();
                    } else {
                        // Fallback if authManager is not available
                        localStorage.removeItem('prime_property_token');
                        localStorage.removeItem('prime_property_user');
                        window.location.href = '/';
                    }
                } catch (error) {
                    console.error('Error during logout:', error);
                    // Force logout even if there's an error
                    localStorage.removeItem('prime_property_token');
                    localStorage.removeItem('prime_property_user');
                    window.location.href = '/';
                }
            }
        }

        // Admin Dashboard Background Slider Rotation (Exact Home Page Timing & Transition)
        (function initAdminDashboardHeroSlider() {
            const slides = document.querySelectorAll('.admin-hero-slide');
            if (!slides || slides.length === 0) return;
            let currentSlide = 0;
            const slideDuration = 3500; // 3.5 seconds matching Home Page

            function nextSlide() {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }

            setInterval(nextSlide, slideDuration);
        })();
