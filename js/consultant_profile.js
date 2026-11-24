// Check authentication on page load
        async function initializeConsultantProfile() {
            if (!authManager.isAuthenticated()) {
                window.location.href = '/';
                return;
            }
            
            try {
                // Get consultant profile data from general user endpoint
                const profileResponse = await fetch('/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });
                
                if (!profileResponse.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                
                const profileData = await profileResponse.json();
                
                // Get consultant-specific data
                const [consultantProfileResponse, consultantStatsResponse, clientsResponse, leadsResponse, consultationRequestsResponse] = await Promise.all([
                    fetch('/api/consultant/profile', {
                        headers: {
                            'Authorization': `Bearer ${authManager.getToken()}`
                        }
                    }).catch(() => null),
                    fetch('/api/consultant/stats', {
                        headers: {
                            'Authorization': `Bearer ${authManager.getToken()}`
                        }
                    }).catch(() => null),
                    fetch('/api/consultant/clients', {
                        headers: {
                            'Authorization': `Bearer ${authManager.getToken()}`
                        }
                    }).catch(() => null),
                    fetch('/api/consultant/leads', {
                        headers: {
                            'Authorization': `Bearer ${authManager.getToken()}`
                        }
                    }).catch(() => null),
                    fetch('/api/consultant/consultation-requests', {
                        headers: {
                            'Authorization': `Bearer ${authManager.getToken()}`
                        }
                    }).catch(() => null)
                ]);
                
                // Parse responses
                const consultantProfile = consultantProfileResponse?.ok ? await consultantProfileResponse.json() : null;
                const consultantStats = consultantStatsResponse?.ok ? await consultantStatsResponse.json() : {
                    active_clients: 0,
                    properties_sold: 0,
                    years_experience: 0,
                    client_satisfaction: 0,
                    active_leads: 0,
                    total_leads: 0
                };
                const clientsData = clientsResponse?.ok ? await clientsResponse.json() : [];
                const leadsData = leadsResponse?.ok ? await leadsResponse.json() : [];
                const consultationRequestsData = consultationRequestsResponse?.ok ? await consultationRequestsResponse.json() : [];
                
                // Update profile information
                updateProfileInfo(profileData);
                
                // Update statistics
                updateStatistics(consultantStats);
                
                // Update contact information
                updateContactInfoExtended(consultantProfile || {
                    primary_email: profileData.email,
                    primary_phone: profileData.phone || 'Not provided',
                    mobile_phone: profileData.phone || 'Not provided',
                    fax_number: 'Not provided'
                });
                
                // Update professional information
                updateProfessionalInfo(consultantProfile);
                
                // Update clients list
                updateClientsList(clientsData);
                
                // Update leads list
                updateLeadsList(leadsData);
                
                // Update consultation requests list
                updateConsultationRequestsList(consultationRequestsData);
                
            } catch (error) {
                console.error('Error loading consultant profile:', error);
                // Fallback to basic user info
                const user = authManager.getUser();
                if (user) {
                    updateProfileInfo(user);
                }
            }
        }
        
        function updateProfileInfo(profileData) {
            // Update profile header
            const nameElements = document.querySelectorAll('.profile-name, .consultant-name');
            const emailElements = document.querySelectorAll('.profile-email, .consultant-email');
            
            nameElements.forEach(el => {
                if (el.classList.contains('profile-name')) {
                    const firstName = profileData.first_name || '';
                    const lastName = profileData.last_name || '';
                    el.innerHTML = `${firstName} <span class="script-font">${lastName}</span>`;
                } else {
                    el.textContent = `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim();
                }
            });
            emailElements.forEach(el => el.textContent = profileData.email || '');
            
            // Update personal information section with real data
            updatePersonalInfoSection(profileData);
            
            // Update contact information section
            updateContactInfo(profileData);
        }
        
        function updatePersonalInfoSection(profileData) {
            // Update all info-value elements in the personal information card
            const infoValues = document.querySelectorAll('.info-value');
            
            // Full Name
            if (infoValues.length > 0) {
                infoValues[0].textContent = `${profileData.first_name || 'Not provided'} ${profileData.last_name || ''}`.trim();
            }
            
            // Email Address
            if (infoValues.length > 1) {
                infoValues[1].textContent = profileData.email || 'Not provided';
            }
            
            // Phone Number
            if (infoValues.length > 2) {
                infoValues[2].textContent = profileData.phone || 'Not provided';
            }
            
            // Location
            if (infoValues.length > 3) {
                infoValues[3].textContent = profileData.location || 'Not provided';
            }
            
            // Update user info in navigation
            const userNameElements = document.querySelectorAll('.user-name');
            userNameElements.forEach(el => {
                el.textContent = `${profileData.first_name || 'User'} ${profileData.last_name || ''}`.trim();
            });
            
            const userRoleElements = document.querySelectorAll('.user-role');
            userRoleElements.forEach(el => {
                el.textContent = 'Property Consultant';
            });
            
            // Update profile header name
            const profileNameElements = document.querySelectorAll('.profile-name');
            profileNameElements.forEach(el => {
                const firstName = profileData.first_name || 'User';
                const lastName = profileData.last_name || '';
                el.innerHTML = `${firstName} <span class="script-font">${lastName}</span>`;
            });

            // Update profile avatars (Header & Navbar)
            if (profileData.profile_image) {
                const avatarElements = document.querySelectorAll('.profile-avatar, .user-avatar');
                avatarElements.forEach(el => {
                    el.innerHTML = `<img src="${profileData.profile_image}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                });
            }
        }
        
        function handleProfileImageUrlInput(url) {
            const previewImg = document.getElementById('profileImagePreviewImg');
            const placeholder = document.getElementById('profileImagePlaceholder');
            if (!previewImg || !placeholder) return;

            if (url && url.trim()) {
                previewImg.src = url.trim();
                previewImg.style.display = 'block';
                placeholder.style.display = 'none';
            } else {
                previewImg.style.display = 'none';
                placeholder.style.display = 'block';
            }
        }

        async function uploadProfileImage() {
            const fileInput = document.getElementById('profileImageFileInput');
            if (!fileInput || !fileInput.files.length) {
                showNotification('Please select a profile photo first', 'info');
                return;
            }

            const file = fileInput.files[0];
            const uploadData = new FormData();
            uploadData.append('file', file);

            const token = authManager.getToken();
            try {
                showNotification('Uploading photo... Please wait', 'info');
                const res = await fetch('/api/properties/upload-media', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: uploadData
                });
                if (res.ok) {
                    const data = await res.json();
                    const urlInput = document.getElementById('editProfileImage');
                    if (urlInput) {
                        urlInput.value = data.url;
                        handleProfileImageUrlInput(data.url);
                    }
                    showNotification('Profile photo uploaded! Click "Save Changes" to apply.', 'success');
                } else {
                    showNotification('Failed to upload profile photo', 'error');
                }
            } catch (err) {
                console.error('Profile image upload error:', err);
                showNotification('Error uploading profile picture', 'error');
            }
        }

        function updateContactInfo(profileData) {
            // Update contact information in the contact card
            const contactValues = document.querySelectorAll('.contact-value');
            
            // Primary Email
            if (contactValues.length > 0) {
                contactValues[0].textContent = profileData.email;
            }
            
            // Primary Phone
            if (contactValues.length > 1 && profileData.phone) {
                contactValues[1].textContent = profileData.phone;
            }
            
            // Mobile Phone (use same as primary if no separate mobile)
            if (contactValues.length > 2 && profileData.phone) {
                contactValues[2].textContent = profileData.phone;
            }
        }
        
        function updateContactInfoExtended(contactData) {
            // Update contact information with extended data
            const contactValues = document.querySelectorAll('.contact-value');
            
            // Primary Email
            if (contactValues.length > 0 && contactData.primary_email) {
                contactValues[0].textContent = contactData.primary_email;
            }
            
            // Primary Phone
            if (contactValues.length > 1 && contactData.primary_phone) {
                contactValues[1].textContent = contactData.primary_phone;
            }
            
            // Mobile Phone
            if (contactValues.length > 2 && contactData.mobile_phone) {
                contactValues[2].textContent = contactData.mobile_phone;
            }
        }
        
        function updateStatistics(statsData) {
            // Update profile stats
            const statElements = document.querySelectorAll('.profile-stat-number');
            if (statElements.length >= 4) {
                statElements[0].textContent = statsData.active_clients || 0;
                statElements[1].textContent = statsData.properties_sold || 0;
                statElements[2].textContent = statsData.years_experience || 0;
                statElements[3].textContent = statsData.client_rating || '0/5';
            }
            
            // Update buyer stats
            const buyerStatNumbers = document.querySelectorAll('.buyer-stats .stat-number');
            if (buyerStatNumbers.length >= 3) {
                buyerStatNumbers[0].textContent = statsData.active_leads || 0;
                buyerStatNumbers[1].textContent = statsData.converted_this_month || 0;
                buyerStatNumbers[2].textContent = `${statsData.conversion_rate || 0}%`;
            }
        }
        
        function updateClientsList(clientsData) {
            const clientsContainer = document.querySelector('.client-list');
            if (!clientsContainer) return;
            
            if (clientsData.length === 0) {
                clientsContainer.innerHTML = `
                    <div class="no-clients">
                        <i class="fas fa-users"></i>
                        <h4>No Clients Yet</h4>
                        <p>Start building your client portfolio by adding your first client!</p>
                    </div>
                `;
                return;
            }
            
            const clientsHTML = clientsData.map(client => `
                <div class="client-item" onclick="viewClientDetails(${client.id})">
                    <div class="client-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="client-info">
                        <div class="client-name">${client.first_name} ${client.last_name}</div>
                        <div class="client-type">${client.client_type || 'Client'}</div>
                    </div>
                    <div class="client-status status-${client.status}">
                        ${client.status}
                    </div>
                </div>
            `).join('');
            
            clientsContainer.innerHTML = clientsHTML;
        }
        
        function updateLeadsList(leadsData) {
            const leadsContainer = document.getElementById('leadsList');
            if (!leadsContainer) return;
            
            if (leadsData.length === 0) {
                leadsContainer.innerHTML = `
                    <div class="no-leads">
                        <i class="fas fa-users"></i>
                        <h4>No Leads Yet</h4>
                        <p>Start building your lead pipeline by adding your first lead!</p>
                    </div>
                `;
                return;
            }
            
            const leadsHTML = leadsData.map(lead => `
                <div class="lead-item" onclick="viewLeadDetails(${lead.id})">
                    <div class="lead-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="lead-info">
                        <div class="lead-name">${lead.first_name} ${lead.last_name}</div>
                        <div class="lead-email">${lead.email}</div>
                        <div class="lead-source">${lead.source ? lead.source.replace('_', ' ') : 'Unknown'}</div>
                    </div>
                    <div class="lead-status status-${lead.status}">
                        ${lead.status.replace('_', ' ')}
                    </div>
                </div>
            `).join('');
            
            leadsContainer.innerHTML = leadsHTML;
        }
        
        function updateProfessionalInfo(profileData) {
            if (!profileData) {
                // Set default values if no profile data
                setDefaultProfessionalInfo();
                return;
            }
            
            // Update professional information with real-time data
            updateProfessionalField('licenseNumber', formatLicenseNumber(profileData.license_number));
            updateProfessionalField('yearsExperience', formatYearsExperience(profileData.years_experience));
            updateProfessionalField('specialization', formatSpecialization(profileData.specialization));
            updateProfessionalField('totalSalesVolume', formatSalesVolume(profileData.total_sales_volume));
            updateProfessionalField('propertiesSold', formatPropertiesSold(profileData.properties_sold));
            updateProfessionalField('averageSalePrice', formatAveragePrice(profileData.average_sale_price));
            updateProfessionalField('clientSatisfaction', formatClientSatisfaction(profileData.client_satisfaction));
        }
        
        // Data formatting functions
        function formatLicenseNumber(license) {
            if (!license || license === 'Not provided') return 'Not provided';
            return license;
        }
        
        function formatYearsExperience(years) {
            if (!years || years === 0) return 'Not specified';
            return `${years} Years`;
        }
        
        function formatSpecialization(specialization) {
            if (!specialization || specialization === 'Not specified') return 'Not specified';
            return specialization;
        }
        
        function formatSalesVolume(volume) {
            if (!volume || volume === 0) return '$0';
            if (volume >= 1000000) {
                return `$${(volume / 1000000).toFixed(1)}M`;
            } else if (volume >= 1000) {
                return `$${(volume / 1000).toFixed(1)}K`;
            } else {
                return `$${volume.toLocaleString()}`;
            }
        }
        
        function formatPropertiesSold(properties) {
            if (!properties || properties === 0) return '0';
            return properties.toString();
        }
        
        function formatAveragePrice(price) {
            if (!price || price === 0) return '$0';
            return `$${price.toLocaleString()}`;
        }
        
        function formatClientSatisfaction(satisfaction) {
            if (!satisfaction || satisfaction === 0) return '0%';
            return `${satisfaction}%`;
        }
        
        function updateProfessionalField(fieldId, value) {
            const element = document.getElementById(fieldId);
            if (element) {
                element.textContent = value;
            }
        }
        
        function setDefaultProfessionalInfo() {
            // Set default values when no profile data is available
            updateProfessionalField('licenseNumber', 'Not provided');
            updateProfessionalField('yearsExperience', 'Not specified');
            updateProfessionalField('specialization', 'Not specified');
            updateProfessionalField('totalSalesVolume', '$0');
            updateProfessionalField('propertiesSold', '0');
            updateProfessionalField('averageSalePrice', '$0');
            updateProfessionalField('clientSatisfaction', '0%');
        }
        
        // Helper function to generate action buttons based on status
        function getActionButtons(status, requestId) {
            switch (status) {
                case 'pending':
                    return `
                        <button class="consultation-request-btn accept" onclick="acceptConsultationRequest(${requestId})" title="Accept Request">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="consultation-request-btn reject" onclick="rejectConsultationRequest(${requestId})" title="Reject Request">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                case 'accepted':
                    return `
                        <button class="consultation-request-btn" onclick="scheduleConsultation(${requestId})" title="Schedule Consultation" style="background: rgba(33, 150, 243, 0.1); color: #2196F3; border: 1px solid rgba(33, 150, 243, 0.3);">
                            <i class="fas fa-calendar"></i>
                        </button>
                    `;
                case 'scheduled':
                    return `
                        <button class="consultation-request-btn" onclick="markAsCompleted(${requestId})" title="Mark as Completed" style="background: rgba(76, 175, 80, 0.1); color: #4CAF50; border: 1px solid rgba(76, 175, 80, 0.3);">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    `;
                case 'completed':
                    return `
                        <button class="consultation-request-btn" disabled title="Request Completed">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    `;
                case 'cancelled':
                case 'rejected':
                    return `
                        <button class="consultation-request-btn" disabled title="Request ${status}">
                            <i class="fas fa-ban"></i>
                        </button>
                    `;
                default:
                    return '';
            }
        }

        function updateConsultationRequestsList(requestsData) {
            const requestsContainer = document.getElementById('consultationRequestsList');
            if (!requestsContainer) return;
            
            if (requestsData.length === 0) {
                requestsContainer.innerHTML = `
                    <div class="no-requests">
                        <i class="fas fa-comments"></i>
                        <h4>No Consultation Requests</h4>
                        <p>You haven't received any consultation requests yet.</p>
                    </div>
                `;
                return;
            }
            
            const requestsHTML = requestsData.map(request => `
                <div class="consultation-request-item status-${request.status}">
                    <div class="consultation-request-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="consultation-request-info">
                        <div class="consultation-request-title">${request.title}</div>
                        <div class="consultation-request-owner">From: ${request.owner_name || 'Property Owner'}</div>
                        <div class="consultation-request-property">${request.property_address || 'Property Address'}</div>
                    </div>
                    <div class="consultation-request-status status-${request.status}">
                        ${request.status.replace('_', ' ')}
                    </div>
                    <div class="consultation-request-actions">
                        <button class="consultation-request-btn view" onclick="viewConsultationRequestDetails(${request.id})" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${getActionButtons(request.status, request.id)}
                    </div>
                </div>
            `).join('');
            
            requestsContainer.innerHTML = requestsHTML;
        }
        
        // Initialize consultant profile
        initializeConsultantProfile();
        
        // Set up periodic refresh for professional information (every 30 seconds)
        setInterval(async () => {
            try {
                await refreshProfessionalInfo();
            } catch (error) {
                console.error('Error in periodic professional info refresh:', error);
            }
        }, 30000); // 30 seconds

        // Edit Modal Functions
        function openEditModal() {
            const modal = document.getElementById('editPersonalModal');
            modal.classList.add('show');
            
            // Populate form with current data
            const user = authManager.getUser();
            if (user) {
                document.getElementById('editFirstName').value = user.first_name || '';
                document.getElementById('editLastName').value = user.last_name || '';
                document.getElementById('editEmail').value = user.email || '';
                document.getElementById('editPhone').value = user.phone || '';
                document.getElementById('editLocation').value = user.location || '';
                const profileImgInput = document.getElementById('editProfileImage');
                if (profileImgInput) {
                    profileImgInput.value = user.profile_image || '';
                    handleProfileImageUrlInput(user.profile_image || '');
                }
            }
        }

        function closeEditModal() {
            const modal = document.getElementById('editPersonalModal');
            modal.classList.remove('show');
        }

        // Contact Information Modal Functions
        function openContactInfoModal() {
            const modal = document.getElementById('contactInfoModal');
            modal.classList.add('show');
            
            // Populate form with current contact data
            populateContactForm();
        }

        function closeContactInfoModal() {
            const modal = document.getElementById('contactInfoModal');
            modal.classList.remove('show');
        }

        function populateContactForm() {
            // Get current contact values from the page
            const contactValues = document.querySelectorAll('.contact-value');
            
            if (contactValues.length > 0) {
                document.getElementById('contactPrimaryEmail').value = contactValues[0].textContent || '';
            }
            if (contactValues.length > 1) {
                document.getElementById('contactPrimaryPhone').value = contactValues[1].textContent || '';
            }
            if (contactValues.length > 2) {
                document.getElementById('contactMobilePhone').value = contactValues[2].textContent || '';
            }
        }

        // Handle form submission
        document.getElementById('editPersonalForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const profileData = {
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                location: formData.get('location'),
                profile_image: formData.get('profile_image') ? formData.get('profile_image').trim() : null
            };
            
            try {
                const response = await fetch('/api/users/me', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authManager.getToken()}`
                    },
                    body: JSON.stringify(profileData)
                });
                
                if (!response.ok) {
                    throw new Error('Failed to update profile');
                }
                
                const result = await response.json();
                
                // Persist updated user state in local authManager
                const currentUser = authManager.getUser() || {};
                const updatedUser = { ...currentUser, ...result };
                localStorage.setItem('user', JSON.stringify(updatedUser));

                // Update the UI with new data
                updateProfileInfo(result);
                updateContactInfo(result);
                updateContactInfoExtended({
                    primary_email: result.email,
                    primary_phone: result.phone,
                    mobile_phone: result.phone,
                    address: result.location
                });
                
                // Close modal
                closeEditModal();
                
                // Show success message
                showNotification('Profile updated successfully!', 'success');
                
            } catch (error) {
                console.error('Error updating profile:', error);
                showNotification('Failed to update profile. Please try again.', 'error');
            }
        });

        // Handle contact info form submission
        document.getElementById('contactInfoForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const contactData = {
                primary_email: formData.get('primary_email'),
                primary_phone: formData.get('primary_phone'),
                mobile_phone: formData.get('mobile_phone')
            };
            
            try {
                const response = await fetch('/api/consultant/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authManager.getToken()}`
                    },
                    body: JSON.stringify(contactData)
                });
                
                if (!response.ok) {
                    throw new Error('Failed to update contact information');
                }
                
                const result = await response.json();
                
                // Update the UI with new data
                updateContactInfoExtended(result);
                
                // Close modal
                closeContactInfoModal();
                
                // Show success message
                showNotification('Contact information updated successfully!', 'success');
                
            } catch (error) {
                console.error('Error updating contact information:', error);
                showNotification('Failed to update contact information. Please try again.', 'error');
            }
        });

        // Close modals when clicking outside
        document.getElementById('editPersonalModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeEditModal();
            }
        });

        document.getElementById('contactInfoModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeContactInfoModal();
            }
        });

        document.getElementById('professionalInfoModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeProfessionalInfoModal();
            }
        });

        document.getElementById('consultationRequestModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeConsultationRequestModal();
            }
        });

        document.getElementById('consultationRequestDetailsModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeConsultationRequestDetailsModal();
            }
        });

        // Lead Management Modal Functions
        function openAddLeadModal() {
            const modal = document.getElementById('addLeadModal');
            modal.classList.add('show');
            
            // Clear form
            document.getElementById('addLeadForm').reset();
        }

        function closeAddLeadModal() {
            const modal = document.getElementById('addLeadModal');
            modal.classList.remove('show');
        }

        // Handle add lead form submission
        document.getElementById('addLeadForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const leadData = {
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                source: formData.get('source'),
                status: formData.get('status'),
                notes: formData.get('notes')
            };
            
            try {
                const response = await fetch('/api/consultant/leads', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authManager.getToken()}`
                    },
                    body: JSON.stringify(leadData)
                });
                
                if (!response.ok) {
                    throw new Error('Failed to add lead');
                }
                
                const result = await response.json();
                
                // Close modal
                closeAddLeadModal();
                
                // Show success message
                showNotification('Lead added successfully!', 'success');
                
                // Refresh the leads list
                await refreshLeadsList();
                
            } catch (error) {
                console.error('Error adding lead:', error);
                showNotification('Failed to add lead. Please try again.', 'error');
            }
        });

        // Close add lead modal when clicking outside
        document.getElementById('addLeadModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeAddLeadModal();
            }
        });

        // Handle professional info form submission
        document.getElementById('professionalInfoForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const professionalData = {
                license_number: formData.get('license_number'),
                years_experience: parseInt(formData.get('years_experience')) || 0,
                specialization: formData.get('specialization'),
                total_sales_volume: parseFloat(formData.get('total_sales_volume')) || 0,
                properties_sold: parseInt(formData.get('properties_sold')) || 0,
                average_sale_price: parseFloat(formData.get('average_sale_price')) || 0,
                client_satisfaction: parseFloat(formData.get('client_satisfaction')) || 0
            };
            
            try {
                const response = await fetch('/api/consultant/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authManager.getToken()}`
                    },
                    body: JSON.stringify(professionalData)
                });
                
                if (!response.ok) {
                    throw new Error('Failed to update professional information');
                }
                
                const result = await response.json();
                
                // Update the UI with new data
                updateProfessionalInfo(result);
                
                // Close modal
                closeProfessionalInfoModal();
                
                // Show success message
                showNotification('Professional information updated successfully!', 'success');
                
                // Refresh professional information to ensure data consistency
                await refreshProfessionalInfo();
                
            } catch (error) {
                console.error('Error updating professional information:', error);
                showNotification('Failed to update professional information. Please try again.', 'error');
            }
        });

        // Handle consultation request form submission
        document.getElementById('consultationRequestForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const requestData = {
                title: formData.get('title'),
                property_address: formData.get('property_address'),
                consultation_type: formData.get('consultation_type'),
                description: formData.get('description'),
                preferred_date: formData.get('preferred_date'),
                preferred_time: formData.get('preferred_time')
            };
            
            try {
                const response = await fetch('/api/consultant/consultation-requests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authManager.getToken()}`
                    },
                    body: JSON.stringify(requestData)
                });
                
                if (!response.ok) {
                    throw new Error('Failed to submit consultation request');
                }
                
                const result = await response.json();
                
                // Close modal
                closeConsultationRequestModal();
                
                // Show success message
                showNotification('Consultation request submitted successfully!', 'success');
                
                // Refresh the consultation requests list
                await refreshConsultationRequests();
                
            } catch (error) {
                console.error('Error submitting consultation request:', error);
                showNotification('Failed to submit consultation request. Please try again.', 'error');
            }
        });

        // Function to refresh leads list
        async function refreshLeadsList() {
            try {
                const response = await fetch('/api/consultant/leads', {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });
                
                if (response.ok) {
                    const leadsData = await response.json();
                updateLeadsList(leadsData);
                }
            } catch (error) {
                console.error('Error refreshing leads:', error);
            }
        }
        
        // Function to refresh clients list
        async function refreshClientsList() {
            try {
                const response = await fetch('/api/consultant/clients', {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });
                
                if (response.ok) {
                    const clientsData = await response.json();
                    updateClientsList(clientsData);
                }
            } catch (error) {
                console.error('Error refreshing clients:', error);
            }
        }
        
        // Function to refresh consultation requests list
        async function refreshConsultationRequests() {
            try {
                const response = await fetch('/api/consultant/consultation-requests', {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });
                
                if (response.ok) {
                    const requestsData = await response.json();
                    updateConsultationRequestsList(requestsData);
                }
            } catch (error) {
                console.error('Error refreshing consultation requests:', error);
            }
        }
        
        // Function to refresh professional information
        async function refreshProfessionalInfo() {
            try {
                const response = await fetch('/api/consultant/profile', {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });
                
                if (response.ok) {
                    const profileData = await response.json();
                    updateProfessionalInfo(profileData);
                }
            } catch (error) {
                console.error('Error refreshing professional info:', error);
            }
        }

        // View Lead Details
        function viewLeadDetails(leadId) {
            showNotification(`Viewing lead details for ID: ${leadId}`, 'info');
            // TODO: Implement lead details modal or navigation
        }
        
        // View Client Details
        function viewClientDetails(clientId) {
            showNotification(`Viewing client details for ID: ${clientId}`, 'info');
            // TODO: Implement client details modal or navigation
        }

        // Export Leads
        function exportLeads() {
            showNotification('Exporting leads...', 'info');
            // TODO: Implement CSV export functionality
        }
        
        // Add New Client Modal Functions
        function openAddClientModal() {
            const modal = document.getElementById('addClientModal');
            if (modal) {
                modal.classList.add('show');
                const form = document.getElementById('addClientForm');
                if (form) form.reset();
            }
        }
        
        function closeAddClientModal() {
            const modal = document.getElementById('addClientModal');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        // Handle add client form submission
        document.addEventListener('DOMContentLoaded', function() {
            const clientForm = document.getElementById('addClientForm');
            if (clientForm) {
                clientForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    const formData = new FormData(this);
                    const clientData = {
                        first_name: formData.get('first_name'),
                        last_name: formData.get('last_name'),
                        email: formData.get('email'),
                        phone: formData.get('phone') || null,
                        client_type: formData.get('client_type') || 'Client',
                        status: formData.get('status') || 'active',
                        notes: formData.get('notes') || null
                    };
                    
                    try {
                        const token = authManager.getToken();
                        const response = await fetch('/api/consultant/clients', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(clientData)
                        });
                        
                        if (!response.ok) {
                            const err = await response.json().catch(() => ({}));
                            throw new Error(err.detail || 'Failed to add client');
                        }
                        
                        closeAddClientModal();
                        showNotification('Client added to your portfolio successfully!', 'success');
                        
                        // Refresh the clients list and consultant stats
                        if (typeof refreshClientsList === 'function') {
                            await refreshClientsList();
                        }
                        if (typeof refreshStats === 'function') {
                            await refreshStats();
                        }
                    } catch (error) {
                        console.error('Error adding client:', error);
                        showNotification(error.message || 'Failed to add client. Please try again.', 'error');
                    }
                });
            }

            // Close add client modal when clicking overlay background
            const clientModalOverlay = document.getElementById('addClientModal');
            if (clientModalOverlay) {
                clientModalOverlay.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeAddClientModal();
                    }
                });
            }
        });
        
        // Professional Information Modal Functions
        function openProfessionalInfoModal() {
            const modal = document.getElementById('professionalInfoModal');
            modal.classList.add('show');
            
            // Populate form with current professional data
            populateProfessionalForm();
        }

        function closeProfessionalInfoModal() {
            const modal = document.getElementById('professionalInfoModal');
            modal.classList.remove('show');
        }

        function populateProfessionalForm() {
            // Get current professional values from the page using the new field IDs
            const licenseElement = document.getElementById('licenseNumber');
            const experienceElement = document.getElementById('yearsExperience');
            const specializationElement = document.getElementById('specialization');
            const salesElement = document.getElementById('totalSalesVolume');
            const propertiesElement = document.getElementById('propertiesSold');
            const priceElement = document.getElementById('averageSalePrice');
            const satisfactionElement = document.getElementById('clientSatisfaction');
            
            // Populate form fields with current values
            if (licenseElement) {
                const licenseValue = licenseElement.textContent;
                document.getElementById('profLicenseNumber').value = licenseValue === 'Not provided' ? '' : licenseValue;
            }
            
            if (experienceElement) {
                const experienceText = experienceElement.textContent;
                const years = experienceText.replace(' Years', '').replace('Not specified', '');
                document.getElementById('profYearsExperience').value = years || '';
            }
            
            if (specializationElement) {
                const specializationValue = specializationElement.textContent;
                document.getElementById('profSpecialization').value = specializationValue === 'Not specified' ? '' : specializationValue;
            }
            
            if (salesElement) {
                const salesText = salesElement.textContent;
                if (salesText !== '$0' && salesText !== 'Loading...') {
                    const salesValue = salesText.replace('$', '').replace('M', '') * 1000000;
                    document.getElementById('profTotalSalesVolume').value = salesValue || '';
                } else {
                    document.getElementById('profTotalSalesVolume').value = '';
                }
            }
            
            if (propertiesElement) {
                const propertiesValue = propertiesElement.textContent;
                document.getElementById('profPropertiesSold').value = propertiesValue === '0' ? '' : propertiesValue;
            }
            
            if (priceElement) {
                const priceText = priceElement.textContent;
                if (priceText !== '$0' && priceText !== 'Loading...') {
                    const priceValue = priceText.replace('$', '').replace(/,/g, '');
                    document.getElementById('profAverageSalePrice').value = priceValue || '';
                } else {
                    document.getElementById('profAverageSalePrice').value = '';
                }
            }
            
            if (satisfactionElement) {
                const satisfactionText = satisfactionElement.textContent;
                const satisfactionValue = satisfactionText.replace('%', '').replace('0%', '');
                document.getElementById('profClientSatisfaction').value = satisfactionValue || '';
            }
        }
        
        // Consultation Request Management Functions
        function openConsultationRequestModal() {
            const modal = document.getElementById('consultationRequestModal');
            modal.classList.add('show');
            
            // Clear form
            document.getElementById('consultationRequestForm').reset();
        }

        function closeConsultationRequestModal() {
            const modal = document.getElementById('consultationRequestModal');
            modal.classList.remove('show');
        }
        
        // View Consultation Request Details
        async function viewConsultationRequestDetails(requestId) {
            try {
                const response = await fetch(`/api/consultant/consultation-requests/${requestId}`, {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch consultation request details');
                }

                const requestData = await response.json();
                showConsultationRequestDetailsModal(requestData);

            } catch (error) {
                console.error('Error fetching consultation request details:', error);
                showNotification('Failed to load consultation request details.', 'error');
            }
        }

        // Show Consultation Request Details Modal
        function showConsultationRequestDetailsModal(requestData) {
            const modal = document.getElementById('consultationRequestDetailsModal');
            const content = document.getElementById('consultationRequestDetailsContent');
            
            content.innerHTML = `
                <div class="consultation-details">
                    <div class="detail-section">
                        <h4>Request Information</h4>
                        <div class="detail-item">
                            <strong>Title:</strong> ${requestData.title}
                        </div>
                        <div class="detail-item">
                            <strong>Type:</strong> ${requestData.consultation_type?.replace('_', ' ').toUpperCase() || 'Not specified'}
                        </div>
                        <div class="detail-item">
                            <strong>Status:</strong> 
                            <span class="consultation-request-status status-${requestData.status}">
                                ${requestData.status.replace('_', ' ')}
                            </span>
                        </div>
                        <div class="detail-item">
                            <strong>Property Address:</strong> ${requestData.property_address || 'Not provided'}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4>Owner Information</h4>
                        <div class="detail-item">
                            <strong>Name:</strong> ${requestData.owner_name || 'Not provided'}
                        </div>
                        <div class="detail-item">
                            <strong>Email:</strong> ${requestData.owner_email || 'Not provided'}
                        </div>
                        <div class="detail-item">
                            <strong>Phone:</strong> ${requestData.owner_phone || 'Not provided'}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4>Consultation Details</h4>
                        <div class="detail-item">
                            <strong>Description:</strong> 
                            <p>${requestData.description || 'No description provided'}</p>
                        </div>
                        <div class="detail-item">
                            <strong>Preferred Date:</strong> ${requestData.preferred_date || 'Not specified'}
                        </div>
                        <div class="detail-item">
                            <strong>Preferred Time:</strong> ${requestData.preferred_time || 'Not specified'}
                        </div>
                        ${requestData.scheduled_date ? `
                        <div class="detail-item">
                            <strong>Scheduled Date:</strong> ${requestData.scheduled_date}
                        </div>
                        ` : ''}
                        ${requestData.scheduled_time ? `
                        <div class="detail-item">
                            <strong>Scheduled Time:</strong> ${requestData.scheduled_time}
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="detail-section">
                        <h4>Timeline</h4>
                        <div class="detail-item">
                            <strong>Requested:</strong> ${new Date(requestData.created_at).toLocaleString()}
                        </div>
                        ${requestData.updated_at ? `
                        <div class="detail-item">
                            <strong>Last Updated:</strong> ${new Date(requestData.updated_at).toLocaleString()}
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeConsultationRequestDetailsModal()">Close</button>
                    ${getDetailActionButtons(requestData.status, requestData.id)}
                </div>
            `;
            
            modal.classList.add('show');
        }

        // Get action buttons for details modal
        function getDetailActionButtons(status, requestId) {
            switch (status) {
                case 'pending':
                    return `
                        <button class="btn btn-primary" onclick="acceptConsultationRequest(${requestId}); closeConsultationRequestDetailsModal();">
                            <i class="fas fa-check"></i> Accept
                        </button>
                        <button class="btn btn-secondary" onclick="rejectConsultationRequest(${requestId}); closeConsultationRequestDetailsModal();">
                            <i class="fas fa-times"></i> Reject
                        </button>
                    `;
                case 'accepted':
                    return `
                        <button class="btn btn-primary" onclick="scheduleConsultation(${requestId}); closeConsultationRequestDetailsModal();">
                            <i class="fas fa-calendar"></i> Schedule
                        </button>
                    `;
                case 'scheduled':
                    return `
                        <button class="btn btn-primary" onclick="markAsCompleted(${requestId}); closeConsultationRequestDetailsModal();">
                            <i class="fas fa-check-circle"></i> Mark Complete
                        </button>
                    `;
                default:
                    return '';
            }
        }

        // Close Consultation Request Details Modal
        function closeConsultationRequestDetailsModal() {
            const modal = document.getElementById('consultationRequestDetailsModal');
            modal.classList.remove('show');
        }

        // Accept Consultation Request
        async function acceptConsultationRequest(requestId) {
            if (!confirm('Are you sure you want to accept this consultation request?')) {
                return;
            }

            try {
                const response = await fetch(`/api/consultant/consultation-requests/${requestId}/accept`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to accept consultation request');
                }

                showNotification('Consultation request accepted successfully!', 'success');
                await refreshConsultationRequests();

            } catch (error) {
                console.error('Error accepting consultation request:', error);
                showNotification('Failed to accept consultation request. Please try again.', 'error');
            }
        }

        // Reject Consultation Request
        async function rejectConsultationRequest(requestId) {
            if (!confirm('Are you sure you want to reject this consultation request?')) {
                return;
            }

            try {
                const response = await fetch(`/api/consultant/consultation-requests/${requestId}/reject`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to reject consultation request');
                }

                showNotification('Consultation request rejected.', 'info');
                await refreshConsultationRequests();

            } catch (error) {
                console.error('Error rejecting consultation request:', error);
                showNotification('Failed to reject consultation request. Please try again.', 'error');
            }
        }

        // Schedule Consultation
        async function scheduleConsultation(requestId) {
            const scheduleDate = prompt('Please enter the consultation date (YYYY-MM-DD):');
            if (!scheduleDate) return;

            const scheduleTime = prompt('Please enter the consultation time (HH:MM):');
            if (!scheduleTime) return;

            try {
                const response = await fetch(`/api/consultant/consultation-requests/${requestId}/schedule`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authManager.getToken()}`
                    },
                    body: JSON.stringify({
                        scheduled_date: scheduleDate,
                        scheduled_time: scheduleTime
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to schedule consultation');
                }

                showNotification('Consultation scheduled successfully!', 'success');
                await refreshConsultationRequests();

            } catch (error) {
                console.error('Error scheduling consultation:', error);
                showNotification('Failed to schedule consultation. Please try again.', 'error');
            }
        }

        // Mark as Completed
        async function markAsCompleted(requestId) {
            if (!confirm('Are you sure you want to mark this consultation as completed?')) {
                return;
            }

            try {
                const response = await fetch(`/api/consultant/consultation-requests/${requestId}/complete`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to mark consultation as completed');
                }

                showNotification('Consultation marked as completed!', 'success');
                await refreshConsultationRequests();

            } catch (error) {
                console.error('Error marking consultation as completed:', error);
                showNotification('Failed to mark consultation as completed. Please try again.', 'error');
            }
        }

        // Notification System
        function showNotification(message, type = 'info') {
            // Remove existing notifications
            const existingNotifications = document.querySelectorAll('.notification');
            existingNotifications.forEach(notification => notification.remove());

            // Create new notification
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
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

        // Add smooth scrolling to all links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Add click handlers for edit buttons
        document.querySelectorAll('.edit-profile-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const action = this.querySelector('i').className.includes('edit') ? 'Edit' : 'Add';
                const section = this.closest('.profile-card').querySelector('.card-title').textContent;
                
                if (section.includes('Personal Information')) {
                    openEditModal();
                } else if (section.includes('Contact Information')) {
                    openContactInfoModal();
                } else if (section.includes('Client Portfolio')) {
                    openAddClientModal();
                } else if (section.includes('Professional Information')) {
                    openProfessionalInfoModal();
                } else if (section.includes('Consultation Requests')) {
                    openConsultationRequestModal();
                } else {
                    showNotification(`${action} ${section} feature is not available yet.`, 'info');
                }
            });
        });

        // Add hover effects for client items
        document.querySelectorAll('.client-item').forEach(item => {
            item.addEventListener('click', function() {
                const name = this.querySelector('.client-name').textContent;
                showNotification(`Viewing client profile: ${name}`, 'info');
            });
        });

        // Add hover effects for consultation request items
        document.querySelectorAll('.consultation-request-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('.consultation-request-title').textContent;
                showNotification(`Viewing consultation request: ${title}`, 'info');
            });
        });

        // Add hover effects for info items
        document.querySelectorAll('.info-item, .contact-item').forEach(item => {
            item.addEventListener('click', function() {
                const label = this.querySelector('.info-label, .contact-label').textContent;
                showNotification(`Edit ${label} feature is not available yet.`, 'info');
            });
        });

        // User profile dropdown
        const userProfile = document.getElementById('userProfileDropdown');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userProfile && userDropdown) {
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
                    document.querySelector('.user-role').textContent = user.user_type === 'consultant' ? 'Property Consultant' : 'User';
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
            openEditModal();
        }

        // Open settings function
        function openSettings() {
            window.location.href = '/settings';
        }

        // Initialize tabs and load profile data on DOM ready
        document.addEventListener('DOMContentLoaded', function() {
            // Tab switcher
            const tabButtons = document.querySelectorAll('.workspace-tabs .tab-btn');
            const tabPanels = document.querySelectorAll('.tab-panel');

            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const targetTabId = this.getAttribute('data-tab');
                    if (!targetTabId) return;

                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanels.forEach(panel => panel.classList.remove('active'));

                    this.classList.add('active');
                    const targetPanel = document.getElementById(targetTabId);
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                    }
                });
            });

            // Initialize profile data
            if (typeof initializeConsultantProfile === 'function') {
                initializeConsultantProfile();
            }
        });

// Consultant Profile Page Background Slider Rotation (Exact Home Page Timing)
      (function initConsultantHeroSlider() {
        const slides = document.querySelectorAll('.consultant-hero-slide');
        if (!slides || slides.length === 0) return;
        let currentSlide = 0;
        const slideDuration = 3500; // 3.5 seconds

        function nextSlide() {
          slides[currentSlide].classList.remove('active');
          currentSlide = (currentSlide + 1) % slides.length;
          slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideDuration);
      })();

// Global modal exports for inline onclick handlers
window.openContactInfoModal = function() {
    const modal = document.getElementById('contactInfoModal');
    if (modal) modal.classList.add('show');
};
window.openContactModal = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.openContactInfoModal();
};
window.closeContactInfoModal = function() {
    const modal = document.getElementById('contactInfoModal');
    if (modal) modal.classList.remove('show');
};

window.openProfessionalInfoModal = function() {
    const modal = document.getElementById('professionalInfoModal');
    if (modal) modal.classList.add('show');
};
window.openProfessionalModal = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.openProfessionalInfoModal();
};
window.closeProfessionalInfoModal = function() {
    const modal = document.getElementById('professionalInfoModal');
    if (modal) modal.classList.remove('show');
};

window.openEditModal = function() {
    const modal = document.getElementById('editPersonalModal');
    if (modal) modal.classList.add('show');
};
window.closeEditModal = function() {
    const modal = document.getElementById('editPersonalModal');
    if (modal) modal.classList.remove('show');
};

