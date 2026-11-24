// Check authentication on page load
        async function initializeOwnerProfile() {
            if (!authManager.isAuthenticated()) {
                window.location.href = '/';
                return;
            }
            
            try {
                // Get owner profile data
                const profileResponse = await fetch('/api/owner/profile', {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });
                
                if (!profileResponse.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                
                const profileData = await profileResponse.json();
                
                // Get owner statistics
                const statsResponse = await fetch('/api/owner/stats', {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });
                
                if (!statsResponse.ok) {
                    throw new Error('Failed to fetch statistics');
                }
                
                const statsData = await statsResponse.json();
                
                // Get owner properties
                const propertiesResponse = await fetch('/api/owner/properties', {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });
                
                if (!propertiesResponse.ok) {
                    throw new Error('Failed to fetch properties');
                }
                
                const propertiesData = await propertiesResponse.json();
                
                // Get owner contact information
                const contactResponse = await fetch('/api/owner/contact-info', {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });
                
                if (!contactResponse.ok) {
                    throw new Error('Failed to fetch contact information');
                }
                
                const contactData = await contactResponse.json();
                
                // Update profile information
                updateProfileInfo(profileData);
                
                // Update statistics
                updateStatistics(statsData);
                
                // Update properties list
                currentOwnerPropertiesCache = propertiesData;
                updatePropertiesList(propertiesData);
                
                // Update property portfolio
                updatePropertyPortfolio(propertiesData);
                
                // Update contact information
                updateContactInfoExtended(contactData);
                
            } catch (error) {
                console.error('Error loading owner profile:', error);
                // Fallback to basic user info
                const user = authManager.getUser();
                if (user) {
                    updateProfileInfo(user);
                }
            }
        }
        
        function updateProfileInfo(profileData) {
            // Update profile header
            const nameElements = document.querySelectorAll('.profile-name, .owner-name');
            const emailElements = document.querySelectorAll('.profile-email, .owner-email');
            const companyElements = document.querySelectorAll('.company-info, .owner-company');
            
            nameElements.forEach(el => {
                const fName = profileData.first_name || '';
                const lName = profileData.last_name || '';
                if (el.classList.contains('profile-name')) {
                    el.innerHTML = `${fName} <span class="script-font">${lName}</span>`;
                } else {
                    el.textContent = `${fName} ${lName}`.trim();
                }
            });
            emailElements.forEach(el => el.textContent = profileData.email || '');
            
            if (profileData.company) {
                companyElements.forEach(el => el.textContent = profileData.company);
            }
            
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
                el.textContent = 'Property Owner';
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
            
            // Website (if available in profile data)
            if (contactValues.length > 4 && profileData.website) {
                contactValues[4].textContent = profileData.website;
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
            
            // Fax Number
            if (contactValues.length > 3 && contactData.fax_number) {
                contactValues[3].textContent = contactData.fax_number;
            }
            
            // Update business information
            const businessItems = document.querySelectorAll('.business-item');
            if (businessItems.length > 0 && contactData.business_name) {
                const businessNameElement = businessItems[0].querySelector('.business-value');
                if (businessNameElement) {
                    businessNameElement.textContent = contactData.business_name;
                }
            }
            
            // Update years in business
            if (businessItems.length > 3 && contactData.years_in_business) {
                const yearsElement = businessItems[3].querySelector('.business-value');
                if (yearsElement) {
                    yearsElement.textContent = `${contactData.years_in_business} Years`;
                }
            }
        }
        
        function updateStatistics(statsData) {
            // Update profile stats
            const statElements = document.querySelectorAll('.profile-stat-number');
            if (statElements.length >= 3) {
                statElements[0].textContent = statsData.total_properties;
                statElements[1].textContent = statsData.available_properties;
                statElements[2].textContent = Math.round(statsData.avg_property_value).toLocaleString();
            }
            
        }
        
        function updatePropertiesList(propertiesData) {
            const propertiesContainer = document.querySelector('.properties-list');
            if (!propertiesContainer) return;
            
            if (propertiesData.length === 0) {
                propertiesContainer.innerHTML = '<p class="no-properties">No properties found. Add your first property to get started!</p>';
                return;
            }
            
            const propertiesHTML = propertiesData.map(property => {
                const primaryImage = (property.images && property.images.length > 0) ? property.images[0].image_url : null;
                const imageEl = primaryImage 
                    ? `<img src="${primaryImage}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`
                    : '<i class="fas fa-building"></i>';
                const videoBadge = property.video_url
                    ? `<a href="${property.video_url}" target="_blank" style="margin-left: 0.5rem; color: #FFDF73; font-size: 0.8rem; text-decoration: none;" title="Watch Video Tour"><i class="fas fa-play-circle"></i> Video Tour</a>`
                    : '';

                return `
                <div class="property-item" style="display: flex; gap: 1.25rem; align-items: center; justify-content: space-between; background: #F3F5EE; border: 1.5px solid #EAE5DC; border-radius: 16px; padding: 1.15rem 1.35rem; margin-bottom: 1rem;">
                    <div style="display: flex; gap: 1.25rem; align-items: center; flex: 1;">
                        <div class="property-image" style="width: 90px; height: 75px; min-width: 90px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 10px; background: #EAE5DC; border: 1px solid #EAE5DC;">
                            ${imageEl}
                        </div>
                        <div class="property-details" style="flex: 1;">
                            <h4 class="property-title" style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; font-weight: 700; color: #243023;">${property.title} ${videoBadge}</h4>
                            <p class="property-address" style="margin: 0.25rem 0; font-size: 0.88rem; color: #5A6258;"><i class="fas fa-map-marker-alt" style="color: #C28B52; margin-right: 4px;"></i>${property.address}, ${property.city}</p>
                            <div class="property-info" style="display: flex; gap: 0.65rem; align-items: center; margin-top: 0.45rem; flex-wrap: wrap;">
                                <span class="property-type" style="background: #FFFFFF; color: #243023; border: 1px solid #EAE5DC; padding: 0.25rem 0.65rem; border-radius: 999px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase;">${property.property_type}</span>
                                <span style="background: rgba(194, 139, 82, 0.12); border: 1px solid rgba(194, 139, 82, 0.3); color: #9C6C38; padding: 0.25rem 0.65rem; border-radius: 999px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase;">
                                    ${property.listing_type === 'rent' ? 'For Rent' : 'For Sale'}
                                </span>
                                <span class="property-price" style="color: #9C6C38; font-weight: 800; font-size: 1rem;">₹${Math.round(property.price).toLocaleString('en-IN')}${property.listing_type === 'rent' ? '/mo' : ''}</span>
                                ${property.images && property.images.length > 1 ? `<span style="font-size: 0.75rem; color: #5A6258;"><i class="fas fa-images"></i> ${property.images.length} photos</span>` : ''}
                            </div>
                            <div class="property-status ${property.is_available ? 'available' : 'occupied'}" style="margin-top: 0.45rem; display: inline-block;">
                                ${property.is_available ? 'Available' : 'Occupied'}
                            </div>
                        </div>
                    </div>
                    <div class="property-actions" style="margin-left: 1rem; flex-shrink: 0;">
                        <button type="button" class="btn btn-secondary" onclick="openEditPropertyModal(${property.id})" style="font-size: 0.85rem; padding: 0.55rem 1.15rem; background: #FFFFFF; border: 1.5px solid #EAE5DC; color: #243023; border-radius: 9999px; font-weight: 700; display: inline-flex; align-items: center; gap: 0.45rem; cursor: pointer;">
                            <i class="fas fa-edit" style="color: #C28B52;"></i> Edit Property
                        </button>
                    </div>
                </div>
                `;
            }).join('');
            
            propertiesContainer.innerHTML = propertiesHTML;
        }
        
        // Initialize owner profile
        initializeOwnerProfile();

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
                document.getElementById('editCompany').value = user.company || '';
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

        // Handle form submission
        document.getElementById('editPersonalForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const profileData = {
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                location: formData.get('location'),
                profile_image: formData.get('profile_image') ? formData.get('profile_image').trim() : null
            };
            
            try {
                const response = await fetch('/api/owner/profile', {
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
                const updatedUser = { ...currentUser, ...result.user };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                
                // Update the UI with new data
                updateProfileInfo(result.user);
                updateContactInfo(result.user);
                updateContactInfoExtended({
                    primary_email: result.user.email,
                    primary_phone: result.user.phone,
                    mobile_phone: result.user.phone,
                    business_name: result.user.company,
                    address: result.user.location
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

        // Close modal when clicking outside
        document.getElementById('editPersonalModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeEditModal();
            }
        });

        // Add Property Modal Media State
        let uploadedPropertyImages = [];

        function renderImagesPreview() {
            const grid = document.getElementById('propertyImagesPreviewGrid');
            if (!grid) return;
            grid.innerHTML = '';

            uploadedPropertyImages.forEach((imgUrl, index) => {
                const item = document.createElement('div');
                item.style.cssText = 'position: relative; width: 85px; height: 65px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(212, 175, 55, 0.4); box-shadow: 0 4px 10px rgba(0,0,0,0.5);';
                item.innerHTML = `
                    <img src="${imgUrl}" style="width: 100%; height: 100%; object-fit: cover;">
                    <button type="button" onclick="removePropertyImage(${index})" style="position: absolute; top: 2px; right: 2px; width: 20px; height: 20px; border-radius: 50%; background: rgba(0,0,0,0.75); color: #FFF; border: none; cursor: pointer; font-size: 11px; display: flex; align-items: center; justify-content: center;">&times;</button>
                    ${index === 0 ? '<span style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(212, 175, 55, 0.85); color: #000; font-size: 9px; font-weight: 700; text-align: center; text-transform: uppercase;">Cover</span>' : ''}
                `;
                grid.appendChild(item);
            });
        }

        function removePropertyImage(index) {
            uploadedPropertyImages.splice(index, 1);
            renderImagesPreview();
        }

        function addImageUrlFromInput() {
            const input = document.getElementById('propertyImageUrlInput');
            if (!input || !input.value.trim()) return;
            uploadedPropertyImages.push(input.value.trim());
            input.value = '';
            renderImagesPreview();
        }

        async function uploadSelectedImages() {
            const fileInput = document.getElementById('propertyImageFiles');
            if (!fileInput || !fileInput.files.length) {
                showNotification('Please select image file(s) first', 'info');
                return;
            }

            const token = authManager.getToken();
            for (let i = 0; i < fileInput.files.length; i++) {
                const file = fileInput.files[i];
                const uploadData = new FormData();
                uploadData.append('file', file);

                try {
                    const res = await fetch('/api/properties/upload-media', {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` },
                        body: uploadData
                    });
                    if (res.ok) {
                        const data = await res.json();
                        uploadedPropertyImages.push(data.url);
                        renderImagesPreview();
                    } else {
                        showNotification(`Failed to upload ${file.name}`, 'error');
                    }
                } catch (err) {
                    console.error('Image upload error:', err);
                }
            }
            fileInput.value = '';
            showNotification('Image(s) uploaded successfully!', 'success');
        }

        async function uploadSelectedVideo() {
            const fileInput = document.getElementById('propertyVideoFile');
            if (!fileInput || !fileInput.files.length) {
                showNotification('Please select a video file first', 'info');
                return;
            }

            const file = fileInput.files[0];
            const uploadData = new FormData();
            uploadData.append('file', file);

            const token = authManager.getToken();
            try {
                showNotification('Uploading video... Please wait', 'info');
                const res = await fetch('/api/properties/upload-media', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: uploadData
                });
                if (res.ok) {
                    const data = await res.json();
                    const videoInput = document.getElementById('propertyVideoUrl');
                    if (videoInput) videoInput.value = data.url;

                    const previewBox = document.getElementById('propertyVideoPreview');
                    const videoEl = document.getElementById('videoPreviewElement');
                    if (previewBox && videoEl) {
                        videoEl.src = data.url;
                        previewBox.style.display = 'block';
                    }
                    showNotification('Video uploaded successfully!', 'success');
                } else {
                    showNotification('Failed to upload video clip', 'error');
                }
            } catch (err) {
                console.error('Video upload error:', err);
                showNotification('Error uploading video', 'error');
            }
        }

        // Add Property Modal Functions
        function openAddPropertyModal() {
            const modal = document.getElementById('addPropertyModal');
            modal.classList.add('show');
            
            // Clear form and media state
            document.getElementById('addPropertyForm').reset();
            uploadedPropertyImages = [];
            renderImagesPreview();
            const previewBox = document.getElementById('propertyVideoPreview');
            if (previewBox) previewBox.style.display = 'none';
        }

        function closeAddPropertyModal() {
            const modal = document.getElementById('addPropertyModal');
            modal.classList.remove('show');
        }

        // Handle add property form submission
        document.getElementById('addPropertyForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const propertyData = {
                title: formData.get('title'),
                description: formData.get('description'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zip_code: formData.get('zip_code'),
                property_type: formData.get('property_type'),
                listing_type: formData.get('listing_type') || 'sale',
                bedrooms: formData.get('bedrooms') ? parseInt(formData.get('bedrooms')) : null,
                bathrooms: formData.get('bathrooms') ? parseFloat(formData.get('bathrooms')) : null,
                area_sqft: formData.get('area_sqft') ? parseFloat(formData.get('area_sqft')) : null,
                price: parseFloat(formData.get('price')),
                video_url: formData.get('video_url') ? formData.get('video_url').trim() : null,
                image_urls: uploadedPropertyImages,
                foreign_buyer_eligible: document.getElementById('propertyForeignEligible')?.checked ?? true,
                is_available: formData.get('is_available') === 'on'
            };
            
            try {
                const response = await fetch('/api/properties/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authManager.getToken()}`
                    },
                    body: JSON.stringify(propertyData)
                });
                
                if (!response.ok) {
                    throw new Error('Failed to add property');
                }
                
                const result = await response.json();
                
                // Close modal
                closeAddPropertyModal();
                
                // Show success message
                showNotification('Property with images & video added successfully!', 'success');
                
                // Refresh the properties list
                await refreshPropertiesList();
                
            } catch (error) {
                console.error('Error adding property:', error);
                showNotification('Failed to add property. Please try again.', 'error');
            }
        });

        // Close add property modal when clicking outside
        document.getElementById('addPropertyModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeAddPropertyModal();
            }
        });

        // Edit Property Modal Media State & Handlers
        let editPropertyImagesList = [];
        let currentOwnerPropertiesCache = [];

        function renderEditImagesPreview() {
            const grid = document.getElementById('editPropertyImagesPreviewGrid');
            if (!grid) return;
            grid.innerHTML = '';

            editPropertyImagesList.forEach((imgUrl, index) => {
                const item = document.createElement('div');
                item.style.cssText = 'position: relative; width: 85px; height: 65px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(212, 175, 55, 0.4); box-shadow: 0 4px 10px rgba(0,0,0,0.5);';
                item.innerHTML = `
                    <img src="${imgUrl}" style="width: 100%; height: 100%; object-fit: cover;">
                    <button type="button" onclick="removeEditPropertyImage(${index})" style="position: absolute; top: 2px; right: 2px; width: 20px; height: 20px; border-radius: 50%; background: rgba(0,0,0,0.75); color: #FFF; border: none; cursor: pointer; font-size: 11px; display: flex; align-items: center; justify-content: center;">&times;</button>
                    ${index === 0 ? '<span style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(212, 175, 55, 0.85); color: #000; font-size: 9px; font-weight: 700; text-align: center; text-transform: uppercase;">Cover</span>' : ''}
                `;
                grid.appendChild(item);
            });
        }

        function removeEditPropertyImage(index) {
            editPropertyImagesList.splice(index, 1);
            renderEditImagesPreview();
        }

        function addEditImageUrlFromInput() {
            const input = document.getElementById('editPropertyImageUrlInput');
            if (!input || !input.value.trim()) return;
            editPropertyImagesList.push(input.value.trim());
            input.value = '';
            renderEditImagesPreview();
        }

        async function uploadEditSelectedImages() {
            const fileInput = document.getElementById('editPropertyImageFiles');
            if (!fileInput || !fileInput.files.length) {
                showNotification('Please select image file(s) first', 'info');
                return;
            }

            const token = authManager.getToken();
            for (let i = 0; i < fileInput.files.length; i++) {
                const file = fileInput.files[i];
                const uploadData = new FormData();
                uploadData.append('file', file);

                try {
                    const res = await fetch('/api/properties/upload-media', {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` },
                        body: uploadData
                    });
                    if (res.ok) {
                        const data = await res.json();
                        editPropertyImagesList.push(data.url);
                        renderEditImagesPreview();
                    } else {
                        showNotification(`Failed to upload ${file.name}`, 'error');
                    }
                } catch (err) {
                    console.error('Edit image upload error:', err);
                }
            }
            fileInput.value = '';
            showNotification('Image(s) uploaded successfully!', 'success');
        }

        function updateEditVideoPreview(url) {
            const previewBox = document.getElementById('editPropertyVideoPreview');
            const videoEl = document.getElementById('editVideoPreviewElement');
            if (!previewBox || !videoEl) return;

            if (url && url.trim()) {
                videoEl.src = url.trim();
                previewBox.style.display = 'block';
            } else {
                videoEl.src = '';
                previewBox.style.display = 'none';
            }
        }

        async function uploadEditSelectedVideo() {
            const fileInput = document.getElementById('editPropertyVideoFile');
            if (!fileInput || !fileInput.files.length) {
                showNotification('Please select a video file first', 'info');
                return;
            }

            const file = fileInput.files[0];
            const uploadData = new FormData();
            uploadData.append('file', file);

            const token = authManager.getToken();
            try {
                showNotification('Uploading video... Please wait', 'info');
                const res = await fetch('/api/properties/upload-media', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: uploadData
                });
                if (res.ok) {
                    const data = await res.json();
                    const videoInput = document.getElementById('editPropertyVideoUrl');
                    if (videoInput) videoInput.value = data.url;
                    updateEditVideoPreview(data.url);
                    showNotification('Video uploaded successfully!', 'success');
                } else {
                    showNotification('Failed to upload video clip', 'error');
                }
            } catch (err) {
                console.error('Edit video upload error:', err);
                showNotification('Error uploading video', 'error');
            }
        }

        // Open Edit Property Modal and prefill data
        async function openEditPropertyModal(propertyId) {
            const modal = document.getElementById('editPropertyModal');
            if (!modal) return;

            let prop = currentOwnerPropertiesCache.find(p => p.id === propertyId);
            if (!prop) {
                try {
                    const res = await fetch(`/api/properties/${propertyId}`, {
                        headers: { 'Authorization': `Bearer ${authManager.getToken()}` }
                    });
                    if (res.ok) {
                        prop = await res.json();
                    }
                } catch (err) {
                    console.error('Error fetching property to edit:', err);
                }
            }

            if (!prop) {
                showNotification('Property details not found', 'error');
                return;
            }

            document.getElementById('editPropertyId').value = prop.id;
            document.getElementById('editPropertyTitle').value = prop.title || '';
            document.getElementById('editPropertyDescription').value = prop.description || '';
            document.getElementById('editPropertyAddress').value = prop.address || '';
            document.getElementById('editPropertyCity').value = prop.city || '';
            document.getElementById('editPropertyState').value = prop.state || '';
            document.getElementById('editPropertyZipCode').value = prop.zip_code || '';
            document.getElementById('editPropertyType').value = prop.property_type || 'RESIDENTIAL';
            document.getElementById('editPropertyListingType').value = prop.listing_type || 'sale';
            document.getElementById('editPropertyBedrooms').value = prop.bedrooms ?? '';
            document.getElementById('editPropertyBathrooms').value = prop.bathrooms ?? '';
            document.getElementById('editPropertyArea').value = prop.area_sqft ?? '';
            document.getElementById('editPropertyPrice').value = prop.price ?? '';
            document.getElementById('editPropertyForeignEligible').checked = prop.foreign_buyer_eligible !== false;
            document.getElementById('editPropertyAvailable').checked = !!prop.is_available;

            // Populate images
            editPropertyImagesList = (prop.images && Array.isArray(prop.images))
                ? prop.images.map(img => typeof img === 'string' ? img : img.image_url)
                : [];
            renderEditImagesPreview();

            // Populate video
            const videoUrl = prop.video_url || '';
            document.getElementById('editPropertyVideoUrl').value = videoUrl;
            updateEditVideoPreview(videoUrl);

            modal.classList.add('show');
        }

        function closeEditPropertyModal() {
            const modal = document.getElementById('editPropertyModal');
            if (modal) modal.classList.remove('show');
        }

        // Close edit property modal when clicking outside
        document.getElementById('editPropertyModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeEditPropertyModal();
            }
        });

        // Submit edit property form
        document.getElementById('editPropertyForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const propertyId = document.getElementById('editPropertyId').value;
            if (!propertyId) return;

            const formData = new FormData(this);
            const propertyUpdateData = {
                title: formData.get('title'),
                description: formData.get('description'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zip_code: formData.get('zip_code'),
                property_type: formData.get('property_type'),
                listing_type: formData.get('listing_type') || 'sale',
                bedrooms: formData.get('bedrooms') ? parseInt(formData.get('bedrooms')) : null,
                bathrooms: formData.get('bathrooms') ? parseFloat(formData.get('bathrooms')) : null,
                area_sqft: formData.get('area_sqft') ? parseFloat(formData.get('area_sqft')) : null,
                price: parseFloat(formData.get('price')),
                video_url: formData.get('video_url') ? formData.get('video_url').trim() : null,
                image_urls: editPropertyImagesList,
                foreign_buyer_eligible: document.getElementById('editPropertyForeignEligible')?.checked ?? true,
                is_available: formData.get('is_available') === 'on'
            };

            try {
                showNotification('Updating property details & media...', 'info');
                const response = await fetch(`/api/properties/${propertyId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authManager.getToken()}`
                    },
                    body: JSON.stringify(propertyUpdateData)
                });

                if (!response.ok) {
                    throw new Error('Failed to update property');
                }

                closeEditPropertyModal();
                showNotification('Property, images & video updated successfully!', 'success');
                await refreshPropertiesList();
            } catch (err) {
                console.error('Error updating property:', err);
                showNotification('Failed to update property. Please try again.', 'error');
            }
        });

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
            if (contactValues.length > 3) {
                document.getElementById('contactFaxNumber').value = contactValues[3].textContent || '';
            }
        }

        // Handle contact info form submission
        document.getElementById('contactInfoForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const contactData = {
                primary_email: formData.get('primary_email'),
                primary_phone: formData.get('primary_phone'),
                mobile_phone: formData.get('mobile_phone'),
                fax_number: formData.get('fax_number'),
                website: formData.get('website'),
                business_name: formData.get('business_name'),
                years_in_business: formData.get('years_in_business') ? parseInt(formData.get('years_in_business')) : null
            };
            
            try {
                const response = await fetch('/api/owner/contact-info', {
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

        // Close contact info modal when clicking outside
        document.getElementById('contactInfoModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeContactInfoModal();
            }
        });

        // Function to refresh properties list
        async function refreshPropertiesList() {
            try {
                const propertiesResponse = await fetch('/api/owner/properties', {
                    headers: {
                        'Authorization': `Bearer ${authManager.getToken()}`
                    }
                });
                
                if (propertiesResponse.ok) {
                    const propertiesData = await propertiesResponse.json();
                    currentOwnerPropertiesCache = propertiesData;
                    updatePropertiesList(propertiesData);
                    updatePropertyPortfolio(propertiesData);
                }
            } catch (error) {
                console.error('Error refreshing properties:', error);
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

        // Update Property Portfolio Section
        function updatePropertyPortfolio(propertiesData) {
            const portfolioContainer = document.getElementById('propertyPortfolioList');
            if (!portfolioContainer) return;
            
            if (propertiesData.length === 0) {
                portfolioContainer.innerHTML = `
                    <div class="no-properties-portfolio">
                        <i class="fas fa-building"></i>
                        <h4>No Properties Yet</h4>
                        <p>Start building your property portfolio by adding your first property!</p>
                    </div>
                `;
                return;
            }
            
            // Show only the first 4 properties in the portfolio card
            const displayProperties = propertiesData.slice(0, 4);
            
            const propertiesHTML = displayProperties.map(property => `
                <div class="property-item" onclick="viewPropertyDetails(${property.id})">
                    <div class="property-image">
                        <i class="fas fa-building"></i>
                    </div>
                    <div class="property-info">
                        <div class="property-name">${property.title}</div>
                        <div class="property-address">${property.address}, ${property.city}</div>
                        <div class="property-details">
                            <span class="property-type">${property.property_type}</span>
                            <span class="property-price">₹${Math.round(property.price).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <div class="property-status ${property.is_available ? 'status-vacant' : 'status-occupied'}">
                        ${property.is_available ? 'Available' : 'Occupied'}
                    </div>
                </div>
            `).join('');
            
            // Add "View All" link if there are more than 4 properties
            const viewAllLink = propertiesData.length > 4 ? `
                <div class="view-all-properties">
                    <a href="#" onclick="scrollToPropertiesSection()" class="edit-profile-btn">
                        <i class="fas fa-eye"></i>
                        View All Properties (${propertiesData.length})
                    </a>
                </div>
            ` : '';
            
            portfolioContainer.innerHTML = propertiesHTML + viewAllLink;
        }

        // View Property Details
        function viewPropertyDetails(propertyId) {
            openEditPropertyModal(propertyId);
        }

        // Scroll to Properties Section
        function scrollToPropertiesSection() {
            const propertiesSection = document.querySelector('.properties-section');
            if (propertiesSection) {
                propertiesSection.scrollIntoView({ behavior: 'smooth' });
            }
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
                
                if (section === 'Personal Information') {
                    openEditModal();
                } else if (section === 'Property Portfolio') {
                    openAddPropertyModal();
                } else {
                    showNotification(`${action} ${section} feature is not available yet.`, 'info');
                }
            });
        });

        // Add hover effects for property items
        document.querySelectorAll('.property-item').forEach(item => {
            item.addEventListener('click', function() {
                const name = this.querySelector('.property-name').textContent;
                showNotification(`Viewing details for: ${name}`, 'info');
            });
        });

        // Add hover effects for info items
        document.querySelectorAll('.info-item, .contact-item').forEach(item => {
            item.addEventListener('click', function() {
                const label = this.querySelector('.info-label, .contact-label').textContent;
                showNotification(`Edit ${label} feature is not available yet.`, 'info');
            });
        });

        // Add click handlers for contact information
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('click', function() {
                const label = this.querySelector('.contact-label').textContent;
                const value = this.querySelector('.contact-value').textContent;
                
                if (label.includes('Email')) {
                    window.location.href = `mailto:${value}`;
                } else if (label.includes('Phone')) {
                    window.location.href = `tel:${value}`;
                } else if (label.includes('Website')) {
                    window.open(`http://${value}`, '_blank');
                } else {
                    showNotification(`Edit ${label} feature is not available yet.`, 'info');
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
                if (!authManager.isAuthenticated()) {
                    window.location.href = '/';
                    return;
                }
                
                const user = authManager.getUser();
                if (user) {
                    // Update user info display
                    document.querySelector('.user-name').textContent = `${user.first_name} ${user.last_name}`;
                    document.querySelector('.user-role').textContent = user.user_type === 'owner' ? 'Property Owner' : 'User';
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

        // Consultation Modal Functions
        function openConsultationModal() {
            document.getElementById('consultationModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeConsultationModal() {
            document.getElementById('consultationModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        document.getElementById('consultationModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeConsultationModal();
            }
        });

        // Handle consultation form submission
        document.getElementById('consultationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const consultationData = {
                title: formData.get('title'),
                property_address: formData.get('property_address'),
                consultation_type: formData.get('consultation_type'),
                description: formData.get('description'),
                preferred_date: formData.get('preferred_date'),
                preferred_time: formData.get('preferred_time')
            };

            // Get the selected consultant
            const consultantSelect = document.getElementById('consultant_id');
            const consultantId = consultantSelect.value;
            
            if (!consultantId) {
                showNotification('Please select a consultant', 'error');
                return;
            }

            consultationData.consultant_id = parseInt(consultantId);

            // Submit consultation request
            fetch('/api/consultant/consultation-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authManager.getToken() || localStorage.getItem('token') || ''}`
                },
                body: JSON.stringify(consultationData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    showNotification('Consultation request submitted successfully!', 'success');
                    closeConsultationModal();
                    this.reset();
                } else {
                    showNotification('Failed to submit consultation request', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Error submitting consultation request', 'error');
            });
        });

        // Load consultants for the dropdown
        function loadConsultants() {
            fetch('/api/consultants', {
                headers: {
                    'Authorization': `Bearer ${authManager.getToken() || localStorage.getItem('token') || ''}`
                }
            })
            .then(response => response.json())
            .then(data => {
                const consultantSelect = document.getElementById('consultant_id');
                consultantSelect.innerHTML = '<option value="">Select a consultant...</option>';
                
                data.forEach(consultant => {
                    const option = document.createElement('option');
                    option.value = consultant.id;
                    option.textContent = `${consultant.first_name} ${consultant.last_name} - ${consultant.specialization || 'General'}`;
                    consultantSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error loading consultants:', error);
                showNotification('Failed to load consultants', 'error');
            });
        }

        // Load consultants when page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadConsultants();
        });

// Owner Profile Page Background Slider Rotation (Exact Home Page Timing)
      (function initOwnerHeroSlider() {
        const slides = document.querySelectorAll('.owner-hero-slide');
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
