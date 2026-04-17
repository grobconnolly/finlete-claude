// Finlete Bootstrap rebuild — minimal enhancements.
// Bootstrap JS bundle handles navbar toggles, accordions, carousels, etc.

(function () {
  "use strict";

  // Smooth-scroll for same-page anchor links
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var href = link.getAttribute("href");
    if (href === "#" || href.length < 2) return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Close the navbar on link click (mobile)
  document.querySelectorAll(".navbar-finlete .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      var toggler = document.querySelector(".navbar-toggler");
      var collapse = document.querySelector(".navbar-collapse.show");
      if (toggler && collapse) toggler.click();
    });
  });

  // ==========================================================
  // Homepage hero rotating athlete carousel
  // ==========================================================
  var heroStage = document.getElementById("heroStage");
  if (heroStage) {
    var ATHLETES = [
      {
        photo: "assets/img/athletes/hero-stage-padilla-real.png",
        name: "Yairo<br />Padilla",
        meta: "St. Louis Cardinals · SS · Rookie",
        status: "Elite Athleticism",
        statusKey: "elite-athlete",
        panel: "Has been compared to <strong>Elly De La Cruz</strong> and <strong>Fernando Tatis Jr.</strong>",
        chips: ["#16 Cardinals prospect", "24 SB in 38 G (2025)", ".396 OBP (2025)"]
      },
      {
        photo: "assets/img/athletes/hero-stage-avila.png",
        name: "Luinder<br />Avila",
        meta: "Kansas City Royals · RHP · AAA",
        status: "Top Seller",
        statusKey: "top-seller",
        panel: "Profiles as a <strong>mid-rotation big-league starter</strong> within 12–18 months.",
        chips: ["Royals #9 prospect", "Team Venezuela (WBC)", "16 K in 14 MLB IP (2025)"]
      },
      {
        photo: "assets/img/athletes/hero-stage-santos.png",
        name: "Winston<br />Santos",
        meta: "Texas Rangers · RHP · AAA",
        status: "On the Cusp",
        statusKey: "on-the-cusp",
        panel: "2024 All-Star Futures Game · <strong>2025 Arizona Fall League All-Star</strong>.",
        chips: ["Rangers #3 prospect", "Likely MLB debut 2026", "13.5 K/9 (2025)"]
      },
      {
        photo: "assets/img/athletes/hero-stage-escobar.png",
        name: "Aroon<br />Escobar",
        meta: "Philadelphia Phillies · 2B · AA",
        status: "Top Seller",
        statusKey: "top-seller",
        panel: "Top 10 (#7) <strong>second base prospect</strong> per MLB Pipeline.",
        chips: ["Phillies #6 prospect", "MLB Top 100 prospect", "90 percentile EV (2025)"]
      },
      {
        photo: "assets/img/athletes/hero-stage-lagrange.png",
        name: "Carlos<br />Lagrange",
        meta: "New York Yankees · RHP · AA",
        status: "Sold Out",
        statusKey: "sold-out",
        panel: "2nd most strikeouts in all of <strong>Minor League Baseball</strong> in 2025.",
        chips: ["Yankees #2 prospect", "MLB Top 100 prospect", ".183 BAA (2025)"]
      },
      {
        photo: "assets/img/athletes/hero-stage-mejia.png",
        name: "Esteban<br />Mejia",
        meta: "Baltimore Orioles · RHP · A",
        status: "New",
        statusKey: "new",
        panel: "\"Esteban Mejia is <strong>pure electricity</strong>.\" — Baseball America",
        chips: ["Orioles #8 prospect", "MLB Top 100 prospect", "102 MPH at just 18 y/o"]
      },
      {
        photo: "assets/img/athletes/hero-stage-garcia.png",
        name: "Jhostynxon<br />Garcia",
        meta: "Pittsburgh Pirates · OF · AA",
        status: "Sold Out",
        statusKey: "sold-out",
        panel: "Made his <strong>MLB debut</strong> in September 2025.",
        chips: ["Pirates #6 prospect", "MLB Top 100 prospect", "18 HR in 81 G (2025)"]
      },
      {
        photo: "assets/img/athletes/hero-stage-bernal.png",
        name: "Leonardo<br />Bernal",
        meta: "St. Louis Cardinals · C · AA",
        status: "Sold Out",
        statusKey: "sold-out",
        panel: "<strong>Minor League Baseball Gold Glove</strong> Award Winner 2025 (Catcher).",
        chips: ["Cardinals #8 prospect", "MLB Top 100 prospect", "32 XBH in 107 G (2025)"]
      }
    ];

    var photoEl = document.getElementById("heroPhoto");
    var chipsEl = document.getElementById("heroChips");
    var statusEl = document.getElementById("heroStatus");
    var nameEl = document.getElementById("heroName");
    var metaEl = document.getElementById("heroMeta");
    var panelEl = document.getElementById("heroPanel");
    var dotsEl = document.getElementById("heroDots");
    var prevBtn = document.getElementById("heroPrev");
    var nextBtn = document.getElementById("heroNext");

    var idx = 0;
    var autoplayTimer = null;
    var AUTOPLAY_MS = 6500;

    // Build dots
    ATHLETES.forEach(function (_, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.className = "dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", "Show athlete " + (i + 1));
      d.addEventListener("click", function () { goTo(i); });
      dotsEl.appendChild(d);
    });

    function render(i) {
      var a = ATHLETES[i];
      // Fade out
      heroStage.classList.add("is-transitioning");
      // Apply updates after the CSS transition duration, then fade in
      setTimeout(function () {
        photoEl.src = a.photo;
        photoEl.alt = a.name.replace(/<br \/>/g, " ");
        statusEl.textContent = a.status;
        statusEl.className = "elite-label status-" + a.statusKey;
        nameEl.innerHTML = a.name;
        metaEl.textContent = a.meta;
        panelEl.innerHTML = a.panel;
        chipsEl.innerHTML = a.chips.map(function (c) {
          return '<span class="hero-chip"><span class="chip-dot"></span>' + c + "</span>";
        }).join("");
        dotsEl.querySelectorAll(".dot").forEach(function (d, j) {
          d.classList.toggle("active", j === i);
        });
      }, 200);
      // Hard safety — always re-fade in after a bit, even if layout/image stalls
      setTimeout(function () {
        heroStage.classList.remove("is-transitioning");
      }, 260);
    }

    function goTo(i) {
      idx = (i + ATHLETES.length) % ATHLETES.length;
      render(idx);
      resetAutoplay();
    }

    function next() { goTo(idx + 1); }
    function prev() { goTo(idx - 1); }

    function resetAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(next, AUTOPLAY_MS);
    }

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    // Pause autoplay on hover
    heroStage.addEventListener("mouseenter", function () {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    });
    heroStage.addEventListener("mouseleave", resetAutoplay);

    resetAutoplay();
  }

  // Investment calculator (athlete profile pages only)
  var invRange = document.getElementById("invAmountRange");
  if (invRange) {
    var earnRange = document.getElementById("earningsRange");
    var invPill = document.getElementById("invAmountPill");
    var earnPill = document.getElementById("earningsPill");
    var retEl = document.getElementById("calcReturn");
    var stakeEl = document.getElementById("calcStake");
    var moicEl = document.getElementById("calcMoic");

    // Per-athlete rate. Read from the root element's data-stake-rate attribute if set.
    // Default: 0.0123% stake for a $2,500 investment → 4.92e-6 percent per dollar.
    var root = document.getElementById("investment-calculator");
    var rate = parseFloat((root && root.getAttribute("data-stake-rate")) || "0.00000492");

    function money(n) {
      return "$" + n.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    function fmtEarnings(m) {
      return "$" + (m >= 1000 ? (m / 1000).toFixed(1) + "B" : m + "M");
    }

    function fmtStake(pct) {
      var s = pct.toFixed(4);
      if (s.indexOf("0.") === 0) s = s.slice(1);
      return s + "%";
    }

    function update() {
      var invest = parseFloat(invRange.value);
      var earningsM = parseFloat(earnRange.value);
      var stakePct = invest * rate;                 // as percent
      var ret = earningsM * 1e6 * (stakePct / 100);
      var moic = invest > 0 ? ret / invest : 0;

      invPill.textContent = money(invest);
      earnPill.textContent = fmtEarnings(earningsM);
      retEl.textContent = money(ret);
      stakeEl.textContent = fmtStake(stakePct);
      moicEl.textContent = moic.toFixed(1) + "x";
    }

    invRange.addEventListener("input", update);
    earnRange.addEventListener("input", update);
    update();
  }
})();
