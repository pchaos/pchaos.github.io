/**
 * @class       : script
 * @author      : user (user@fedora)
 * @created     : 星期五 10月 18, 2024 10:29:51 WITA
 * Modified    : 2024-10-18 11:53:30
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

  function redirectToMobile() {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const currentUrl = window.location.href;

            // 检测是否为移动设备
            if (/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
                // 检查当前 URL 是否已经是 index_phone.html
                if (!currentUrl.includes("index_phone.html")) {
                    // 重定向到手机页面
                    window.location.href = "index_phone.html";
                }
            }
        }
          // 页面加载时执行重定向检查
        window.onload = redirectToMobile;
});
