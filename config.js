/* ============================================================
   config.js — KF_St 쇼핑몰 설정 & 상품 데이터
   index.html 에서 <script src="config.js"> 로 불러옵니다.
   ============================================================ */

/* ===== LOCAL THUMBNAIL BASE PATH ===== */
const LOCAL_BASE = '../01_Product_Master/DMC_터블,키친플래그 이미지자료/';

function localThumb(folder, file) {
  if (typeof folder === 'object') {
    /* 객체를 직접 받는 경우 (tower-logic / attacker 등) */
    const p = folder;
    /* ① 관리자 업로드 Base64 최우선 */
    if (p.thumbDataUrl) return p.thumbDataUrl;
    /* ② 로컬 폴더 썸네일 */
    const base = '../01_Product_Master/DMC_터블,키친플래그 이미지자료';
    return p.thumbFiles && p.thumbFiles.length
      ? `${base}/${p.folder}/썸네일/${p.thumbFiles[0]}`
      : `https://placehold.co/400x400/e0f0ff/003366?text=${encodeURIComponent(p.shortName || p.name)}`;
  }
  /* 폴더+파일 문자열 형태 */
  return LOCAL_BASE + folder + '/썸네일/' + file;
}

/* ===== MALL CONFIG =====
   ★ localStorage 값이 일부 필드만 있어도 기본값과 deep-merge해서 undefined 방지
   ============================================================ */
const _MALL_CONFIG_DEFAULTS = {
  mallName:    'KF_St',
  mallSubName: 'KitchenFlag Standard',
  heroTitle:   '주방의 기준을<br><em>새로</em> <span>씁니다</span>',
  heroDesc:    '키친플래그가 직접 기획한 8종의 프리미엄 PB 상품.<br>폐쇄몰 전용 특가로 지금 만나보세요.',
  noticeText:  '🔒 키친플래그 폐쇄몰 · 외부 공유 금지',
};
const MALL_CONFIG = Object.assign(
  {},
  _MALL_CONFIG_DEFAULTS,
  JSON.parse(localStorage.getItem('kfst_config') || 'null') || {}
);

/* ===== PRODUCT DATA =====
   ⚠️ cost 필드는 관리자 전용 — 고객 화면에 절대 렌더링 금지
   ============================================================ */
