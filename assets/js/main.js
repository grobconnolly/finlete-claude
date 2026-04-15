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
