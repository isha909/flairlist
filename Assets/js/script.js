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

    
/* ==========================================================
   MOBILE MENU (HAMBURGER)
   Builds the phone/tablet menu from the existing mega menu
   links, so no HTML changes are needed on any page.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.getElementById("siteNavbar");
  const navRight = document.querySelector(".navbar .nav-right");
  const whoMenu = document.getElementById("whoMenu");
  const whatMenu = document.getElementById("whatMenu");

  if (!navbar || !navRight) return;

  const MOBILE_QUERY = window.matchMedia("(max-width: 1100px)");

  /* ---------- helpers ---------- */

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // Readable label from a button/link (drops arrows, turns <br> into a space)
  function clean(node) {
    const copy = node.cloneNode(true);
    copy.querySelectorAll(".side-arrow, .dropdown-arrow").forEach((n) => n.remove());
    copy.querySelectorAll("span").forEach((n) => {
      if (n.textContent.trim() === "›") n.remove();
    });
    copy.querySelectorAll("br").forEach((br) => br.replaceWith(" "));
    return copy.textContent.replace(/\s+/g, " ").trim();
  }

  function makeLink(href, label) {
    const a = el("a", "mm-link", label);
    a.setAttribute("href", href);
    return a;
  }

  function linksOf(root) {
    return [...root.querySelectorAll("a[href]")].map((a) => ({
      href: a.getAttribute("href"),
      label: clean(a),
    }));
  }

  // Collapsible group: returns { wrap, body }
  function accordion(title) {
    const wrap = el("div", "mm-group");
    const btn = el("button", "mm-toggle");
    btn.type = "button";
    btn.setAttribute("aria-expanded", "false");
    btn.append(el("span", "", title), el("span", "mm-chevron"));

    const body = el("div", "mm-body");
    wrap.append(btn, body);

    btn.addEventListener("click", () => {
      const open = !wrap.classList.contains("open");

      // Close the other groups at the same level
      [...wrap.parentElement.children].forEach((sibling) => {
        if (sibling !== wrap && sibling.classList.contains("mm-group")) {
          sibling.classList.remove("open");
          sibling.firstElementChild.setAttribute("aria-expanded", "false");
        }
      });

      wrap.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    });

    return { wrap, body };
  }

  /* ---------- build one section (Who We Are / What We Do) ---------- */

  function buildSection(menu, container) {
    menu.querySelectorAll(".mega-side-item").forEach((item) => {
      const name = item.dataset.content;
      const label = clean(item);
      const panel = menu.querySelector(
        `.mega-main > [data-panel="${CSS.escape(name)}"]`
      );
      if (!panel) return;

      // Panels with their own sub-sidebar (Global Import-Export, Workforce Mobility)
      const nestedItems = panel.querySelectorAll(".nested-side-item");

      if (nestedItems.length) {
        const { wrap, body } = accordion(label);

        nestedItems.forEach((nested) => {
          const sub = panel.querySelector(
            `[data-nested-panel="${CSS.escape(nested.dataset.nested)}"]`
          );
          if (!sub) return;

          const links = linksOf(sub);
          if (!links.length) return;

          const title = clean(nested);
          const sameAsLink =
            links.length === 1 &&
            links[0].label.toLowerCase() === title.toLowerCase();

          if (!sameAsLink) body.append(el("div", "mm-subtitle", title));
          links.forEach((l) => body.append(makeLink(l.href, l.label)));
        });

        container.append(wrap);
        return;
      }

      const links = linksOf(panel);
      if (!links.length) return;

      // Only one link inside: show it directly instead of a dropdown
      if (links.length === 1) {
        container.append(makeLink(links[0].href, label));
        return;
      }

      const { wrap, body } = accordion(label);
      links.forEach((l) => body.append(makeLink(l.href, l.label)));
      container.append(wrap);
    });
  }

  /* ---------- build the menu ---------- */

  const menu = el("nav", "mobile-menu");
  menu.id = "mobileMenu";
  menu.setAttribute("aria-label", "Mobile Navigation");

  menu.append(makeLink("./index.html", "Home"));

  if (whoMenu) {
    const who = accordion("Who We Are");
    buildSection(whoMenu, who.body);
    menu.append(who.wrap);
  }

  if (whatMenu) {
    const what = accordion("What We Do");
    buildSection(whatMenu, what.body);
    menu.append(what.wrap);
  }

  // Careers, Investors
  document.querySelectorAll(".nav-links > a.nav-link").forEach((a) => {
    menu.append(makeLink(a.getAttribute("href"), clean(a)));
  });

  /* ---------- hamburger button ---------- */

  const toggle = el("button", "nav-toggle");
  toggle.type = "button";
  toggle.id = "navToggle";
  toggle.setAttribute("aria-label", "Open menu");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "mobileMenu");
  toggle.innerHTML = "<span></span><span></span><span></span>";

  navRight.append(toggle);
  navbar.append(menu);

  /* ---------- open / close ---------- */

  function setOpen(open) {
    menu.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (open) {
      const countrySelector = document.querySelector(".country-selector");
      if (countrySelector) countrySelector.classList.remove("open");
    }
  }

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(!menu.classList.contains("open"));
  });

  // Tapping any link closes the menu
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  // Close if the screen is resized back to desktop
  window.addEventListener("resize", () => {
    if (!MOBILE_QUERY.matches) setOpen(false);
  });

});