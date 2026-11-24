/**
 * pricing.js - Dedicated JavaScript for Pricing & Membership Page
 * Prime Properties Elite Membership & Advisory Plans
 */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // 1. Mobile Menu Toggle
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

  // 2. Pricing Plan Selection Highlights
  const planCards = document.querySelectorAll(".pricing-card, .plan-card, .tier-card");
  planCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      planCards.forEach((c) => c.classList.remove("is-focused"));
      this.classList.add("is-focused");
    });
  });

  // 3. Plan select button link to modal
  document.querySelectorAll("[data-plan-select]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const plan = this.getAttribute("data-plan-select");
      const planDropdown = document.getElementById("subscriptionPlan");
      if (planDropdown && plan) {
        planDropdown.value = plan;
      }
      if (typeof window.openRegisterModal === "function") {
        window.openRegisterModal();
        if (typeof window.selectUserType === "function") {
          window.selectUserType("owner");
        }
      }
    });
  });

  // 4. Newsletter Subscription Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : "";
      if (email) {
        alert("Thank you for subscribing to Prime Properties exclusive updates!");
        newsletterForm.reset();
      }
    });
  }

  // 5. Foreign Quiz Toggle Option Helper (fallback if international.js is loaded later)
  if (typeof window.toggleQuizOption !== "function") {
    window.toggleQuizOption = function (btn, questionKey, answer) {
      if (!btn) return;
      const parent = btn.closest(".foreign-quiz-options");
      if (parent) {
        parent.querySelectorAll(".foreign-quiz-btn").forEach((b) => b.classList.remove("is-active"));
      }
      btn.classList.add("is-active");
    };
  }
});

