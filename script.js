/**
 * @class       : script
 * @author      : user (user@fedora)
 * @created     : 星期五 10月 18, 2024 10:29:51 WITA
 * Modified    : 2024-10-18 13:32:48
 * @description : script
 */

export default class script {
}

/ script.js
document.addEventListener("DOMContentLoaded", function() {
    const lastTab = localStorage.getItem('activeTab') || 'index' || 'main';
    activateTab(lastTab);
    
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            activateTab(tabId);
            localStorage.setItem('activeTab', tabId);
        });
    });

    function activateTab(tabId) {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-link').forEach(link => {
            link.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`.tab-link[data-tab="${tabId}"]`).classList.add('active');
    }

  function isMobileBrowser() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}
  function redirectToMobile() {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const currentUrl = window.location.href;

            // 检测是否为移动设备
    if (isMobileBrowser()) {
                // 检查当前 URL 是否已经是 index_phone.html
                if (!currentUrl.includes("index_phone.html")) {
                    // 重定向到手机页面
                    window.location.href = "index_phone.html";
                }
            }
        }

function loadMobileStyles() {
    if (isMobileBrowser()) {
        console.log("手机浏览器检测到，准备加载样式文件...");
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'styles.tab.phone.css'; // 指定要加载的 CSS 文件

        link.onload = function() {
            console.log("样式文件加载成功！");
        };

        link.onerror = function() {
            console.error("样式文件加载失败！");
        };

        document.head.appendChild(link);
    } else {
        console.log("不是手机浏览器，不加载样式文件。");
    }
}

  function myOnLoad() {
redirectToMobile();
loadMobileStyles();
  }
          // 页面加载时执行重定向检查
        window.onload = myOnLoad;
});
