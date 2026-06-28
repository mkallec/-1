/**
 * TDK 集中管理 v1
 *
 * 所有项目引入这一个文件，TDK 由 tdk-config.json 统一控制。
 * 同一 URL 每次获取相同 TDK（用路径做种子），SEO 友好。
 *
 * 用法：
 *   <script src="https://jxgh8.cn/tdk.js"></script>
 */

(function () {
  'use strict';

  var CONFIG_URL = '';

  function getScript() {
    if (document.currentScript) return document.currentScript;
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf('tdk.js') > -1) return scripts[i];
    }
    return null;
  }

  var s = getScript();
  if (s) {
    CONFIG_URL = s.getAttribute('data-config') || s.src.replace(/tdk\.js(\?.*)?$/, 'tdk-config.json');
  }

  if (!CONFIG_URL) return;

  // ======================== 工具 ========================

  function getDomain() {
    return location.hostname.replace(/^www\./, '');
  }

  // 用 URL 路径做种子，同一个路径永远算同一个数
  function seededRandom(seed) {
    var hash = 0;
    for (var i = 0; i < seed.length; i++) {
      var c = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + c;
      hash = hash >>> 0; // 32-bit unsigned int
    }
    return hash / 4294967295;
  }

  function pickFromPool(pool, seed) {
    if (!pool || !pool.length) return '';
    var idx = Math.floor(seededRandom(seed) * pool.length);
    if (idx >= pool.length) idx = 0;
    return pool[idx];
  }

  // ======================== 应用 TDK ========================

  function applyTDK(config) {
    var domain = getDomain();
    var project = null;

    // 找当前域名属于哪个项目
    var projects = config.projects || {};
    var keys = Object.keys(projects);
    for (var i = 0; i < keys.length; i++) {
      var p = projects[keys[i]];
      if (p.domains && p.domains.indexOf(domain) > -1) {
        project = { name: keys[i], cfg: p };
        break;
      }
    }

    // 当前域名没配置 → 跳过
    if (!project) return;

    var seed = location.pathname + location.search;

    var title = pickFromPool(project.cfg.titlePool, seed);
    var desc = pickFromPool(project.cfg.descPool, seed);
    var keywords = pickFromPool(project.cfg.keywordsPool, seed);

    if (title) document.title = title;

    if (desc) {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = desc;
    }

    if (keywords) {
      var metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement('meta');
        metaKw.name = 'keywords';
        document.head.appendChild(metaKw);
      }
      metaKw.content = keywords;
    }
  }

  // ======================== 加载（带缓存） ========================

  var CACHE_KEY = '__tdk_cfg__';
  var CACHE_TTL = 5 * 60 * 1000; // 5 分钟

  function refreshCache() {
    fetch(CONFIG_URL, { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (cfg) {
        if (cfg) { cfg._ts = Date.now(); try { localStorage.setItem(CACHE_KEY, JSON.stringify(cfg)); } catch(e) {} }
      })
      .catch(function () {});
  }

  function loadConfig() {
    try {
      var cached = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (cached && cached._ts && (Date.now() - cached._ts < CACHE_TTL)) {
        applyTDK(cached);
        refreshCache(); // 后台静默更新
        return;
      }
    } catch(e) {}

    fetch(CONFIG_URL, { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (cfg) {
        if (!cfg) return;
        cfg._ts = Date.now();
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(cfg)); } catch(e) {}
        applyTDK(cfg);
      })
      .catch(function () {
        try {
          var old = JSON.parse(localStorage.getItem(CACHE_KEY));
          if (old) applyTDK(old);
        } catch(e) {}
      });
  }

  loadConfig();

})();
