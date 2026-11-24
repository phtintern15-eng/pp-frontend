// Check authentication on page load
        function initializeAnalytics() {
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

        // Initialize analytics
        initializeAnalytics();

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (mobileMenuToggle && sidebar) {
            mobileMenuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('open');
            });
            
            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', function(event) {
                if (window.innerWidth <= 768 && 
                    !sidebar.contains(event.target) && 
                    !mobileMenuToggle.contains(event.target)) {
                    sidebar.classList.remove('open');
                }
            });
        }

        // Global chart instances
        let propertyChart = null;
        let maintenanceChart = null;
        let paymentChart = null;

        // Initialize Charts and Load Data
        document.addEventListener('DOMContentLoaded', function() {
            initializeCharts();
            initializeAnimations();
            loadAnalyticsData();
        });

        // Load all analytics data
        async function loadAnalyticsData() {
            try {
                const token = authManager.getToken();
                if (!token) {
                    console.error('No authentication token found');
                    return;
                }

                // Fetch all data in parallel
                const [statsResponse, propertyDistResponse, consultantsResponse, maintenanceResponse, paymentResponse] = await Promise.all([
                    fetch('/api/admin/dashboard/stats', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }),
                    fetch('/api/admin/dashboard/property-distribution', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }),
                    fetch('/api/admin/dashboard/consultants', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }),
                    fetch('/api/admin/dashboard/maintenance-analytics', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }),
                    fetch('/api/admin/dashboard/payment-analytics', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                ]);

                if (statsResponse.ok) {
                    const stats = await statsResponse.json();
                    // Stats data available but KPI cards removed
                } else {
                    console.error('Failed to load stats');
                }

                if (propertyDistResponse.ok) {
                    const propertyDist = await propertyDistResponse.json();
                    updatePropertyChart(propertyDist);
                } else {
                    console.error('Failed to load property distribution');
                }

                if (consultantsResponse.ok) {
                    const consultants = await consultantsResponse.json();
                    updateConsultantsTable(consultants);
                } else {
                    console.error('Failed to load consultants');
                    showConsultantsError();
                }

                if (maintenanceResponse.ok) {
                    const maintenanceData = await maintenanceResponse.json();
                    updateMaintenanceChart(maintenanceData);
                } else {
                    console.error('Failed to load maintenance analytics');
                }

                if (paymentResponse.ok) {
                    const paymentData = await paymentResponse.json();
                    updatePaymentChart(paymentData);
                } else {
                    console.error('Failed to load payment analytics');
                }

            } catch (error) {
                console.error('Error loading analytics data:', error);
            }
        }
        // Update Property Distribution Chart
        function updatePropertyChart(distributionData) {
            if (!propertyChart || !distributionData || !Array.isArray(distributionData)) return;

            const labels = distributionData.map(item => item.type || item.label);
            const data = distributionData.map(item => item.count || 0);

            propertyChart.data.labels = labels;
            propertyChart.data.datasets[0].data = data;
            propertyChart.update();
        }

        // Update Maintenance Analytics Chart
        function updateMaintenanceChart(maintenanceData) {
            if (!maintenanceChart || !maintenanceData || !Array.isArray(maintenanceData)) {
                console.warn('Maintenance chart not initialized or no data available');
                return;
            }

            try {
                // Sort data by label for consistent display
                const sortedData = [...maintenanceData].sort((a, b) => {
                    const order = ['Electrical', 'Plumbing', 'HVAC', 'Cleaning', 'Carpentry', 'Painting', 'Other'];
                    const aIndex = order.indexOf(a.label || '');
                    const bIndex = order.indexOf(b.label || '');
                    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
                });

                // Extract labels and data
                const labels = sortedData.map(item => item.label || item.type || 'Unknown');
                const data = sortedData.map(item => item.count || 0);

                // Calculate max value for scale (add 10% padding)
                const maxValue = Math.max(...data, 1);
                const maxScale = Math.ceil(maxValue * 1.1);

                // Update chart
                maintenanceChart.data.labels = labels;
                maintenanceChart.data.datasets[0].data = data;
                
                // Update scale max dynamically
                if (maintenanceChart.options && maintenanceChart.options.scales && maintenanceChart.options.scales.r) {
                    maintenanceChart.options.scales.r.max = maxScale;
                }

                maintenanceChart.update('active');

                console.log('Maintenance chart updated successfully with', data.length, 'data points');
            } catch (error) {
                console.error('Error updating maintenance chart:', error);
            }
        }

        // Update Payment Analytics Chart
        function updatePaymentChart(paymentData) {
            if (!paymentChart || !paymentData || !Array.isArray(paymentData)) {
                console.warn('Payment chart not initialized or no data available');
                return;
            }

            try {
                // Sort data by status order for consistent display
                const statusOrder = ['On Time', 'Late', 'Overdue', 'Partial'];
                const sortedData = [...paymentData].sort((a, b) => {
                    const aIndex = statusOrder.indexOf(a.status || a.label || '');
                    const bIndex = statusOrder.indexOf(b.status || b.label || '');
                    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
                });

                // Extract labels and data
                const labels = sortedData.map(item => item.label || item.status || 'Unknown');
                const data = sortedData.map(item => item.count || 0);

                // Update chart
                paymentChart.data.labels = labels;
                paymentChart.data.datasets[0].data = data;

                // Update tooltip to show percentage if available
                if (paymentChart.options && paymentChart.options.plugins && paymentChart.options.plugins.tooltip) {
                    const originalCallback = paymentChart.options.plugins.tooltip.callbacks;
                    paymentChart.options.plugins.tooltip.callbacks = {
                        ...originalCallback,
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const dataIndex = context.dataIndex;
                            const percentage = sortedData[dataIndex]?.percentage || 0;
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    };
                }

                paymentChart.update('active');

                console.log('Payment chart updated successfully with', data.length, 'data points');
            } catch (error) {
                console.error('Error updating payment chart:', error);
            }
        }

        // Update Top Performing Consultants Table
        function updateConsultantsTable(consultantsData) {
            const tableBody = document.getElementById('consultantsTableBody');
            if (!tableBody) return;

            if (!consultantsData || !Array.isArray(consultantsData) || consultantsData.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-light);">
                            <i class="fas fa-user-slash" style="margin-right: 0.5rem;"></i>
                            No consultants found
                        </td>
                    </tr>
                `;
                return;
            }

            // Sort consultants by clients_count (descending) to show top performers
            const sortedConsultants = [...consultantsData].sort((a, b) => {
                return (b.clients_count || 0) - (a.clients_count || 0);
            });

            // Take top 5 performers
            const topConsultants = sortedConsultants.slice(0, 5);

            const rowsHTML = topConsultants.map((consultant, index) => {
                const conversionRate = consultant.conversion_rate || 0;
                const status = consultant.clients_count > 0 ? 'active' : 'pending';
                const statusText = consultant.clients_count > 0 ? 'Active' : 'Inactive';
                const statusClass = consultant.clients_count > 0 ? 'status-active' : 'status-pending';
                const initials = consultant.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

                return `
                    <tr>
                        <td>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <div style="width: 45px; height: 45px; border-radius: 50%; background: var(--gradient-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; box-shadow: 0 2px 8px rgba(95, 112, 103, 0.3);">
                                    ${initials}
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: var(--text-dark); font-size: 1rem; margin-bottom: 0.2rem;">${consultant.name}</div>
                                    <div style="font-size: 0.85rem; color: var(--text-light);">${consultant.email || ''}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="font-weight: 700; color: var(--primary-green); font-size: 1.2rem;">${consultant.clients_count || 0}</span>
                                <i class="fas fa-users" style="color: var(--text-light); font-size: 0.9rem;"></i>
                            </div>
                        </td>
                        <td>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="font-weight: 600; color: var(--text-dark); font-size: 1.1rem;">${consultant.leads_count || 0}</span>
                                <i class="fas fa-user-plus" style="color: var(--text-light); font-size: 0.9rem;"></i>
                            </div>
                        </td>
                        <td>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="font-weight: 700; font-size: 1.1rem; color: ${conversionRate >= 50 ? '#27ae60' : conversionRate >= 25 ? '#f39c12' : '#e74c3c'};">
                                    ${conversionRate.toFixed(1)}%
                                </span>
                                <i class="fas fa-chart-line" style="color: ${conversionRate >= 50 ? '#27ae60' : conversionRate >= 25 ? '#f39c12' : '#e74c3c'}; font-size: 0.9rem; opacity: 0.7;"></i>
                            </div>
                        </td>
                        <td>
                            <span style="display: inline-block; padding: 0.4rem 0.8rem; background: rgba(95, 112, 103, 0.1); color: var(--primary-green); border-radius: 20px; font-size: 0.85rem; font-weight: 500;">
                                ${consultant.specialization || 'General'}
                            </span>
                        </td>
                        <td>
                            <span class="status-badge ${statusClass}" style="font-size: 0.85rem; padding: 0.5rem 1rem;">
                                ${statusText}
                            </span>
                        </td>
                    </tr>
                `;
            }).join('');

            tableBody.innerHTML = rowsHTML;
        }

        // Show error state for consultants table
        function showConsultantsError() {
            const tableBody = document.getElementById('consultantsTableBody');
            if (tableBody) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 2rem; color: #e74c3c;">
                            <i class="fas fa-exclamation-circle" style="margin-right: 0.5rem;"></i>
                            Failed to load consultants data
                        </td>
                    </tr>
                `;
            }
        }

        function initializeCharts() {
            // Property Distribution Chart
            const propertyCtx = document.getElementById('propertyChart').getContext('2d');
            propertyChart = new Chart(propertyCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Residential', 'Commercial', 'Office'],
                    datasets: [{
                        data: [0, 0, 0], // Will be updated with real data
                        backgroundColor: [
                            '#5F7067',
                            '#D4AF37',
                            '#C8D8C8'
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

            // Maintenance Chart
            const maintenanceCtx = document.getElementById('maintenanceChart');
            if (!maintenanceCtx) {
                console.error('Maintenance chart canvas element not found');
                return;
            }

            maintenanceChart = new Chart(maintenanceCtx.getContext('2d'), {
                type: 'radar',
                data: {
                    labels: [], // Will be populated from API
                    datasets: [{
                        label: 'Service Requests',
                        data: [], // Will be populated from API
                        borderColor: '#5F7067',
                        backgroundColor: 'rgba(95, 112, 103, 0.2)',
                        borderWidth: 3,
                        pointBackgroundColor: '#D4AF37',
                        pointBorderColor: '#5F7067',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: '#D4AF37',
                        pointHoverBorderColor: '#5F7067',
                        pointHoverBorderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: '#D4AF37',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.r;
                                }
                            }
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 10, // Will be updated dynamically
                            grid: {
                                color: 'rgba(0,0,0,0.1)',
                                lineWidth: 1
                            },
                            angleLines: {
                                color: 'rgba(0,0,0,0.1)',
                                lineWidth: 1
                            },
                            pointLabels: {
                                font: {
                                    size: 12,
                                    weight: '600'
                                },
                                color: '#718096'
                            },
                            ticks: {
                                stepSize: 1,
                                font: {
                                    size: 10
                                },
                                color: '#718096',
                                backdropColor: 'transparent'
                            }
                        }
                    }
                }
            });

            console.log('Maintenance chart initialized');

            // Payment Chart
            const paymentCtx = document.getElementById('paymentChart');
            if (!paymentCtx) {
                console.error('Payment chart canvas element not found');
                return;
            }

            paymentChart = new Chart(paymentCtx.getContext('2d'), {
                type: 'polarArea',
                data: {
                    labels: [], // Will be populated from API
                    datasets: [{
                        label: 'Payment Status',
                        data: [], // Will be populated from API
                        backgroundColor: [
                            '#5F7067',  // On Time - Primary green
                            '#D4AF37',  // Late - Gold
                            '#E74C3C',  // Overdue - Red
                            '#4A90E2'   // Partial - Blue
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: {
                                    size: 12,
                                    weight: '600'
                                },
                                color: '#718096',
                                generateLabels: function(chart) {
                                    const data = chart.data;
                                    if (data.labels.length && data.datasets.length) {
                                        return data.labels.map((label, i) => {
                                            const value = data.datasets[0].data[i];
                                            const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                            return {
                                                text: `${label}: ${value} (${percentage}%)`,
                                                fillStyle: data.datasets[0].backgroundColor[i],
                                                strokeStyle: data.datasets[0].borderColor,
                                                lineWidth: data.datasets[0].borderWidth,
                                                hidden: false,
                                                index: i
                                            };
                                        });
                                    }
                                    return [];
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: '#D4AF37',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: true,
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                    return `${label}: ${value} payments (${percentage}%)`;
                                }
                            }
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            ticks: {
                                display: false
                            },
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });

            console.log('Payment chart initialized');
        }

        function initializeAnimations() {
            // Animate KPI cards on scroll
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

            document.querySelectorAll('.kpi-card').forEach(card => {
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

        // Card action handlers
        document.querySelectorAll('.card-action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const icon = this.querySelector('i').className;
                if (icon.includes('download')) {
                    alert('Downloading chart data...');
                } else if (icon.includes('expand')) {
                    alert('Expanding chart view...');
                }
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
                        this.querySelector('.unread-indicator').outerHTML = '<div class="read-indicator"></div>';
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
        const userProfile = document.getElementById('userProfileDropdown');
        const userDropdown = document.getElementById('userDropdown');
        
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Check if user is authenticated
            if (!authManager.isAuthenticated()) {
                window.location.href = '/';
                return;
            }
            
            const user = authManager.getUser();
            if (user) {
                // Update user info display
                document.querySelector('.user-name').textContent = `${user.first_name} ${user.last_name}`;
                document.querySelector('.user-role').textContent = user.user_type === 'admin' ? 'System Administrator' : 'User';
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

        // Logout function
        function logout() {
            if (confirm('Are you sure you want to logout?')) {
                authManager.logout();
            }
        }

        // View profile function - unlocked
        function viewProfile() {
            if (userProfile && userDropdown) {
                userProfile.classList.remove('active');
                userDropdown.classList.remove('show');
            }
            const user = authManager ? authManager.getUser() : null;
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
            window.location.href = '/settings';
        }
