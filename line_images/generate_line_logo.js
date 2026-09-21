const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const tempDir = process.env.TEMP || 'C:\\Windows\\Temp';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'c:\\Users\\kh\\Desktop\\github\\lokanghung.github.io';

// 1. 標準原版 640x640 (完全 1:1 對應 favicon.svg)
const htmlStandard640 = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 640px; height: 640px; overflow: hidden; background: #ffffff; }
  svg { width: 640px; height: 640px; display: block; }
</style>
</head>
<body>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect x="3" y="3" width="58" height="58" rx="15" fill="#ffffff" stroke="#3525cd" stroke-width="2"/>
  <text x="32" y="33" 
        text-anchor="middle" 
        dominant-baseline="central" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif" 
        font-size="38" 
        font-weight="500" 
        fill="#3525cd">鴻</text>
</svg>
</body>
</html>`;

// 2. LINE 官方帳號圓形裁切推薦版：白底 + 純文字居中（無多餘邊框，裁成圓形時最乾淨大方）
const htmlCleanWhite640 = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 640px; height: 640px; overflow: hidden; background: #ffffff; }
  svg { width: 640px; height: 640px; display: block; }
</style>
</head>
<body>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#ffffff"/>
  <text x="32" y="32.5" 
        text-anchor="middle" 
        dominant-baseline="central" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif" 
        font-size="38" 
        font-weight="500" 
        fill="#3525cd">鴻</text>
</svg>
</body>
</html>`;

// 3. LINE 官方帳號圓形邊框版（邊框縮小在圓形安全區內，半徑 28，保證被 LINE 裁切時外框完整）
const htmlCircleBorder640 = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 640px; height: 640px; overflow: hidden; background: #ffffff; }
  svg { width: 640px; height: 640px; display: block; }
</style>
</head>
<body>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#ffffff"/>
  <circle cx="32" cy="32" r="28" fill="#ffffff" stroke="#3525cd" stroke-width="2"/>
  <text x="32" y="32.5" 
        text-anchor="middle" 
        dominant-baseline="central" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif" 
        font-size="35" 
        font-weight="500" 
        fill="#3525cd">鴻</text>
</svg>
</body>
</html>`;

// 4. 品牌藍底白字版（在 LINE 好友列表中最吸睛顯眼）
const htmlBrandBlue640 = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 640px; height: 640px; overflow: hidden; background: #3525cd; }
  svg { width: 640px; height: 640px; display: block; }
</style>
</head>
<body>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#3525cd"/>
  <text x="32" y="32.5" 
        text-anchor="middle" 
        dominant-baseline="central" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif" 
        font-size="38" 
        font-weight="500" 
        fill="#ffffff">鴻</text>
</svg>
</body>
</html>`;

// 5. 超高清 1080x1080 原版
const htmlStandard1080 = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1080px; height: 1080px; overflow: hidden; background: #ffffff; }
  svg { width: 1080px; height: 1080px; display: block; }
</style>
</head>
<body>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect x="3" y="3" width="58" height="58" rx="15" fill="#ffffff" stroke="#3525cd" stroke-width="2"/>
  <text x="32" y="33" 
        text-anchor="middle" 
        dominant-baseline="central" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif" 
        font-size="38" 
        font-weight="500" 
        fill="#3525cd">鴻</text>
</svg>
</body>
</html>`;

function render(htmlContent, width, height, tempName, finalName) {
  const htmlPath = path.join(tempDir, `${tempName}.html`);
  const tempPngPath = path.join(tempDir, `${tempName}.png`);
  const finalPngPath = path.join(outDir, finalName);

  fs.writeFileSync(htmlPath, htmlContent, 'utf8');

  const cmd = `"${chromePath}" --headless=new --no-sandbox --hide-scrollbars --window-size=${width},${height} --screenshot="${tempPngPath}" "file:///${htmlPath.replace(/\\/g, '/')}"`;
  
  execSync(cmd, { stdio: 'pipe' });

  if (fs.existsSync(tempPngPath)) {
    fs.copyFileSync(tempPngPath, finalPngPath);
    console.log(`Saved: ${finalName} (${width}x${height}, ${fs.statSync(finalPngPath).size} bytes)`);
  } else {
    console.error(`Failed to create ${tempPngPath}`);
  }
}

render(htmlStandard640, 640, 640, 'line_logo_640', 'line_logo_640x640.png');
render(htmlCleanWhite640, 640, 640, 'line_logo_clean_640', 'line_logo_clean_640x640.png');
render(htmlCircleBorder640, 640, 640, 'line_logo_circle_640', 'line_logo_circle_640x640.png');
render(htmlBrandBlue640, 640, 640, 'line_logo_brand_blue_640', 'line_logo_brand_blue_640x640.png');
render(htmlStandard1080, 1080, 1080, 'line_logo_1080', 'line_logo_1080x1080.png');

console.log('Done!');
