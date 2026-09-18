/* ==========================================================
   FLAIRLIST NAVBAR JAVASCRIPT
   - Top navigation: CLICK to open / close
   - Main sidebar: HOVER to change content
   - Nested sidebar: HOVER to change content
   - Outside click / Escape: close
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.getElementById("siteNavbar");
  const megaMenu = document.getElementById("megaMenu");
  const triggers = document.querySelectorAll(".dropdown-trigger");

  let activeMenu = null;

  /* ==========================================================
     FIXED NAVBAR ON SCROLL
     ========================================================== */

  const SCROLL_THRESHOLD = 10;

  function handleNavbarScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add("navbar-fixed");
    } else {
      navbar.classList.remove("navbar-fixed");
    }
  }

  // Run once on load in case the page is already scrolled (e.g. refresh mid-page)
  handleNavbarScroll();

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  /* ==========================================================
     TOP NAVIGATION — CLICK
     ========================================================== */

  triggers.forEach((trigger) => {

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const parent = trigger.closest(".nav-dropdown");
      const menuName = parent.dataset.menu;

      // If the same menu is already open, close it
      if (
        activeMenu === menuName &&
        megaMenu.classList.contains("open")
      ) {
        closeMegaMenu();
        return;
      }

      // Remove active state from all top navigation buttons
      triggers.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-expanded", "false");
      });

      // Activate clicked navigation button
      trigger.classList.add("active");
      trigger.setAttribute("aria-expanded", "true");

      // Hide all mega menu sections
      document.querySelectorAll(".mega-content").forEach((menu) => {
        menu.classList.remove("active");
      });

      // Select the correct mega menu
      const selectedMenu = document.getElementById(
        menuName === "who" ? "whoMenu" : "whatMenu"
      );

      if (selectedMenu) {
        selectedMenu.classList.add("active");
      }

      megaMenu.classList.add("open");
      megaMenu.setAttribute("aria-hidden", "false");

      activeMenu = menuName;
    });

  });


  /* ==========================================================
     MAIN SIDEBAR — HOVER
     ========================================================== */

  document.querySelectorAll(".mega-content").forEach((menu) => {

    const sideItems = menu.querySelectorAll(".mega-side-item");
    const panels = menu.querySelectorAll(".mega-main > .mega-panel");

    sideItems.forEach((item) => {

      item.addEventListener("mouseenter", () => {

        const contentName = item.dataset.content;

        // Remove active state from sidebar
        sideItems.forEach((side) => {
          side.classList.remove("active");
        });

        // Activate hovered sidebar item
        item.classList.add("active");

        // Hide all panels
        panels.forEach((panel) => {
          panel.classList.remove("active");
        });

        // Show matching panel
        const selectedPanel = menu.querySelector(
          `.mega-main > [data-panel="${CSS.escape(contentName)}"]`
        );

        if (selectedPanel) {
          selectedPanel.classList.add("active");
        }

      });

    });

  });


  /* ==========================================================
     NESTED SIDEBARS — HOVER
     Used for:
     - Global Import-Export
     - Workforce Mobility
     ========================================================== */

  document.querySelectorAll(".nested-panel").forEach((nestedMenu) => {

    const nestedItems =
      nestedMenu.querySelectorAll(".nested-side-item");

    const nestedPanels =
      nestedMenu.querySelectorAll(".nested-panel");

    nestedItems.forEach((item) => {

      item.addEventListener("mouseenter", () => {

        const nestedName = item.dataset.nested;

        // Remove active state
        nestedItems.forEach((side) => {
          side.classList.remove("active");
        });

        // Activate hovered item
        item.classList.add("active");

        // Hide all nested content
        nestedPanels.forEach((panel) => {
          panel.classList.remove("active");
        });

        // Show matching nested content
        const selectedNestedPanel = nestedMenu.querySelector(
          `[data-nested-panel="${CSS.escape(nestedName)}"]`
        );

        if (selectedNestedPanel) {
          selectedNestedPanel.classList.add("active");
        }

      });

    });

  });


  /* ==========================================================
     CLOSE MEGA MENU
     ========================================================== */

  function closeMegaMenu() {

    megaMenu.classList.remove("open");

    megaMenu.setAttribute("aria-hidden", "true");

    triggers.forEach((trigger) => {
      trigger.classList.remove("active");
      trigger.setAttribute("aria-expanded", "false");
    });

    activeMenu = null;
  }


  /* ==========================================================
     CLICK OUTSIDE
     ========================================================== */

  document.addEventListener("click", (event) => {

    if (!navbar.contains(event.target)) {
      closeMegaMenu();
    }

  });


  /* ==========================================================
     ESCAPE KEY
     ========================================================== */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMegaMenu();
    }

  });


  /* ==========================================================
     SEARCH
     ========================================================== */

  const searchForm = document.getElementById("navbarSearch");

  if (searchForm) {

    searchForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const input = searchForm.querySelector("input");
      const query = input.value.trim();

      if (query) {
        console.log("Search:", query);

        /*
          Connect your actual search functionality here.

          Example:
          window.location.href =
            "./search.html?q=" + encodeURIComponent(query);
        */
      }

    });

  }

});

/* ==========================================
   COUNTRY / LANGUAGE DROPDOWN
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const countrySelector = document.querySelector(".country-selector");
    const countryButton = document.querySelector(".country-btn");
    const countryDropdown = document.querySelector("#countryDropdown");
    const selectedCountry = document.querySelector("#selectedCountry");

    if (!countrySelector || !countryButton || !countryDropdown) return;


    /* Open / Close dropdown */

    countryButton.addEventListener("click", function (event) {
        event.stopPropagation();

        const isOpen = countrySelector.classList.toggle("open");

        countryButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    });


    /* Country selection */

    const countries = countryDropdown.querySelectorAll("button");

    countries.forEach(function (country) {

        country.addEventListener("click", function () {

            const countryName = this.dataset.country;
            const language = this.dataset.lang;

            // Update displayed country
            selectedCountry.textContent = countryName;

            // Active state
            countries.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            // Close dropdown
            countrySelector.classList.remove("open");
            countryButton.setAttribute("aria-expanded", "false");

            // Translate website
            translatePage(language);
        });

    });


    /* Close when clicking outside */

    document.addEventListener("click", function (event) {

        if (!countrySelector.contains(event.target)) {

            countrySelector.classList.remove("open");

            countryButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

});

function googleTranslateElementInit() {
        new google.translate.TranslateElement(
            {
                pageLanguage: "en",
                includedLanguages:
                    "en,hi,ar,zh-CN,nl,de,it,ja,ko,ms,th,id,vi,fr,es,pl,he,tr,pt,ne,si,ur,bn",
                autoDisplay: false
            },
            "google_translate_element"
        );
    }