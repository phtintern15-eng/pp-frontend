/* ==========================================================================
   GLOBAL SUITE FOR INTERNATIONAL & FOREIGN BUYERS
   Multi-Language (EN, AR, FR, ES, DE, ZH), Real-Time Currency Conversion,
   Interactive ROI & Rental Yield Calculator, WhatsApp Concierge, Virtual Tours
   ========================================================================== */

(function () {
  'use strict';

  // --- Exchange rates baseline (relative to INR base in dataset) ---
  const EXCHANGE_RATES = {
    INR: { rate: 1, symbol: '₹', code: 'INR', flag: '🇮🇳', name: 'Indian Rupee' },
    USD: { rate: 0.012, symbol: '$', code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
    AED: { rate: 0.044, symbol: 'AED ', code: 'AED', flag: '🇦🇪', name: 'UAE Dirham' },
    EUR: { rate: 0.011, symbol: '€', code: 'EUR', flag: '🇪🇺', name: 'Euro' },
    GBP: { rate: 0.0095, symbol: '£', code: 'GBP', flag: '🇬🇧', name: 'British Pound' },
    SGD: { rate: 0.016, symbol: 'S$', code: 'SGD', flag: '🇸🇬', name: 'Singapore Dollar' }
  };

  // --- Multi-Language Dictionary ---
  const TRANSLATIONS = {
    en: {
      navHome: "Home",
      navProperties: "Properties",
      navForeign: "Foreign Buyers",
      navAbout: "About Us",
      navServices: "Services",
      navPricing: "Pricing",
      navContact: "Contact",
      overseasDesk: "Overseas Desk",
      heroBadge: "International Investor & NRI Gateway",
      heroTitle: "Cross-Border Real Estate. Zero Friction.",
      heroSubtitle: "Dedicated advisory for overseas citizens, NRIs, and institutional funds acquiring trophy residences.",
      calculatorTitle: "Cross-Border Yield & ROI Calculator",
      faqTitle: "Frequently Asked Questions by Foreign Buyers",
      testimonialsTitle: "International Client Testimonials",
      saved: "Saved",
      save: "Save",
      details: "Details",
      nriEligible: "NRI / Foreign Eligible"
    },
    ar: {
      navHome: "الرئيسية",
      navProperties: "العقارات",
      navForeign: "المستثمرون الأجانب",
      navAbout: "من نحن",
      navServices: "الخدمات",
      navPricing: "الأسعار",
      navContact: "اتصل بنا",
      overseasDesk: "المكتب الدولي",
      heroBadge: "بوابة المستثمرين الأجانب والمقيمين بالخارج",
      heroTitle: "عقارات دولية فاخرة. بدون أي عوائق.",
      heroSubtitle: "استشارات مخصصة للمستثمرين الدوليين وصناديق الاستثمار لشراء العقارات الفاخرة قانونياً.",
      calculatorTitle: "حاسبة العائد الاستثماري الدولي (ROI)",
      faqTitle: "الأسئلة الشائعة للمشترين الأجانب",
      testimonialsTitle: "شهادات العملاء الدوليين",
      saved: "المحفوظات",
      save: "حفظ",
      details: "تفاصيل",
      nriEligible: "مؤهل للأجانب"
    },
    fr: {
      navHome: "Accueil",
      navProperties: "Propriétés",
      navForeign: "Acheteurs Internationaux",
      navAbout: "À Propos",
      navServices: "Services",
      navPricing: "Tarifs",
      navContact: "Contact",
      overseasDesk: "Bureau International",
      heroBadge: "Portail pour Investisseurs Étrangers & Non-Résidents",
      heroTitle: "Immobilier Transfrontalier. Zéro Friction.",
      heroSubtitle: "Conseil dédié aux acheteurs internationaux et résidents pour l'acquisition de résidences de prestige.",
      calculatorTitle: "Simulateur de Rendement Locatif & ROI",
      faqTitle: "Foire Aux Questions pour Acheteurs Étrangers",
      testimonialsTitle: "Témoignages de Clients Internationaux",
      saved: "Sauvegardé",
      save: "Sauvegarder",
      details: "Détails",
      nriEligible: "Éligible Étrangers"
    },
    es: {
      navHome: "Inicio",
      navProperties: "Propiedades",
      navForeign: "Compradores Extranjeros",
      navAbout: "Nosotros",
      navServices: "Servicios",
      navPricing: "Precios",
      navContact: "Contacto",
      overseasDesk: "Oficina Internacional",
      heroBadge: "Portal para Inversionistas Extranjeros",
      heroTitle: "Bienes Raíces Internacionales. Cero Fricción.",
      heroSubtitle: "Asesoría exclusiva para compradores extranjeros y adquisición de propiedades de lujo con cumplimiento total.",
      calculatorTitle: "Calculadora de Rendimiento y ROI",
      faqTitle: "Preguntas Frecuentes para Compradores Extranjeros",
      testimonialsTitle: "Testimonios de Clientes Internacionales",
      saved: "Guardado",
      save: "Guardar",
      details: "Detalles",
      nriEligible: "Elegible Extranjeros"
    },
    de: {
      navHome: "Startseite",
      navProperties: "Immobilien",
      navForeign: "Ausländische Käufer",
      navAbout: "Über Uns",
      navServices: "Dienstleistungen",
      navPricing: "Preise",
      navContact: "Kontakt",
      overseasDesk: "Auslandsbüro",
      heroBadge: "Portal für internationale Investoren",
      heroTitle: "Grenzüberschreitende Immobilien. Reibungslos.",
      heroSubtitle: "Spezialisierte Beratung für ausländische Staatsbürger beim Erwerb von Luxusresidenzen.",
      calculatorTitle: "Rendite- & ROI-Rechner",
      faqTitle: "Häufige Fragen ausländischer Käufer",
      testimonialsTitle: "Internationale Kundenbewertungen",
      saved: "Gespeichert",
      save: "Speichern",
      details: "Details",
      nriEligible: "Für Ausländer Geeignet"
    },
    zh: {
      navHome: "首页",
      navProperties: "房产列表",
      navForeign: "海外买家",
      navAbout: "关于我们",
      navServices: "定制服务",
      navPricing: "价格方案",
      navContact: "联系我们",
      overseasDesk: "海外服务台",
      heroBadge: "国际投资者与非居民置业通道",
      heroTitle: "跨国顶级豪宅置业·全流程合规保障",
      heroSubtitle: "专为全球公民、海外华侨及离岸基金提供全流程置业顾问服务。",
      calculatorTitle: "跨境租金收益与投资回报计算器",
      faqTitle: "海外买家常见问答 (FAQ)",
      testimonialsTitle: "国际客户置业评价",
      saved: "已收藏",
      save: "收藏",
      details: "查看详情",
      nriEligible: "海外人士可购"
    }
  };

  let currentCurrency = localStorage.getItem('prime_preferred_currency') || 'USD';
  let currentLanguage = localStorage.getItem('prime_preferred_language') || 'en';

  // --- Format Currency ---
  window.formatCurrencyAmount = function (amountInINR, targetCurrency) {
    targetCurrency = targetCurrency || currentCurrency;
    const info = EXCHANGE_RATES[targetCurrency] || EXCHANGE_RATES.INR;
    const converted = amountInINR * info.rate;

    if (targetCurrency === 'INR') {
      if (converted >= 10000000) {
        return '₹' + (converted / 10000000).toFixed(2) + ' Cr';
      } else if (converted >= 100000) {
        return '₹' + (converted / 100000).toFixed(2) + ' Lakh';
      }
      return '₹' + Math.round(converted).toLocaleString('en-IN');
    }

    if (converted >= 1000000) {
      return info.symbol + (converted / 1000000).toFixed(2) + 'M ' + info.code;
    } else if (converted >= 1000) {
      return info.symbol + Math.round(converted).toLocaleString('en-US') + ' ' + info.code;
    }
    return info.symbol + Math.round(converted).toLocaleString('en-US');
  };

  // --- Update Currency across UI ---
  window.updateAllPriceDisplays = function (targetCurrency) {
    currentCurrency = targetCurrency || currentCurrency;
    localStorage.setItem('prime_preferred_currency', currentCurrency);

    const selects = document.querySelectorAll('.currency-select-ctrl');
    selects.forEach(select => {
      if (select.value !== currentCurrency) {
        select.value = currentCurrency;
      }
    });

    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
      const rawPrice = parseFloat(card.getAttribute('data-price') || '0');
      if (rawPrice > 0) {
        const priceTag = card.querySelector('.property-price-tag');
        if (priceTag) {
          const isRent = (card.getAttribute('data-category') || '').includes('for-rent') ||
                         priceTag.innerText.toLowerCase().includes('/mo');
          const formatted = window.formatCurrencyAmount(rawPrice, currentCurrency);
          priceTag.innerText = formatted + (isRent ? ' / mo' : '');
        }
      }

      // Remove crowded badges if any
      const oldBadge = card.querySelector('.property-badges .badge-foreign-eligible');
      if (oldBadge) oldBadge.remove();

      // Ensure NRI / Foreign button exists in footer
      const footer = card.querySelector('.property-footer');
      if (footer && !footer.querySelector('.btn-foreign-action')) {
        const foreignBtn = document.createElement('a');
        foreignBtn.className = 'btn-card-action btn-foreign-action';
        foreignBtn.href = '/foreign-investors';
        foreignBtn.title = 'View Foreign / NRI Buyer Guide & Eligibility';
        foreignBtn.innerHTML = '<i class="fas fa-globe-americas" style="color: #34D399;"></i> <span>NRI / Foreign</span>';
        foreignBtn.style.cssText = 'width: 100%; box-sizing: border-box; padding: 0.75rem 1rem; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border: 1px solid rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08); color: #34D399; font-size: 0.85rem; border-radius: 10px; font-weight: 600; transition: all 0.25s ease; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px;';
        foreignBtn.onmouseenter = function() { this.style.background = 'rgba(16, 185, 129, 0.2)'; this.style.borderColor = '#34D399'; };
        foreignBtn.onmouseleave = function() { this.style.background = 'rgba(16, 185, 129, 0.08)'; this.style.borderColor = 'rgba(16, 185, 129, 0.4)'; };
        footer.appendChild(foreignBtn);
      }
    });

    window.dispatchEvent(new CustomEvent('prime:currencyChanged', { detail: { currency: currentCurrency } }));
  };

  // --- Change Language Function ---
  window.changeLanguage = function (lang) {
    currentLanguage = lang || currentLanguage;
    localStorage.setItem('prime_preferred_language', currentLanguage);

    const langSelects = document.querySelectorAll('.language-select-ctrl');
    langSelects.forEach(select => {
      if (select.value !== currentLanguage) {
        select.value = currentLanguage;
      }
    });

    // RTL handling for Arabic
    if (currentLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.style.textAlign = 'right';
    } else {
      document.documentElement.dir = 'ltr';
      document.body.style.textAlign = 'left';
    }

    const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

    // Translate navigation links
    const navLinks = document.querySelectorAll('#navLinks a, .nav-links a');
    navLinks.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === '/' || href.endsWith('/')) a.innerText = dict.navHome;
      else if (href.includes('/property')) a.innerText = dict.navProperties;
      else if (href.includes('/foreign-investors')) a.innerHTML = `<i class="fas fa-passport" style="font-size:0.85rem;"></i> ` + dict.navForeign;
      else if (href.includes('/about')) a.innerText = dict.navAbout;
      else if (href.includes('/service')) a.innerText = dict.navServices;
      else if (href.includes('/pricing')) a.innerText = dict.navPricing;
      else if (href.includes('#contact')) a.innerText = dict.navContact;
    });

    // Translate Hero Elements if on foreign page
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.location.pathname.includes('foreign-investors')) {
      heroTitle.innerHTML = dict.heroTitle.replace('.', '. <span>') + '</span>';
    }

    window.dispatchEvent(new CustomEvent('prime:languageChanged', { detail: { language: currentLanguage } }));
  };

  // --- Live Advisor & International Concierge Desk ---
  window.openWhatsAppConcierge = function (customMessage) {
    let drawer = document.getElementById('advisorChatDrawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'advisorChatDrawer';
      drawer.className = 'modal-overlay';
      drawer.style.cssText = 'display:none; position:fixed; inset:0; z-index:999999; background:rgba(3,6,10,0.85); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); align-items:center; justify-content:center; padding:1.2rem; opacity:1 !important; visibility:visible !important;';

      drawer.innerHTML = `
        <div style="background:linear-gradient(160deg,#0E131A 0%,#080C10 100%); border:1.5px solid rgba(212,175,55,0.45); border-radius:22px; max-width:540px; width:100%; box-shadow:0 30px 70px rgba(0,0,0,0.95), 0 0 40px rgba(212,175,55,0.18); position:relative; color:#fff; overflow:hidden; display:flex; flex-direction:column;">
          
          <!-- Modal Header -->
          <div style="background:linear-gradient(135deg,#131B24 0%,#0B1015 100%); border-bottom:1px solid rgba(212,175,55,0.25); padding:1.4rem 1.6rem; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:0.9rem;">
              <div style="position:relative;">
                <img src="/images/prime_logo.png" alt="Prime Concierge" style="width:44px; height:44px; object-fit:contain; filter:drop-shadow(0 0 8px rgba(212,175,55,0.5));">
                <span style="position:absolute; bottom:0; right:0; width:12px; height:12px; background:#10B981; border:2px solid #0E131A; border-radius:50%; box-shadow:0 0 8px #10B981;"></span>
              </div>
              <div>
                <h3 class="advisor-title" style="margin:0; font-family:'Cormorant Garamond',Georgia,serif; font-size:1.4rem; color:#FFFFFF !important; letter-spacing:0.5px;">Senior Architectural Advisor</h3>
                <div style="font-size:0.8rem; color:#10B981; font-weight:700; display:flex; align-items:center; gap:0.35rem;">
                  <span>●</span> Online &bull; Foreign Buyer Acquisition Desk
                </div>
              </div>
            </div>
            <button onclick="closeAdvisorChat()" style="background:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.3); color:#FFDF73; border-radius:50%; width:36px; height:36px; font-size:1.25rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" onmouseover="this.style.background='rgba(212,175,55,0.25)'" onmouseout="this.style.background='rgba(212,175,55,0.12)'">&times;</button>
          </div>

          <!-- Chat Body & Messages -->
          <div id="advisorChatMessages" style="padding:1.4rem 1.6rem; max-height:360px; overflow-y:auto; display:flex; flex-direction:column; gap:1rem; background:rgba(0,0,0,0.25);">
            <!-- Advisor greeting -->
            <div style="display:flex; gap:0.75rem; align-items:flex-start;">
              <div style="width:32px; height:32px; border-radius:50%; background:rgba(212,175,55,0.2); border:1px solid rgba(212,175,55,0.4); display:flex; align-items:center; justify-content:center; color:#FFDF73; font-size:0.85rem; flex-shrink:0;">
                <i class="fas fa-user-tie"></i>
              </div>
              <div style="background:#151D26; border:1px solid rgba(212,175,55,0.2); border-radius:4px 16px 16px 16px; padding:0.85rem 1.1rem; max-width:85%; color:#E2E8F0 !important; font-size:0.88rem; line-height:1.5;">
                Hello! Welcome to the Prime Properties Global Advisory Desk. How can our international curators assist your property acquisition today?
              </div>
            </div>
          </div>

          <!-- Quick Actions / Quick Prompts -->
          <div style="padding:0.75rem 1.6rem; background:rgba(14,19,26,0.6); border-top:1px solid rgba(255,255,255,0.06); display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button onclick="sendQuickAdvisorQuery('I want to verify my foreign buyer eligibility & tax implications.')" style="background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.28); color:#FFDF73; border-radius:99px; padding:0.35rem 0.85rem; font-size:0.76rem; font-weight:600; cursor:pointer;">
              <i class="fas fa-passport"></i> Check Eligibility
            </button>
            <button onclick="sendQuickAdvisorQuery('Please send me the 30-year legal checklist & NRI POA guide.')" style="background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.28); color:#FFDF73; border-radius:99px; padding:0.35rem 0.85rem; font-size:0.76rem; font-weight:600; cursor:pointer;">
              <i class="fas fa-file-contract"></i> Legal Checklist
            </button>
            <button onclick="sendQuickAdvisorQuery('Can you arrange an architect-guided 360 virtual tour?')" style="background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.28); color:#FFDF73; border-radius:99px; padding:0.35rem 0.85rem; font-size:0.76rem; font-weight:600; cursor:pointer;">
              <i class="fas fa-vr-cardboard"></i> Book 360 Tour
            </button>
          </div>

          <!-- Input Bar & WhatsApp Direct -->
          <div style="padding:1.2rem 1.6rem; background:#0B0F14; border-top:1px solid rgba(212,175,55,0.25); display:flex; flex-direction:column; gap:0.85rem;">
            <form onsubmit="handleAdvisorSubmit(event)" style="display:flex; gap:0.6rem;">
              <input id="advisorQueryInput" type="text" placeholder="Type your message or question here..." style="flex:1; background:#141C24 !important; background-color:#141C24 !important; border:1px solid rgba(212,175,55,0.3) !important; border-radius:10px; padding:0.75rem 1rem; color:#FFFFFF !important; font-size:0.9rem; outline:none;" onfocus="this.style.borderColor='#FFDF73'" onblur="this.style.borderColor='rgba(212,175,55,0.3)'">
              <button type="submit" style="background:linear-gradient(135deg,#FFDF73,#D4AF37); color:#06090D; border:none; border-radius:10px; padding:0 1.25rem; font-weight:800; cursor:pointer; font-size:0.9rem; display:flex; align-items:center; gap:0.4rem;">
                <i class="fas fa-paper-plane"></i> Send
              </button>
            </form>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; padding-top:0.4rem;">
              <span style="font-size:0.8rem; color:#94A3B8;">Prefer messaging directly on WhatsApp?</span>
              <button onclick="redirectToWhatsAppApp()" style="background:#25D366; color:#06090D; border:none; padding:0.45rem 1rem; border-radius:8px; font-weight:800; font-size:0.82rem; cursor:pointer; display:inline-flex; align-items:center; gap:0.4rem;">
                <i class="fab fa-whatsapp" style="font-size:1rem;"></i> Open in WhatsApp
              </button>
            </div>
          </div>

        </div>
      `;
      document.body.appendChild(drawer);
    }

    if (customMessage) {
      setTimeout(() => {
        const input = document.getElementById('advisorQueryInput');
        if (input) input.value = customMessage;
      }, 50);
    }

    drawer.style.display = 'flex';
    drawer.classList.add('active', 'show');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const input = document.getElementById('advisorQueryInput');
      if (input) input.focus();
    }, 150);
  };

  window.closeAdvisorChat = function() {
    const drawer = document.getElementById('advisorChatDrawer');
    if (drawer) {
      drawer.style.display = 'none';
      drawer.classList.remove('active', 'show');
      document.body.style.overflow = '';
    }
  };

  window.sendQuickAdvisorQuery = function(text) {
    const input = document.getElementById('advisorQueryInput');
    if (input) {
      input.value = text;
      handleAdvisorSubmit(new Event('submit'));
    }
  };

  window.handleAdvisorSubmit = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById('advisorQueryInput');
    if (!input || !input.value.trim()) return;

    const query = input.value.trim();
    input.value = '';

    const container = document.getElementById('advisorChatMessages');
    if (!container) return;

    // User message bubble
    const userMsg = document.createElement('div');
    userMsg.style.cssText = 'display:flex; justify-content:flex-end;';
    userMsg.innerHTML = `
      <div style="background:linear-gradient(135deg,rgba(212,175,55,0.3),rgba(212,175,55,0.15)); border:1px solid rgba(212,175,55,0.45); border-radius:16px 4px 16px 16px; padding:0.8rem 1.1rem; max-width:85%; color:#FFFFFF; font-size:0.88rem; line-height:1.5;">
        ${query.replace(/</g, "&lt;")}
      </div>
    `;
    container.appendChild(userMsg);
    container.scrollTop = container.scrollHeight;

    // Simulate instant intelligent response
    setTimeout(() => {
      const resp = document.createElement('div');
      resp.style.cssText = 'display:flex; gap:0.75rem; align-items:flex-start; animation:fadeInUp 0.3s ease;';
      resp.innerHTML = `
        <div style="width:32px; height:32px; border-radius:50%; background:rgba(212,175,55,0.2); border:1px solid rgba(212,175,55,0.4); display:flex; align-items:center; justify-content:center; color:#FFDF73; font-size:0.85rem; flex-shrink:0;">
          <i class="fas fa-user-tie"></i>
        </div>
        <div style="background:#151D26; border:1px solid rgba(212,175,55,0.2); border-radius:4px 16px 16px 16px; padding:0.85rem 1.1rem; max-width:85%; color:#E2E8F0; font-size:0.88rem; line-height:1.5;">
          Thank you! Our international desk has logged your request: <em>"${query.slice(0, 50)}..."</em>. A senior advisor is standing by right now. Would you like to connect immediately via WhatsApp or arrange a scheduled callback?
          <div style="margin-top:0.75rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button onclick="redirectToWhatsAppApp('${encodeURIComponent(query)}')" style="background:#25D366; color:#06090D; border:none; padding:0.4rem 0.85rem; border-radius:6px; font-weight:700; font-size:0.8rem; cursor:pointer; display:inline-flex; align-items:center; gap:0.35rem;">
              <i class="fab fa-whatsapp"></i> Chat on WhatsApp Now
            </button>
            <button onclick="closeAdvisorChat(); alert('A representative will reach out to you within 15 minutes.');" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.25); color:#CBD5E1; padding:0.4rem 0.85rem; border-radius:6px; font-weight:600; font-size:0.8rem; cursor:pointer;">
              <i class="fas fa-phone-alt"></i> Request Callback
            </button>
          </div>
        </div>
      `;
      container.appendChild(resp);
      container.scrollTop = container.scrollHeight;
    }, 700);
  };

  window.redirectToWhatsAppApp = function(msg) {
    const text = msg ? decodeURIComponent(msg) : "Hello Prime Properties International Desk, I am inquiring about your luxury properties and foreign buyer consultation.";
    const phone = "18005557746";
    const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  // --- 360° Interactive Virtual Tour Experience Engine ---
  const TOUR_SCENES = [
    {
      id: 'living',
      name: 'Grand Architectural Living Pavilion',
      image: '/images/ai_walkthrough_living.jpg',
      desc: 'Double-height volume with floor-to-ceiling panoramic glass walls, marble floors with golden twilight reflections & minimalist luxury furnishings.'
    },
    {
      id: 'pool',
      name: 'Infinity Pool & Skyline Fire Lounge',
      image: '/images/ai_walkthrough_pool.jpg',
      desc: 'Heated zero-edge cantilevered infinity pool, sunken fire pit lounge with velvet cushions overlooking glittering metropolis horizon.'
    },
    {
      id: 'skyline',
      name: 'Penthouse Master Sky Suite',
      image: '/images/ai_walkthrough_bedroom.jpg',
      desc: 'Panoramic coastline sunset views, designer walk-in wardrobe, cove ceiling lighting & bespoke Italian craftsmanship.'
    },
    {
      id: 'atrium',
      name: 'Central Glass Atrium & Zen Garden',
      image: '/images/hero_luxury_villa.jpg',
      desc: 'Biophilic open courtyard architecture with reflecting cascade water fixtures and specimen tropical foliage.'
    }
  ];

  let currentTourSceneIdx = 0;
  let isPanoramaDragging = false;
  let panoramaStartX = 0;
  let panoramaPos = 50; // percentage
  let panoramaAutoSpinTimer = null;

  window.openVirtualTourModal = function (title, customUrl) {
    let modal = document.getElementById('virtualTourModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'virtualTourModal';
      modal.className = 'modal-overlay';
      modal.style.cssText = 'display:none; position:fixed; inset:0; z-index:999999; background:rgba(3,6,10,0.94); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); align-items:center; justify-content:center; padding:1rem; opacity:1 !important; visibility:visible !important;';
      
      modal.innerHTML = `
        <div style="background:linear-gradient(160deg,#0B1017 0%,#070A0F 100%); border:1.5px solid rgba(212,175,55,0.45); border-radius:24px; max-width:1050px; width:100%; max-height:94vh; overflow-y:auto; padding:2rem 2.25rem; box-shadow:0 35px 80px rgba(0,0,0,0.95), 0 0 50px rgba(212,175,55,0.2); position:relative; color:#fff; display:flex; flex-direction:column; gap:1.25rem;">
          
          <!-- Close Button -->
          <button onclick="closeVirtualTourModal()" style="position:absolute; top:1.25rem; right:1.25rem; background:rgba(212,175,55,0.15); border:1px solid rgba(212,175,55,0.4); color:#FFDF73; border-radius:50%; width:42px; height:42px; font-size:1.35rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.25s;" onmouseover="this.style.transform='rotate(90deg) scale(1.1)'; this.style.background='rgba(212,175,55,0.3)';" onmouseout="this.style.transform='none'; this.style.background='rgba(212,175,55,0.15)';">&times;</button>
          
          <!-- Header Bar -->
          <div style="display:flex; justify-content:space-between; align-items:flex-start; padding-right:3rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.45rem;">
                <span style="background:linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.1)); border:1px solid rgba(212,175,55,0.5); color:#FFDF73; padding:0.35rem 0.95rem; border-radius:99px; font-size:0.78rem; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; display:inline-flex; align-items:center; gap:0.45rem;">
                  <i class="fas fa-vr-cardboard" style="color:#FFDF73;"></i> 360° Interactive VR Tour
                </span>
                <span style="color:#10B981; font-size:0.85rem; font-weight:700; display:inline-flex; align-items:center; gap:0.35rem;">
                  <span style="width:8px; height:8px; border-radius:50%; background:#10B981; box-shadow:0 0 10px #10B981;"></span> Live 360° Spatial Feed
                </span>
              </div>
              <h2 id="vTourTitle" style="font-family:'Cormorant Garamond', Georgia, serif; font-size:2.2rem; margin:0; color:#FFFFFF; letter-spacing:0.5px;">Bel-Air Architectural Trophy Estate</h2>
              <p id="vTourSceneDesc" style="color:#94A3B8; font-size:0.9rem; margin:0.35rem 0 0;"></p>
            </div>

            <!-- View Mode Switcher -->
            <div style="display:inline-flex; background:rgba(255,255,255,0.06); padding:4px; border-radius:12px; border:1px solid rgba(212,175,55,0.25);">
              <button id="vTourTabInteractive" onclick="switchTourMode('interactive')" style="background:#D4AF37; color:#06090D; border:none; padding:0.45rem 1rem; border-radius:8px; font-weight:700; font-size:0.82rem; cursor:pointer; display:flex; align-items:center; gap:0.4rem; transition:all 0.2s;">
                <i class="fas fa-street-view"></i> 360° Spatial Pan
              </button>
              <button id="vTourTabVideo" onclick="switchTourMode('video')" style="background:transparent; color:#CBD5E1; border:none; padding:0.45rem 1rem; border-radius:8px; font-weight:700; font-size:0.82rem; cursor:pointer; display:flex; align-items:center; gap:0.4rem; transition:all 0.2s;">
                <i class="fas fa-play-circle"></i> 4K Video Walkthrough
              </button>
            </div>
          </div>

          <!-- Main Interactive Viewport -->
          <div id="vTourInteractiveViewport" style="position:relative; width:100%; height:480px; background:#05070A; border-radius:18px; overflow:hidden; border:1.5px solid rgba(212,175,55,0.4); box-shadow:0 20px 50px rgba(0,0,0,0.95); cursor:grab; user-select:none; touch-action:none;">
            <!-- Continuous 360 Panorama Canvas Strips -->
            <div id="vTourPanoramaTrack" style="position:absolute; top:0; left:0; height:100%; display:flex; width:max-content; will-change:transform; transform:translate3d(0,0,0);">
              <div class="vtour-pano-img" style="height:100%; min-width:1800px; width:1800px; background-size:cover; background-position:center; background-repeat:no-repeat;"></div>
              <div class="vtour-pano-img" style="height:100%; min-width:1800px; width:1800px; background-size:cover; background-position:center; background-repeat:no-repeat;"></div>
              <div class="vtour-pano-img" style="height:100%; min-width:1800px; width:1800px; background-size:cover; background-position:center; background-repeat:no-repeat;"></div>
            </div>

            <!-- Soft Vignette & Atmospheric Shadows -->
            <div style="position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse at center, transparent 55%, rgba(4,6,9,0.7) 100%), linear-gradient(180deg, rgba(4,6,9,0.4) 0%, transparent 20%, transparent 80%, rgba(4,6,9,0.7) 100%);"></div>
            
            <!-- 360 Drag Guide Overlay -->
            <div id="vTourDragHint" style="position:absolute; top:1.2rem; left:50%; transform:translateX(-50%); background:rgba(6,9,13,0.85); backdrop-filter:blur(12px); border:1px solid rgba(212,175,55,0.45); color:#FFDF73; padding:0.45rem 1.4rem; border-radius:99px; font-size:0.84rem; font-weight:700; display:flex; align-items:center; gap:0.6rem; pointer-events:none; transition:opacity 0.6s; box-shadow:0 10px 25px rgba(0,0,0,0.6);">
              <i class="fas fa-arrows-alt-h" style="animation:pulse 1.5s infinite; color:#FFDF73;"></i> Drag with mouse or swipe to rotate 360°
            </div>

            <!-- Compass Widget -->
            <div style="position:absolute; top:1.2rem; right:1.2rem; background:rgba(6,9,13,0.82); backdrop-filter:blur(12px); border:1.5px solid rgba(212,175,55,0.5); width:52px; height:52px; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFDF73; font-weight:800; font-size:0.75rem; box-shadow:0 8px 25px rgba(0,0,0,0.8);">
              <i class="fas fa-compass" id="vTourCompassIcon" style="font-size:1.6rem; color:#FFDF73; transform:rotate(0deg); transition:transform 0.05s linear;"></i>
              <span style="font-size:0.65rem; color:#CBD5E1; letter-spacing:0.5px;">360°</span>
            </div>

            <!-- On-Screen Pan Controls -->
            <div style="position:absolute; bottom:1.2rem; left:50%; transform:translateX(-50%); display:flex; align-items:center; gap:0.85rem; background:rgba(6,9,13,0.88); backdrop-filter:blur(16px); border:1.5px solid rgba(212,175,55,0.45); padding:0.5rem 1.4rem; border-radius:99px; box-shadow:0 10px 35px rgba(0,0,0,0.9);">
              <button onclick="panTourStep(-160)" aria-label="Rotate Left" title="Rotate Left" style="background:rgba(212,175,55,0.18); border:1px solid rgba(212,175,55,0.4); color:#FFDF73; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><i class="fas fa-chevron-left"></i></button>
              
              <button id="vTourAutoSpinBtn" onclick="toggleTourAutoSpin()" style="background:linear-gradient(135deg,rgba(212,175,55,0.3),rgba(212,175,55,0.15)); border:1px solid rgba(212,175,55,0.5); color:#FFFFFF; padding:0.45rem 1.15rem; border-radius:99px; cursor:pointer; font-size:0.82rem; font-weight:700; display:flex; align-items:center; gap:0.5rem; transition:all 0.2s;">
                <i class="fas fa-sync-alt" id="vTourSpinIcon" style="color:#FFDF73;"></i> <span id="vTourSpinLabel">Auto Rotating</span>
              </button>
              
              <button onclick="panTourStep(160)" aria-label="Rotate Right" title="Rotate Right" style="background:rgba(212,175,55,0.18); border:1px solid rgba(212,175,55,0.4); color:#FFDF73; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><i class="fas fa-chevron-right"></i></button>
              
              <button onclick="resetTourView()" aria-label="Reset View" title="Reset View" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.25); color:#CBD5E1; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><i class="fas fa-undo"></i></button>
            </div>
          </div>

          <!-- AI Cinematic Video Walkthrough Viewport -->
          <div id="vTourVideoViewport" style="display:none; position:relative; width:100%; height:480px; background:#000; border-radius:18px; overflow:hidden; border:1.5px solid rgba(212,175,55,0.4); box-shadow:0 20px 50px rgba(0,0,0,0.95);">
            <!-- Canvas Simulation / Seamless AI Drone Pan Screen -->
            <div id="vTourAiScreen" style="position:absolute; inset:0; background-size:cover; background-position:center; transition:opacity 1.2s ease-in-out, transform 8s ease-out; will-change:transform, opacity;"></div>
            
            <!-- Cinematic AI Lighting & Lens Flare Vignette -->
            <div style="position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse at center, transparent 40%, rgba(3,5,8,0.7) 100%), linear-gradient(180deg, rgba(3,5,8,0.6) 0%, transparent 20%, transparent 75%, rgba(3,5,8,0.85) 100%);"></div>

            <!-- Top AI HUD Overlay -->
            <div style="position:absolute; top:1.25rem; left:1.5rem; display:flex; align-items:center; gap:0.75rem; pointer-events:none; z-index:3;">
              <span style="background:rgba(16, 185, 129, 0.2); border:1px solid #10B981; color:#34D399; padding:0.35rem 0.85rem; border-radius:99px; font-size:0.75rem; font-weight:800; letter-spacing:1px; display:inline-flex; align-items:center; gap:0.45rem;">
                <span style="width:7px; height:7px; border-radius:50%; background:#10B981; box-shadow:0 0 10px #10B981; animation:pulse 1.5s infinite;"></span> AI CINEMATIC FLY-THROUGH (8K)
              </span>
              <span id="vTourAiResolutionBadge" style="background:rgba(212,175,55,0.18); border:1px solid rgba(212,175,55,0.4); color:#FFDF73; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.75rem; font-weight:800;">
                PROMPT ENGINE v4.2 &bull; 60 FPS
              </span>
            </div>

            <!-- Current Room Tag HUD -->
            <div id="vTourAiRoomTag" style="position:absolute; bottom:4.5rem; left:1.5rem; z-index:3; pointer-events:none;">
              <span style="font-size:0.72rem; text-transform:uppercase; letter-spacing:1.5px; color:#FFDF73; font-weight:700;">FLIGHT PATH:</span>
              <h3 id="vTourAiRoomName" style="color:#FFFFFF; margin:0.2rem 0 0; font-family:'Cormorant Garamond', Georgia, serif; font-size:1.75rem; text-shadow:0 2px 10px rgba(0,0,0,0.8);">
                Grand Architectural Living Pavilion
              </h3>
            </div>

            <!-- Cinematic Player Controls Bar -->
            <div style="position:absolute; bottom:1rem; left:1.5rem; right:1.5rem; z-index:3; background:rgba(6,9,13,0.85); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border:1px solid rgba(212,175,55,0.35); padding:0.5rem 1.25rem; border-radius:12px; display:flex; align-items:center; justify-content:space-between; gap:1rem;">
              <div style="display:flex; align-items:center; gap:0.85rem;">
                <button id="vTourAiPlayPauseBtn" onclick="toggleAiVideoPlay()" style="background:linear-gradient(135deg,#FFDF73,#D4AF37); border:none; color:#06090D; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.95rem; font-weight:700; transition:all 0.2s;" title="Play / Pause Fly-Through">
                  <i class="fas fa-pause" id="vTourAiPlayIcon"></i>
                </button>
                <button onclick="skipAiVideoScene(-1)" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#CBD5E1; width:32px; height:32px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.8rem;" title="Previous Wing">
                  <i class="fas fa-backward"></i>
                </button>
                <button onclick="skipAiVideoScene(1)" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#CBD5E1; width:32px; height:32px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.8rem;" title="Next Wing">
                  <i class="fas fa-forward"></i>
                </button>
                <span id="vTourAiTimeCode" style="color:#94A3B8; font-size:0.8rem; font-family:monospace; margin-left:0.25rem;">00:04 / 01:20</span>
              </div>

              <!-- Progress Bar -->
              <div style="flex:1; height:4px; background:rgba(255,255,255,0.15); border-radius:99px; overflow:hidden; position:relative; max-width:400px; margin:0 0.5rem;">
                <div id="vTourAiProgress" style="width:25%; height:100%; background:linear-gradient(90deg,#D4AF37,#FFDF73); transition:width 0.3s linear;"></div>
              </div>

              <div style="display:flex; align-items:center; gap:0.6rem;">
                <button onclick="toggleAiVideoAudio()" id="vTourAiAudioBtn" style="background:rgba(212,175,55,0.15); border:1px solid rgba(212,175,55,0.35); color:#FFDF73; padding:0.35rem 0.85rem; border-radius:6px; font-size:0.78rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:0.4rem;">
                  <i class="fas fa-volume-up" id="vTourAiAudioIcon"></i> Ambient On
                </button>
              </div>
            </div>
          </div>

          <!-- Scene Selector Carousel -->
          <div>
            <div style="font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#FFDF73; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem;">
              <i class="fas fa-layer-group"></i> Select 360° Viewing Room / Vantage Point:
            </div>
            <div id="vTourScenePills" style="display:flex; gap:0.65rem; flex-wrap:wrap;"></div>
          </div>

          <!-- Footer Actions & Concierge Booking -->
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:1rem; border-top:1px solid rgba(212,175,55,0.2); flex-wrap:wrap; gap:1rem;">
            <p style="color:#94A3B8; font-size:0.86rem; margin:0; display:flex; align-items:center; gap:0.5rem;">
              <i class="fas fa-headset" style="color:#FFDF73; font-size:1.1rem;"></i> Want a live 1-on-1 private walkthrough with our Senior Architect?
            </p>
            <div style="display:flex; gap:0.75rem;">
              <button onclick="closeVirtualTourModal()" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); color:#CBD5E1; padding:0.65rem 1.25rem; border-radius:8px; font-weight:600; cursor:pointer;">
                Exit Tour
              </button>
              <button onclick="openWhatsAppConcierge('Hi Prime Properties, I explored the 360° virtual tour and want to schedule a live guided Zoom/WhatsApp walkthrough with an architectural specialist.')" style="background:linear-gradient(135deg,#25D366,#128C7E); border:none; color:#FFFFFF; padding:0.65rem 1.5rem; border-radius:8px; font-weight:700; font-size:0.9rem; cursor:pointer; display:inline-flex; align-items:center; gap:0.5rem; box-shadow:0 8px 20px rgba(37,211,102,0.35);">
                <i class="fab fa-whatsapp"></i> Book Live VIP Walkthrough
              </button>
            </div>
          </div>

        </div>
      `;
      document.body.appendChild(modal);

      // Setup Continuous Panorama Drag & Mouse interaction
      const stageContainer = document.getElementById('vTourInteractiveViewport');
      
      const onPointerDown = (clientX) => {
        isPanoramaDragging = true;
        panoramaStartX = clientX;
        stageContainer.style.cursor = 'grabbing';
        const hint = document.getElementById('vTourDragHint');
        if (hint) hint.style.opacity = '0';
      };

      const onPointerMove = (clientX) => {
        if (!isPanoramaDragging) return;
        const delta = clientX - panoramaStartX;
        panoramaStartX = clientX;
        currentOffsetPx += delta;
        normalizePanoramaOffset();
      };

      const onPointerUp = () => {
        if (isPanoramaDragging) {
          isPanoramaDragging = false;
          stageContainer.style.cursor = 'grab';
        }
      };

      stageContainer.addEventListener('mousedown', (e) => onPointerDown(e.clientX));
      window.addEventListener('mousemove', (e) => onPointerMove(e.clientX));
      window.addEventListener('mouseup', onPointerUp);

      stageContainer.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) onPointerDown(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) onPointerMove(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchend', onPointerUp);
    }

    if (title) {
      const titleElem = document.getElementById('vTourTitle');
      if (titleElem) titleElem.innerText = title;
    }

    showAiVideoScene(0);

    renderTourScenes();
    loadTourScene(0);

    modal.style.display = 'flex';
    modal.classList.add('active', 'show');
    document.body.style.overflow = 'hidden';

    // Start rotation loop
    isAutoRotating = true;
    startPanoramaEngine();
  };

  const STRIP_WIDTH = 1800; // width of each panorama strip
  let currentOffsetPx = -STRIP_WIDTH / 2;
  let isAutoRotating = true;
  let animFrameId = null;

  function normalizePanoramaOffset() {
    // Keep continuous infinite loop without any jumps
    if (currentOffsetPx < -STRIP_WIDTH) {
      currentOffsetPx += STRIP_WIDTH;
    } else if (currentOffsetPx > 0) {
      currentOffsetPx -= STRIP_WIDTH;
    }

    const track = document.getElementById('vTourPanoramaTrack');
    if (track) {
      track.style.transform = `translate3d(${currentOffsetPx}px, 0, 0)`;
    }

    const compass = document.getElementById('vTourCompassIcon');
    if (compass) {
      const angle = (Math.abs(currentOffsetPx) / STRIP_WIDTH) * 360;
      compass.style.transform = `rotate(${angle % 360}deg)`;
    }
  }

  function panoramaLoop() {
    if (isAutoRotating && !isPanoramaDragging) {
      currentOffsetPx -= 1.2; // Smooth rotation speed
      normalizePanoramaOffset();
    }
    animFrameId = requestAnimationFrame(panoramaLoop);
  }

  function startPanoramaEngine() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    animFrameId = requestAnimationFrame(panoramaLoop);
    updateSpinButtonUI(true);
  }

  function stopPanoramaEngine() {
    isAutoRotating = false;
    updateSpinButtonUI(false);
  }

  function updateSpinButtonUI(active) {
    const label = document.getElementById('vTourSpinLabel');
    const icon = document.getElementById('vTourSpinIcon');
    const btn = document.getElementById('vTourAutoSpinBtn');
    if (!label || !icon || !btn) return;

    if (active) {
      label.innerText = 'Auto Rotating';
      icon.className = 'fas fa-sync-alt fa-spin';
      btn.style.background = 'linear-gradient(135deg,rgba(212,175,55,0.4),rgba(212,175,55,0.2))';
      btn.style.borderColor = '#D4AF37';
    } else {
      label.innerText = 'Resume Rotate';
      icon.className = 'fas fa-play';
      btn.style.background = 'rgba(255,255,255,0.1)';
      btn.style.borderColor = 'rgba(212,175,55,0.3)';
    }
  }

  window.toggleTourAutoSpin = function() {
    isAutoRotating = !isAutoRotating;
    updateSpinButtonUI(isAutoRotating);
  };

  window.panTourStep = function(deltaPx) {
    currentOffsetPx += deltaPx;
    normalizePanoramaOffset();
  };

  window.resetTourView = function() {
    currentOffsetPx = -STRIP_WIDTH / 2;
    normalizePanoramaOffset();
    isAutoRotating = true;
    updateSpinButtonUI(true);
  };

  function renderTourScenes() {
    const container = document.getElementById('vTourScenePills');
    if (!container) return;
    container.innerHTML = TOUR_SCENES.map((scene, idx) => `
      <button onclick="loadTourScene(${idx})" id="vTourSceneBtn_${idx}" style="background:${idx === currentTourSceneIdx ? 'linear-gradient(135deg,#FFDF73,#D4AF37)' : 'rgba(255,255,255,0.06)'}; color:${idx === currentTourSceneIdx ? '#06090D' : '#CBD5E1'}; border:1px solid ${idx === currentTourSceneIdx ? '#D4AF37' : 'rgba(212,175,55,0.2)'}; padding:0.55rem 1.2rem; border-radius:99px; font-weight:700; font-size:0.83rem; cursor:pointer; transition:all 0.25s; display:inline-flex; align-items:center; gap:0.45rem;">
        <i class="fas ${idx === 0 ? 'fa-couch' : idx === 1 ? 'fa-swimming-pool' : idx === 2 ? 'fa-crown' : 'fa-tree'}"></i>
        ${scene.name}
      </button>
    `).join('');
  }

  window.loadTourScene = function(idx) {
    if (idx < 0 || idx >= TOUR_SCENES.length) return;
    currentTourSceneIdx = idx;
    const scene = TOUR_SCENES[idx];
    
    const panoImgs = document.querySelectorAll('.vtour-pano-img');
    panoImgs.forEach(img => {
      img.style.backgroundImage = `url('${scene.image}')`;
    });

    const descElem = document.getElementById('vTourSceneDesc');
    if (descElem) descElem.innerText = scene.desc;
    renderTourScenes();
  };

  // --- AI Cinematic Video Walkthrough Simulation Engine ---
  let aiVideoPlaying = true;
  let aiVideoSceneIdx = 0;
  let aiVideoTimer = null;
  let aiVideoProgressTimer = null;
  let aiVideoElapsedSec = 0;
  const AI_TOTAL_DURATION_SEC = 80; // 1 min 20 sec full cinematic fly-through
  let aiAudioCtx = null;
  let aiAudioNode = null;
  let aiAudioActive = false;

  const AI_CINEMATIC_SCENES = [
    {
      name: "Grand Architectural Living Pavilion",
      image: "/images/ai_walkthrough_living.jpg",
      panTransform: "scale(1.15) translate(-2%, -2%)"
    },
    {
      name: "Cantilevered Infinity Pool & Sunken Fire Lounge",
      image: "/images/ai_walkthrough_pool.jpg",
      panTransform: "scale(1.18) translate(3%, -3%)"
    },
    {
      name: "Penthouse Master Suite & Twilight Sunset Balcony",
      image: "/images/ai_walkthrough_bedroom.jpg",
      panTransform: "scale(1.15) translate(-3%, 2%)"
    },
    {
      name: "Central Glass Atrium & Bioclimatic Zen Reflection",
      image: "/images/hero_luxury_villa.jpg",
      panTransform: "scale(1.18) translate(2%, 3%)"
    }
  ];

  function startAiVideoPlayer() {
    aiVideoPlaying = true;
    updateAiPlayButtonUI(true);
    showAiVideoScene(aiVideoSceneIdx);

    if (aiVideoTimer) clearInterval(aiVideoTimer);
    aiVideoTimer = setInterval(() => {
      if (aiVideoPlaying) {
        aiVideoSceneIdx = (aiVideoSceneIdx + 1) % AI_CINEMATIC_SCENES.length;
        showAiVideoScene(aiVideoSceneIdx);
      }
    }, 7000);

    if (aiVideoProgressTimer) clearInterval(aiVideoProgressTimer);
    aiVideoProgressTimer = setInterval(() => {
      if (aiVideoPlaying) {
        aiVideoElapsedSec = (aiVideoElapsedSec + 1) % AI_TOTAL_DURATION_SEC;
        updateAiVideoHUD();
      }
    }, 1000);
  }

  function stopAiVideoPlayer() {
    aiVideoPlaying = false;
    updateAiPlayButtonUI(false);
    if (aiVideoTimer) clearInterval(aiVideoTimer);
    if (aiVideoProgressTimer) clearInterval(aiVideoProgressTimer);
  }

  function showAiVideoScene(idx) {
    const screen = document.getElementById('vTourAiScreen');
    const roomName = document.getElementById('vTourAiRoomName');
    if (!screen) return;

    const scene = AI_CINEMATIC_SCENES[idx];
    screen.style.opacity = '0.3';

    setTimeout(() => {
      screen.style.backgroundImage = `url('${scene.image}')`;
      screen.style.transform = scene.panTransform;
      screen.style.opacity = '1';
      if (roomName) roomName.innerText = scene.name;
    }, 300);
  }

  function updateAiVideoHUD() {
    const timeCode = document.getElementById('vTourAiTimeCode');
    const progressBar = document.getElementById('vTourAiProgress');
    if (timeCode) {
      const curM = String(Math.floor(aiVideoElapsedSec / 60)).padStart(2, '0');
      const curS = String(aiVideoElapsedSec % 60).padStart(2, '0');
      const totM = String(Math.floor(AI_TOTAL_DURATION_SEC / 60)).padStart(2, '0');
      const totS = String(AI_TOTAL_DURATION_SEC % 60).padStart(2, '0');
      timeCode.innerText = `${curM}:${curS} / ${totM}:${totS}`;
    }
    if (progressBar) {
      const pct = (aiVideoElapsedSec / AI_TOTAL_DURATION_SEC) * 100;
      progressBar.style.width = `${pct}%`;
    }
  }

  function updateAiPlayButtonUI(playing) {
    const icon = document.getElementById('vTourAiPlayIcon');
    if (icon) {
      icon.className = playing ? 'fas fa-pause' : 'fas fa-play';
    }
  }

  window.toggleAiVideoPlay = function() {
    if (aiVideoPlaying) {
      stopAiVideoPlayer();
    } else {
      startAiVideoPlayer();
    }
  };

  window.skipAiVideoScene = function(dir) {
    aiVideoSceneIdx = (aiVideoSceneIdx + dir + AI_CINEMATIC_SCENES.length) % AI_CINEMATIC_SCENES.length;
    showAiVideoScene(aiVideoSceneIdx);
  };

  window.toggleAiVideoAudio = function() {
    const btn = document.getElementById('vTourAiAudioBtn');
    const icon = document.getElementById('vTourAiAudioIcon');
    try {
      if (!aiAudioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        aiAudioCtx = new AudioContext();
      }
      if (!aiAudioActive) {
        // Synthesize smooth ambient harmonic drone (deep calming frequency)
        const osc = aiAudioCtx.createOscillator();
        const gain = aiAudioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, aiAudioCtx.currentTime); // A2 warm harmonic
        gain.gain.setValueAtTime(0.04, aiAudioCtx.currentTime);
        osc.connect(gain);
        gain.connect(aiAudioCtx.destination);
        osc.start();
        aiAudioNode = { osc, gain };
        aiAudioActive = true;
        if (btn) btn.innerHTML = '<i class="fas fa-volume-up"></i> Ambient On';
      } else {
        if (aiAudioNode && aiAudioNode.osc) {
          aiAudioNode.osc.stop();
        }
        aiAudioActive = false;
        if (btn) btn.innerHTML = '<i class="fas fa-volume-mute"></i> Ambient Mute';
      }
    } catch(e) {
      console.warn("Audio toggle prevented or not supported:", e);
    }
  };

  window.switchTourMode = function(mode) {
    const interactive = document.getElementById('vTourInteractiveViewport');
    const video = document.getElementById('vTourVideoViewport');
    const tabInteractive = document.getElementById('vTourTabInteractive');
    const tabVideo = document.getElementById('vTourTabVideo');

    if (mode === 'interactive') {
      interactive.style.display = 'block';
      video.style.display = 'none';
      tabInteractive.style.background = '#D4AF37';
      tabInteractive.style.color = '#06090D';
      tabVideo.style.background = 'transparent';
      tabVideo.style.color = '#CBD5E1';
      isAutoRotating = true;
      startPanoramaEngine();
      stopAiVideoPlayer();
    } else {
      interactive.style.display = 'none';
      video.style.display = 'block';
      tabVideo.style.background = '#D4AF37';
      tabVideo.style.color = '#06090D';
      tabInteractive.style.background = 'transparent';
      tabInteractive.style.color = '#CBD5E1';
      stopPanoramaEngine();
      startAiVideoPlayer();
    }
  };

  window.closeVirtualTourModal = function () {
    const modal = document.getElementById('virtualTourModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active', 'show');
      document.body.style.overflow = '';
      stopPanoramaEngine();
      stopAiVideoPlayer();
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (aiAudioActive && aiAudioNode && aiAudioNode.osc) {
        aiAudioNode.osc.stop();
        aiAudioActive = false;
      }
    }
  };

  // --- Floating Concierge & Controls ---
  function injectFloatingConcierge() {
    if (document.getElementById('primeInternationalFloatingWidget')) return;

    const widget = document.createElement('div');
    widget.id = 'primeInternationalFloatingWidget';
    widget.style.cssText = 'position:fixed; bottom:100px; right:28px; z-index:99999; display:flex; flex-direction:column; align-items:flex-end; gap:12px; font-family:"Manrope",sans-serif;';

    widget.innerHTML = `
      <div id="waQuickPopup" style="display:none; background:#0F141A; border:1px solid rgba(212,175,55,0.4); border-radius:14px; padding:1.25rem 1.5rem; box-shadow:0 20px 45px rgba(0,0,0,0.85); width:320px; color:#fff; animation:fadeInUp 0.3s ease; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <div style="width:10px; height:10px; border-radius:50%; background:#10B981; box-shadow:0 0 8px #10B981;"></div>
            <strong style="font-size:0.92rem; color:#FFDF73;">Global Client Desk</strong>
          </div>
          <button onclick="document.getElementById('waQuickPopup').style.display='none'" style="background:none; border:none; color:#94A3B8; font-size:1.1rem; cursor:pointer;">&times;</button>
        </div>
        <p style="font-size:0.83rem; color:#CBD5E1 !important; line-height:1.5; margin-bottom:1rem;">
          Connecting from abroad? Our multi-lingual overseas advisors provide instant guidance on legal compliance, repatriation, &amp; virtual tours.
        </p>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          <button onclick="openWhatsAppConcierge()" style="background:#25D366; color:#0B1914; border:none; border-radius:8px; padding:0.65rem 1rem; font-weight:700; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:0.5rem; transition:transform 0.2s;">
            <i class="fab fa-whatsapp" style="font-size:1.1rem;"></i> Chat on WhatsApp
          </button>
          <a href="/foreign-investors" style="text-align:center; color:#FFDF73; font-size:0.8rem; text-decoration:underline; padding-top:4px;">
            <i class="fas fa-book-open"></i> Foreign Buyer FAQ &amp; Legal Matrix &rarr;
          </a>
        </div>
      </div>

      <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:flex-end;">
        <!-- WhatsApp Floating Trigger with Badge & Pulsing Effect -->
        <button id="waTriggerBtn" onclick="const p = document.getElementById('waQuickPopup'); p.style.display = p.style.display === 'none' ? 'block' : 'none';" aria-label="International WhatsApp Support" title="Chat on WhatsApp" style="width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,#25D366,#128C7E); border:2px solid #FFFFFF; color:#fff; font-size:1.75rem; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 12px 30px rgba(37,211,102,0.6); transition:transform 0.3s ease, box-shadow 0.3s ease;">
          <i class="fab fa-whatsapp"></i>
        </button>
      </div>
    `;

    document.body.appendChild(widget);
  }

  // --- Top Bar Language & Currency Enhancer ---
  function enhanceTopBars() {
    const topBarRights = document.querySelectorAll('.top-bar-right');
    topBarRights.forEach(bar => {
      if (bar.querySelector('.top-international-strip')) return;

      const widget = document.createElement('div');
      widget.className = 'top-bar-item top-international-strip';
      widget.style.cssText = 'display:inline-flex; align-items:center; gap:0.35rem;';
      widget.innerHTML = `
        <!-- Top Language Selector -->
        <div class="top-select-pill" style="background:#1B251A; padding:0.1rem 0.35rem; border-radius:4px; border:1px solid rgba(194,139,82,0.45); display:inline-flex; align-items:center; gap:0.25rem;">
          <i class="fas fa-globe" style="color:#E6B87D; font-size:0.62rem;"></i>
          <select class="language-select-ctrl" onchange="window.changeLanguage(this.value)" style="background:#1B251A; border:none; color:#F6E7B0; font-weight:700; font-size:0.64rem; cursor:pointer; outline:none; padding:0; margin:0;">
            <option value="en" ${currentLanguage === 'en' ? 'selected' : ''} style="background:#1B251A; color:#fff;">EN</option>
            <option value="ar" ${currentLanguage === 'ar' ? 'selected' : ''} style="background:#1B251A; color:#fff;">العربية</option>
            <option value="fr" ${currentLanguage === 'fr' ? 'selected' : ''} style="background:#1B251A; color:#fff;">FR</option>
            <option value="es" ${currentLanguage === 'es' ? 'selected' : ''} style="background:#1B251A; color:#fff;">ES</option>
            <option value="de" ${currentLanguage === 'de' ? 'selected' : ''} style="background:#1B251A; color:#fff;">DE</option>
            <option value="zh" ${currentLanguage === 'zh' ? 'selected' : ''} style="background:#1B251A; color:#fff;">中文</option>
          </select>
        </div>

        <!-- Top Currency Selector -->
        <div class="top-select-pill" style="background:#1B251A; padding:0.1rem 0.35rem; border-radius:4px; border:1px solid rgba(194,139,82,0.45); display:inline-flex; align-items:center; gap:0.25rem;">
          <i class="fas fa-coins" style="color:#E6B87D; font-size:0.62rem;"></i>
          <select class="currency-select-ctrl" onchange="window.updateAllPriceDisplays(this.value)" style="background:#1B251A; border:none; color:#F6E7B0; font-weight:700; font-size:0.64rem; cursor:pointer; outline:none; padding:0; margin:0;">
            <option value="USD" ${currentCurrency === 'USD' ? 'selected' : ''} style="background:#1B251A; color:#fff;">USD ($)</option>
            <option value="AED" ${currentCurrency === 'AED' ? 'selected' : ''} style="background:#1B251A; color:#fff;">AED (د.إ)</option>
            <option value="EUR" ${currentCurrency === 'EUR' ? 'selected' : ''} style="background:#1B251A; color:#fff;">EUR (€)</option>
            <option value="GBP" ${currentCurrency === 'GBP' ? 'selected' : ''} style="background:#1B251A; color:#fff;">GBP (£)</option>
            <option value="SGD" ${currentCurrency === 'SGD' ? 'selected' : ''} style="background:#1B251A; color:#fff;">SGD (S$)</option>
            <option value="INR" ${currentCurrency === 'INR' ? 'selected' : ''} style="background:#1B251A; color:#fff;">INR (₹)</option>
          </select>
        </div>
      `;

      const oldBadge = bar.querySelector('.currency-badge') || bar.querySelector('.top-currency-widget');
      if (oldBadge) {
        bar.replaceChild(widget, oldBadge.parentElement || oldBadge);
      } else {
        bar.appendChild(widget);
      }
    });

    // Add "Foreign Buyers" link to main navigation
    const navUlList = document.querySelectorAll('.nav-links');
    navUlList.forEach(ul => {
      if (!ul.querySelector('a[href="/foreign-investors"]')) {
        const li = document.createElement('li');
        li.innerHTML = `
          <a href="/foreign-investors" class="nav-link" style="color: #FFDF73; font-weight: 700; display:inline-flex; align-items:center; gap:0.4rem;">
            <i class="fas fa-passport" style="font-size:0.85rem;"></i> Foreign Buyers
          </a>
        `;
        const propLink = ul.querySelector('a[href="/property"]');
        if (propLink && propLink.parentElement) {
          propLink.parentElement.insertAdjacentElement('afterend', li);
        } else {
          ul.appendChild(li);
        }
      }
    });
  }

  // --- Foreign Buyer Modal Questionnaire Toggle Handler ---
  window.setForeignBuyerMode = function (isForeign, prefix = '') {
    const yesId = prefix ? prefix + 'IsForeignerYes' : 'isForeignerYes';
    const noId = prefix ? prefix + 'IsForeignerNo' : 'isForeignerNo';
    const containerId = prefix ? prefix + 'ForeignFieldsContainer' : 'foreignFieldsContainer';

    const yesBtn = document.getElementById(yesId);
    const noBtn = document.getElementById(noId);
    const container = document.getElementById(containerId);

    if (yesBtn && noBtn) {
      if (isForeign) {
        yesBtn.classList.add('is-active');
        noBtn.classList.remove('is-active');
        yesBtn.style.background = '';
        yesBtn.style.color = '';
        noBtn.style.background = '';
        noBtn.style.color = '';

        if (container) {
          container.style.display = 'block';
          container.style.animation = 'fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      } else {
        noBtn.classList.add('is-active');
        yesBtn.classList.remove('is-active');
        yesBtn.style.background = '';
        yesBtn.style.color = '';
        noBtn.style.background = '';
        noBtn.style.color = '';

        if (container) {
          container.style.display = 'none';
        }
      }
    }
  };
  // --- Foreign Buyer Questionnaire Yes/No Option Toggler ---
  window.toggleQuizOption = function (btn, questionKey, answer) {
    const parent = btn.closest('.foreign-quiz-options');
    if (parent) {
      parent.querySelectorAll('.foreign-quiz-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const hiddenInput = document.getElementById('quiz_' + questionKey);
      if (hiddenInput) {
        hiddenInput.value = answer;
      }
    }
  };

  // --- Initialize ---
  document.addEventListener('DOMContentLoaded', () => {
    enhanceTopBars();
    injectFloatingConcierge();
    window.updateAllPriceDisplays(currentCurrency);
    window.changeLanguage(currentLanguage);

    setTimeout(() => {
      window.updateAllPriceDisplays(currentCurrency);
    }, 1500);
  });

})();
