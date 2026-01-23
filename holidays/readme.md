电子烟花秀 (Electronic Fireworks Show)

一个基于HTML5 Canvas的交互式动画页面，可自定义显示文字和卡通小人数量，适合节日庆祝、活动展示等场景。

功能特点

• ✨ 循环播放烟花效果和卡通小人图片

• 🎯 通过URL参数自定义显示文字

• 👥 控制小人数量（1-10个）

• 📱 响应式设计，适配各种屏幕尺寸

• 🎨 鲜艳的色彩和流畅的动画效果

• 🔗 一键生成分享链接

快速开始

基本使用

1. 下载所有文件到同一目录
2. 在浏览器中打开 fireworks_show.html
3. 页面将自动开始播放动画（烟花 ↔ 小人，每10秒切换）

使用控制面板

1. 点击左上角"控制面板"按钮
2. 输入要显示的文字
3. 选择小人个数（1-10）
4. 点击"生成Base64链接"按钮
5. 复制生成的链接分享给他人

控制参数使用

URL参数格式

fireworks_show.html?text=Base64编码的文字&count=Base64编码的个数&showPanel=true/false

参数说明

参数 类型 说明 示例

text 字符串 要显示的文字（Base64编码） text=SGVsbG8=

count 数字 小人个数（Base64编码，1-10） count=Mg==

showPanel 布尔值 是否显示控制面板 showPanel=true

使用示例

节日祝福：

fireworks_show.html?text=5paw5rGf5LqU5Y2B&count=NA&showPanel=false

• 显示："新年快乐"

• 4个小人

• 隐藏控制面板

生日祝福：

fireworks_show.html?text=55Sf5rS75LqG5LiN5Y+v&count=Mg&showPanel=true

• 显示："生日快乐"

• 2个小人

• 显示控制面板

文件结构

电子烟花秀/
├── fireworks_show.html # 主HTML文件
├── fireworks_style.css # 样式文件
├── kidsManager.js # 小人管理模块
├── fireworksManager.js # 烟花管理模块
└── main.js # 主程序文件

Base64编码方法

JavaScript编码函数

function base64Encode(str) {
const utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
function(match, p1) {
return String.fromCharCode('0x' + p1);
});
const base64 = btoa(utf8Bytes);
return base64.replace(/\+/g, '-').replace(/\//g, '\_').replace(/=+$/, '');
}

// 使用示例
const text = "新年快乐";
const encodedText = base64Encode(text); // 5paw5rGf5LqU5Y2B

在线工具

也可以使用在线Base64编码工具，但需确保使用URL安全编码（将+替换为-，/替换为\_，去掉末尾=）。

技术特性

动画效果

• 烟花粒子系统：使用Canvas实现高性能的粒子动画

• 星星背景：动态闪烁的星空效果

• 小人动画：SVG矢量图形，流畅的浮动效果

• 背景过渡：平滑的色彩切换动画

响应式设计

• 自动适应不同屏幕尺寸

• 移动设备优化显示

• 文字大小自适应（根据文字长度调整）

交互功能

• 控制面板显示/隐藏

• 一键生成分享链接

• 链接复制到剪贴板

• 状态提示消息

自定义开发

修改样式

编辑 fireworks_style.css 文件：
• 修改颜色方案

• 调整动画时长

• 更改字体和布局

修改小人外观

编辑 kidsManager.js 文件：
• 修改小人发型、服装颜色

• 调整小人大小和动画

• 添加新的人物样式

修改烟花效果

编辑 fireworksManager.js 文件：
• 调整烟花粒子数量和颜色

• 修改重力效果和运动轨迹

• 添加新的烟花类型

修改程序逻辑

编辑 main.js 文件：
• 调整状态切换时间

• 修改交互逻辑

• 添加新功能

浏览器兼容性

• Chrome 60+

• Firefox 55+

• Safari 11+

• Edge 79+

注意事项

1. 本地文件限制：某些浏览器可能阻止本地文件运行JavaScript，建议在Web服务器上运行
2. 复制功能：需要浏览器支持Clipboard API
3. 编码格式：确保使用正确的URL安全Base64编码
4. 文字长度：过长的文字可能影响显示效果，建议不超过20个字符

故障排除

常见问题

问题1：页面显示空白
• 解决方案：检查浏览器控制台错误信息，确保所有文件在同一目录

问题2：文字显示乱码
• 解决方案：检查Base64编码是否正确，确保使用URL安全编码

问题3：控制面板不显示
• 解决方案：URL中添加 &showPanel=true 参数

问题4：动画卡顿
• 解决方案：关闭其他占用资源的程序，降低小人数量

调试技巧

1. 按F12打开开发者工具查看错误信息
2. 检查网络面板确保所有文件加载成功
3. 使用控制台测试Base64编码函数
4. 验证URL参数格式是否正确

更新日志

v1.0.0 (2024-01-23)

• 初始版本发布

• 基本烟花和小人动画功能

• 控制面板和参数自定义功能

• 响应式设计实现

许可证

本项目采用MIT许可证，可自由使用、修改和分发。

贡献

欢迎提交Issue和Pull Request来改进这个项目。

联系方式

如有问题或建议，请通过以下方式联系：
• 提交GitHub Issue

• 发送电子邮件至项目维护者

享受您的电子烟花秀！ 🎆🎇✨
