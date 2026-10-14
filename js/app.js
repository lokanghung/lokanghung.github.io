/**
 * 鴻運算 ‧ 互動邏輯主程式 (App Core Logic)
 * 包含：動態渲染、雙軌切換、Demo 篩選、創業樣板彈窗、Google 表單串接、一鍵複製 LINE ID
 */

// 1. 雙軌流程切換 (手機版)
function switchProcessTrackM(track) {
  const standardBox = document.getElementById('track-standard-container-m');
  const coopBox = document.getElementById('track-coop-container-m');
  const standardBtn = document.getElementById('tab-btn-standard-m');
  const coopBtn = document.getElementById('tab-btn-coop-m');
  if (!standardBox || !coopBox || !standardBtn || !coopBtn) return;

  if (track === 'standard') {
    standardBox.classList.remove('hidden');
    standardBox.classList.add('flex');
    coopBox.classList.add('hidden');
    coopBox.classList.remove('flex');

    standardBtn.className = "px-4 py-2 rounded-xl font-sans text-xs sm:text-sm font-black transition-all bg-white text-primary shadow-xs border border-primary/20 flex items-center gap-1.5 cursor-pointer";
    coopBtn.className = "px-4 py-2 rounded-xl font-sans text-xs sm:text-sm font-black transition-all text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer";
  } else {
    standardBox.classList.add('hidden');
    standardBox.classList.remove('flex');
    coopBox.classList.remove('hidden');
    coopBox.classList.add('flex');

    standardBtn.className = "px-4 py-2 rounded-xl font-sans text-xs sm:text-sm font-black transition-all text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer";
    coopBtn.className = "px-4 py-2 rounded-xl font-sans text-xs sm:text-sm font-black transition-all bg-emerald-600 text-white shadow-xs border border-emerald-500 flex items-center gap-1.5 cursor-pointer";
  }
}

// 2. 雙軌流程切換 (桌機版)
function switchProcessTrackD(track) {
  const standardBox = document.getElementById('track-standard-container-d');
  const coopBox = document.getElementById('track-coop-container-d');
  const standardBtn = document.getElementById('tab-btn-standard-d');
  const coopBtn = document.getElementById('tab-btn-coop-d');

  if (!standardBox || !coopBox || !standardBtn || !coopBtn) return;

  if (track === 'standard') {
    standardBox.style.display = '';
    coopBox.style.display = 'none';

    // Standard Tab active
    standardBtn.className = "px-5 py-2.5 rounded-xl font-sans text-sm font-black transition-all bg-white text-primary shadow-xs border border-primary/20 flex items-center gap-2 cursor-pointer";
    coopBtn.className = "px-5 py-2.5 rounded-xl font-sans text-sm font-black transition-all text-slate-600 hover:text-slate-900 flex items-center gap-2 cursor-pointer";
  } else {
    coopBox.style.display = '';
    standardBox.style.display = 'none';

    // Coop Tab active
    coopBtn.className = "px-5 py-2.5 rounded-xl font-sans text-sm font-black transition-all bg-emerald-600 text-white shadow-md shadow-emerald-600/30 border border-emerald-500 flex items-center gap-2 cursor-pointer";
    standardBtn.className = "px-5 py-2.5 rounded-xl font-sans text-sm font-black transition-all text-slate-600 hover:text-slate-900 flex items-center gap-2 cursor-pointer";
  }
}

