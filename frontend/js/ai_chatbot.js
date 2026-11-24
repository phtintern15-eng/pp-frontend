/**
 * Prime Properties Luxury AI Concierge Chatbot
 * Floating interactive chatbot with quick responses, SR valuation lookup,
 * NRI compliance assistance, virtual tour launcher, and WhatsApp escalation.
 */

(function () {
  'use strict';

  let chatOpen = false;
  let chatHistory = [];
  let isSending = false;

  const INITIAL_MESSAGE = `Greetings. I am your **Prime Properties AI Concierge**. 

I can assist you with:
• **Curated Estates**: Villas, penthouses & off-market acquisitions.
• **Karnataka SR Guidance Rates**: Real-time statutory circle rates across 31 districts.
• **Foreign / NRI Compliance**: Remote Consular POA & FEMA regulations.
• **AI 4K/8K Walkthroughs**: Instant digital twin fly-throughs.

How may I assist your portfolio today?`;

  const SUGGESTED_CHIPS = [
    { label: "🏰 Available Villas", text: "Show me luxury villas available for sale" },
    { label: "🏛️ Karnataka SR Valuation", text: "What is the SR guidance value and stamp duty in Karnataka?" },
    { label: "🌍 Foreign Buyer / NRI Guide", text: "How can NRIs and foreign citizens buy property remotely?" },
    { label: "🎥 4K Virtual Walkthrough", text: "Can I watch an AI 4K video walkthrough of your properties?" }
  ];

  function injectChatbot() {
    if (document.getElementById('primeAiChatbotWidget')) return;

    // Chatbot Styles
    const style = document.createElement('style');
    style.id = 'primeChatbotStyles';
    style.textContent = `
      #primeAiChatbotWidget {
        position: fixed;
        bottom: 26px;
        right: 26px;
        z-index: 99999;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .chatbot-fab {
        width: 62px;
        height: 62px;
        border-radius: 50%;
        background: linear-gradient(135deg, #18222E 0%, #080C10 100%);
        border: 2px solid #D4AF37;
        color: #FFDF73;
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.75), 0 0 25px rgba(212, 175, 55, 0.35);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        outline: none;
      }

      .chatbot-fab:hover {
        transform: scale(1.08) translateY(-3px);
        box-shadow: 0 18px 45px rgba(0, 0, 0, 0.85), 0 0 35px rgba(212, 175, 55, 0.55);
        border-color: #FFDF73;
      }

      .chatbot-fab-badge {
        position: absolute;
        top: -3px;
        right: -3px;
        width: 16px;
        height: 16px;
        background: #10B981;
        border: 2px solid #080C10;
        border-radius: 50%;
        box-shadow: 0 0 10px #10B981;
      }

      .chatbot-window {
        position: fixed;
        bottom: 95px;
        right: 26px;
        width: 390px;
        max-width: calc(100vw - 32px);
        height: 580px;
        max-height: calc(100vh - 120px);
        background: linear-gradient(165deg, #111720 0%, #090D12 100%);
        border: 1.5px solid rgba(212, 175, 55, 0.45);
        border-radius: 20px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.2);
        display: none;
        flex-direction: column;
        overflow: hidden;
        z-index: 999999;
        animation: chatSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes chatSlideUp {
        from { opacity: 0; transform: translateY(20px) scale(0.96); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .chatbot-header {
        background: linear-gradient(135deg, rgba(24, 34, 46, 0.95), rgba(12, 18, 24, 0.98));
        padding: 1rem 1.25rem;
        border-bottom: 1px solid rgba(212, 175, 55, 0.25);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chatbot-header-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .chatbot-avatar {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: linear-gradient(135deg, #D4AF37, #996515);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #06090D;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
      }

      #primeAiChatbotWidget .chatbot-header-text h4,
      body #primeAiChatbotWidget .chatbot-header-text h4,
      body:not(.dark-dashboard) #primeAiChatbotWidget .chatbot-header-text h4,
      .chatbot-header-text h4 {
        margin: 0 !important;
        font-size: 0.95rem !important;
        color: #FFFFFF !important;
        font-weight: 700 !important;
        letter-spacing: 0.3px !important;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7) !important;
      }

      #primeAiChatbotWidget .chatbot-header-text span,
      body #primeAiChatbotWidget .chatbot-header-text span,
      body:not(.dark-dashboard) #primeAiChatbotWidget .chatbot-header-text span,
      .chatbot-header-text span {
        font-size: 0.75rem !important;
        color: #34D399 !important;
        display: flex !important;
        align-items: center !important;
        gap: 0.35rem !important;
        font-weight: 600 !important;
      }

      .chatbot-close-btn {
        background: rgba(255, 255, 255, 0.08) !important;
        border: 1px solid rgba(212, 175, 55, 0.3) !important;
        color: #F1F5F9 !important;
        width: 32px !important;
        height: 32px !important;
        border-radius: 8px !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 1.1rem !important;
        transition: all 0.2s !important;
      }

      .chatbot-close-btn:hover {
        background: rgba(212, 175, 55, 0.25) !important;
        color: #FFDF73 !important;
        border-color: #D4AF37 !important;
      }

      .chatbot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        background: #0B1015 !important;
        scrollbar-width: thin;
        scrollbar-color: rgba(212, 175, 55, 0.3) transparent;
      }

      .chat-msg {
        display: flex;
        flex-direction: column;
        max-width: 86%;
        animation: fadeIn 0.3s ease;
      }

      .chat-msg.bot {
        align-self: flex-start;
      }

      .chat-msg.user {
        align-self: flex-end;
      }

      .chat-bubble {
        padding: 0.8rem 1rem;
        border-radius: 14px;
        font-size: 0.88rem;
        line-height: 1.5;
        word-break: break-word;
      }

      #primeAiChatbotWidget .chat-msg.bot .chat-bubble,
      body #primeAiChatbotWidget .chat-msg.bot .chat-bubble,
      body:not(.dark-dashboard) #primeAiChatbotWidget .chat-msg.bot .chat-bubble,
      .chat-msg.bot .chat-bubble {
        background: #151F2B !important;
        border: 1px solid rgba(212, 175, 55, 0.35) !important;
        color: #F8FAFC !important;
        border-top-left-radius: 4px !important;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45) !important;
      }

      #primeAiChatbotWidget .chat-msg.user .chat-bubble,
      body #primeAiChatbotWidget .chat-msg.user .chat-bubble,
      body:not(.dark-dashboard) #primeAiChatbotWidget .chat-msg.user .chat-bubble,
      .chat-msg.user .chat-bubble {
        background: linear-gradient(135deg, #C28B52 0%, #9C6C38 100%) !important;
        color: #FFFFFF !important;
        font-weight: 600 !important;
        border-top-right-radius: 4px !important;
        box-shadow: 0 4px 15px rgba(194, 139, 82, 0.35) !important;
      }

      #primeAiChatbotWidget .chat-msg.bot .chat-bubble p,
      #primeAiChatbotWidget .chat-bubble p,
      body #primeAiChatbotWidget .chat-bubble p,
      body #primeAiChatbotWidget .chat-msg.bot .chat-bubble p,
      body:not(.dark-dashboard) #primeAiChatbotWidget .chat-bubble p,
      body:not(.dark-dashboard) #primeAiChatbotWidget .chat-msg.bot .chat-bubble p,
      .chat-msg.bot .chat-bubble p,
      .chat-bubble p {
        margin: 0 0 0.5rem 0 !important;
        color: #F8FAFC !important;
        font-size: 0.88rem !important;
        line-height: 1.55 !important;
        font-weight: 400 !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
      }

      #primeAiChatbotWidget .chat-bubble p:last-child,
      body #primeAiChatbotWidget .chat-bubble p:last-child,
      .chat-bubble p:last-child {
        margin-bottom: 0 !important;
      }

      #primeAiChatbotWidget .chat-msg.user .chat-bubble p,
      body #primeAiChatbotWidget .chat-msg.user .chat-bubble p,
      body:not(.dark-dashboard) #primeAiChatbotWidget .chat-msg.user .chat-bubble p,
      .chat-msg.user .chat-bubble p {
        color: #FFFFFF !important;
        font-weight: 600 !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) !important;
      }

      #primeAiChatbotWidget .chat-bubble strong,
      body #primeAiChatbotWidget .chat-bubble strong,
      body:not(.dark-dashboard) #primeAiChatbotWidget .chat-bubble strong,
      .chat-bubble strong {
        color: #FFDF73 !important;
        font-weight: 700 !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6) !important;
      }

      #primeAiChatbotWidget .chat-msg.user .chat-bubble strong,
      body #primeAiChatbotWidget .chat-msg.user .chat-bubble strong,
      .chat-msg.user .chat-bubble strong {
        color: #FFFFFF !important;
      }

      #primeAiChatbotWidget .chat-bubble em,
      body #primeAiChatbotWidget .chat-bubble em,
      body:not(.dark-dashboard) #primeAiChatbotWidget .chat-bubble em,
      .chat-bubble em {
        color: #CBD5E1 !important;
        font-style: italic !important;
      }

      .chat-bubble a {
        color: #FFDF73 !important;
        text-decoration: underline !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        transition: color 0.2s ease !important;
      }

      .chat-bubble a:hover {
        color: #FFFFFF !important;
      }

      .chat-code {
        background: rgba(212, 175, 55, 0.15) !important;
        border: 1px solid rgba(212, 175, 55, 0.35) !important;
        color: #FFDF73 !important;
        padding: 0.15rem 0.45rem !important;
        border-radius: 6px !important;
        font-family: monospace !important;
        font-size: 0.88em !important;
        word-break: break-all !important;
      }

      .chat-quick-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
        margin-top: 0.6rem;
      }

      .chat-action-btn {
        background: rgba(212, 175, 55, 0.16) !important;
        border: 1px solid rgba(212, 175, 55, 0.45) !important;
        color: #FFDF73 !important;
        padding: 0.45rem 0.85rem !important;
        border-radius: 99px !important;
        font-size: 0.8rem !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        transition: all 0.2s !important;
        text-decoration: none !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 0.35rem !important;
      }

      .chat-action-btn:hover {
        background: #C28B52 !important;
        color: #06090D !important;
        border-color: #FFDF73 !important;
        transform: translateY(-1px) !important;
      }

      .chat-suggestions {
        padding: 0.6rem 1rem;
        background: #090E14 !important;
        border-top: 1px solid rgba(212, 175, 55, 0.2) !important;
        display: flex;
        gap: 0.45rem;
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none;
      }

      .chat-suggestions::-webkit-scrollbar {
        display: none;
      }

      .suggestion-chip {
        background: rgba(255, 255, 255, 0.08) !important;
        border: 1px solid rgba(212, 175, 55, 0.35) !important;
        color: #E2E8F0 !important;
        padding: 0.4rem 0.85rem !important;
        border-radius: 99px !important;
        font-size: 0.78rem !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        transition: all 0.2s !important;
        flex-shrink: 0;
      }

      .suggestion-chip:hover {
        background: rgba(212, 175, 55, 0.25) !important;
        color: #FFDF73 !important;
        border-color: #FFDF73 !important;
      }

      .chatbot-input-bar {
        padding: 0.75rem 1rem;
        background: #070B0E !important;
        border-top: 1px solid rgba(212, 175, 55, 0.25) !important;
        display: flex;
        gap: 0.6rem;
        align-items: center;
      }

      .chatbot-input {
        flex: 1;
        background: #111822 !important;
        background-color: #111822 !important;
        border: 1.5px solid rgba(212, 175, 55, 0.4) !important;
        border-radius: 12px !important;
        padding: 0.7rem 0.95rem !important;
        color: #FFFFFF !important;
        font-size: 0.9rem !important;
        outline: none !important;
        transition: all 0.2s;
        box-sizing: border-box !important;
      }

      .chatbot-input:focus {
        border-color: #FFDF73 !important;
        box-shadow: 0 0 12px rgba(212, 175, 55, 0.3) !important;
        background: #0D131B !important;
        background-color: #0D131B !important;
      }

      .chatbot-input::placeholder {
        color: #8C99A8 !important;
        opacity: 1 !important;
      }

      .chatbot-send-btn {
        background: linear-gradient(135deg, #C28B52 0%, #9C6C38 100%) !important;
        border: none !important;
        color: #FFFFFF !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 10px !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 0.95rem !important;
        transition: all 0.2s !important;
        flex-shrink: 0;
        box-shadow: 0 4px 12px rgba(156, 108, 56, 0.3) !important;
      }

      .chatbot-send-btn:hover {
        background: linear-gradient(135deg, #D49B60 0%, #AD7740 100%) !important;
        transform: scale(1.05) !important;
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.4) !important;
      }

      .typing-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 0.6rem 0.9rem;
        background: #161F2A;
        border-radius: 12px;
        width: fit-content;
        border: 1px solid rgba(212, 175, 55, 0.2);
      }

      .typing-dot {
        width: 6px;
        height: 6px;
        background: #FFDF73;
        border-radius: 50%;
        animation: typingBlink 1.4s infinite both;
      }

      .typing-dot:nth-child(2) { animation-delay: 0.2s; }
      .typing-dot:nth-child(3) { animation-delay: 0.4s; }

      @keyframes typingBlink {
        0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
        40% { opacity: 1; transform: scale(1.1); }
      }
    `;
    document.head.appendChild(style);

    // Chatbot HTML Structure
    const container = document.createElement('div');
    container.id = 'primeAiChatbotWidget';
    container.innerHTML = `
      <!-- Floating Trigger Button -->
      <button class="chatbot-fab" id="chatbotToggleBtn" aria-label="Open AI Concierge Chatbot" title="Chat with AI Concierge">
        <i class="fas fa-robot" style="font-size: 1.6rem;"></i>
        <div class="chatbot-fab-badge"></div>
      </button>

      <!-- Chat Window -->
      <div class="chatbot-window" id="chatbotWindow">
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">
              <i class="fas fa-crown"></i>
            </div>
            <div class="chatbot-header-text">
              <h4>Prime AI Concierge</h4>
              <span><i class="fas fa-circle" style="font-size: 0.5rem;"></i> Active &bull; Kaveri 2.0 &amp; Estates</span>
            </div>
          </div>
          <button class="chatbot-close-btn" id="chatbotCloseBtn" aria-label="Close Chat">&times;</button>
        </div>

        <div class="chatbot-messages" id="chatbotMessages">
          <!-- Messages will be dynamically rendered here -->
        </div>

        <!-- Quick Suggestion Chips -->
        <div class="chat-suggestions" id="chatbotSuggestions">
          ${SUGGESTED_CHIPS.map(chip => `
            <button class="suggestion-chip" data-msg="${chip.text.replace(/"/g, '&quot;')}">${chip.label}</button>
          `).join('')}
        </div>

        <!-- Input Bar -->
        <form class="chatbot-input-bar" id="chatbotForm">
          <input type="text" id="chatbotInput" class="chatbot-input" placeholder="Ask about SR rates, villas, or NRI rules..." autocomplete="off">
          <button type="submit" class="chatbot-send-btn" aria-label="Send Message">
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(container);

    // Event Listeners
    const toggleBtn = document.getElementById('chatbotToggleBtn');
    const closeBtn = document.getElementById('chatbotCloseBtn');
    const chatWindow = document.getElementById('chatbotWindow');
    const chatForm = document.getElementById('chatbotForm');
    const chatInput = document.getElementById('chatbotInput');
    const suggestionsContainer = document.getElementById('chatbotSuggestions');
    const msgContainer = document.getElementById('chatbotMessages');

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text || isSending) return;
      chatInput.value = '';
      sendUserMessage(text);
    });

    suggestionsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.suggestion-chip');
      if (!btn) return;
      const text = btn.getAttribute('data-msg');
      if (text) sendUserMessage(text);
    });

    // Delegated click handler for quick action buttons and markdown links
    msgContainer.addEventListener('click', (e) => {
      // 1. Virtual Tour action button
      const tourBtn = e.target.closest('.chat-tour-btn');
      if (tourBtn) {
        e.preventDefault();
        const rawTitle = tourBtn.getAttribute('data-title') || '';
        const title = rawTitle ? decodeURIComponent(rawTitle) : 'The Bel-Air Glass Pavilion';
        if (typeof window.openVirtualTourModal === 'function') {
          window.openVirtualTourModal(title);
        } else {
          window.location.href = '/foreign-investors';
        }
        return;
      }

      // 2. WhatsApp action button
      const waBtn = e.target.closest('.chat-wa-btn');
      if (waBtn) {
        e.preventDefault();
        const rawText = waBtn.getAttribute('data-text') || '';
        const text = rawText ? decodeURIComponent(rawText) : 'Hello Prime Concierge, I would like to inquire about properties.';
        if (typeof window.openWhatsAppConcierge === 'function') {
          window.openWhatsAppConcierge(text);
        } else {
          const phone = '918045678900';
          const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
          window.open(url, '_blank');
        }
        return;
      }

      // 3. Navigation link or markdown link click
      const link = e.target.closest('.chat-inline-link, .chat-nav-link');
      if (link) {
        const href = link.getAttribute('data-url') || link.getAttribute('href');
        if (!href) return;

        // If it's a hash on the current page
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetEl = document.querySelector(href);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
            toggleChat(); // Minimize chat to reveal target
          }
        } else if (href.includes('#')) {
          const parts = href.split('#');
          const path = parts[0];
          const hash = parts[1];
          const curPath = window.location.pathname;
          if (path === curPath || (path === '/' && (curPath === '' || curPath === '/index.html'))) {
            e.preventDefault();
            const targetEl = document.getElementById(hash);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
              toggleChat(); // Minimize chat to reveal target
            } else {
              window.location.href = href;
            }
          }
        }
      }
    });

    // Seed Initial Welcome Message
    appendMessage('bot', INITIAL_MESSAGE, [
      { label: "🏛️ Check SR Value", action: "navigate", url: "/investment-dashboard#sr-valuation-tool" },
      { label: "🏰 Explore Estates", action: "navigate", url: "/property" },
      { label: "🎥 360° VR Tour", action: "launch_tour", title: "Bel-Air Architectural Trophy Estate" }
    ]);
  }

  function toggleChat() {
    chatOpen = !chatOpen;
    const chatWindow = document.getElementById('chatbotWindow');
    const toggleBtn = document.getElementById('chatbotToggleBtn');
    if (!chatWindow) return;

    if (chatOpen) {
      chatWindow.style.display = 'flex';
      toggleBtn.innerHTML = '<i class="fas fa-times" style="font-size: 1.5rem;"></i>';
      setTimeout(() => document.getElementById('chatbotInput')?.focus(), 200);
      scrollToBottom();
    } else {
      chatWindow.style.display = 'none';
      toggleBtn.innerHTML = '<i class="fas fa-robot" style="font-size: 1.6rem;"></i><div class="chatbot-fab-badge"></div>';
    }
  }

  function formatMarkdown(text) {
    if (!text) return '';
    // Escape angle brackets to prevent broken layout or injection
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Inline code spans: `...`
    safe = safe.replace(/`([^`]+)`/g, '<code class="chat-code">$1</code>');

    // Bold text: **...**
    safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic text: *...*
    safe = safe.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g, '$1<em>$2</em>$3');

    // Markdown links: [Label](url)
    safe = safe.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="chat-inline-link" data-url="$2">$1</a>');

    // Split into paragraphs by 2 or more newlines
    const paragraphs = safe.split(/\n\n+/);
    return paragraphs.map(p => {
      const cleanP = p.trim();
      if (!cleanP) return '';
      return `<p style="color: #F8FAFC !important; margin: 0 0 0.5rem 0 !important; font-size: 0.88rem !important; line-height: 1.55 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.4) !important;">${cleanP.replace(/\n/g, '<br>')}</p>`;
    }).filter(Boolean).join('');
  }

  function appendMessage(sender, text, quickActions = []) {
    const msgContainer = document.getElementById('chatbotMessages');
    if (!msgContainer) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    let actionsHtml = '';
    if (quickActions && quickActions.length > 0) {
      actionsHtml = `
        <div class="chat-quick-actions">
          ${quickActions.map(act => {
            if (act.action === 'navigate') {
              return `<a href="${act.url}" class="chat-action-btn chat-nav-link" data-url="${act.url}">${act.label} &rarr;</a>`;
            } else if (act.action === 'launch_tour') {
              const tourTitle = encodeURIComponent(act.title || 'The Bel-Air Glass Pavilion');
              return `<button type="button" class="chat-action-btn chat-tour-btn" data-title="${tourTitle}">${act.label}</button>`;
            } else if (act.action === 'whatsapp') {
              const waText = encodeURIComponent(act.text || 'Hello Prime Concierge, I would like to inquire about properties.');
              return `<button type="button" class="chat-action-btn chat-wa-btn" data-text="${waText}"><i class="fab fa-whatsapp"></i> ${act.label}</button>`;
            } else if (act.action === 'search') {
              const q = encodeURIComponent(act.query || '');
              return `<a href="/property?search=${q}&location=${q}" class="chat-action-btn chat-search-link" data-query="${q}">${act.label}</a>`;
            }
            return '';
          }).join('')}
        </div>
      `;
    }

    const formattedContent = sender === 'user' 
      ? `<p style="color: #FFFFFF !important; font-weight: 600 !important; margin: 0 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.4) !important;">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</p>`
      : formatMarkdown(text);

    msgDiv.innerHTML = `
      <div class="chat-bubble">
        ${formattedContent}
        ${actionsHtml}
      </div>
    `;

    msgContainer.appendChild(msgDiv);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const msgContainer = document.getElementById('chatbotMessages');
    if (!msgContainer) return;
    const typing = document.createElement('div');
    typing.id = 'chatTypingIndicator';
    typing.className = 'chat-msg bot';
    typing.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    msgContainer.appendChild(typing);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const typing = document.getElementById('chatTypingIndicator');
    if (typing) typing.remove();
  }

  function scrollToBottom() {
    const msgContainer = document.getElementById('chatbotMessages');
    if (msgContainer) {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  }

  async function sendUserMessage(text) {
    appendMessage('user', text);
    chatHistory.push({ role: 'user', content: text });
    isSending = true;
    showTypingIndicator();

    try {
      const response = await fetch('/api/ai-concierge-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversation_history: chatHistory.slice(-6)
        })
      });

      removeTypingIndicator();

      if (response.ok) {
        const data = await response.json();
        appendMessage('bot', data.reply, data.quick_actions);
        chatHistory.push({ role: 'assistant', content: data.reply });
      } else {
        appendMessage('bot', "I apologize, my concierge connection is experiencing high latency. You can speak directly with our senior advisor on WhatsApp.", [
          { label: "💬 Connect on WhatsApp", action: "whatsapp", text: "Hello, I am asking about properties via the concierge chatbot." }
        ]);
      }
    } catch (err) {
      removeTypingIndicator();
      console.error('Chatbot error:', err);
      appendMessage('bot', "Connection temporarily offline. Please reach our global client desk or explore our listings directly.", [
        { label: "🏰 View All Properties", action: "navigate", url: "/property" },
        { label: "🏛️ SR Guidance Tool", action: "navigate", url: "/investment-dashboard#sr-valuation-tool" }
      ]);
    } finally {
      isSending = false;
    }
  }

  // Auto-init on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChatbot);
  } else {
    injectChatbot();
  }

  window.openAiChatbot = function (initialQuery) {
    if (!chatOpen) toggleChat();
    if (initialQuery) {
      sendUserMessage(initialQuery);
    }
  };
})();
