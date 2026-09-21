const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const tempDir = process.env.TEMP || 'C:\\Windows\\Temp';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'c:\\Users\\kh\\Desktop\\github\\lokanghung.github.io';

const width = 1080;
const height = 878;

// 正式上傳用的 LINE 官方主頁封面圖 (1080 x 878 px)
// 嚴格依據 index.html 與 it123.in 文案與定位：
// 1. 創業限定 雙 7 OFF 打造網站與 App
// 2. 時間 70% OFF (最快 14 天交付) | 成本 70% OFF (現省 15-30 萬)
// 3. 雙引擎（20 年架構師 + AI 智能體）
// 4. 一句白話需求 ‧ 免費取得規格與原型 ‧ 歡迎全台比價
const coverHtml = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Noto+Sans+TC:wght@500;700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1080px;
    height: 878px;
    overflow: hidden;
    background-color: #070a19;
    font-family: 'Plus Jakarta Sans', 'Noto Sans TC', sans-serif;
    color: #ffffff;
    position: relative;
    user-select: none;
    -webkit-font-smoothing: antialiased;
  }

  /* 背景科技光暈與極光效果 */
  .bg-glow-1 {
    position: absolute;
    top: -140px;
    left: -100px;
    width: 750px;
    height: 750px;
    background: radial-gradient(circle, rgba(53, 37, 205, 0.55) 0%, rgba(53, 37, 205, 0) 70%);
    filter: blur(55px);
  }
  .bg-glow-2 {
    position: absolute;
    top: -90px;
    right: -80px;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.38) 0%, rgba(99, 102, 241, 0) 70%);
    filter: blur(65px);
  }
  .bg-glow-center {
    position: absolute;
    top: 220px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 380px;
    background: radial-gradient(ellipse, rgba(53, 37, 205, 0.3) 0%, transparent 70%);
    filter: blur(40px);
  }

  /* 幾何點陣網格 */
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
    background-size: 34px 34px;
    opacity: 0.5;
    mask-image: radial-gradient(ellipse at 50% 40%, black 40%, transparent 85%);
    -webkit-mask-image: radial-gradient(ellipse at 50% 40%, black 40%, transparent 85%);
  }

  /* 裝飾微光線條 */
  .decor-line-left {
    position: absolute;
    top: 280px;
    left: 50px;
    width: 140px;
    height: 1.5px;
    background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.45));
  }
  .decor-line-right {
    position: absolute;
    top: 280px;
    right: 50px;
    width: 140px;
    height: 1.5px;
    background: linear-gradient(90deg, rgba(56, 189, 248, 0.45), transparent);
  }

  /* 頂部預留狀態列暗角 (確保 LINE 頂部返回箭頭與系統時間一清二楚) */
  .top-shade {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(180deg, rgba(5, 7, 18, 0.8) 0%, transparent 100%);
    z-index: 2;
  }

  /* 內容容器 (居中於 LINE 黃金安全區) */
  .content-wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 150px; /* 避開頂部 140px 系統狀態列與返回按鈕 */
    width: 100%;
  }

  /* 頂部主題微標籤 */
  .badge-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 24px;
    border-radius: 9999px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(56, 189, 248, 0.5);
    box-shadow: 0 0 25px rgba(56, 189, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #38bdf8;
    margin-bottom: 20px;
  }
  .badge-tag .pulse-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #38bdf8;
    box-shadow: 0 0 12px #38bdf8;
  }

  /* 主標題：創業限定 雙 7 OFF 打造網站App */
  .main-title {
    font-size: 56px;
    font-weight: 900;
    line-height: 1.25;
    letter-spacing: -0.5px;
    margin-bottom: 22px;
    text-shadow: 0 4px 25px rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .main-title .gradient-text {
    background: linear-gradient(135deg, #ffffff 35%, #7dd3fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* 雙 7 OFF 特製立體徽章 (完全一致官網風格) */
  .badge-7off {
    display: inline-flex;
    align-items: center;
    background: linear-gradient(90deg, #e11d48, #3525cd 50%, #4338ca);
    color: #ffffff;
    padding: 6px 22px;
    border-radius: 18px;
    font-size: 32px;
    font-weight: 900;
    border: 2.5px solid #ffffff;
    box-shadow: 0 8px 25px rgba(225, 29, 72, 0.4), 0 0 16px rgba(53, 37, 205, 0.6);
    white-space: nowrap;
    letter-spacing: 0.5px;
  }

  /* 雙 7 OFF 核心雙卡並排：時間 70% OFF (最快14天交付) + 成本 70% OFF (現省15-30萬) */
  .dual-cards-row {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 20px;
    margin-bottom: 24px;
    width: 90%;
    max-width: 860px;
  }
  .benefit-card {
    flex: 1;
    background: rgba(15, 23, 42, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    border-radius: 18px;
    padding: 14px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  }
  .benefit-card.time-card {
    border-color: rgba(56, 189, 248, 0.4);
    box-shadow: 0 10px 30px rgba(56, 189, 248, 0.15);
  }
  .benefit-card.cost-card {
    border-color: rgba(52, 211, 153, 0.4);
    box-shadow: 0 10px 30px rgba(52, 211, 153, 0.15);
  }
  .benefit-title {
    font-size: 22px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #f8fafc;
  }
  .benefit-title .accent-blue {
    color: #38bdf8;
    font-weight: 900;
    font-size: 24px;
  }
  .benefit-title .accent-green {
    color: #34d399;
    font-weight: 900;
    font-size: 24px;
  }
  .benefit-pill {
    display: inline-flex;
    align-items: center;
    padding: 4px 16px;
    border-radius: 9999px;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: 0.5px;
  }
  .pill-time {
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.45);
    color: #7dd3fc;
  }
  .pill-cost {
    background: rgba(52, 211, 153, 0.15);
    border: 1px solid rgba(52, 211, 153, 0.45);
    color: #6ee7b7;
  }

  /* 雙引擎與品質背書條 */
  .trust-bar {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 14px;
    padding: 10px 28px;
    font-size: 19px;
    font-weight: 600;
    color: #cbd5e1;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
    margin-bottom: 28px;
  }
  .trust-bar .highlight-badge {
    color: #fbbf24;
    font-weight: 800;
  }

  /* LINE 專用引導行動區 */
  .action-guide {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .action-bubble {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.3));
    border: 1px solid rgba(56, 189, 248, 0.6);
    padding: 10px 30px;
    border-radius: 9999px;
    font-size: 20px;
    font-weight: 800;
    color: #ffffff;
    box-shadow: 0 6px 25px rgba(6, 182, 212, 0.28);
  }
  .action-bubble .arrow-down {
    color: #38bdf8;
    font-size: 24px;
    line-height: 1;
  }

  /* 底部大頭貼承托光環 (Avatar Base Halo) */
  .avatar-base-halo {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 320px;
    height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(53, 37, 205, 0.3) 50%, transparent 75%);
    filter: blur(25px);
    z-index: 5;
    pointer-events: none;
  }
  .avatar-ring-guide {
    position: absolute;
    bottom: -115px;
    left: 50%;
    transform: translateX(-50%);
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 1px dashed rgba(56, 189, 248, 0.35);
    z-index: 6;
    pointer-events: none;
  }
</style>
</head>
<body>
  <div class="top-shade"></div>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>
  <div class="bg-glow-center"></div>
  <div class="grid-pattern"></div>
  
  <div class="decor-line-left"></div>
  <div class="decor-line-right"></div>

  <div class="content-wrapper">
    <div class="badge-tag">
      <span class="pulse-dot"></span>
      <span>創業限定 ‧ 鴻運算 AI STUDIO</span>
    </div>

    <h1 class="main-title">
      <span class="gradient-text">創業限定</span>
      <span class="badge-7off">雙 7 OFF</span>
      <span class="gradient-text">打造網站與 App</span>
    </h1>

    <!-- 雙 7 OFF 核心對照卡：完全吻合 index.html / it123.in -->
    <div class="dual-cards-row">
      <div class="benefit-card time-card">
        <div class="benefit-title">
          <span>⚡ 時間 <span class="accent-blue">70% OFF</span></span>
        </div>
        <div class="benefit-pill pill-time">最快 14 天交付 MVP</div>
      </div>
      <div class="benefit-card cost-card">
        <div class="benefit-title">
          <span>💎 成本 <span class="accent-green">70% OFF</span></span>
        </div>
        <div class="benefit-pill pill-cost">現省 15 - 30 萬</div>
      </div>
    </div>

    <!-- 網站核心解法與信任背書 -->
    <div class="trust-bar">
      <span class="highlight-badge">獨創雙引擎</span>
      <span style="opacity: 0.4;">|</span>
      <span>20 年架構師 ＋ AI 智能體把關</span>
      <span style="opacity: 0.4;">|</span>
      <span>歡迎全台盡情比價</span>
    </div>

    <!-- LINE 專屬行動引導 -->
    <div class="action-guide">
      <div class="action-bubble">
        <span class="arrow-down">👇</span>
        <span>點擊下方【聊天】免費取得「規格書 ＋ 互動原型」</span>
      </div>
    </div>
  </div>

  <div class="avatar-base-halo"></div>
  <div class="avatar-ring-guide"></div>
</body>
</html>`;

// 2. LINE 手機端實際呈現模擬圖 (Mockup Preview)
const previewHtml = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1080px;
    height: 1280px;
    background-color: #0d1117;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans TC', sans-serif;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }

  .cover-container {
    width: 1080px;
    height: 878px;
    position: relative;
    overflow: hidden;
  }
  .cover-img {
    width: 1080px;
    height: 878px;
    display: block;
  }

  .line-nav-bar {
    position: absolute;
    top: 25px;
    left: 40px;
    right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px;
    z-index: 50;
    color: #ffffff;
    text-shadow: 0 2px 8px rgba(0,0,0,0.8);
  }

  .profile-section {
    width: 1080px;
    position: relative;
    background: #111827;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 110px;
    padding-bottom: 50px;
    flex: 1;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .avatar-wrapper {
    position: absolute;
    top: -105px;
    left: 50%;
    transform: translateX(-50%);
    width: 210px;
    height: 210px;
    border-radius: 50%;
    background: #ffffff;
    border: 5px solid #111827;
    box-shadow: 0 12px 35px rgba(0,0,0,0.6), 0 0 25px rgba(56, 189, 248, 0.4);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 30;
  }
  .avatar-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .account-name {
    font-size: 38px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .verified-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: #10b981;
    border-radius: 50%;
    font-size: 16px;
    color: #ffffff;
  }
  .account-status {
    font-size: 20px;
    color: #94a3b8;
    margin-bottom: 26px;
  }

  .button-group {
    display: flex;
    gap: 20px;
    width: 80%;
    justify-content: center;
  }
  .line-btn-chat {
    flex: 1;
    max-width: 280px;
    height: 64px;
    background: #06c755;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    box-shadow: 0 8px 25px rgba(6, 199, 85, 0.35);
  }
  .line-btn-call {
    flex: 1;
    max-width: 280px;
    height: 64px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
  }
</style>
</head>
<body>
  <div class="cover-container">
    <div class="line-nav-bar">
      <span>‹</span>
      <span style="font-size: 22px; opacity: 0.85;">LINE 官方帳號</span>
      <span>⋮</span>
    </div>
    <img class="cover-img" src="file:///${outDir.replace(/\\/g, '/')}/line_cover_1080x878.png" />
  </div>

  <div class="profile-section">
    <div class="avatar-wrapper">
      <img src="file:///${outDir.replace(/\\/g, '/')}/line_logo_clean_640x640.png" />
    </div>
    <div class="account-name">
      <span>鴻運算 AI STUDIO</span>
      <span class="verified-badge">✓</span>
    </div>
    <div class="account-status">創業限定 ‧ 極速雙 7 OFF 打造網站與 App</div>

    <div class="button-group">
      <div class="line-btn-chat">
        <span>💬 聊天諮詢</span>
      </div>
      <div class="line-btn-call">
        <span>📞 免費通話</span>
      </div>
    </div>
  </div>
</body>
</html>`;

function render(html, w, h, tempName, finalName) {
  const tempHtml = path.join(tempDir, `${tempName}.html`);
  const tempPng = path.join(tempDir, `${tempName}.png`);
  const finalPng = path.join(outDir, finalName);

  fs.writeFileSync(tempHtml, html, 'utf8');

  const cmd = `"${chromePath}" --headless=new --no-sandbox --hide-scrollbars --window-size=${w},${h} --screenshot="${tempPng}" "file:///${tempHtml.replace(/\\/g, '/')}"`;

  execSync(cmd, { stdio: 'pipe' });

  if (fs.existsSync(tempPng)) {
    fs.copyFileSync(tempPng, finalPng);
    console.log(`Generated: ${finalName} (${w}x${h}, ${fs.statSync(finalPng).size} bytes)`);
  }
}

render(coverHtml, 1080, 878, 'line_cover', 'line_cover_1080x878.png');
render(previewHtml, 1080, 1280, 'line_cover_preview', 'line_cover_preview.png');

console.log('All complete!');
