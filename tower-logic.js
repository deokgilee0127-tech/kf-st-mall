/* ============================================================
   tower-logic.js — 관제탑(tower.html) ↔ 폐쇄몰(index.html) 실시간 동기화 로직
   config.js 가 먼저 로드된 후 이 파일을 불러와야 합니다.

   ▣ 동기화 이중 안전망:
     1) BroadcastChannel — 같은 브라우저 내 탭 간 즉시 통신 (지연 0ms)
     2) setInterval 2초 폴링 — 백업. BroadcastChannel 미지원 환경 대비
     3) window.addEventListener('storage') — 다른 브라우저 창 열 경우 대비
   ============================================================ */

/* ── BroadcastChannel 수신 (관제탑이 쏜 메시지를 즉시 받음) ── */
let _bc = null;
try {
  _bc = new BroadcastChannel('kfst_sync');
  _bc.onmessage = function(e) {
    if (e.data && (e.data.key === 'kfst_config' || e.data.key === 'kfst_products')) {
      liveSync();
    }
  };
} catch(e) { /* BroadcastChannel 미지원 브라우저 대비 */ }

/* ── 현재 스냅샷 (폴링 중복 방지) ── */
let _syncSnapshot = {
  cfg:  localStorage.getItem('kfst_config')   || '',
  prod: localStorage.getItem('kfst_products') || '',
};

/* ===========================================
   CONFIG 적용
   =========================================== */
function applyCfgLive(cfg) {
  const nb = document.getElementById('notice-bar');
  const ht = document.getElementById('hero-title');
  const hd = document.getElementById('hero-desc');

  if (cfg.noticeText && nb) nb.textContent = cfg.noticeText;
  if (cfg.heroTitle  && ht) ht.innerHTML  = cfg.heroTitle;
  if (cfg.heroDesc   && hd) hd.innerHTML  = cfg.heroDesc;

  /* 이달의 공격수 변경 */
  if (cfg.attackerId !== undefined) {
    const pid = cfg.attackerId;
    const def = PRODUCTS_MAP[pid];
    if (!def) return;
    const cur = products.find(x => x.id === pid) || def;
    const pct = cur.originalPrice
      ? Math.round((1 - cur.price / cur.originalPrice) * 100)
      : 0;

    const atkTitle  = document.getElementById('atk-title');
    const atkPrice  = document.getElementById('atk-price');
    const atkPct    = document.getElementById('atk-pct');
    const atkBadge  = document.getElementById('atk-badge');
    const atkImg    = document.getElementById('atk-img');
    const atkDetail = document.getElementById('atk-detail-btn');
    const atkCart   = document.getElementById('atk-cart-btn');

    if (atkTitle) atkTitle.innerHTML = (def.shortName || def.name).replace(/\s(\S+)$/, '<br>$1');
    if (atkPrice) atkPrice.textContent = cur.price.toLocaleString() + '원';
    if (atkPct)   atkPct.textContent   = pct + '%↓';
    if (atkBadge) atkBadge.textContent = cur.badge || 'HOT';
    if (atkImg) {
      atkImg.src     = localThumb(def);
      atkImg.alt     = def.shortName || def.name;
      atkImg.onclick = () => openProduct(pid);
    }
    if (atkDetail) atkDetail.onclick = () => openProduct(pid);
    if (atkCart)   atkCart.onclick   = () => {
      addToCart(products.find(x => x.id === pid) || cur);
      openCart();
    };

    /* 공격수 섹션 플래시 */
    const section = document.getElementById('attacker');
    if (section) {
      section.style.transition = 'opacity .3s';
      section.style.opacity    = '0';
      setTimeout(() => { section.style.opacity = '1'; }, 300);
    }
  }
}

/* ===========================================
   PRODUCTS 적용
   =========================================== */
function applyProductsLive(saved) {
  products = JSON.parse(JSON.stringify(PRODUCTS_DEFAULT));
  if (saved) saved.forEach(sp => {
    const p = products.find(x => x.id === sp.id);
    if (p) Object.assign(p, sp);
  });
  renderGrid();
  renderSlider();
}

/* ===========================================
   공지바 플래시 인디케이터
   ★ 원래 텍스트를 백업 후 복원해서 덮어쓰기 방지
   =========================================== */
function flashNotice(text) {
  const bar = document.getElementById('notice-bar');
  if (!bar) return;
  const savedText  = bar.textContent;   /* ← 현재 공지 텍스트 백업 */
  const savedBg    = bar.style.background;
  const savedColor = bar.style.color;
  bar.style.transition = 'background .3s';
  bar.style.background = '#ffd700';
  bar.style.color      = '#1a2636';
  bar.textContent      = '🔄 ' + text;
  setTimeout(() => {
    /* 4초 뒤 원래 공지로 복원 */
    bar.style.background = savedBg    || '';
    bar.style.color      = savedColor || '';
    /* notice-bar 텍스트는 applyCfgLive 가 이미 갱신했으므로 재조회 */
    const latest = JSON.parse(localStorage.getItem('kfst_config') || '{}');
    bar.textContent = latest.noticeText || savedText;
  }, 4000);
}

/* ===========================================
   핵심 동기화 함수 — liveSync()
   BroadcastChannel / storage 이벤트 / 폴링 모두 이 함수를 부름
   =========================================== */
function liveSync() {
  try {
    const cfgRaw  = localStorage.getItem('kfst_config')   || '';
    const prodRaw = localStorage.getItem('kfst_products') || '';

    if (cfgRaw !== _syncSnapshot.cfg) {
      _syncSnapshot.cfg = cfgRaw;
      const cfg = JSON.parse(cfgRaw || '{}');
      applyCfgLive(cfg);
      if (cfg.noticeText) flashNotice('관제탑 지시 적용: ' + cfg.noticeText);
    }

    if (prodRaw !== _syncSnapshot.prod) {
      _syncSnapshot.prod = prodRaw;
      const saved = JSON.parse(prodRaw || 'null');
      applyProductsLive(saved);
      flashNotice('관제탑 지시: 상품 정보 업데이트 완료!');
    }
  } catch (e) { /* silent */ }
}

/* ── 안테나 ①: BroadcastChannel (같은 브라우저 탭 간 즉시) ── */
/* → _bc.onmessage 에서 위에 이미 등록 완료 */

/* ── 안테나 ②: storage 이벤트 (다른 브라우저 창 간, Chrome 등) ── */
window.addEventListener('storage', function(e) {
  if (e.key === 'kfst_config' || e.key === 'kfst_products') {
    liveSync();
  }
});

/* ── 안테나 ③: 2초 폴링 백업 (file:// 환경, 구형 브라우저 등) ── */
setInterval(liveSync, 2000);
