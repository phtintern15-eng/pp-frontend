/**
 * about.js - Dedicated JavaScript for About Us Page
 * Prime Properties Architectural Heritage & Philosophy
 */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // 1. Mobile Menu Toggle Enhancement
  if (typeof initGlobalNavigationBar === 'function') {
    initGlobalNavigationBar();
  } else {
    const mobileToggle = document.getElementById("mobileMenuToggle");
    const navLinks = document.getElementById("navLinks");
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        navLinks.classList.toggle("mobile-open");
        navLinks.classList.toggle("is-open");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.classList.toggle("fa-bars");
          icon.classList.toggle("fa-times");
        }
      });
    }
  }

  // 2. Animated Counter for Metrics Strip
  const statValues = document.querySelectorAll(".stat-value");
  if (statValues.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.innerText.trim();
            const num = parseInt(text.replace(/[^0-9]/g, ""), 10);
            const suffix = text.replace(/[0-9]/g, "");

            if (!isNaN(num) && num > 0) {
              let start = 0;
              const duration = 1500;
              const stepTime = Math.max(Math.floor(duration / num), 25);
              const stepInc = Math.max(Math.floor(num / (duration / stepTime)), 1);

              const timer = setInterval(() => {
                start += stepInc;
                if (start >= num) {
                  el.innerText = num + suffix;
                  clearInterval(timer);
                } else {
                  el.innerText = start + suffix;
                }
              }, stepTime);
            }
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    statValues.forEach((el) => observer.observe(el));
  }

  // 3. Newsletter Subscription Handling
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : "";
      if (email) {
        alert("Thank you for subscribing to our private architectural journal!");
        newsletterForm.reset();
      }
    });
  }

  // 4. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});

