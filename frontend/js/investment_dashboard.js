let trendsCountdownTimer = null;
let secondsToNextUpdate = 3600;

function formatSentimentBadge(sentiment) {
  const s = (sentiment || '').toLowerCase();
  if (s.includes('very bullish') || s.includes('aggressive')) {
    return `<span style="background: #E8ECE3; color: #065F46; border: 1.5px solid rgba(5, 150, 105, 0.4); padding: 0.25rem 0.75rem; border-radius: 99px; font-weight: 700; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fas fa-bolt" style="color: #059669;"></i> ${sentiment}</span>`;
  }
  if (s.includes('bullish') || s.includes('expansion') || s.includes('demand')) {
    return `<span style="background: #E8ECE3; color: #065F46; border: 1.5px solid rgba(5, 150, 105, 0.3); padding: 0.25rem 0.75rem; border-radius: 99px; font-weight: 700; font-size: 0.8rem;">${sentiment}</span>`;
  }
  if (s.includes('safe-haven') || s.includes('institutional') || s.includes('sovereign')) {
    return `<span style="background: #EFF6FF; color: #1E40AF; border: 1.5px solid rgba(59, 130, 246, 0.35); padding: 0.25rem 0.75rem; border-radius: 99px; font-weight: 700; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fas fa-shield-alt" style="color: #2563EB;"></i> ${sentiment}</span>`;
  }
  if (s.includes('preservation') || s.includes('banking')) {
    return `<span style="background: #FEF3C7; color: #92400E; border: 1.5px solid rgba(217, 119, 6, 0.35); padding: 0.25rem 0.75rem; border-radius: 99px; font-weight: 700; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fas fa-landmark" style="color: #B45309;"></i> ${sentiment}</span>`;
  }
  return `<span style="background: #F3E8FF; color: #6B21A8; border: 1.5px solid rgba(147, 51, 234, 0.35); padding: 0.25rem 0.75rem; border-radius: 99px; font-weight: 700; font-size: 0.8rem;">${sentiment}</span>`;
}

function startTrendsCountdown(initialSeconds) {
  if (trendsCountdownTimer) clearInterval(trendsCountdownTimer);
  secondsToNextUpdate = initialSeconds && initialSeconds > 0 ? initialSeconds : 3600;

  function updateDisplay() {
    const countdownEl = document.getElementById('trendCountdown');
    if (!countdownEl) return;
    
    if (secondsToNextUpdate <= 0) {
      countdownEl.textContent = 'Updating live metrics...';
      loadMarketTrends(false);
      return;
    }
    
    const minutes = Math.floor(secondsToNextUpdate / 60);
    const secs = secondsToNextUpdate % 60;
    countdownEl.textContent = `${minutes}m ${secs < 10 ? '0' : ''}${secs}s`;
    secondsToNextUpdate--;
  }

  updateDisplay();
  trendsCountdownTimer = setInterval(updateDisplay, 1000);
}

