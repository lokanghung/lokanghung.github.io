/**
 * 鴻運算 ‧ 網站資料集 (Data Store)
 * 存放 Demo 案例、FAQ 常見問題與創業樣板，與 HTML 結構解耦
 */

const DEMO_ITEMS = [
  {
    id: 1,
    cat: 'ecommerce',
    title: '電商購物系統',
    label: '1 / 電商',
    href: 'demo_ecommerce.html',
    img: 'images/img_054_1a279a054c.webp',
    imgAlt: '品牌電商購物系統'
  },
  {
    id: 2,
    cat: 'booking',
    title: '線上預約系統',
    label: '2 / 預約',
    href: 'demo_booking.html',
    img: 'images/img_085_6725cd671a.webp',
    imgAlt: '線上預約排程系統'
  },
  {
    id: 3,
    cat: 'membership',
    title: '會員成長系統',
    label: '3 / 會員',
    href: 'demo_membership.html',
    img: 'images/img_041_e6fb8c89a8.webp',
    imgAlt: '會員成長與忠誠度系統'
  },
  {
    id: 4,
    cat: 'crm',
    title: 'CRM 客戶管理系統',
    label: '4 / CRM',
    href: 'demo_crm.html',
    img: 'images/img_086_264febbc80.webp',
    imgAlt: 'CRM 客戶管理與銷售漏斗看板'
  },
  {
    id: 5,
    cat: 'order',
    title: '掃碼點餐系統',
    label: '5 / 點餐',
    href: 'demo_ordering.html',
    img: 'images/img_087_d0b2213275.webp',
    imgAlt: '智慧掃碼點餐系統'
  },
  {
    id: 6,
    cat: 'ai',
    title: 'AI 智能應用系統',
    label: '6 / AI智能',
    href: 'demo_ai.html',
    img: 'images/img_001_40b9d3d3e3.webp',
    imgAlt: 'AI 智能應用工作台與 Agent 編排'
  }
];

const FAQ_ITEMS = [
  {
    id: 1,
    qMobile: '原始碼與智慧財產權 (IP) 屬於誰？會被技術鎖定或加收費用嗎？',
    qDesktop: '系統的原始碼與智慧財產權 (IP) 屬於誰？日後會被技術鎖定或加收授權費嗎？',
    ansMobile: '<strong class="text-primary font-bold">100% 完整屬於創業者。</strong> 驗收完成後完整交付前後端原始代碼、資料庫架構與部署手冊，並直接部署於您指定的自有雲端平台（AWS / GCP / Cloudflare / Vercel）。無任何隱藏授權費用或技術鎖定，資產乾淨自主，創業者擁有 100% 主控權。',
    ansDesktopTitle: '100% 完整歸屬於創業者，絕無技術鎖定或隱藏授權費。',
    ansDesktopDesc: '專案驗收完成後，鴻運算完整交付前端代碼、後端 API、資料庫結構與部署指南。系統直接建置並部署於您自有的雲端主機（如 AWS / GCP / Cloudflare / Vercel），所有數位資產、用戶數據與智財權完全屬於貴公司，乾淨自主，您擁有絕對主控權。'
  },
  {
    id: 2,
    qMobile: '一人主理模式，未來系統維護擴充會不會無人接手？',
    qDesktop: '由頂級架構師主理的一人流水線模式，未來若要維護擴充，會不會找不到人接手？',
    ansMobile: '<strong class="text-primary font-bold">完全不會，全台正規工程師皆能無縫接手。</strong> 我們採用現代最主流的工業級開放標準（Next.js、TypeScript、Node.js、PostgreSQL、Docker）。由 20 年架構工藝把關，代碼清晰模組化並附完整架構說明書。日後您可自聘工程師維護，或找我們以時薪 NT$ 1,000 實報實銷改版。',
    ansDesktopTitle: '完全不會，我們全面採用全球主流工業級標準，全台灣正規工程師皆能無縫接手。',
    ansDesktopDesc: '我們堅決不用冷門或封閉式套件，核心技術棧一律採用現代標準（Next.js、TypeScript、Tailwind CSS、Node.js、PostgreSQL、Docker）。由 20 年架構經驗嚴格落實代碼分層、型別安全與架構文檔。未來您可自由聘請內部工程師維護，或隨時委託我們以「時薪 NT$ 1,000 實報實銷」進行升級，進退自如。'
  },
  {
    id: 3,
    qMobile: '為什麼堅持「時薪 NT$ 1,000」，而不是「統包一口價」？',
    qDesktop: '為什麼堅持「時薪 NT$ 1,000 透明實報實銷」，而不像一般外包報「統包一口價」？',
    ansMobile: '<strong class="text-primary font-bold">因為「統包一口價」往往隱含大量無效成本。</strong> 傳統外包報 50 萬一口價，實際上把 60%~70% 的風險預備金、無效工時與溝通耗損灌入報價中。鴻運算透過「畫面原型 100% 確認才動工」，消除返工損耗；施工階段時薪 NT$ 1,000 明碼標價、實做多少算多少，創業者實質現省 70% 冤枉費用。',
    ansDesktopTitle: '因為「統包一口價」往往是外包成本高昂與溝通爭議的核心根源。' ,
    ansDesktopDesc: '傳統外包報 50 萬統包一口價，背後必須灌入業務抽成、無效工時與高達 60% 的風險預備金。鴻運算打破傳統模式，透過「交付免費規格書與可操作畫面原型」，在動工前就將需求視覺化 100% 鎖定；動工後時薪 NT$ 1,000 實做多少算多少，工時公開透明，實質為創業者省下 70% 冤枉費用。'
  },
  {
    id: 4,
    qMobile: '最快 14 天交付，未來若達到百萬流量會不會需要推倒重寫？',
    qDesktop: '最快 14 天交付速度極快，未來若迎來百萬流量，系統會不會需要推倒重寫？',
    ansMobile: '<strong class="text-primary font-bold">完全不會！鋼骨底層由 20 年頂級架構工藝把關。</strong> AI 智能體只在架構藍圖內加速代碼編寫，微服務模組、資料庫正規化與高可用性架構均由架構師親自設計。系統具備高度橫向擴展能力，百萬流量亦能穩健支撐，無需重構。',
    ansDesktopTitle: '完全不用推倒重寫！因為鋼骨底層是由 20 年頂級架構工藝親自打造。',
    ansDesktopDesc: '單純依賴初階 AI 寫代碼容易拼湊雜亂架構，面臨擴展即崩潰；鴻運算的「雙引擎」是由資深架構師設計鋼骨底層、微服務模組、高可用性（HA）與快取策略，AI 智能體僅在藍圖內高效砌磚。這套工業級架構能穩健承載從種子期驗證到百萬級併發流量，無需承擔推倒重來的昂貴技術債。'
  },
  {
    id: 5,
    qMobile: '免費取得規格與畫面原型後，決定不做或拿去比價需要付費嗎？',
    qDesktop: '免費索取「系統規格書 ＋ 畫面原型」後，如果決定不做或拿去向其他人比價，需要付費嗎？',
    ansMobile: '<strong class="text-primary font-bold">完全免費 $0，無任何隱藏條款或合約綁定！</strong> 鴻運算提供免費第一步，就是讓您在支出任何成本前看清真實產品樣貌。這份規格書與畫面原型完全屬於您，歡迎充分拿去市場比價或作為決策依據，我們絕不疲勞轟炸推銷。',
    ansDesktopTitle: '完全免費 $0，無須簽約、無任何隱藏條款，歡迎充分比價。',
    ansDesktopDesc: '我們深知每一位創業者每一分資本都必須花在刀口上。鴻運算提供免費第一步，就是讓您在支出任何開發費用前，先看清楚產品的實際操作樣貌與精確規格。這份成果完全屬於您，您拿去市場比價或作為商業計劃書附件，我們都由衷尊重與祝福。'
  }
];