const PRODUCTS_DEFAULT = [
  {
    id: 0, name: '키친플래그 극세사 행주 5개입 세트', shortName: '극세사 행주 5개입 세트',
    category: '주방용품', price: 5300, originalPrice: 7900, cost: 5200, badge: 'BEST',
    folder: '키친플래그 극세사 행주 5개입 세트',
    thumbFiles: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'],
    detailImgs: [
      'https://gi.esmplus.com/dmcmedia/극세사행주_4/1.jpg','https://gi.esmplus.com/dmcmedia/극세사행주_4/2.jpg',
      'https://gi.esmplus.com/dmcmedia/극세사행주_4/3.jpg','https://gi.esmplus.com/dmcmedia/극세사행주_4/4.gif',
      'https://gi.esmplus.com/dmcmedia/극세사행주_4/5.gif','https://gi.esmplus.com/dmcmedia/극세사행주_4/6.jpg',
      'https://gi.esmplus.com/dmcmedia/극세사행주_4/6_02.gif','https://gi.esmplus.com/dmcmedia/극세사행주_4/7.jpg',
    ], hasOption: false, displayed: true,
  },
  {
    id: 1, name: '키친플래그 블랙 시그니처 칼가위 6종 세트', shortName: '블랙 시그니처 칼가위 6종 세트',
    category: '주방용품', price: 12900, originalPrice: 19900, cost: 11500, badge: 'NEW',
    folder: '키친플래그 블랙 시그니처 칼가위 6종 세트',
    thumbFiles: ['0.jpg','1.jpg','2.jpg','3.jpg'],
    detailImgs: [
      'https://gi.esmplus.com/dmcmedia/zz/1_01_01.jpg','https://gi.esmplus.com/dmcmedia/zz/1_01_03.jpg',
      'https://gi.esmplus.com/dmcmedia/zz/1_01_02.jpg','https://gi.esmplus.com/dmcmedia/zz/2_01.jpg',
    ], hasOption: false, displayed: true,
  },
  {
    id: 2, name: '키친플래그 스테인레스 304 냄비 3종 세트', shortName: '스테인레스 304 냄비 3종 세트',
    category: '주방용품', price: 29900, originalPrice: 44000, cost: 26000, badge: 'BEST',
    folder: '키친플래그 스테인레스 304 냄비 3종 세트',
    thumbFiles: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'],
    detailImgs: [
      'https://gi.esmplus.com/dmcmedia/냄비3세트_8/1.jpg','https://gi.esmplus.com/dmcmedia/냄비3세트_8/2.jpg',
      'https://gi.esmplus.com/dmcmedia/냄비3세트_8/3.gif','https://gi.esmplus.com/dmcmedia/냄비3세트_8/4.jpg',
      'https://gi.esmplus.com/dmcmedia/냄비3세트_8/5.gif','https://gi.esmplus.com/dmcmedia/냄비3세트_8/6.jpg',
      'https://gi.esmplus.com/dmcmedia/냄비3세트_8/7.gif','https://gi.esmplus.com/dmcmedia/냄비3세트_8/8.gif',
      'https://gi.esmplus.com/dmcmedia/냄비3세트_8/9.jpg','https://gi.esmplus.com/dmcmedia/냄비3세트_8/10.gif',
      'https://gi.esmplus.com/dmcmedia/냄비3세트_8/11.gif','https://gi.esmplus.com/dmcmedia/냄비3세트_8/12.gif',
      'https://gi.esmplus.com/dmcmedia/냄비3세트_8/13.jpg','https://gi.esmplus.com/dmcmedia/냄비3세트_8/14.gif',
      'https://gi.esmplus.com/dmcmedia/냄비3세트_8/15.jpg',
    ], hasOption: false, displayed: true,
  },
  {
    id: 3, name: '키친플래그 스테인레스304 밀폐찬통 8p 세트', shortName: '스테인레스304 밀폐찬통 8p',
    category: '주방용품', price: 13900, originalPrice: 19900, cost: 14200, badge: '',
    folder: '키친플래그 스테인레스304 밀폐찬통 8p 세트(350ml2ea, 550ml2ea)',
    thumbFiles: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'],
    detailImgs: [
      'https://gi.esmplus.com/dmcmedia/밀폐찬통_5/1.jpg','https://gi.esmplus.com/dmcmedia/밀폐찬통_5/2.jpg',
      'https://gi.esmplus.com/dmcmedia/밀폐찬통_5/3.gif','https://gi.esmplus.com/dmcmedia/밀폐찬통_5/4.jpg',
      'https://gi.esmplus.com/dmcmedia/밀폐찬통_5/5.gif','https://gi.esmplus.com/dmcmedia/밀폐찬통_5/6.gif',
      'https://gi.esmplus.com/dmcmedia/밀폐찬통_5/7.jpg','https://gi.esmplus.com/dmcmedia/밀폐찬통_5/8.gif',
      'https://gi.esmplus.com/dmcmedia/밀폐찬통_5/9.jpg','https://gi.esmplus.com/dmcmedia/밀폐찬통_5/10.gif',
      'https://gi.esmplus.com/dmcmedia/밀폐찬통_5/11.jpg',
    ], hasOption: false, displayed: true,
  },
  {
    id: 4, name: '키친플래그 스테인레스304 슬라이드 채반', shortName: '스테인레스304 슬라이드 채반',
    category: '주방용품', price: 10900, originalPrice: 16900, cost: 11000, badge: '',
    folder: '키친플래그 스테인레스304 슬라이드 채반',
    thumbFiles: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg'],
    detailImgs: [
      'https://gi.esmplus.com/dmcmedia/채반_8/1.jpg','https://gi.esmplus.com/dmcmedia/채반_8/2.jpg',
      'https://gi.esmplus.com/dmcmedia/채반_8/3.gif','https://gi.esmplus.com/dmcmedia/채반_8/4.jpg',
      'https://gi.esmplus.com/dmcmedia/채반_8/5.gif','https://gi.esmplus.com/dmcmedia/채반_8/6.jpg',
      'https://gi.esmplus.com/dmcmedia/채반_8/6_02.gif','https://gi.esmplus.com/dmcmedia/채반_8/7.jpg',
      'https://gi.esmplus.com/dmcmedia/채반_8/7_02.gif','https://gi.esmplus.com/dmcmedia/채반_8/8.jpg',
      'https://gi.esmplus.com/dmcmedia/채반_8/9.jpg',
    ], hasOption: false, displayed: true,
  },
  {
    id: 5, name: '키친플래그 오일스프레이 4p SET (220ml4p)', shortName: '오일스프레이 4p SET',
    category: '주방용품', price: 12900, originalPrice: 18900, cost: 9700, badge: 'BEST',
    folder: '키친플래그 오일스프레이 4p SET (220ml4p)',
    thumbFiles: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg'],
    detailImgs: [
      'https://gi.esmplus.com/dmcmedia/오일스프레이_6/1.jpg','https://gi.esmplus.com/dmcmedia/오일스프레이_6/2.gif',
      'https://gi.esmplus.com/dmcmedia/오일스프레이_6/3.jpg','https://gi.esmplus.com/dmcmedia/오일스프레이_6/4.gif',
      'https://gi.esmplus.com/dmcmedia/오일스프레이_6/5.jpg','https://gi.esmplus.com/dmcmedia/오일스프레이_6/6.jpg',
      'https://gi.esmplus.com/dmcmedia/오일스프레이_6/7.gif','https://gi.esmplus.com/dmcmedia/오일스프레이_6/7_2.gif',
      'https://gi.esmplus.com/dmcmedia/오일스프레이_6/8.jpg','https://gi.esmplus.com/dmcmedia/오일스프레이_6/9.jpg',
    ], hasOption: false, displayed: true,
  },
  {
    id: 6, name: '키친플래그 타포린백 분리수거함 3단 세트', shortName: '타포린백 분리수거함 3단 세트',
    category: '생활용품', price: 15900, originalPrice: 24900, cost: 8900, badge: 'BEST',
    folder: '키친플래그 타포린백 분리수거함 3단 세트',
    thumbFiles: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg'],
    detailImgs: [
      'https://gi.esmplus.com/dmcmedia/타포린백_4/1.jpg','https://gi.esmplus.com/dmcmedia/타포린백_4/2.jpg',
      'https://gi.esmplus.com/dmcmedia/타포린백_4/3.jpg','https://gi.esmplus.com/dmcmedia/타포린백_4/4.gif',
      'https://gi.esmplus.com/dmcmedia/타포린백_4/5.jpg','https://gi.esmplus.com/dmcmedia/타포린백_4/6.gif',
      'https://gi.esmplus.com/dmcmedia/타포린백_4/7.gif','https://gi.esmplus.com/dmcmedia/타포린백_4/7_02.gif',
      'https://gi.esmplus.com/dmcmedia/타포린백_4/8.jpg',
    ], hasOption: false, displayed: true,
  },
  {
    id: 7, name: '키친플래그 홈 소프트 데일리 미니타월 2p 세트', shortName: '홈 소프트 미니타월 2p 세트',
    category: '생활용품', price: 8900, originalPrice: 13900, cost: 8600, badge: 'NEW',
    folder: '키친플래그 홈 소프트 데일리 미니타월 2p 세트',
    thumbFiles: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'],
    detailImgs: [
      'https://gi.esmplus.com/dmcmedia/타월_04/1.jpg','https://gi.esmplus.com/dmcmedia/타월_04/2.jpg',
      'https://gi.esmplus.com/dmcmedia/타월_04/3.jpg','https://gi.esmplus.com/dmcmedia/타월_04/4.jpg',
      'https://gi.esmplus.com/dmcmedia/타월_04/5.gif','https://gi.esmplus.com/dmcmedia/타월_04/6.jpg',
      'https://gi.esmplus.com/dmcmedia/타월_04/7.jpg','https://gi.esmplus.com/dmcmedia/타월_04/8.gif',
      'https://gi.esmplus.com/dmcmedia/타월_04/9.jpg','https://gi.esmplus.com/dmcmedia/타월_04/10.jpg',
    ], hasOption: true, options: ['딥브라운+딥브라운스트라이프', '아이보리+핑크스트라이프'], displayed: true,
  },
];

/* ===== PRODUCTS_MAP (ID 빠른 조회) ===== */
const PRODUCTS_MAP = {};
PRODUCTS_DEFAULT.forEach(p => { PRODUCTS_MAP[p.id] = p; });

/* ===== products (런타임 — admin 덮어쓰기 병합) =====
   ★ PRODUCTS_DEFAULT에 없는 신규 상품(관리자 등록) 도 자동 추가
   ============================================================ */
let products = JSON.parse(JSON.stringify(PRODUCTS_DEFAULT));
const _savedProducts = JSON.parse(localStorage.getItem('kfst_products') || 'null');
if (_savedProducts) {
  _savedProducts.forEach(sp => {
    const p = products.find(x => x.id === sp.id);
    if (p) {
      /* 기존 상품 — 저장된 값으로 덮어쓰기 */
      Object.assign(p, sp);
    } else {
      /* 신규 상품 (관리자에서 추가한 상품) — 배열에 append */
      products.push(Object.assign({
        shortName: sp.name, category: '주방용품',
        folder: '', thumbFiles: [], detailImgs: [],
        hasOption: false, displayed: true,
      }, sp));
    }
  });
}
