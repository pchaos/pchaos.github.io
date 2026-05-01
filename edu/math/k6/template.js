/* ====================================
   数学可视化页面 — 模板加载器
   自动注入公共 head 标签、theme picker、主题切换逻辑
   ==================================== */

(function() {
  // 只在浏览器环境运行
  if (typeof document === 'undefined') return;

  var TEMPLATE_CSS = 'template.css';

  // ---- 1. 注入 meta 标签 ----
  function ensureMeta(name, content) {
    if (!document.querySelector('meta[' + name + ']')) {
      var el = document.createElement('meta');
      if (name === 'charset') {
        el.setAttribute('charset', content);
      } else {
        el.setAttribute('name', name);
        el.setAttribute('content', content);
      }
      document.head.insertBefore(el, document.head.firstChild);
    }
  }
  ensureMeta('charset', 'UTF-8');
  ensureMeta('viewport', 'width=device-width, initial-scale=1.0');

  // ---- 2. 注入 template.css ----
  if (!document.querySelector('link[href="' + TEMPLATE_CSS + '"]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = TEMPLATE_CSS;
    // 放到 head 里已有 style 的前面
    var firstStyle = document.head.querySelector('style');
    if (firstStyle) {
      document.head.insertBefore(link, firstStyle);
    } else {
      document.head.appendChild(link);
    }
  }

  // ---- DOM 就绪后注入 theme picker + 主题切换 ----
  function bootTemplate() {
    // 注入 theme picker HTML
    if (!document.getElementById('themePicker')) {
      var pickerHTML =
        '<div class="theme-picker" id="themePicker">' +
          '<button type="button" data-theme="default" style="background:#3b82f6" title="默认蓝"></button>' +
          '<button type="button" data-theme="green" style="background:#2ecc71" title="绿色"></button>' +
          '<button type="button" data-theme="purple" style="background:#8b5cf6" title="紫色"></button>' +
          '<button type="button" data-theme="orange" style="background:#f97316" title="橙色"></button>' +
          '<button type="button" data-theme="dark" style="background:#1e293b" title="暗色"></button>' +
        '</div>';
      var container = document.querySelector('.container') || document.body.firstChild;
      document.body.insertBefore(createDOM(pickerHTML), container);
    }
    // 主题切换
    if (!window._templateThemeInjected) {
      window._templateThemeInjected = true;
      var picker = document.getElementById('themePicker');
      if (!picker) return;
      var saved = localStorage.getItem('template-theme') || 'default';
      picker.querySelectorAll('button').forEach(function(btn) {
        if (btn.dataset.theme === saved) btn.classList.add('active');
        btn.addEventListener('click', function() {
          var theme = this.dataset.theme;
          picker.querySelectorAll('button').forEach(function(b) { b.classList.remove('active'); });
          this.classList.add('active');
          if (theme === 'default') {
            document.documentElement.removeAttribute('data-theme');
          } else {
            document.documentElement.setAttribute('data-theme', theme);
          }
          localStorage.setItem('template-theme', theme);
        });
      });
      if (saved && saved !== 'default') {
        document.documentElement.setAttribute('data-theme', saved);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootTemplate);
  } else {
    bootTemplate();
  }

  // ---- 工具：HTML 字符串转 DOM ----
  function createDOM(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }
})();