async function loadMarketTrends(isManual = false) {
  const icon = document.getElementById('refreshTrendsIcon');
  if (icon) icon.classList.add('fa-spin');

  try {
    const res = await fetch('/api/market-trends');
    const data = await res.json();
    if (data && data.global_hubs) {
      const tbody = document.getElementById('marketTrendsBody');
      if (tbody) {
        tbody.innerHTML = data.global_hubs.map(hub => {
          const isPositive = hub.yoy_positive !== false && !hub.yoy_appreciation.includes('-');
          const yoyColor = isPositive ? '#065F46' : '#B91C1C';
          const yoyIcon = isPositive ? 'fa-arrow-up' : 'fa-arrow-down';
          const iconColor = isPositive ? '#059669' : '#DC2626';

          return `
            <tr>
              <td><strong style="color: #243023; font-size: 1.05rem;">${hub.city}</strong><br><small style="color: #64748B; font-size: 0.82rem; font-weight: 500;">${hub.corridors}</small></td>
              <td><strong style="color: #1A241A; font-family: monospace; font-size: 1rem; font-weight: 700;">${hub.avg_price_sqft}</strong></td>
              <td><span style="color: ${yoyColor}; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;"><i class="fas ${yoyIcon}" style="color: ${iconColor};"></i> ${hub.yoy_appreciation}</span></td>
              <td><strong style="color: #9C6C38; font-size: 1.05rem; font-weight: 800;">${hub.rental_yield}</strong></td>
              <td><span style="color: #1E40AF; font-weight: 600; font-size: 0.92rem;">${hub.liquidity_velocity}</span></td>
              <td>${formatSentimentBadge(hub.sentiment)}</td>
            </tr>
          `;
        }).join('');
      }

      // Update timestamp indicators
      const curHourEl = document.getElementById('trendCurrentHour');
      if (curHourEl && data.last_updated) {
        curHourEl.textContent = `${data.last_updated}`;
      }

      const lastUpdatedText = document.getElementById('trendLastUpdatedText');
      if (lastUpdatedText && data.next_update_time) {
        lastUpdatedText.textContent = `Hourly Cycle: ${data.last_updated} → Next at ${data.next_update_time}`;
      }

      // Reset hourly countdown timer
      if (data.next_update_in_seconds) {
        startTrendsCountdown(data.next_update_in_seconds);
      } else {
        startTrendsCountdown(3600);
      }

      if (isManual && typeof showToast === 'function') {
        showToast(`Market trends updated for current hour (${data.last_updated})`);
      }
    }
  } catch (err) {
    console.error('Failed to load market trends:', err);
  } finally {
    if (icon) {
      setTimeout(() => icon.classList.remove('fa-spin'), 400);
    }
  }
}

    function requestRelocationMandate() {
      const name = document.getElementById('reloName')?.value || 'Client';
      const dest = document.getElementById('reloDest')?.value || 'Global';
      const msg = `Hi Prime Concierge, my name is ${name}. I am inquiring about Full Relocation & Golden Visa services for destination: ${dest}.`;
      if (typeof window.openWhatsAppConcierge === 'function') {
        window.openWhatsAppConcierge(msg);
      } else {
        window.open(`https://wa.me/18005557746?text=${encodeURIComponent(msg)}`, '_blank');
      }
    }

    /* ================= Sub-Registrar (SR) Guidance Value Database & Cascade ================= */
    const SR_DATABASE = {
      "Karnataka": typeof KARNATAKA_SR_DATA !== 'undefined' ? KARNATAKA_SR_DATA : {},
      "Maharashtra": {
        "MUMBAI SUBURBAN": {
          "ANDHERI": {
            "ANDHERI WEST": [
              { village: "Lokhandwala Complex", rate: 24500, stampRate: 6.0, regRate: 1.0 },
              { village: "Versova Village", rate: 21800, stampRate: 6.0, regRate: 1.0 }
            ],
            "BANDRA WEST": [
              { village: "Pali Hill", rate: 38500, stampRate: 6.0, regRate: 1.0 },
              { village: "Carter Road Promenade", rate: 36000, stampRate: 6.0, regRate: 1.0 }
            ]
          }
        },
        "PUNE": {
          "HAVELI": {
            "SHIVAJINAGAR": [
              { village: "Koregaon Park North Main Rd", rate: 14200, stampRate: 7.0, regRate: 1.0 },
              { village: "Kalyani Nagar", rate: 11800, stampRate: 7.0, regRate: 1.0 }
            ]
          }
        }
      },
      "Delhi": {
        "SOUTH DELHI": {
          "HAUZ KHAS": {
            "MEHRAULI SUB-DISTRICT": [
              { village: "Vasant Vihar Block A (Category A)", rate: 77400, stampRate: 6.0, regRate: 1.0 },
              { village: "Greater Kailash 1 (Category B)", rate: 24500, stampRate: 6.0, regRate: 1.0 },
              { village: "Panchsheel Park", rate: 55000, stampRate: 6.0, regRate: 1.0 }
            ]
          }
        }
      },
      "Tamil Nadu": {
        "CHENNAI": {
          "MYLAPORE": {
            "ALWARPET HOBLI": [
              { village: "Boat Club Road", rate: 26000, stampRate: 7.0, regRate: 2.0 },
              { village: "Poes Garden", rate: 24000, stampRate: 7.0, regRate: 2.0 }
            ]
          }
        }
      },
      "Telangana": {
        "HYDERABAD": {
          "SHAIKPET": {
            "JUBILEE HILLS": [
              { village: "Jubilee Hills Check Post", rate: 16500, stampRate: 7.5, regRate: 0.5 },
              { village: "Banjara Hills Road No 12", rate: 15200, stampRate: 7.5, regRate: 0.5 }
            ]
          }
        }
      },
      "Goa": {
        "NORTH GOA": {
          "BARDEZ": {
            "CALANGUTE": [
              { village: "Anjuna Beach Vista", rate: 9500, stampRate: 4.5, regRate: 1.0 },
              { village: "Assagao Badem", rate: 12500, stampRate: 4.5, regRate: 1.0 }
            ]
          }
        }
      }
    };

    function populateSelectOptions(selectId, items, placeholder) {
      const select = document.getElementById(selectId);
      if (!select) return;
      select.innerHTML = `<option value="">-- ${placeholder} --</option>`;
      items.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item;
        opt.textContent = item;
        select.appendChild(opt);
      });
    }

    function onSRStateChange() {
      const state = document.getElementById('srState').value;
      const districts = state && SR_DATABASE[state] ? Object.keys(SR_DATABASE[state]) : [];
      populateSelectOptions('srDistrict', districts, 'SELECT DISTRICT');
      populateSelectOptions('srTaluk', [], 'SELECT TALUKA');
      populateSelectOptions('srHobli', [], 'SELECT HOBLI/TOWN');
      populateSelectOptions('srVillage', [], 'SELECT VILLAGE');
      if (districts.length > 0) {
        document.getElementById('srDistrict').value = districts[0];
        onSRDistrictChange();
      }
    }

    function onSRDistrictChange() {
      const state = document.getElementById('srState').value;
      const district = document.getElementById('srDistrict').value;
      const taluks = (state && district && SR_DATABASE[state] && SR_DATABASE[state][district]) ? Object.keys(SR_DATABASE[state][district]) : [];
      populateSelectOptions('srTaluk', taluks, 'SELECT TALUKA');
      populateSelectOptions('srHobli', [], 'SELECT HOBLI/TOWN');
      populateSelectOptions('srVillage', [], 'SELECT VILLAGE');
      if (taluks.length > 0) {
        document.getElementById('srTaluk').value = taluks[0];
        onSRTalukChange();
      }
    }

    function onSRTalukChange() {
      const state = document.getElementById('srState').value;
      const district = document.getElementById('srDistrict').value;
      const taluk = document.getElementById('srTaluk').value;
      const hoblis = (state && district && taluk && SR_DATABASE[state][district][taluk]) ? Object.keys(SR_DATABASE[state][district][taluk]) : [];
      populateSelectOptions('srHobli', hoblis, 'SELECT HOBLI/TOWN');
      populateSelectOptions('srVillage', [], 'SELECT VILLAGE');
      if (hoblis.length > 0) {
        document.getElementById('srHobli').value = hoblis[0];
        onSRHobliChange();
      }
    }

    function onSRHobliChange() {
      const state = document.getElementById('srState').value;
      const district = document.getElementById('srDistrict').value;
      const taluk = document.getElementById('srTaluk').value;
      const hobli = document.getElementById('srHobli').value;
      const villageObjs = (state && district && taluk && hobli && SR_DATABASE[state][district][taluk][hobli]) || [];
      const villages = villageObjs.map(v => v.village);
      populateSelectOptions('srVillage', villages, 'SELECT VILLAGE / SECTOR');
      if (villages.length > 0) {
        document.getElementById('srVillage').value = villages[0];
        calculateSRValuation();
      }
    }

    function onSRVillageChange() {
      calculateSRValuation();
    }

    function calculateSRValuation() {
      const state = document.getElementById('srState').value;
      const district = document.getElementById('srDistrict').value;
      const taluk = document.getElementById('srTaluk').value;
      const hobli = document.getElementById('srHobli').value;
      const villageName = document.getElementById('srVillage').value;
      const area = parseFloat(document.getElementById('srAreaSqft').value) || 0;

      if (!state || !district || !taluk || !hobli || !villageName) {
        return;
      }

      const villageList = (SR_DATABASE[state] && SR_DATABASE[state][district] && SR_DATABASE[state][district][taluk] && SR_DATABASE[state][district][taluk][hobli]) || [];
      const record = villageList.find(v => v.village === villageName) || villageList[0] || { rate: 6000, stampRate: 5.1, regRate: 1.0 };

      const totalGuidance = record.rate * area;
      const stampDuty = totalGuidance * (record.stampRate / 100);
      const regFee = totalGuidance * (record.regRate / 100);

      document.getElementById('srOutLocationTitle').innerText = `${district} • ${taluk} • ${hobli} • ${villageName}`;
      document.getElementById('srOutRatePerSqft').innerText = `₹${record.rate.toLocaleString('en-IN')} / sq ft`;
      document.getElementById('srOutTotalGuidance').innerText = `₹${Math.round(totalGuidance).toLocaleString('en-IN')}`;
      document.getElementById('srOutStampDuty').innerText = `₹${Math.round(stampDuty).toLocaleString('en-IN')} (${record.stampRate}%)`;
      document.getElementById('srOutRegistrationFee').innerText = `₹${Math.round(regFee).toLocaleString('en-IN')} (${record.regRate}%)`;

      const resultsBox = document.getElementById('srResultsContainer');
      if (resultsBox) {
        resultsBox.style.display = 'block';
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      onSRStateChange();
      loadMarketTrends(false);
      // Ensure backup hourly polling interval (every 1 hour = 3600000ms)
      setInterval(() => {
        loadMarketTrends(false);
      }, 3600000);
    });