// 3. Demo 展示篩選 (同時支援手機版與桌機版)
function filterDemo(category) {
  const cards = document.querySelectorAll('.demo-card');
  const buttons = document.querySelectorAll('.demo-tab-btn');

  buttons.forEach(btn => {
    if (btn.getAttribute('data-cat') === category) {
      btn.classList.remove('bg-surface-container', 'text-on-surface-variant');
      btn.classList.add('bg-primary', 'text-white', 'shadow-sm');
    } else {
      btn.classList.add('bg-surface-container', 'text-on-surface-variant');
      btn.classList.remove('bg-primary', 'text-white', 'shadow-sm');
    }
  });

  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-cat') === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// 4. 創業樣板與 Modal 彈窗邏輯
let currentPresetKey = 'ecommerce';

function applyPreset(key) {
  currentPresetKey = key;
  const data = (typeof IDEA_PRESETS !== 'undefined') ? (IDEA_PRESETS[key] || IDEA_PRESETS.ecommerce) : null;
  const textarea = document.getElementById('user-prompt');
  if (textarea && data) {
    textarea.value = data.prompt;
    textarea.focus();
    textarea.classList.add('ring-2', 'ring-primary/40');
    setTimeout(() => {
      textarea.classList.remove('ring-2', 'ring-primary/40');
    }, 600);
  }
}

function openIdeaModal(key) {
  currentPresetKey = key;
  const data = (typeof IDEA_PRESETS !== 'undefined') ? (IDEA_PRESETS[key] || IDEA_PRESETS.ecommerce) : null;
  if (!data) return;

  const titleEl = document.getElementById('modal-title');
  const subEl = document.getElementById('modal-subtitle');
  const promptEl = document.getElementById('modal-prompt-text');
  const specsEl = document.getElementById('modal-specs-list');
  const protoEl = document.getElementById('modal-prototype-desc');

  if (titleEl) titleEl.textContent = data.title;
  if (subEl) subEl.textContent = data.subtitle;
  if (promptEl) promptEl.textContent = data.prompt;
  if (specsEl) specsEl.innerHTML = data.specs.map(item => '<div>' + item + '</div>').join('');
  if (protoEl) protoEl.textContent = data.proto;

  const modal = document.getElementById('idea-example-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeIdeaModal() {
  const modal = document.getElementById('idea-example-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function copyIdeaText() {
  const data = (typeof IDEA_PRESETS !== 'undefined') ? IDEA_PRESETS[currentPresetKey] : null;
  if (data && data.prompt) {
    navigator.clipboard.writeText(data.prompt).then(() => {
      const btn = document.getElementById('copy-idea-btn');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined text-[13px]">check</span>已複製';
        setTimeout(() => { btn.innerHTML = orig; }, 1500);
      }
    }).catch(() => { });
  }
}

function applyAndCloseModal() {
  const data = (typeof IDEA_PRESETS !== 'undefined') ? IDEA_PRESETS[currentPresetKey] : null;
  const textarea = document.getElementById('user-prompt');
  if (textarea && data) {
    textarea.value = data.prompt;
  }
  closeIdeaModal();
  const cta = document.getElementById('cta');
  if (cta) {
    cta.scrollIntoView({ behavior: 'smooth' });
  }
}

// 5. 一鍵複製 LINE ID 功能
function copyLineId() {
  const lineId = '@950iayru';
  const btnText = document.getElementById('copy-btn-text');
  const origText = btnText ? btnText.textContent : '複製 ID';

  function showSuccess() {
    if (btnText) {
      btnText.textContent = '已複製 ID！';
      setTimeout(function () {
        btnText.textContent = origText;
      }, 2000);
    }
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(lineId).then(showSuccess).catch(function () {
      fallbackCopy();
    });
  } else {
    fallbackCopy();
  }

  function fallbackCopy() {
    const tempInput = document.createElement('input');
    tempInput.value = lineId;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showSuccess();
  }
}

// 6. DOM 載入後自動執行渲染與事件綁定
document.addEventListener('DOMContentLoaded', function () {
  // 6.1 渲染桌機版 6 大 Demo 卡片
  const demoDesktop = document.getElementById('demo-cards-container');
  if (demoDesktop && typeof DEMO_ITEMS !== 'undefined') {
    demoDesktop.innerHTML = DEMO_ITEMS.map(item => `
      <a href="${item.href}" target="_blank"
        class="demo-card rounded-3xl bg-surface-container-lowest border border-surface-variant/90 shadow-[0_8px_24px_rgba(20,27,60,0.06)] overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        data-cat="${item.cat}">
        <div class="px-4 py-2.5 bg-surface-container-low border-b border-surface-variant/70 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <div class="flex gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
          </div>
          <h3 class="font-sans text-sm lg:text-base font-extrabold text-on-surface">${item.title}</h3>
          <span class="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-[10px] font-bold">${item.label}</span>
        </div>
        <div class="w-full aspect-[16/10] bg-surface-container relative overflow-hidden group">
          <img alt="${item.imgAlt}"
            class="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
            src="${item.img}" loading="lazy" decoding="async" />
        </div>
      </a>
    `).join('');
  }

  // 6.2 渲染手機版 6 大 Demo 卡片
  const demoMobile = document.getElementById('demo-cards-container-m');
  if (demoMobile && typeof DEMO_ITEMS !== 'undefined') {
    demoMobile.innerHTML = DEMO_ITEMS.map(item => `
      <a href="${item.href}" target="_blank"
        class="demo-card rounded-3xl bg-surface-container-lowest border border-surface-variant/90 shadow-[0_6px_24px_rgba(20,27,60,0.06)] overflow-hidden flex flex-col group transition-all cursor-pointer hover:shadow-lg"
        data-cat="${item.cat}">
        <div class="px-3.5 py-2.5 bg-surface-container-low border-b border-surface-variant/70 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <div class="flex gap-1">
              <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
          </div>
          <h3 class="font-sans text-[15px] font-extrabold text-on-surface">${item.title}</h3>
          <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-[9px] font-bold">${item.label}</span>
        </div>
        <div class="w-full aspect-[16/10] bg-surface-container relative overflow-hidden group">
          <img alt="${item.imgAlt}"
            class="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
            src="${item.img}" loading="lazy" decoding="async" />
        </div>
      </a>
    `).join('');
  }

  // 6.3 渲染桌機版 FAQ
  const faqDesktop = document.getElementById('faq-container-d');
  if (faqDesktop && typeof FAQ_ITEMS !== 'undefined') {
    faqDesktop.innerHTML = FAQ_ITEMS.map(item => `
      <details class="group bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:border-primary/40">
        <summary class="p-5 sm:p-6 flex items-center justify-between gap-4 font-sans font-black text-base sm:text-lg text-slate-900 cursor-pointer list-none select-none">
          <div class="flex items-center gap-3">
            <span class="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-black shrink-0">Q${item.id}</span>
            <span>${item.qDesktop}</span>
          </div>
          <span class="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0 text-2xl">expand_more</span>
        </summary>
        <div class="px-6 pb-6 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
          <p class="font-bold text-primary mb-1 text-base">${item.ansDesktopTitle}</p>
          <p>${item.ansDesktopDesc}</p>
        </div>
      </details>
    `).join('');
  }

  // 6.4 渲染手機版 FAQ
  const faqMobile = document.getElementById('faq-container-m');
  if (faqMobile && typeof FAQ_ITEMS !== 'undefined') {
    faqMobile.innerHTML = FAQ_ITEMS.map(item => `
      <details class="group bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all">
        <summary class="p-3.5 flex items-center justify-between gap-2.5 font-sans font-bold text-xs sm:text-sm text-slate-900 cursor-pointer list-none select-none">
          <div class="flex items-center gap-2">
            <span class="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-[10px] font-black shrink-0">Q${item.id}</span>
            <span>${item.qMobile}</span>
          </div>
          <span class="material-symbols-outlined text-slate-400 text-[18px] group-open:rotate-180 transition-transform duration-200 shrink-0">expand_more</span>
        </summary>
        <div class="px-3.5 pb-3.5 pt-1 text-[11px] sm:text-xs text-slate-600 leading-relaxed border-t border-slate-100">
          <p>${item.ansMobile}</p>
        </div>
      </details>
    `).join('');
  }

  // 6.5 手機漢堡選單切換
  const menuBtn = document.getElementById('mobile-menu-toggle-btn');
  const navPanel = document.getElementById('mobile-nav-panel');
  if (menuBtn && navPanel) {
    menuBtn.addEventListener('click', function () {
      navPanel.classList.toggle('hidden');
      navPanel.classList.toggle('flex');
    });
    navPanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        navPanel.classList.add('hidden');
        navPanel.classList.remove('flex');
      });
    });
  }

  // 6.6 點擊 Modal 外圍關閉視窗
  const ideaModal = document.getElementById('idea-example-modal');
  if (ideaModal) {
    ideaModal.addEventListener('click', function (e) {
      if (e.target === ideaModal) {
        closeIdeaModal();
      }
    });
  }

  // 6.7 Google Form 表單送出監聽
  const submitBtn = document.getElementById('submit-btn');
  const textarea = document.getElementById('user-prompt');
  if (submitBtn && textarea) {
    submitBtn.addEventListener('click', function () {
      const content = textarea.value.trim();
      if (!content) {
        textarea.focus();
        textarea.placeholder = '請先在此寫下一段話，即可免費獲得規格書！';
        return;
      }

      const userName = document.getElementById('user-name') ? document.getElementById('user-name').value.trim() : '';
      const userContact = document.getElementById('user-contact') ? document.getElementById('user-contact').value.trim() : '';
      const userEmail = document.getElementById('user-email') ? document.getElementById('user-email').value.trim() : '';

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">sync</span><span>資料傳送中...</span>';

      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeEy24FV_S-TJGJWY-v_6CkeKzTdtZ5xlAB1wrkk-xBjPoM1w/formResponse';
      const formData = new URLSearchParams();
      formData.append('entry.1322477265', content);
      formData.append('entry.108463740', userName);
      formData.append('entry.1834548566', userContact);
      formData.append('entry.443296380', userEmail);

      fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      }).catch(function (err) {
        console.error('Google Form submit error:', err);
      }).finally(function () {
        setTimeout(function () {
          submitBtn.innerHTML = '<span class="material-symbols-outlined text-lg text-secondary">check</span><span>規格書預約已成功送出！專人將於 24 小時內聯繫</span>';
          submitBtn.classList.remove('from-primary', 'via-primary-container', 'to-secondary', 'text-white');
          submitBtn.classList.add('bg-secondary-fixed', 'text-secondary', 'border', 'border-secondary-fixed-dim');
        }, 800);
      });
    });
  }
});