const IDEA_PRESETS = {
  ecommerce: {
    title: '創業方向：品牌電商購物系統',
    subtitle: '品牌商城 ‧ 會員紅利與金物流',
    prompt: '我想做：【創業項目】品牌電商購物系統\n1. 需求：小農茶葉線上商城，手機瀏覽與選購要絲滑\n2. 功能：會員累積紅利點數、滿千免運、商品分類搜尋\n3. 串接：LINE Pay / 信用卡結帳，後台自動印黑貓物流寄件單',
    specs: [
      '• 核心架構：商品型錄、分類篩選、會員中心、購物車結帳、庫存管理',
      '• 商業邏輯：會員階級累點機制、滿額折扣碼組合、訂單拆單運算',
      '• 串接架構：綠界/LINE Pay 金流 API、黑貓宅急便標籤列印 API'
    ],
    proto: '完成商品型錄、規格選購、購物車結帳、訂單物流追蹤等 5 套高擬真互動原型。'
  },
  booking: {
    title: '創業方向：美業線上預約系統',
    subtitle: '美髮沙龍 ‧ 時段預約與訂金收取',
    prompt: '我想做：【創業項目】線上預約排程系統\n1. 需求：沙龍客人手機挑選設計師、服務項目與時段\n2. 功能：線上刷卡預付 500 元訂金，防跑單\n3. 提醒：預約前一天自動發送 LINE 提醒推播通知',
    specs: [
      '• 核心架構：即時時段防撞演算法、設計師班表排程動態管理',
      '• 商業邏輯：預付訂金金流託管、取消退款規則、自動推播定時器',
      '• 串接架構：LINE Messaging API 官方帳號推播、信用卡 3D 驗證'
    ],
    proto: '完成服務選單、設計師作品集、月曆預約時段、訂金結帳等全流程互動原型。'
  },
  membership: {
    title: '創業方向：會員成長積點系統',
    subtitle: '連鎖門市 ‧ 任務集點與優惠券核銷',
    prompt: '我想做：【創業項目】連鎖門市會員積點系統\n1. 需求：門市結帳報手機號碼即可快速累積會員點數\n2. 功能：每週簽到/滿額小任務領優惠券、點數折抵消費\n3. 核銷：門市 POS 機掃碼核銷 QR Code 條碼',
    specs: [
      '• 核心架構：會員點數流水帳、任務觸發引擎、卡券核銷系統',
      '• 商業邏輯：點數效期到期提醒、階梯式優惠兌換、好友推薦雙向獎勵',
      '• 串接架構：門市 POS 點數查詢 API、掃碼核銷 QR Code 模組'
    ],
    proto: '完成會員點數儀表板、每週任務中心、優惠券票匣與條碼核銷擬真原型。'
  }
};
