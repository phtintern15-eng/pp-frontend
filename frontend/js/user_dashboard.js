// Check Authentication and sync User
        document.addEventListener('DOMContentLoaded', async () => {
            const auth = window.authManager;
            if (!auth || !auth.isAuthenticated()) {
                window.location.href = '/';
                return;
            }

            const currentUser = auth.getUser();
            if (currentUser) {
                const displayName = `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() || currentUser.email || 'Valued Member';
                document.getElementById('userDisplayName').textContent = displayName;
                document.getElementById('avatarInitial').textContent = (currentUser.first_name ? currentUser.first_name.charAt(0) : 'U').toUpperCase();

                if (currentUser.is_admin || currentUser.user_type === 'admin') {
                    const adminLink = document.getElementById('adminSwitchLink');
                    if (adminLink) adminLink.style.display = 'flex';
                    document.getElementById('userTierLabel').textContent = 'Administrator';
                }
            }

            // Fetch live dashboard summary
            try {
                const token = auth.getToken();
                const response = await fetch('/api/user/dashboard-summary', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    renderSummary(data);
                } else {
                    // Fallback to public listings
                    loadFallbackProperties();
                }
            } catch (err) {
                console.error('Error fetching dashboard summary:', err);
                loadFallbackProperties();
            }
        });

        function renderSummary(data) {
            if (data.stats) {
                document.getElementById('statCuratedCount').textContent = data.stats.available_properties || '12+';
                document.getElementById('statInquiryCount').textContent = data.stats.active_inquiries || '0';
                document.getElementById('statServiceCount').textContent = data.stats.service_requests || '0';
                if (data.stats.portfolio_status) {
                    document.getElementById('statClientTier').textContent = data.stats.portfolio_status;
                }
            }

            // Render Curated Listings
            const grid = document.getElementById('curatedListingsGrid');
            if (data.curated_listings && data.curated_listings.length > 0) {
                grid.innerHTML = data.curated_listings.slice(0, 4).map(p => `
                    <div class="user-prop-card">
                        <div class="prop-thumb-frame">
                            <img src="${p.featured_image || '/images/hero_luxury_villa.jpg'}" alt="${p.title}">
                            <div class="prop-badge">${p.property_type || 'Luxury Estate'}</div>
                        </div>
                        <div class="prop-body">
                            <div class="prop-title" title="${p.title}">${p.title}</div>
                            <div class="prop-loc"><i class="fas fa-map-marker-alt"></i> ${p.city || 'Prime Location'}, ${p.state || 'Global'}</div>
                            <div class="prop-price">$${Number(p.price || 0).toLocaleString()}</div>
                            <div class="prop-specs">
                                <span><i class="fas fa-bed"></i> ${p.bedrooms || 3} Beds</span>
                                <span><i class="fas fa-bath"></i> ${p.bathrooms || 2} Baths</span>
                                <span><i class="fas fa-vector-square"></i> ${p.square_feet || 2400} sqft</span>
                            </div>
                        </div>
                    </div>
                `).join('');
            } else {
                grid.innerHTML = `<div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--text-muted);">No listings available currently.</div>`;
            }

            // Render Inquiries / Consultations
            const tableBody = document.getElementById('userInquiriesBody');
            if (data.recent_consultations && data.recent_consultations.length > 0) {
                tableBody.innerHTML = data.recent_consultations.map(c => `
                    <tr>
                        <td style="font-weight: 600; color: #D4AF37;">#CS-${c.id}</td>
                        <td>${c.company || 'Private Acquisition'}</td>
                        <td><span class="badge-status ${c.status.toLowerCase().includes('active') || c.status.toLowerCase().includes('review') ? 'active' : 'pending'}">${c.status}</span></td>
                    </tr>
                `).join('');
            } else if (data.recent_service_requests && data.recent_service_requests.length > 0) {
                tableBody.innerHTML = data.recent_service_requests.map(r => `
                    <tr>
                        <td style="font-weight: 600; color: #D4AF37;">#SR-${r.id}</td>
                        <td>${r.service_type || 'Concierge'}</td>
                        <td><span class="badge-status active">${r.status || 'Received'}</span></td>
                    </tr>
                `).join('');
            }
        }

        async function loadFallbackProperties() {
            try {
                const res = await fetch('/api/properties?limit=4');
                if (res.ok) {
                    const props = await res.json();
                    renderSummary({
                        stats: { available_properties: props.length, active_inquiries: 0, service_requests: 0 },
                        curated_listings: props
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }

        function handlePortalLogout() {
            if (window.authManager) {
                window.authManager.logout();
            } else {
                localStorage.removeItem('prime_property_token');
                localStorage.removeItem('prime_property_user');
                window.location.href = '/';
            }
        }

        function openConsultationModal() {
            window.location.href = '/service';
        }
