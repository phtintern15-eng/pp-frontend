// Admin Properties Management Controller
let allAdminProperties = [];
let filteredAdminProperties = [];
let currentFilter = 'all';
let searchQuery = '';
let allOwnersList = [];

function initializePropertiesPage() {
    if (typeof authManager !== 'undefined' && !authManager.isAuthenticated()) {
        window.location.href = '/login';
        return;
    }
    
    // Update user info
    if (typeof authManager !== 'undefined') {
        const user = authManager.getUser();
        if (user) {
            const nameEl = document.getElementById('navUserName');
            const roleEl = document.getElementById('navUserRole');
            const avatarEl = document.getElementById('navUserAvatar');
            if (nameEl) nameEl.textContent = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Admin User';
            if (roleEl) roleEl.textContent = user.user_type === 'admin' ? 'System Administrator' : 'Staff';
            if (avatarEl) {
                const initials = ((user.first_name?.[0] || 'A') + (user.last_name?.[0] || 'P')).toUpperCase();
                avatarEl.textContent = initials;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializePropertiesPage();
    loadAdminProperties();
    loadOwnersForSelect();
});

async function loadAdminProperties() {
    const tbody = document.getElementById('propertiesTableBody');
    if (tbody) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 3rem; color: #94A3B8;">
            <i class="fas fa-spinner fa-spin" style="font-size: 1.5rem; margin-right: 0.5rem; color: #D4AF37;"></i> Loading properties inventory...
        </td></tr>`;
    }

    try {
        const headers = (typeof authManager !== 'undefined' && authManager.getToken()) 
            ? { 'Authorization': `Bearer ${authManager.getToken()}` } 
            : {};

        const res = await fetch('/api/properties/', { headers });
        if (!res.ok) throw new Error('Failed to fetch properties from server');

        allAdminProperties = await res.json();
        updateKpiStats(allAdminProperties);
        applyFilters();
    } catch (err) {
        console.error('Error fetching admin properties:', err);
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 3rem; color: #F87171;">
                <i class="fas fa-exclamation-circle" style="margin-right: 0.5rem;"></i> Failed to load properties inventory. Please check connection.
            </td></tr>`;
        }
    }
}

async function loadOwnersForSelect() {
    try {
        const headers = (typeof authManager !== 'undefined' && authManager.getToken()) 
            ? { 'Authorization': `Bearer ${authManager.getToken()}` } 
            : {};
        const res = await fetch('/api/users/', { headers });
        if (!res.ok) return;
        const users = await res.json();
        allOwnersList = users.filter(u => u.user_type === 'owner' || u.user_type === 'admin');
        
        const sel = document.getElementById('newPropOwnerSelect');
        if (sel) {
            sel.innerHTML = allOwnersList.map(o => 
                `<option value="${o.id}">${o.first_name} ${o.last_name} (${o.email})</option>`
            ).join('');
        }
    } catch (e) {
        console.warn('Could not load owner list for selector:', e);
    }
}

function updateKpiStats(props) {
    const total = props.length;
    const active = props.filter(p => p.is_available === true).length;
    const inactive = props.filter(p => p.is_available === false).length;
    const pending = total - active - inactive;

    const kpiTotal = document.getElementById('kpiTotalProps');
    const kpiActive = document.getElementById('kpiActiveProps');
    const kpiPending = document.getElementById('kpiPendingProps');
    const kpiInactive = document.getElementById('kpiInactiveProps');

    if (kpiTotal) kpiTotal.textContent = total.toLocaleString();
    if (kpiActive) kpiActive.textContent = active.toLocaleString();
    if (kpiPending) kpiPending.textContent = Math.max(pending, 0).toLocaleString();
    if (kpiInactive) kpiInactive.textContent = inactive.toLocaleString();
}

function setPropFilter(filterType) {
    currentFilter = filterType;
    document.querySelectorAll('#propFilterTabs .filter-tab').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-filter') === filterType);
    });
    applyFilters();
}

function onSearchInput(query) {
    searchQuery = (query || '').toLowerCase().trim();
    // Synchronize both inputs if present
    const globalIn = document.getElementById('propGlobalSearch');
    const tableIn = document.getElementById('tableFilterInput');
    if (globalIn && globalIn.value !== query) globalIn.value = query;
    if (tableIn && tableIn.value !== query) tableIn.value = query;
    applyFilters();
}

function toggleQuickFilters() {
    const bar = document.getElementById('quickFilterBar');
    if (bar) {
        bar.style.display = (bar.style.display === 'none') ? 'flex' : 'none';
    }
}

