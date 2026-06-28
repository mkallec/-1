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

  // 简单哈希
  function hashCode(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) {
      h = ((h << 5) - h) + s.charCodeAt(i);
      h = h >>> 0;
    }
    return h;
  }

  // ======================== 应用 TDK ========================

  function applyTDK(config) {
    var domain = getDomain();
    var found = false;

    var projects = config.projects || {};
    var keys = Object.keys(projects);
    for (var i = 0; i < keys.length; i++) {
      var p = projects[keys[i]];
      if (p.domains && p.domains.indexOf(domain) > -1) {
        found = true;
        break;
      }
    }

    if (!found) return;

    var pool = config.tdkPool || {};
    if (!pool.titlePool || !pool.titlePool.length) return;

    // 每个域名一个随机偏移，首次随机，之后不变
    var offsetKey = '__tdk_offset_' + domain;
    var offset;
    try {
      var saved = localStorage.getItem(offsetKey);
      if (saved !== null) {
        offset = parseInt(saved, 10);
      } else {
        offset = Math.floor(Math.random() * 99999);
        try { localStorage.setItem(offsetKey, offset); } catch(e) {}
      }
    } catch(e) {
      offset = Math.floor(Math.random() * 99999);
    }

    // 用 pathname 哈希 + 偏移量 → 永远固定的下标
    var pathHash = hashCode(location.pathname);
    var ti = (pathHash + offset) % pool.titlePool.length;
    var di = (pathHash + offset + 1) % pool.descPool.length;
    var ki = (pathHash + offset + 2) % pool.keywordsPool.length;

    var title = pool.titlePool[ti] || '';
    var desc = pool.descPool[di] || '';
    var keywords = pool.keywordsPool[ki] || '';

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

  var CACHE_KEY = '__tdk_cfg_v3__';
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
