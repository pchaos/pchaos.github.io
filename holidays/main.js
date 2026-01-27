// main.js - 主程序文件
document.addEventListener("DOMContentLoaded", function () {
  // 获取DOM元素
  const canvas = document.getElementById("fireworksCanvas");
  const contentContainer = document.getElementById("contentContainer");
  const displayText = document.getElementById("displayText");
  const kidsContainer = document.getElementById("kidsContainer");
  const controlPanel = document.getElementById("controlPanel");
  const togglePanelBtn = document.getElementById("togglePanelBtn");
  const closePanelBtn = document.getElementById("closePanelBtn");
  const textInput = document.getElementById("textInput");
  const kidsCountSelect = document.getElementById("kidsCount");
  const generateBtn = document.getElementById("generateBtn");
  const urlResult = document.getElementById("urlResult");
  const copyBtn = document.getElementById("copyBtn");
  const statusMessage = document.getElementById("statusMessage");

  // 初始化管理器
  const kidsManager = new KidsManager(kidsContainer);
  const fireworksManager = new FireworksManager(canvas);

  // 程序状态
  let state = "FIREWORKS"; // 初始状态为烟花
  let stateStartTime = Date.now();
  const STATE_DURATION = 10000; // 每个状态持续时间10秒

  // 小人个数变量
  let kidsCount = 2;

  // Base64编码函数
  function base64Encode(str) {
    return btoa(encodeURIComponent(str))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  // Base64解码函数
  function base64Decode(str) {
    try {
      str = str.replace(/-/g, "+").replace(/_/g, "/");
      while (str.length % 4) {
        str += "=";
      }
      return decodeURIComponent(atob(str));
    } catch (e) {
      return null;
    }
  }

  // 从URL参数获取文字和小人个数
  const urlParams = new URLSearchParams(window.location.search);
  const encodedText = urlParams.get("text");
  const encodedCount = urlParams.get("count");
  const showPanel = urlParams.get("showPanel");
  let displayString = "2026 Happy!"; // 默认文字

  if (encodedText) {
    const decodedText = base64Decode(encodedText);
    if (decodedText) {
      displayString = decodedText;
      textInput.value = decodedText;
    }
  }

  if (encodedCount) {
    const decodedCount = base64Decode(encodedCount);
    if (decodedCount && !isNaN(decodedCount)) {
      kidsCount = parseInt(decodedCount);
      if (kidsCount < 1) kidsCount = 1;
      if (kidsCount > 10) kidsCount = 10;
      kidsCountSelect.value = kidsCount.toString();
    }
  }

  if (showPanel === "true") {
    controlPanel.classList.add("show");
    togglePanelBtn.classList.add("show");
  }

  displayText.textContent = displayString;
  adjustFontSize();

  // 调整字体大小
  function adjustFontSize() {
    const length = displayString.length;
    if (length > 10) {
      displayText.style.fontSize = "60px";
    } else if (length > 6) {
      displayText.style.fontSize = "80px";
    } else if (length > 3) {
      displayText.style.fontSize = "100px";
    } else {
      displayText.style.fontSize = "120px";
    }
  }

  // 切换控制面板
  function toggleControlPanel() {
    controlPanel.classList.toggle("show");
    togglePanelBtn.classList.add("show");
  }

  // 生成链接
  function generateUrl() {
    const inputText = textInput.value.trim();
    const count = parseInt(kidsCountSelect.value);

    if (!inputText) {
      showStatus("请输入要显示的文字", "error");
      return;
    }

    const encodedText = base64Encode(inputText);
    const encodedCount = base64Encode(count.toString());

    // 取当前地址问号前的部分，兼容 file:// 和 http://
    const currentUrl = window.location.href.split("?")[0];
    const newUrl = `${currentUrl}?text=${encodedText}&count=${encodedCount}&showPanel=true`;

    // 建议顺便包成可点击链接
    urlResult.innerHTML = `<a href="${newUrl}" target="_blank">${newUrl}</a>`;

    copyBtn.style.display = "block";

    displayString = inputText;
    displayText.textContent = displayString;
    kidsCount = count;
    adjustFontSize();

    // 使用小人管理器重新生成小人
    kidsManager.createKidsSVG(kidsCount);

    showStatus("链接生成成功！点击上方链接查看效果", "success");
  }

  // 新函数：生成不带面板的纯预览链接
  function generatePreviewUrl() {
    const inputText = textInput.value.trim();
    const count = parseInt(kidsCountSelect.value);
    if (!inputText) {
      showStatus("请输入要显示的文字", "error");
      return;
    }

    const encodedText = base64Encode(inputText);
    const encodedCount = base64Encode(count.toString());
    const currentUrl = window.location.href.split("?")[0];
    const newUrl = `${currentUrl}?text=${encodedText}&count=${encodedCount}`; // 不带 showPanel

    urlResult.innerHTML = `<a href="${newUrl}" target="_blank">${newUrl}</a>`;
    copyBtn.style.display = "block";
    displayString = inputText;
    displayText.textContent = displayString;
    kidsCount = count;
    adjustFontSize();
    kidsManager.createKidsSVG(kidsCount);
    showStatus("预览链接生成成功！对方点击即可观看", "success");
  }

  // 复制链接到剪贴板
  function copyToClipboard() {
    const url = urlResult.querySelector("a").href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        showStatus("链接已复制到剪贴板！", "success");
      })
      .catch((err) => {
        console.error("复制失败:", err);
        showStatus("复制失败，请手动复制链接", "error");
      });
  }

  // 显示状态消息
  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = "status-message";

    if (type === "success") {
      statusMessage.classList.add("status-success");
    } else if (type === "error") {
      statusMessage.classList.add("status-error");
    }

    statusMessage.style.opacity = "1";

    // 3秒后隐藏消息
    setTimeout(() => {
      statusMessage.style.opacity = "0";
    }, 3000);
  }

  // 切换到烟花状态
  function enterFireworksState() {
    state = "FIREWORKS";
    stateStartTime = Date.now();
    fireworksManager.changeBackgroundColor();
    fireworksManager.enterFireworksState();
    contentContainer.style.opacity = "0";
  }

  // 切换到小孩图片状态
  function enterKidsState() {
    state = "KIDS";
    stateStartTime = Date.now();
    fireworksManager.changeBackgroundColor();
    fireworksManager.enterStarsState();
    kidsManager.createKidsSVG(kidsCount);
    contentContainer.style.opacity = "1";
  }

  // 动画循环
  function animate() {
    fireworksManager.clearCanvas();

    // 检查状态切换
    const currentTime = Date.now();
    const elapsedTime = currentTime - stateStartTime;

    if (elapsedTime >= STATE_DURATION) {
      if (state === "FIREWORKS") {
        enterKidsState();
      } else {
        enterFireworksState();
      }
    }

    // 根据当前状态执行不同的渲染逻辑
    if (state === "FIREWORKS") {
      fireworksManager.updateFireworks();
      fireworksManager.drawFireworks();
    } else {
      fireworksManager.drawStars();
    }

    requestAnimationFrame(animate);
  }

  // 窗口大小调整处理
  window.addEventListener("resize", function () {
    fireworksManager.setCanvasSize(window.innerWidth, window.innerHeight);

    if (state === "KIDS") {
      fireworksManager.enterStarsState();
    }
  });

  // 事件监听器
  generateBtn.addEventListener("click", generateUrl);
  generatePreviewBtn.addEventListener("click", generatePreviewUrl);
  copyBtn.addEventListener("click", copyToClipboard);
  togglePanelBtn.addEventListener("click", toggleControlPanel);
  closePanelBtn.addEventListener("click", toggleControlPanel);

  textInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      generateUrl();
    }
  });

  // 新增：隐形左下角切换器
  const hiddenPanelToggle = document.getElementById("hiddenPanelToggle");
  hiddenPanelToggle.addEventListener("click", function (e) {
    e.stopPropagation(); // 防止冒泡
    toggleControlPanel();
  });

  // 页面加载完成后开始动画
  window.addEventListener("load", function () {
    // 设置画布大小
    fireworksManager.setCanvasSize(window.innerWidth, window.innerHeight);

    // 初始化状态
    enterFireworksState();

    // 开始动画循环
    animate();

    console.log("电子烟花秀已启动！");
    console.log("使用控制面板生成自定义文字的Base64链接");
    console.log("控制面板默认隐藏，通过URL参数 ?showPanel=true 打开");
    console.log("当前显示的文字：", displayString);

    // 如果URL中有参数，自动显示链接
    if (encodedText) {
      const baseUrl = window.location.origin + window.location.pathname;
      const currentUrl = `${baseUrl}?text=${encodedText}`;
      urlResult.innerHTML = `<a href="${currentUrl}" target="_blank">${currentUrl}</a>`;
      copyBtn.style.display = "block";
    }
  });
});