function applyFilters() {
    const categoryVal = document.getElementById('categoryFilter')?.value || '';
    const statusVal = document.getElementById('statusFilter')?.value || '';

    filteredAdminProperties = allAdminProperties.filter(prop => {
        // Tab filter
        if (currentFilter === 'available' && !prop.is_available) return false;
        if (currentFilter === 'reserved' && prop.is_available) return false;
        if (currentFilter === 'pending' && (prop.is_available || prop.price > 0)) {
            // keep standard pending definition
        }

        // Category dropdown filter
        if (categoryVal) {
            const typeStr = (prop.property_type || '').toLowerCase();
            const titleStr = (prop.title || '').toLowerCase();
            const catLower = categoryVal.toLowerCase();
            if (!typeStr.includes(catLower) && !titleStr.includes(catLower)) return false;
        }

        // Status dropdown filter
        if (statusVal === 'available' && !prop.is_available) return false;
        if (statusVal === 'reserved' && prop.is_available) return false;

        // Search Query filter
        if (searchQuery) {
            const title = (prop.title || '').toLowerCase();
            const city = (prop.city || '').toLowerCase();
            const state = (prop.state || '').toLowerCase();
            const ownerName = (prop.owner_name || prop.owner?.name || '').toLowerCase();
            const ownerEmail = (prop.owner_email || prop.owner?.email || '').toLowerCase();
            
            if (!title.includes(searchQuery) &&
                !city.includes(searchQuery) &&
                !state.includes(searchQuery) &&
                !ownerName.includes(searchQuery) &&
                !ownerEmail.includes(searchQuery)) {
                return false;
            }
        }

        return true;
    });

    renderPropertiesTable(filteredAdminProperties);
}

