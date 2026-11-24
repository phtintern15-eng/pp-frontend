// Check authentication on page load

        function initializeServiceRequests() {

            if (!authManager || !authManager.isAuthenticated()) {

                // Only redirect if authManager is available and user is definitely not authenticated

                if (window.authManager) {

                    window.location.href = '/';

                    return;

                }

                // If authManager isn't loaded yet, wait a bit

                setTimeout(() => {

                    if (authManager && !authManager.isAuthenticated()) {

                        window.location.href = '/';

                        return;

                    }

                }, 500);



            }

            

            // Update user info if authenticated

            const user = authManager.getUser();

            if (user) {

                const userNameEl = document.querySelector('.user-name');

                const userRoleEl = document.querySelector('.user-role');

                if (userNameEl) userNameEl.textContent = `${user.first_name} ${user.last_name}`;

                if (userRoleEl) userRoleEl.textContent = user.user_type === 'admin' ? 'System Administrator' : 'User';

            }

        }



        // Load service requests from API

        async function loadServiceRequests() {

            try {

                // Check if authManager is available

                if (!authManager || !authManager.isAuthenticated()) {

                    console.warn('User not authenticated, cannot load service requests');

                    showEmptyState();

                    return;

                }



                const token = authManager.getToken();

                if (!token) {

                    console.warn('No authentication token available');

                    showEmptyState();

                    return;

                }



                const response = await fetch('/api/services/admin/all', {

                    headers: {

                        'Authorization': `Bearer ${token}`,

                        'Content-Type': 'application/json'

                    }

                });

                

                if (response.ok) {

                    const serviceRequests = await response.json();

                    updateServiceRequestsList(serviceRequests);

                    updateServiceStats(serviceRequests);

                } else if (response.status === 401) {

                    // Token expired or invalid

                    console.warn('Authentication failed, redirecting to login');

                    authManager.clearAuthData();

                    window.location.href = '/';

                } else {

                    console.error('Failed to load service requests:', response.status, response.statusText);

                    showEmptyState();

                }

            } catch (error) {

                console.error('Error loading service requests:', error);

                showEmptyState();

            }

        }



        // Update service requests list

        function updateServiceRequestsList(serviceRequests) {

            const requestsList = document.getElementById('serviceRequestsList');

            if (!requestsList) return;

            

            if (!serviceRequests || serviceRequests.length === 0) {

                requestsList.innerHTML = `

                    <div class="request-item">

                        <div class="request-icon other">

                            <i class="fas fa-inbox"></i>

                        </div>

                        <div class="request-details">

                            <div class="request-title">No Service Requests</div>

                            <div class="request-description">There are no service requests at this time</div>

                            <div class="request-meta">

                                <span><i class="fas fa-info-circle"></i> Check back later</span>

                            </div>

                        </div>

                    </div>

                `;



            }

            

            const requestsHTML = serviceRequests.map((request, index) => {

                const iconClass = getServiceIconClass(request.service_type);

                const icon = getServiceIcon(request.service_type);

                const statusClass = getStatusClass(request.status);

                const statusText = getStatusText(request.status);

                const urgencyClass = request.urgency || 'medium';

                

                return `

                    <div class="request-item" data-status="${request.status}" data-urgency="${urgencyClass}">

                        <div class="request-icon ${iconClass}">

                            <i class="${icon}"></i>

                        </div>

                        <div class="request-details">

                            <div class="request-title">${request.service_type || 'Service Request'}</div>

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



        // Update service stats

        function updateServiceStats(serviceRequests) {

            if (!serviceRequests || !Array.isArray(serviceRequests)) return;

            

            const total = serviceRequests.length;

            const pending = serviceRequests.filter(r => r.status === 'pending').length;

            const assigned = serviceRequests.filter(r => r.status === 'assigned').length;

            const completed = serviceRequests.filter(r => r.status === 'completed').length;

            

            const totalEl = document.getElementById('totalServiceRequests');

            if (totalEl) totalEl.textContent = total;

            

            const pendingEl = document.getElementById('pendingServiceRequests');

            if (pendingEl) pendingEl.textContent = pending;

            

            const assignedEl = document.getElementById('assignedServiceRequests');

            if (assignedEl) assignedEl.textContent = assigned;

            

            const completedEl = document.getElementById('completedServiceRequests');

            if (completedEl) completedEl.textContent = completed;

        }



        // Helper functions

        function getServiceIconClass(serviceType) {

            if (!serviceType) return 'other';

            const type = serviceType.toLowerCase();

            if (type.includes('electric') || type.includes('electrical')) return 'electrician';

            if (type.includes('plumb') || type.includes('water')) return 'plumber';

            if (type.includes('maid') || type.includes('clean')) return 'maid';

            return 'other';

        }



        function getServiceIcon(serviceType) {

            if (!serviceType) return 'fas fa-concierge-bell';

            const type = serviceType.toLowerCase();

            if (type.includes('electric') || type.includes('electrical')) return 'fas fa-bolt';

            if (type.includes('plumb') || type.includes('water')) return 'fas fa-faucet';

            if (type.includes('maid') || type.includes('clean')) return 'fas fa-broom';

            return 'fas fa-concierge-bell';

        }



        function getStatusClass(status) {

            if (!status) return 'status-pending';

            const s = status.toLowerCase();

            if (s === 'pending') return 'status-pending';

            if (s === 'assigned') return 'status-assigned';

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

            const requestsList = document.getElementById('serviceRequestsList');

            if (requestsList) {

                requestsList.innerHTML = `

                    <div class="request-item">

                        <div class="request-icon other">

                            <i class="fas fa-inbox"></i>

                        </div>

                        <div class="request-details">

                            <div class="request-title">No Service Requests</div>

                            <div class="request-description">Unable to load service requests at this time</div>

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

            alert(`Assigning service request #${requestId}`);

            // TODO: Implement assignment functionality

        }



        function completeRequest(requestId) {

            if (confirm(`Mark service request #${requestId} as completed?`)) {

                alert(`Service request #${requestId} marked as completed`);

                // TODO: Implement completion functionality

                loadServiceRequests();

            }

        }



        function viewRequest(requestId) {

            alert(`Viewing service request #${requestId}`);

            // TODO: Implement view details functionality

        }



        // Initialize Service Requests Management

        document.addEventListener('DOMContentLoaded', function() {

            try {

                initializeServiceRequests();

                initializeServiceRequestManagement();

                initializeAnimations();

                // Load service requests after a short delay to ensure page is rendered

                setTimeout(() => {

                    loadServiceRequests();

                }, 100);

            } catch (error) {

                console.error('Error initializing service requests page:', error);

                // Show error state but don't prevent page from loading

                showEmptyState();

            }

        });



        function initializeServiceRequestManagement() {

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

                    filterServiceRequests(filter);

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



        function filterServiceRequests(filter) {

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

                    case 'assigned':

                        show = status === 'assigned';

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

        if (searchInput) {

            searchInput.addEventListener('keypress', function(e) {

                if (e.key === 'Enter') {

                    const query = this.value;

                    if (query.trim()) {

                        console.log(`Searching for: ${query}`);

                    }

                }

            });

        }



        // Notification button

        const notificationBtn = document.querySelector('.notification-btn');

        if (notificationBtn) {

            notificationBtn.addEventListener('click', function() {

                console.log('Opening notifications panel...');

            });

        }



        // User profile dropdown

        const userProfile = document.querySelector('.user-profile');

        if (userProfile) {

            userProfile.addEventListener('click', function(e) {

                e.stopPropagation();

                userProfile.classList.toggle('active');

                const dropdown = document.getElementById('userDropdown');

                if (dropdown) dropdown.classList.toggle('show');
            });
        }

        // Service Requests Page Background Slider Rotation (Exact Home Page Timing & Transition)
        (function initServiceRequestsHeroSlider() {
            const slides = document.querySelectorAll('.service-hero-slide');
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
    });