function formatPrice(num) {
    if (!num && num !== 0) return 'Price on Request';
    if (num >= 10000000) {
        return `₹${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
        return `₹${(num / 100000).toFixed(2)} L`;
    }
    return `₹${Number(num).toLocaleString('en-IN')}`;
}

function renderPropertiesTable(props) {
    const tbody = document.getElementById('propertiesTableBody');
    if (!tbody) return;

    if (!props || props.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 3rem; color: #94A3B8;">
            <i class="fas fa-search" style="margin-right: 0.5rem; color: #D4AF37;"></i> No properties found matching your filter criteria.
        </td></tr>`;
        return;
    }

    tbody.innerHTML = props.map(p => {
        // Primary thumbnail
        const primaryImg = (p.images && p.images.length > 0)
            ? (p.images.find(i => i.is_primary)?.image_url || p.images[0].image_url)
            : '/images/hero_luxury_villa.jpg';

        // Owner avatar initial & name
        const ownerName = p.owner_name || p.owner?.name || 'Private Owner';
        const ownerEmail = p.owner_email || p.owner?.email || 'confidential@prime.com';
        const ownerInitial = ownerName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'PO';

        // Status badge
        let statusBadge = '<span class="status-badge available">Available</span>';
        if (!p.is_available) {
            statusBadge = '<span class="status-badge reserved">Reserved</span>';
        }

        const category = p.property_type || 'Luxury Villa';
        const locationStr = [p.city, p.state].filter(Boolean).join(', ') || p.address || 'Global Portfolio';

        return `
            <tr>
                <td>
                    <div class="prop-cell-flex">
                        <img src="${primaryImg}" alt="${p.title}" class="prop-thumb-img" onerror="this.src='/images/hero_luxury_villa.jpg'">
                        <div>
                            <span class="prop-main-title">${escapeHTML(p.title)}</span>
                            <span class="prop-category-pill">${escapeHTML(category)}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="prop-owner-info">
                        <div class="prop-owner-avatar">${ownerInitial}</div>
                        <div>
                            <div style="color: #FFFFFF; font-weight: 600; font-size: 0.9rem;">${escapeHTML(ownerName)}</div>
                            <div style="color: #94A3B8; font-size: 0.8rem;">${escapeHTML(ownerEmail)}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div style="color: #FFFFFF; font-weight: 500; font-size: 0.88rem;">${escapeHTML(locationStr)}</div>
                    <div style="color: #64748B; font-size: 0.78rem;">${escapeHTML(p.address || '')}</div>
                </td>
                <td>
                    <div class="specs-text">
                        <span><i class="fas fa-bed"></i> ${p.bedrooms || 0} Beds</span> &bull; 
                        <span><i class="fas fa-bath"></i> ${p.bathrooms || 0} Baths</span>
                    </div>
                    <div class="specs-text" style="color: #94A3B8; margin-top: 2px;">
                        <span><i class="fas fa-ruler-combined"></i> ${Number(p.area_sqft || 0).toLocaleString()} sqft</span>
                    </div>
                </td>
                <td>
                    <div class="price-text">${formatPrice(p.price)}</div>
                    <div style="color: #64748B; font-size: 0.75rem; text-transform: uppercase;">For ${escapeHTML(p.listing_type || 'Sale')}</div>
                </td>
                <td>
                    ${statusBadge}
                </td>
                <td>
                    <div class="action-buttons" style="display: flex; gap: 0.45rem;">
                        <button class="table-action-btn view-btn" title="View Property" onclick="viewPropertyDetails(${p.id})" style="color: #38BDF8; background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.3); padding: 0.35rem 0.65rem; border-radius: 6px; cursor: pointer;">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="table-action-btn edit-btn" title="Edit Property" onclick="editPropertyPrompt(${p.id})" style="color: #FBBF24; background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.3); padding: 0.35rem 0.65rem; border-radius: 6px; cursor: pointer;">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="table-action-btn delete-btn" title="Delete Property" onclick="deleteProperty(${p.id})" style="color: #F87171; background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.3); padding: 0.35rem 0.65rem; border-radius: 6px; cursor: pointer;">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Modal Controllers
function viewPropertyDetails(propId) {
    const prop = allAdminProperties.find(p => p.id === propId);
    if (!prop) return;

    const modal = document.getElementById('viewPropertyModal');
    const titleEl = document.getElementById('viewModalTitle');
    const subEl = document.getElementById('viewModalSubtitle');
    const bodyEl = document.getElementById('viewModalBody');

    if (titleEl) titleEl.textContent = prop.title;
    if (subEl) subEl.textContent = `Property ID #${prop.id} | Listed in ${prop.city || 'Global'}`;

    const primaryImg = (prop.images && prop.images.length > 0)
        ? (prop.images.find(i => i.is_primary)?.image_url || prop.images[0].image_url)
        : '/images/hero_luxury_villa.jpg';

    bodyEl.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
            <img src="${primaryImg}" style="width: 100%; max-height: 240px; object-fit: cover; border-radius: 12px; border: 1px solid rgba(212,175,55,0.3);">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
            <div style="background: rgba(255,255,255,0.04); padding: 0.85rem; border-radius: 10px; border: 1px solid rgba(212,175,55,0.15);">
                <div style="color: #94A3B8; font-size: 0.78rem;">PRICE</div>
                <div style="color: #FFDF73; font-size: 1.25rem; font-weight: 700;">${formatPrice(prop.price)}</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 0.85rem; border-radius: 10px; border: 1px solid rgba(212,175,55,0.15);">
                <div style="color: #94A3B8; font-size: 0.78rem;">STATUS</div>
                <div style="color: ${prop.is_available ? '#4ADE80' : '#FBBF24'}; font-size: 1.1rem; font-weight: 700;">${prop.is_available ? 'Active & Available' : 'Reserved / Sold'}</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 0.85rem; border-radius: 10px; border: 1px solid rgba(212,175,55,0.15);">
                <div style="color: #94A3B8; font-size: 0.78rem;">OWNER</div>
                <div style="color: #FFFFFF; font-weight: 600;">${escapeHTML(prop.owner_name || 'Private Owner')}</div>
                <div style="color: #94A3B8; font-size: 0.8rem;">${escapeHTML(prop.owner_email || '')}</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 0.85rem; border-radius: 10px; border: 1px solid rgba(212,175,55,0.15);">
                <div style="color: #94A3B8; font-size: 0.78rem;">SPECIFICATIONS</div>
                <div style="color: #FFFFFF; font-size: 0.88rem;">${prop.bedrooms || 0} Beds &bull; ${prop.bathrooms || 0} Baths &bull; ${Number(prop.area_sqft || 0).toLocaleString()} sqft</div>
            </div>
        </div>
        <div>
            <div style="color: #D4AF37; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.35rem;">Description:</div>
            <p style="color: #CBD5E1; font-size: 0.9rem; line-height: 1.5; margin: 0;">${escapeHTML(prop.description || 'No description provided.')}</p>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeViewPropertyModal() {
    const modal = document.getElementById('viewPropertyModal');
    if (modal) modal.style.display = 'none';
}

function openAddPropertyModal() {
    const modal = document.getElementById('addPropertyModal');
    if (modal) modal.style.display = 'flex';
}

function closeAddPropertyModal() {
    const modal = document.getElementById('addPropertyModal');
    if (modal) modal.style.display = 'none';
}

async function submitNewProperty(e) {
    e.preventDefault();
    const title = document.getElementById('newPropTitle').value;
    const category = document.getElementById('newPropCategory').value;
    const price = parseFloat(document.getElementById('newPropPrice').value);
    const city = document.getElementById('newPropCity').value;
    const state = document.getElementById('newPropState').value;
    const bedrooms = parseInt(document.getElementById('newPropBeds').value) || 0;
    const bathrooms = parseInt(document.getElementById('newPropBaths').value) || 0;
    const area_sqft = parseFloat(document.getElementById('newPropArea').value) || 0;
    const owner_id = parseInt(document.getElementById('newPropOwnerSelect').value) || 1;
    const image_url = document.getElementById('newPropImage').value;
    const description = document.getElementById('newPropDescription').value;

    const payload = {
        title,
        property_type: category,
        price,
        city,
        state,
        address: `${city}, ${state}`,
        bedrooms,
        bathrooms,
        area_sqft,
        owner_id,
        description,
        listing_type: 'sale',
        is_available: true
    };

    try {
        const headers = {
            'Content-Type': 'application/json',
            ...(authManager.getToken() ? { 'Authorization': `Bearer ${authManager.getToken()}` } : {})
        };
        const res = await fetch('/api/properties/', {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Failed to create property');
        const created = await res.json();

        // If image URL provided, upload/link image
        if (image_url && created.id) {
            try {
                await fetch('/api/properties/upload-media', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ property_id: created.id, image_url, is_primary: true })
                });
            } catch (ignore) {}
        }

        closeAddPropertyModal();
        document.getElementById('addPropertyForm').reset();
        await loadAdminProperties();
    } catch (err) {
        console.error('Error creating property:', err);
        alert('Could not save property: ' + err.message);
    }
}

async function editPropertyPrompt(propId) {
    const prop = allAdminProperties.find(p => p.id === propId);
    if (!prop) return;

    const newTitle = prompt('Edit Property Title:', prop.title);
    if (newTitle === null) return;

    const newPriceStr = prompt('Edit Price:', prop.price);
    if (newPriceStr === null) return;
    const newPrice = parseFloat(newPriceStr) || prop.price;

    try {
        const headers = {
            'Content-Type': 'application/json',
            ...(authManager.getToken() ? { 'Authorization': `Bearer ${authManager.getToken()}` } : {})
        };
        const res = await fetch(`/api/properties/${propId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ title: newTitle, price: newPrice })
        });
        if (!res.ok) throw new Error('Update failed');
        await loadAdminProperties();
    } catch (e) {
        alert('Error updating property: ' + e.message);
    }
}

async function deleteProperty(propId) {
    const prop = allAdminProperties.find(p => p.id === propId);
    const title = prop ? prop.title : `#${propId}`;
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
        return;
    }

    try {
        const headers = (authManager.getToken()) 
            ? { 'Authorization': `Bearer ${authManager.getToken()}` } 
            : {};
        const res = await fetch(`/api/properties/${propId}`, {
            method: 'DELETE',
            headers
        });
        if (!res.ok) throw new Error('Delete failed');
        await loadAdminProperties();
    } catch (err) {
        alert('Error deleting property: ' + err.message);
    }
}

function exportPropertiesCSV() {
    if (!allAdminProperties || allAdminProperties.length === 0) {
        alert('No properties available to export.');
        return;
    }

    const headers = ['ID', 'Title', 'Category', 'Price', 'City', 'State', 'Bedrooms', 'Bathrooms', 'Area (Sqft)', 'Owner Name', 'Owner Email', 'Status'];
    const rows = allAdminProperties.map(p => [
        p.id,
        `"${(p.title || '').replace(/"/g, '""')}"`,
        `"${p.property_type || ''}"`,
        p.price || 0,
        `"${p.city || ''}"`,
        `"${p.state || ''}"`,
        p.bedrooms || 0,
        p.bathrooms || 0,
        p.area_sqft || 0,
        `"${p.owner_name || p.owner?.name || ''}"`,
        `"${p.owner_email || p.owner?.email || ''}"`,
        p.is_available ? 'Available' : 'Reserved'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `prime_properties_portfolio_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
