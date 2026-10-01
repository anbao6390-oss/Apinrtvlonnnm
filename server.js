const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const MAX_SESSIONS = 50;
const PREDS_FILE = path.join('/tmp', 'preds.json');

const KW = 'c806cf04a7fdf1cace25db6c7a8bdd8e048242145ee726dc';
const PX = 'https://solo-relationship-calls-accuracy.trycloudflare.com';
const API_CONFIGS = {
  1: { name: "SUNWIN", brand: "SUNWIN", kind: "TX", urls: ["https://apisunwin-cocalhahaha.onrender.com/api/sunwin"], algorithm: "sunwin" },
  2: { name: "LC79-MD5", brand: "LC79", kind: "MD5", urls: ["https://wtxmd52.tele68.com/v1/txmd5/lite-sessions", "https://wtxmd52.tele68.com/v1/txmd5/sessions"], algorithm: "predictPattern" },
  3: { name: "MAX789", brand: "MAX789", kind: "MD5", urls: ["https://taixiumd5.maksh3979madfw.com/api/md5luckydice/GetSoiCau"], algorithm: "predictPattern" },
  4: { name: "HITCLUB", brand: "HITCLUB", kind: "MD5 · DỰ ĐOÁN API", urls: ["https://apihitclubmd5-x6r3.onrender.com/"], algorithm: "predictPattern", upstream: true },
  5: { name: "68GB", brand: "68GB", kind: "MD5", urls: ["https://gbmd5-4a69a-default-rtdb.asia-southeast1.firebasedatabase.app/taixiu_sessions.json"], algorithm: "g68" },
  6: { name: "SUMCLUB", brand: "SUMCLUB", kind: "TX", urls: ["https://taixiu1.apisum.pro/api/luckydice/GetSoiCau", "https://kwinstore.com/sumclub/tx/history/" + KW], algorithm: "predictPattern" },
  7: { name: "RIKVIP", brand: "RIKVIP", kind: "TX 2", urls: ["https://kwinstore.com/rikvip/tx/history/" + KW], algorithm: "predictPattern" },
  8: { name: "SICSUN", brand: "SICSUN", kind: "SICBO", urls: ["https://api.wsktnus8.net/v2/history/getLastResult?gameId=ktrng_3979&size=100&tableId=39791215743193&curPage=1"], algorithm: "predictPattern" },
  9: { name: "LC79-HU", brand: "LC79", kind: "HŨ", urls: ["https://wtx.tele68.com/v1/tx/lite-sessions", "https://wtx.tele68.com/v1/tx/sessions"], algorithm: "predictPattern" },
  10: { name: "BETVIP-MD5", brand: "BETVIP", kind: "MD5", urls: ["https://wtxmd52.macminim6.online/v1/txmd5/sessions"], algorithm: "betvip" },
  11: { name: "BETVIP-HU", brand: "BETVIP", kind: "HŨ", urls: ["https://wtx.macminim6.online/v1/tx/sessions"], algorithm: "betvip" },
  12: { name: "MAX789-HU", brand: "MAX789", kind: "HŨ", urls: ["https://taixiu.maksh3979madfw.com/api/luckydice/GetSoiCau"], algorithm: "predictPattern" },
  13: { name: "MAX789-LIVE", brand: "MAX789", kind: "LIVE", urls: ["https://txkubet.maksh3979madfw.com/api/taixiukubet/GetSoiCau"], algorithm: "predictPattern" },
  14: { name: "XOCLO88", brand: "XOCLO88", kind: "MD5", urls: ["https://taixiumd5.system32-cloudfare-356783752985678522.monster/api/md5luckydice/GetSoiCau"], algorithm: "predictPattern" },
  15: { name: "B52", brand: "B52", kind: "TX · DỰ ĐOÁN API", urls: ["https://b52-taixiu-l69b.onrender.com/api/taixiu"], algorithm: "predictPattern", upstream: true },
  16: { name: "SICHIT", brand: "SICHIT", kind: "SICBO", urls: ["https://api.wsmt8g.cc/v2/history/getLastResult?gameId=ktrng_3932&size=120&tableId=39321215743193&curPage=1"], algorithm: "predictPattern" },
  17: { name: "LUCK8-TX", brand: "LUCK8", kind: "TX", urls: [PX + "/luck8/his/tx"], algorithm: "predictPattern", generic: true },
  18: { name: "LUCK8-MD5", brand: "LUCK8", kind: "MD5", urls: [PX + "/luck8/his/md5"], algorithm: "predictPattern", generic: true },
  19: { name: "LUCK8-SICBO", brand: "LUCK8", kind: "SICBO 30S", urls: [PX + "/sicbo/luck8-30s/his"], algorithm: "predictPattern", generic: true },
  20: { name: "XOCDIA88-HU", brand: "XOCDIA88", kind: "HŨ", urls: [PX + "/xocdia88/api/tx/history"], algorithm: "predictPattern", generic: true },
  21: { name: "XOCDIA88-MD5", brand: "XOCDIA88", kind: "MD5", urls: [PX + "/xocdia88/api/md5/history"], algorithm: "predictPattern", generic: true },
  22: { name: "789CLUB-TX", brand: "789CLUB", kind: "TX", urls: [PX + "/789club/api/789/history"], algorithm: "predictPattern", generic: true },
  23: { name: "789CLUB-SICBO", brand: "789CLUB", kind: "SICBO", urls: [PX + "/sicbo/789club/his"], algorithm: "predictPattern", generic: true },
  24: { name: "B52-TX", brand: "B52", kind: "TX", urls: [PX + "/b52/his/tx"], algorithm: "predictPattern", generic: true },
  25: { name: "B52-MD5", brand: "B52", kind: "MD5", urls: [PX + "/b52/his/md5"], algorithm: "predictPattern", generic: true },
  26: { name: "B52-SICBO", brand: "B52", kind: "SICBO", urls: [PX + "/sicbo/b52/his"], algorithm: "predictPattern", generic: true },
  27: { name: "HITCLUB-TX", brand: "HITCLUB", kind: "TX", urls: [PX + "/hitclub/his/tx"], algorithm: "predictPattern", generic: true },
  28: { name: "HITCLUB-MD5", brand: "HITCLUB", kind: "MD5", urls: [PX + "/hitclub/his/md5"], algorithm: "predictPattern", generic: true },
  29: { name: "HITCLUB-SICBO", brand: "HITCLUB", kind: "SICBO", urls: [PX + "/sicbo/hitclub/his"], algorithm: "predictPattern", generic: true },
  30: { name: "HOT789-TX", brand: "HOT789", kind: "TX", urls: [PX + "/hot789/api/tx/history"], algorithm: "predictPattern", generic: true },
  31: { name: "HOT789-MD5", brand: "HOT789", kind: "MD5", urls: [PX + "/hot789/api/md5/history"], algorithm: "predictPattern", generic: true },
  32: { name: "RIKVIP-TX", brand: "RIKVIP", kind: "TX", urls: [PX + "/rikvip/his/tx"], algorithm: "predictPattern", generic: true },
  33: { name: "RIKVIP-MD5", brand: "RIKVIP", kind: "MD5", urls: [PX + "/rikvip/his/md5"], algorithm: "predictPattern", generic: true },
  34: { name: "RIKVIP-SICBO", brand: "RIKVIP", kind: "SICBO", urls: [PX + "/sicbo/rikvip/his"], algorithm: "predictPattern", generic: true }
};
const BRAND_ORDER = ['SUNWIN', 'LC79', 'MAX789', 'HITCLUB', 'SUMCLUB', 'BETVIP', 'LUCK8', 'XOCDIA88', '789CLUB', 'B52', 'HOT789', 'RIKVIP', '68GB', 'SICSUN', 'SICHIT', 'XOCLO88'];
const KIND_ORDER = ['TX', 'HŨ', 'MD5', 'LIVE', 'SICBO'];

/* =====================================================================
   SIÊU ENSEMBLE ĐA CHUYÊN GIA - MULTI-EXPERT ENSEMBLE PREDICTOR
   ---------------------------------------------------------------------
   Triết lý: KHÔNG trọng số cố định. KHÔNG thiên vị Tài/Xỉu. KHÔNG bẻ
   cầu máy móc. Mỗi chuyên gia tự đánh giá độ tin cậy từ dữ liệu thực,
   hợp nhất bằng confidence-weighted voting (bỏ phiếu theo độ tin cậy).
   ===================================================================== */

function _seqFrom(hist, maxLen) {
  if (!hist || !hist.length) return [];
  const raw = hist.slice(0, maxLen).map(d => d["kết quả"]);
  raw.reverse();
  return raw.filter(x => x === 'Tài' || x === 'Xỉu');
}

/* 1. Markov bậc N: P(next | N ký hiệu gần nhất) */
function _expMarkov(seq, order) {
  if (seq.length < order + 5) return null;
  const ctx = seq.slice(-order).join('');
  const lastSym = seq[seq.length - 1];
  let cSame = 0, cDiff = 0, total = 0;
  for (let i = 0; i + order < seq.length; i++) {
    if (seq.slice(i, i + order).join('') === ctx) {
      if (seq[i + order] === lastSym) cSame++; else cDiff++;
      total++;
    }
  }
  if (total < 2) return null;
  const pSame = cSame / total;
  const edge = Math.abs(pSame - 0.5) * 2;
  const conf = edge * Math.min(1, total / 8) * (1 + order * 0.15);
  if (conf < 0.05) return null;
  const pred = pSame > 0.5 ? lastSym : (lastSym === 'Tài' ? 'Xỉu' : 'Tài');
  return { pred, conf: Math.min(conf, 1.5) };
}

/* 2. N-gram khớp mẫu tuyệt đối */
function _expNgram(seq, n) {
  if (seq.length < n + 4) return null;
  const ctx = seq.slice(-n).join('');
  let cTai = 0, cXiu = 0, total = 0;
  for (let i = 0; i + n < seq.length; i++) {
    if (seq.slice(i, i + n).join('') === ctx) {
      if (seq[i + n] === 'Tài') cTai++; else cXiu++;
      total++;
    }
  }
  if (total < 1) return null;
  const edge = Math.abs(cTai - cXiu) / total;
  const conf = edge * Math.min(1, total / 4) * (1 + n * 0.05);
  if (conf < 0.05) return null;
  return { pred: cTai >= cXiu ? 'Tài' : 'Xỉu', conf: Math.min(conf, 1.5) };
}

/* 3. Tương đồng mờ: đuôi hiện tại vs mọi vị trí lịch sử (soft-match) */
function _expSimilarity(seq, k) {
  if (seq.length < k + 12) return null;
  const tail = seq.slice(-k);
  let wTai = 0, wXiu = 0, totalW = 0;
  for (let i = 0; i + k < seq.length; i++) {
    const win = seq.slice(i, i + k);
    let match = 0;
    for (let j = 0; j < k; j++) if (win[j] === tail[j]) match++;
    const sim = match / k;
    if (sim < 0.6) continue;
    const w = sim * sim * sim;
    if (seq[i + k] === 'Tài') wTai += w; else wXiu += w;
    totalW += w;
  }
  if (totalW < 0.4) return null;
  const pTai = wTai / totalW;
  const edge = Math.abs(pTai - 0.5) * 2;
  const conf = edge * Math.min(1, totalW / 4) * 0.9;
  if (conf < 0.05) return null;
  return { pred: pTai > 0.5 ? 'Tài' : 'Xỉu', conf: Math.min(conf, 1.5) };
}

/* 4. Streak data-driven: KHÔNG bẻ cầu cứng, dùng phân bố lịch sử */
function _expStreak(seq) {
  if (seq.length < 12) return null;
  const lastSym = seq[seq.length - 1];
  let curLen = 1;
  for (let i = seq.length - 2; i >= 0 && seq[i] === lastSym; i--) curLen++;

  const runLens = [];
  let run = 0;
  const cutoff = seq.length - curLen;
  for (let i = 0; i < cutoff; i++) {
    if (seq[i] === lastSym) run++;
    else { if (run > 0) runLens.push(run); run = 0; }
  }
  if (run > 0) runLens.push(run);
  if (runLens.length < 4) return null;

  const reached = runLens.filter(l => l >= curLen).length;
  const exceeded = runLens.filter(l => l > curLen).length;
  if (reached < 2) return null;
  const pContinue = exceeded / reached;

  const edge = Math.abs(pContinue - 0.5) * 2;
  const conf = edge * Math.min(1, reached / 6) * 0.95;
  if (conf < 0.05) return null;

  if (pContinue > 0.5) return { pred: lastSym, conf };
  return { pred: lastSym === 'Tài' ? 'Xỉu' : 'Tài', conf };
}

/* 5. Alternation - phải được lịch sử xác nhận mới tin */
function _expAlternation(seq) {
  if (seq.length < 10) return null;
  const L = Math.min(7, seq.length);
  const tail = seq.slice(-L);
  let ac = 0;
  for (let i = 1; i < L; i++) if (tail[i] !== tail[i - 1]) ac++;
  if (ac / (L - 1) < 0.85) return null;

  let contCount = 0, breakCount = 0;
  for (let i = 0; i + L < seq.length; i++) {
    const w = seq.slice(i, i + L);
    let a = 0;
    for (let j = 1; j < L; j++) if (w[j] !== w[j - 1]) a++;
    if (a / (L - 1) >= 0.85) {
      if (seq[i + L] !== w[L - 1]) contCount++; else breakCount++;
    }
  }
  const total = contCount + breakCount;
  if (total < 2) return null;
  const pCont = contCount / total;
  const edge = Math.abs(pCont - 0.5) * 2;
  const conf = edge * Math.min(1, total / 5) * 0.85;
  if (conf < 0.05) return null;
  if (pCont > 0.5) return { pred: tail[L - 1] === 'Tài' ? 'Xỉu' : 'Tài', conf };
  return { pred: tail[L - 1], conf };
}

/* 6. Bayesian Dirichlet bậc 1 */
function _expBayes(seq) {
  if (seq.length < 8) return null;
  const lastSym = seq[seq.length - 1];
  let aSame = 1, aDiff = 1;
  for (let i = 0; i < seq.length - 1; i++) {
    if (seq[i] === lastSym) {
      if (seq[i + 1] === lastSym) aSame++; else aDiff++;
    }
  }
  const total = aSame + aDiff - 2;
  if (total < 4) return null;
  const pSame = aSame / (aSame + aDiff);
  const edge = Math.abs(pSame - 0.5) * 2;
  const conf = edge * Math.min(1, total / 12);
  if (conf < 0.05) return null;
  const pred = pSame > 0.5 ? lastSym : (lastSym === 'Tài' ? 'Xỉu' : 'Tài');
  return { pred, conf };
}

/* 7. Z-score tần suất (mean reversion data-driven) */
function _expFrequencyZ(seq) {
  if (seq.length < 20) return null;
  const n = seq.length;
  const cTai = seq.filter(x => x === 'Tài').length;
  const p = cTai / n;
  const z = (p - 0.5) / Math.sqrt(0.25 / n);
  if (Math.abs(z) < 1.6) return null;
  const conf = Math.min(0.6, (Math.abs(z) - 1.6) * 0.18);
  if (conf < 0.05) return null;
  return { pred: z > 0 ? 'Xỉu' : 'Tài', conf };
}

/* 8. Recency exponential (momentum có trọng số thời gian) */
function _expRecencyFreq(seq) {
  if (seq.length < 10) return null;
  let wTai = 0, wXiu = 0, w = 1;
  for (let i = seq.length - 1; i >= 0; i--) {
    if (seq[i] === 'Tài') wTai += w; else wXiu += w;
    w *= 0.9;
  }
  const total = wTai + wXiu;
  if (total < 1) return null;
  const pTai = wTai / total;
  const edge = Math.abs(pTai - 0.5);
  if (edge < 0.12) return null;
  return { pred: pTai > 0.5 ? 'Tài' : 'Xỉu', conf: Math.min(0.6, edge * 1.2) };
}

/* 9. Entropy bigram: chỉ tin khi chuỗi có cấu trúc thực sự */
function _expEntropy(seq) {
  if (seq.length < 15) return null;
  const counts = {};
  for (let i = 0; i < seq.length - 1; i++) {
    const bg = seq[i][0] + seq[i + 1][0];
    counts[bg] = (counts[bg] || 0) + 1;
  }
  const total = seq.length - 1;
  let H = 0;
  for (const k in counts) {
    const p = counts[k] / total;
    H -= p * Math.log2(p);
  }
  const normH = H / 2;
  if (normH > 0.92) return null;
  const lastBg = seq[seq.length - 2][0] + seq[seq.length - 1][0];
  let cTai = 0, cXiu = 0;
  for (let i = 0; i < seq.length - 2; i++) {
    if (seq[i][0] + seq[i + 1][0] === lastBg) {
      if (seq[i + 2] === 'Tài') cTai++; else cXiu++;
    }
  }
  const tot2 = cTai + cXiu;
  if (tot2 < 2) return null;
  const edge = Math.abs(cTai - cXiu) / tot2;
  const conf = edge * (1 - normH) * Math.min(1, tot2 / 6) * 1.1;
  if (conf < 0.05) return null;
  return { pred: cTai > cXiu ? 'Tài' : 'Xỉu', conf: Math.min(conf, 1.2) };
}

/* Hợp nhất ensemble - bỏ phiếu có trọng số ĐỘNG */
function _predictEnsemble(hist) {
  const seq = _seqFrom(hist, 90);
  if (seq.length < 6) return null;

  const experts = [];
  for (let o = 1; o <= 4; o++) { const e = _expMarkov(seq, o); if (e) experts.push(e); }
  for (let n = 3; n <= 5; n++) { const e = _expNgram(seq, n); if (e) experts.push(e); }
  for (let k = 4; k <= 7; k++) { const e = _expSimilarity(seq, k); if (e) experts.push(e); }

  const add = e => { if (e) experts.push(e); };
  add(_expStreak(seq));
  add(_expAlternation(seq));
  add(_expBayes(seq));
  add(_expFrequencyZ(seq));
  add(_expRecencyFreq(seq));
  add(_expEntropy(seq));

  if (!experts.length) return null;

  let tai = 0, xiu = 0;
  for (const e of experts) {
    if (e.pred === 'Tài') tai += e.conf;
    else if (e.pred === 'Xỉu') xiu += e.conf;
  }
  const total = tai + xiu;
  if (total <= 1e-9) return null;

  let pred;
  if (Math.abs(tai - xiu) < 1e-6) {
    pred = seq[seq.length - 1] === 'Tài' ? 'Xỉu' : 'Tài';
  } else {
    pred = tai > xiu ? 'Tài' : 'Xỉu';
  }

  const dom = Math.max(tai, xiu) / total;
  const strength = Math.min(1, total / 4);
  const confidence = 50 + 47 * (2 * dom - 1) * (0.6 + 0.4 * strength);

  return { pred, conf: confidence, tai, xiu, nExperts: experts.length };
}

function predictPattern(phien, hist) {
  const r = _predictEnsemble(hist);
  if (r) return r.pred;
  // Fallback cổ điển khi thiếu dữ liệu
  if (!hist || hist.length < 5) return (phien % 2 === 0) ? 'Tài' : 'Xỉu';
  const recent = hist.slice(0, 5).map(d => d["kết quả"]).reverse();
  let isAlt = true;
  for (let i = 0; i < 4; i++) if (recent[i] === recent[i + 1]) { isAlt = false; break; }
  if (isAlt) return recent[4] === 'Tài' ? 'Xỉu' : 'Tài';
  return recent[4];
}

const _avg = a => a.reduce((x, y) => x + y, 0) / (a.length || 1);
const _sumOf = it => { const d = diceOf(it); return it.tong || (d.length === 3 ? d[0] + d[1] + d[2] : 0); };
const _opp = v => (v === 'Tài' ? 'Xỉu' : 'Tài');

// SUNWIN: theo sunwin.txt (Markov + pattern 2-5 + điểm TB + bệt + zigzag), bỏ phần random
function algoSunwin(phien, hist) {
  const s = _seqFrom(hist, 200).map(x => (x === 'Tài' ? 'T' : 'X'));
  if (s.length < 5) return s.length ? _opp(s[s.length - 1] === 'T' ? 'Tài' : 'Xỉu') : null;
  const last = s[s.length - 1];
  let score = 0, TT = 0, TX = 0, XX = 0, XT = 0;
  for (let i = 0; i + 1 < s.length; i++) { const a = s[i] + s[i + 1]; if (a === 'TT') TT++; else if (a === 'TX') TX++; else if (a === 'XX') XX++; else XT++; }
  if (last === 'T') { if (TT + TX > 0) score += (0.5 - TT / (TT + TX)) * 3.0; }
  else if (XX + XT > 0) score += (XT / (XX + XT) - 0.5) * 3.0;
  const W = { 2: 2.6, 3: 3.2, 4: 2.2, 5: 2.0 };
  for (const n of [2, 3, 4, 5]) {
    const key = s.slice(-n).join(''); let t = 0, x = 0;
    for (let i = 0; i + n < s.length; i++) if (s.slice(i, i + n).join('') === key) { if (s[i + n] === 'T') t++; else x++; }
    if (t + x > 0) score += ((x - t) / (t + x)) * W[n];
  }
  const sums = hist.slice(0, 60).map(_sumOf).filter(v => v).reverse();
  if (sums.length >= 5) { const a = _avg(sums.slice(-5)); if (a > 10.5) score += 1.8; else if (a < 9.5) score -= 1.8; }
  if (sums.length >= 10) { const a = _avg(sums.slice(-10)); if (a > 10.8) score += 1.2; else if (a < 9.2) score -= 1.2; }
  let st = 1; for (let i = s.length - 1; i > 0 && s[i] === s[i - 1]; i--) st++;
  if (st >= 2) score += (last === 'T' ? -2.8 : 2.8) * Math.min(st, 5) * 0.8;
  if (s.length >= 10) { let z = true; for (let i = 1; i <= 7; i++) if (s[s.length - i] === s[s.length - i - 1]) { z = false; break; } if (z) score += last === 'T' ? 3 : -3; }
  const l10 = s.slice(-10), t10 = l10.filter(v => v === 'T').length, x10 = l10.filter(v => v === 'X').length;
  if (t10 >= 7) score -= 3.5; if (x10 >= 7) score += 3.5;
  if (score === 0) return last === 'T' ? 'Xỉu' : 'Tài';
  return score > 0 ? 'Tài' : 'Xỉu';
}

// 68GB: theo 68gb.txt (nhận diện cầu 1-1, 2-2, 3-3, bệt + quy tắc điểm tổng)
function algo68(phien, hist) {
  const H = hist.slice(0, 40).map(it => ({ r: it["kết quả"] === 'Tài' ? 'TAI' : 'XIU', sc: _sumOf(it) })).reverse();
  if (H.length < 5) return null;
  const opp = v => (v === 'TAI' ? 'XIU' : 'TAI'), res = H.slice(-10).map(h => h.r), last = H[H.length - 1];
  const l4 = res.slice(-4), l6 = res.slice(-6);
  let pat = { pred: null, conf: 0 };
  if (l4.length === 4 && l4.every((v, i) => i === 0 || v !== l4[i - 1])) pat = { pred: opp(l4[3]), conf: 0.65 };
  if (l4.length === 4 && l4[0] === l4[1] && l4[2] === l4[3] && l4[0] !== l4[2]) pat = { pred: opp(l4[2]), conf: 0.70 };
  if (l6.length === 6 && l6.slice(0, 3).every(v => v === l6[0]) && l6.slice(3).every(v => v === l6[3]) && l6[0] !== l6[3]) pat = { pred: opp(l6[3]), conf: 0.72 };
  let sk = 0; for (let i = res.length - 1; i >= 0 && res[i] === res[res.length - 1]; i--) sk++;
  if (sk >= 4 && !pat.pred) pat = { pred: res[res.length - 1], conf: sk === 4 ? 0.65 : 0.55 };
  const [r1, r2, r3] = H.slice(-3).map(h => h.r);
  if (!pat.pred) {
    if (r1 === r2 && r2 === r3) pat = { pred: r3, conf: 0.75 };
    else if (r1 !== r2 && r2 !== r3) pat = { pred: opp(r3), conf: 0.78 };
    else if (r1 === r2 && r2 !== r3) pat = { pred: opp(r3), conf: 0.70 };
    else if (r1 !== r2 && r2 === r3) pat = { pred: r1, conf: 0.72 };
  }
  const R = { 3: ['XIU', .7], 4: ['XIU', .6], 5: ['TAI', .7], 6: ['XIU', .6], 7: ['TAI', .8], 8: ['XIU', .8], 9: ['XIU', .7], 10: ['TAI', .8], 11: ['XIU', .6], 12: ['TAI', .8], 13: ['TAI', .8], 14: ['XIU', .6], 15: ['XIU', .7], 16: ['TAI', .6], 17: ['XIU', .6], 18: ['XIU', .8] };
  const sc = R[last.sc] ? { pred: R[last.sc][0], conf: R[last.sc][1] } : { pred: null, conf: 0 };
  const fin = pat.pred && sc.pred ? (pat.conf >= sc.conf ? pat.pred : sc.pred) : (pat.pred || sc.pred);
  return fin ? (fin === 'TAI' ? 'Tài' : 'Xỉu') : null;
}

// BETVIP: theo betvip.txt (Markov có trọng số giảm dần + bẻ bệt + cầu 1-1, rồi đảo như file gốc)
function algoBetvip(phien, hist) {
  const h = _seqFrom(hist, 120).map(x => (x === 'Tài' ? 1 : 0));
  if (h.length < 2) return null;
  const M = [[0, 0], [0, 0]];
  for (let i = 0; i < h.length - 1; i++) M[h[i]][h[i + 1]] += Math.pow(0.95, h.length - i - 1);
  const c = h[h.length - 1];
  let pred = M[c][1] / ((M[c][0] + M[c][1]) || 1) >= 0.5 ? 1 : 0;
  const l4 = h.slice(-4); if (l4.length === 4 && l4.every(v => v === l4[0])) pred = l4[0] === 1 ? 0 : 1;
  const l6 = h.slice(-6); if (l6.length === 6 && l6.every((v, i) => i === 0 || v !== l6[i - 1])) pred = l6[5] === 1 ? 0 : 1;
  return pred === 1 ? 'Xỉu' : 'Tài';
}

const ALGORITHMS = { predictPattern, sunwin: algoSunwin, g68: algo68, betvip: algoBetvip };


function normalizeStandard(apiId, raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  raw.forEach(item => {
    const phien = item.phiên || item.phien;
    const result = item["kết quả"] || item.ket_qua;
    const time = item.updatedAt || item.thoi_gian || item.time || '';
    if (!phien || !result) return;
    if (item.status === 'đang chạy') return;
    const clean = (String(result).trim().toLowerCase() === 'tài' || String(result).trim().toLowerCase() === 'tai') ? 'Tài' : 'Xỉu';
    out.push({
      "phiên": Number(phien),
      "kết quả": clean,
      "updatedAt": time,
      "d1": item.d1 || item.xuc_xac_1,
      "d2": item.d2 || item.xuc_xac_2,
      "d3": item.d3 || item.xuc_xac_3
    });
  });
  return out.sort((a, b) => b["phiên"] - a["phiên"]);
}

function normalizeLC79(raw) {
  if (!raw || !Array.isArray(raw.list)) return [];
  const out = [];
  raw.list.forEach(item => {
    const phien = item.id;
    const result = item.resultTruyenThong;
    if (!phien || !result) return;
    const lower = String(result).trim().toLowerCase();
    let clean = '';
    if (lower === 'tai' || lower === 'tài') clean = 'Tài';
    else if (lower === 'xiu' || lower === 'xỉu') clean = 'Xỉu';
    else return;
    out.push({ "phiên": Number(phien), "kết quả": clean, "updatedAt": '', "dices": item.dices });
  });
  return out.sort((a, b) => b["phiên"] - a["phiên"]);
}

function normalizeMax789(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  raw.forEach(item => {
    const phien = item.SessionId;
    const sum = item.DiceSum;
    if (!phien || sum === undefined) return;
    const clean = sum >= 11 ? 'Tài' : 'Xỉu';
    out.push({
      "phiên": Number(phien),
      "kết quả": clean,
      "updatedAt": item.CreatedDate || '',
      "d1": item.FirstDice,
      "d2": item.SecondDice,
      "d3": item.ThirdDice,
      "tong": sum
    });
  });
  return out.sort((a, b) => b["phiên"] - a["phiên"]);
}

function normalize68GB(raw) {
  if (!raw || !Array.isArray(raw.lich_su_50)) return [];
  const out = [];
  raw.lich_su_50.forEach(item => {
    const phien = item.phien;
    const result = item.ket_qua;
    if (!phien || !result) return;
    const lower = String(result).trim().toLowerCase();
    let clean = '';
    if (lower === 'tài' || lower === 'tai') clean = 'Tài';
    else if (lower === 'xỉu' || lower === 'xiu') clean = 'Xỉu';
    else if (lower === 'bão' || lower === 'bao') clean = 'Bão';
    else return;
    out.push({
      "phiên": Number(phien),
      "kết quả": clean,
      "updatedAt": item.thoi_gian || '',
      "d1": item.xuc_xac_1,
      "d2": item.xuc_xac_2,
      "d3": item.xuc_xac_3,
      "tong": item.tong
    });
  });
  return out.sort((a, b) => b["phiên"] - a["phiên"]);
}

function normalizeSicsun(raw) {
  if (!raw || !raw.data || !Array.isArray(raw.data.resultList)) return [];
  const out = [];
  raw.data.resultList.forEach(item => {
    const phienStr = String(item.gameNum).replace("#", "");
    const phien = Number(phienStr);
    const score = item.score;
    if (!phien || score === undefined) return;
    const clean = score >= 11 ? 'Tài' : 'Xỉu';
    out.push({
      "phiên": phien,
      "kết quả": clean,
      "updatedAt": '',
      "d1": item.facesList[0],
      "d2": item.facesList[1],
      "d3": item.facesList[2],
      "tong": score
    });
  });
  return out.sort((a, b) => b["phiên"] - a["phiên"]);
}

function formatTime(str) {
  if (!str) return '';
  const d = new Date(str);
  if (isNaN(d.getTime())) return str;
  const p = n => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())} ${p(d.getDate())}/${p(d.getMonth() + 1)}`;
}

let serverPreds = {};
let reverseMap = {};
for (const id in API_CONFIGS) { serverPreds[id] = {}; reverseMap[id] = false; }

function applyReverse(apiId, prediction) {
  if (!reverseMap[apiId]) return prediction;
  if (prediction === 'Tài') return 'Xỉu';
  if (prediction === 'Xỉu') return 'Tài';
  return prediction;
}

function loadPreds() {
  try {
    if (fs.existsSync(PREDS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(PREDS_FILE, 'utf8'));
      for (const k in parsed) {
        if (!serverPreds[k]) serverPreds[k] = {};
        Object.assign(serverPreds[k], parsed[k]);
      }
      console.log('✓ loaded preds.json');
    }
  } catch (e) {}
}

let saveTimer = null;
function savePreds() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    try { fs.writeFileSync(PREDS_FILE, JSON.stringify(serverPreds)); } catch (e) {}
  }, 1000);
}

loadPreds();

const rawCache = {};
const CACHE_MS = process.env.CACHE_MS !== undefined ? Number(process.env.CACHE_MS) : 6000;
const status = {};
const inflight = {};

function sideOf(x) {
  const t = String(x || '').trim().toLowerCase();
  if (t === 'tài' || t === 'tai') return 'Tài';
  if (t === 'xỉu' || t === 'xiu') return 'Xỉu';
  if (t === 'bão' || t === 'bao') return 'Bão';
  return null;
}
const diceOf = it => it.dice || it.dices || [it.d1, it.d2, it.d3].filter(v => v !== undefined && v !== null);

function normalizeSunwin(raw) {
  const out = [], seen = new Set();
  raw.forEach(it => {
    const p = Number(it.phien || it["phiên"]);
    const sd = sideOf(it.ket_qua || it["kết quả"]);
    if (!p || !sd || seen.has(p)) return;
    seen.add(p);
    out.push({ "phiên": p, "kết quả": sd, "updatedAt": it.thoi_gian || '', "dices": it.xuc_xac, "tong": it.Tong || it.tong });
  });
  return out.sort((a, b) => b["phiên"] - a["phiên"]);
}

// Game có DỰ ĐOÁN SẴN từ API (HITCLUB, B52): tự gom lịch sử theo thời gian để tính đúng/sai thật
const upState = {};
const UP = id => upState[id] || (upState[id] = { results: {}, preds: {}, lastPred: null });
const hasUp = id => !!API_CONFIGS[id].upstream;
const isUpRaw = raw => raw && !Array.isArray(raw) && (raw.phien_du_doan !== undefined || raw.Du_doan !== undefined);
function upFields(raw) {
  if (raw.phien_du_doan !== undefined) return { p: raw.phien, side: sideOf(raw.ket_qua), dice: raw.xuc_xac, np: raw.phien_du_doan, ps: sideOf(raw.du_doan), conf: raw.do_tin_cay, pat: raw.pattern };
  return { p: raw.Phien, side: sideOf(raw.Ket_qua), dice: [raw.Xuc_xac_1, raw.Xuc_xac_2, raw.Xuc_xac_3], np: raw.phien_hien_tai, ps: sideOf(raw.Du_doan), conf: raw.Do_tin_cay, pat: '' };
}
function recordUp(id, raw) {
  const u = UP(id), f = upFields(raw);
  if (Number(f.p) && f.side) u.results[Number(f.p)] = { side: f.side, dice: f.dice, ts: new Date().toISOString() };
  if (Number(f.np) && f.ps) { u.preds[Number(f.np)] = { side: f.ps, conf: f.conf, pattern: f.pat }; u.lastPred = u.preds[Number(f.np)]; }
  for (const store of [u.results, u.preds]) Object.keys(store).map(Number).sort((a, b) => b - a).slice(80).forEach(k => delete store[k]);
}
function normalizeUp(id) {
  const u = UP(id);
  return Object.keys(u.results).map(Number).sort((a, b) => b - a).map(p => ({
    "phiên": p, "kết quả": u.results[p].side, "updatedAt": u.results[p].ts, "dices": u.results[p].dice
  }));
}
const isHit = hasUp;

// Tự nhận dạng định dạng dữ liệu theo hình dạng JSON (không phụ thuộc URL)
function buildCleanData(apiId, raw) {
  const gen = API_CONFIGS[apiId] && API_CONFIGS[apiId].generic;
  if (gen) { try { const g = genericNormalize(raw); if (g.length) return g; } catch (e) {} }
  let r = []; try { r = buildKnown(apiId, raw); } catch (e) {}
  if (r && r.length) return r;
  if (gen) return [];
  try { return genericNormalize(raw); } catch (e) { return []; }
}

function buildKnown(apiId, raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    if (!raw.length) return [];
    if (raw[0].SessionId !== undefined) return normalizeMax789(raw);
    if (raw[0].ket_qua !== undefined && raw[0].xuc_xac !== undefined) return normalizeSunwin(raw);
    return normalizeStandard(apiId, raw);
  }
  if (isUpRaw(raw)) return normalizeUp(apiId);
  if (Array.isArray(raw.list)) return normalizeLC79(raw);
  if (Array.isArray(raw.lich_su_50)) return normalize68GB(raw);
  if (raw.data && Array.isArray(raw.data.resultList)) return normalizeSicsun(raw);
  if (Array.isArray(raw.data)) return buildCleanData(apiId, raw.data);
  const vals = Object.values(raw).filter(v => v && typeof v === 'object' && v.phien !== undefined && v.ket_qua !== undefined && (v.type === undefined || v.type === 'end'));
  if (vals.length) return normalizeStandard(apiId, vals);
  return [];
}


// ===== Bộ nhận dạng vạn năng: tự tìm mảng phiên, phiên, xúc xắc, tổng, kết quả, giờ trong JSON bất kỳ =====
function findRecords(raw, d = 0) {
  if (Array.isArray(raw)) return raw.length && raw[0] && typeof raw[0] === 'object' ? raw : null;
  if (!raw || typeof raw !== 'object' || d > 3) return null;
  for (const k of ['list', 'data', 'history', 'items', 'results', 'result', 'rows', 'records', 'sessions', 'resultList', 'lich_su', 'lich_su_50', 'content']) {
    if (raw[k] !== undefined) { const r = findRecords(raw[k], d + 1); if (r) return r; }
  }
  for (const k of Object.keys(raw)) { const r = findRecords(raw[k], d + 1); if (r) return r; }
  const vals = Object.values(raw).filter(v => v && typeof v === 'object' && !Array.isArray(v));
  return vals.length >= 3 ? vals : null;
}
function genericNormalize(raw) {
  const arr = findRecords(raw);
  if (!arr) return [];
  const out = [], seen = new Set();
  for (const it of arr) {
    if (!it || typeof it !== 'object') continue;
    const get = (...ks) => { for (const k of ks) if (it[k] !== undefined && it[k] !== null && it[k] !== '') return it[k]; return undefined; };
    const phRaw = get('phien', 'Phien', 'phiên', 'sid', 'SessionId', 'sessionId', 'session_id', 'session', 'issue', 'expect', 'gameNum', 'roundId', 'round', 'id', 'no', 'number');
    const ph = phRaw === undefined ? 0 : Number(String(phRaw).replace(/[^0-9]/g, ''));
    if (!ph || seen.has(ph)) continue;
    let dice;
    const dv = get('dices', 'dice', 'xuc_xac', 'xucxac', 'Dice', 'Dices', 'diceList', 'result_dice', 'points', Array.isArray(it.result) ? 'result' : '_');
    if (Array.isArray(dv) && dv.length >= 3) dice = dv.slice(0, 3).map(Number);
    else if (typeof dv === 'string') { const m = dv.match(/[1-6]/g); if (m && m.length >= 3) dice = m.slice(0, 3).map(Number); }
    if (!dice || dice.some(n => !(n >= 1 && n <= 6))) {
      const a = [get('d1', 'Xuc_xac_1', 'xuc_xac_1', 'dice1', 'Dice1', 'FirstDice', 'x1', 'point1', 'first_dice'),
                 get('d2', 'Xuc_xac_2', 'xuc_xac_2', 'dice2', 'Dice2', 'SecondDice', 'x2', 'point2', 'second_dice'),
                 get('d3', 'Xuc_xac_3', 'xuc_xac_3', 'dice3', 'Dice3', 'ThirdDice', 'x3', 'point3', 'third_dice')].map(Number);
      dice = a.every(n => n >= 1 && n <= 6) ? a : undefined;
    }
    let total = dice ? dice[0] + dice[1] + dice[2] : Number(get('tong', 'Tong', 'total', 'Total', 'sum', 'Sum', 'DiceSum', 'point', 'score', 'diem'));
    const label = get('ket_qua', 'Ket_qua', 'ketqua', 'result', 'Result', 'resultTruyenThong', 'kq', 'outcome', 'side');
    let sd = typeof label === 'string' ? sideOf(label) || ({ t: 'Tài', x: 'Xỉu' })[label.trim().toLowerCase()] : null;
    if (!sd && total >= 3 && total <= 18) sd = total >= 11 ? 'Tài' : 'Xỉu';
    if (!sd) continue;
    seen.add(ph);
    let tm = get('updatedAt', 'thoi_gian', 'time', 'createdAt', 'CreatedDate', 'created_at', 'timestamp', 'date', 'startTime');
    if (typeof tm === 'number' || /^\d{9,13}$/.test(String(tm || ''))) { const n = Number(tm); tm = new Date(n < 1e12 ? n * 1000 : n).toISOString(); }
    out.push({ "phiên": ph, "kết quả": sd, "updatedAt": tm || '', "dices": dice, "tong": total || undefined });
  }
  return out.sort((a, b) => b["phiên"] - a["phiên"]);
}

async function fetchJson(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const r = await fetch(url, {
      signal: controller.signal,
      headers: { 'accept': 'application/json,text/plain,*/*', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/146.0 Safari/537.36' }
    });
    if (!r.ok) throw new Error('upstream ' + r.status);
    return JSON.parse(await r.text());
  } finally { clearTimeout(timer); }
}

function fetchRaw(apiId) {
  const c = rawCache[apiId];
  if (c && Date.now() - c.ts < CACHE_MS) return Promise.resolve(c.data);
  if (inflight[apiId]) return inflight[apiId];
  inflight[apiId] = (async () => {
    let lastErr;
    for (const url of API_CONFIGS[apiId].urls) {
      try {
        const raw = await fetchJson(url, 20000);
        if (isUpRaw(raw)) recordUp(apiId, raw);
        if (buildCleanData(apiId, raw).length === 0) throw new Error('empty data');
        rawCache[apiId] = { data: raw, ts: Date.now() };
        status[apiId] = { ok: true, url, at: Date.now() };
        return raw;
      } catch (e) { lastErr = e; }
    }
    status[apiId] = { ok: false, error: String(lastErr && lastErr.message), at: Date.now() };
    throw lastErr || new Error('fetch failed');
  })().finally(() => { delete inflight[apiId]; });
  return inflight[apiId];
}

const LIVE_FILE = path.join('/tmp', 'live.json');
const MODE_FILE = path.join('/tmp', 'mode.json');
let liveLog = {}, modeState = {};
try { if (fs.existsSync(LIVE_FILE)) liveLog = JSON.parse(fs.readFileSync(LIVE_FILE, 'utf8')); } catch (e) {}
try { if (fs.existsSync(MODE_FILE)) modeState = JSON.parse(fs.readFileSync(MODE_FILE, 'utf8')); } catch (e) {}
let liveTimer = null;
function saveLive() {
  if (liveTimer) return;
  liveTimer = setTimeout(() => { liveTimer = null; try { fs.writeFileSync(LIVE_FILE, JSON.stringify(liveLog)); fs.writeFileSync(MODE_FILE, JSON.stringify(modeState)); } catch (e) {} }, 2000);
}
// <<ADAPT
// TỰ ĐẢO CẦU: dựa trên các dự đoán LIVE đã chốt TRƯỚC khi có kết quả (không nhìn trước kết quả).
// - Chế độ gốc: nếu 10 dự đoán gốc gần nhất sai nhiều (đúng <= 35%) => chuyển sang ĐẢO.
// - Chế độ đảo: nếu dự đoán đã đảo cũng sai nhiều (đúng < 40%) hoặc cầu gốc đúng lại (>= 60%) => quay về GỐC.
// - Mỗi lần đổi chế độ phải chờ đủ 6 phiên mới để tránh nhảy qua nhảy lại.
const oppS = v => (v === 'Tài' ? 'Xỉu' : v === 'Xỉu' ? 'Tài' : v);
function entry(id, ph) {
  const e = liveLog[id] && liveLog[id][ph];
  if (e === undefined || e === null) return null;
  return typeof e === 'string' ? { b: e, f: e, m: 'norm' } : e;
}
function updateMode(id, cleanData) {
  const res = [];
  for (const it of cleanData) {
    const e = entry(id, it["phiên"]), a = it["kết quả"];
    if (e && (a === 'Tài' || a === 'Xỉu')) res.push({ ph: Number(it["phiên"]), a, b: e.b, f: e.f });
  }
  const st = modeState[id] || (modeState[id] = { mode: 'norm', since: 0 });
  if (res.length < 8) return st.mode;
  const last = res.slice(0, 10), baseOk = last.filter(r => r.b === r.a).length;
  const after = res.filter(r => r.ph > st.since);
  if (after.length < 6) return st.mode;
  if (st.mode === 'norm') {
    if (baseOk / last.length <= 0.35) { st.mode = 'rev'; st.since = res[0].ph; saveLive(); }
  } else {
    const finOk = after.filter(r => r.f === r.a).length;
    if (finOk / after.length < 0.4 || baseOk / last.length >= 0.6) { st.mode = 'norm'; st.since = res[0].ph; saveLive(); }
  }
  return st.mode;
}
function markLive(id, phien, base, cleanData) {
  const L = liveLog[id] || (liveLog[id] = {});
  if (L[phien] === undefined) {
    const mode = updateMode(id, cleanData);
    L[phien] = { b: base, f: mode === 'rev' ? oppS(base) : base, m: mode };
    Object.keys(L).map(Number).sort((a, b) => b - a).slice(400).forEach(k => delete L[k]);
    saveLive();
  }
  return entry(id, phien);
}
// ADAPT>>

function predOf(apiId, phien, past) {
  if (hasUp(apiId)) { const h = UP(apiId).preds[phien]; return h ? h.side : null; }
  if (!serverPreds[apiId][phien]) {
    const name = API_CONFIGS[apiId].algorithm;
    serverPreds[apiId][phien] = ALGORITHMS[name](phien, past) || predictPattern(phien, past);
    savePreds();
  }
  return serverPreds[apiId][phien];
}

function nextInfo(apiId, nextPhien, cleanData) {
  let base, conf = '', pattern = '';
  if (hasUp(apiId)) {
    const u = UP(apiId), h = u.preds[nextPhien] || u.lastPred;
    base = h ? h.side : null; conf = h ? h.conf : ''; pattern = h ? h.pattern : '';
  } else base = predOf(apiId, nextPhien, cleanData);
  if (!base) return { pred: null, conf, pattern, mode: 'norm' };
  const e = markLive(apiId, nextPhien, base, cleanData);
  return { pred: e.f, conf, pattern, mode: e.m };
}

async function loadClean(apiId) {
  let raw;
  try { raw = await fetchRaw(apiId); }
  catch (e) { if (rawCache[apiId]) raw = rawCache[apiId].data; else return []; }
  return buildCleanData(apiId, raw).slice(0, MAX_SESSIONS);
}

async function getRows(apiId) {
  const cfg = API_CONFIGS[apiId];
  const cleanData = await loadClean(apiId);
  if (cleanData.length === 0) return { game: cfg.name, rows: [], stats: {} };

  const rows = [];
  const nextPhien = Number(cleanData[0]["phiên"]) + 1;
  const nx = nextInfo(apiId, nextPhien, cleanData);
  rows.push({
    game: cfg.name, phien: nextPhien, time: 'running...',
    prediction: nx.pred ? applyReverse(apiId, nx.pred) : null,
    result: 'Chờ...', verify: '⏳', isNext: true, conf: nx.conf, pattern: nx.pattern, mode: nx.mode
  });

  if (!hasUp(apiId)) {
    const keepFrom = Number(cleanData[cleanData.length - 1]["phiên"]);
    let cleaned = false;
    for (const key in serverPreds[apiId]) if (Number(key) < keepFrom) { delete serverPreds[apiId][key]; cleaned = true; }
    if (cleaned) savePreds();
  }

  let liveN = 0, liveWin = 0;
  for (let i = 0; i < cleanData.length; i++) {
    const item = cleanData[i];
    const phienNum = Number(item["phiên"]);
    const actual = item["kết quả"];
    const e = entry(apiId, phienNum);
    const live = !!e;
    const p = e ? e.f : predOf(apiId, phienNum, cleanData.slice(i + 1));
    const prediction = p ? applyReverse(apiId, p) : null;
    const isCorrect = prediction ? prediction === actual : null;
    if (live && isCorrect !== null) { liveN++; if (isCorrect) liveWin++; }
    const dice = diceOf(item);
    rows.push({
      game: cfg.name, phien: phienNum, time: formatTime(item["updatedAt"]),
      prediction, result: actual,
      verify: prediction ? (isCorrect ? '✅Đúng' : '❌Sai') : '—',
      isCorrect, isNext: false, live, mode: e ? e.m : null, dice, total: dice.length === 3 ? dice.reduce((a, b) => a + b, 0) : ''
    });
  }
  return { game: cfg.name, rows, stats: { live_n: liveN, live_win: liveWin } };
}

async function buildCommonJSON(apiId) {
  const cfg = API_CONFIGS[apiId];
  const cleanData = await loadClean(apiId);
  if (cleanData.length === 0) return null;
  const prev = cleanData[0];
  const phienNay = Number(prev["phiên"]) + 1;
  const nx = nextInfo(apiId, phienNay, cleanData);
  let n = 0, w = 0;
  cleanData.forEach(it => { const e = entry(apiId, it["phiên"]); if (e && e.f) { n++; if (e.f === it["kết quả"]) w++; } });
  return {
    id: "@dongnetsun",
    game: cfg.name,
    phien_truoc: prev["phiên"],
    xuc_xac: diceOf(prev),
    ket_qua: prev["kết quả"],
    thoi_gian: formatTime(prev["updatedAt"] || ''),
    phien_nay: phienNay,
    du_doan: nx.pred ? applyReverse(apiId, nx.pred) : null,
    che_do: nx.mode === 'rev' ? 'dao' : 'goc',
    do_tin_cay_api: nx.conf || null,
    ti_le_dung_thuc_te: n ? (w * 100 / n).toFixed(1) + '% (' + w + '/' + n + ')' : 'đang thu thập'
  };
}

app.use((req, res, next) => { res.setHeader('Access-Control-Allow-Origin', '*'); next(); });
app.use(express.json({ limit: '50kb' }));

app.post('/api/data', async (req, res) => {
  try {
    const { apiId } = req.body;
    if (!API_CONFIGS[apiId]) return res.status(404).json({ error: 'invalid' });
    const result = await getRows(apiId);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: 'err' });
  }
});

app.get('/adm', (req, res) => {
  const items = Object.keys(API_CONFIGS).map(id => {
    const numId = Number(id);
    const g = API_CONFIGS[id];
    const rev = reverseMap[numId];
    return `<div class="item">
      <div class="ten">${g.name}</div>
      <button class="nut ${rev ? 'bat' : ''}" onclick="toggle(${numId}, this)" data-id="${numId}">${rev ? 'ĐẢO' : 'KHÔNG ĐẢO'}</button>
    </div>`;
  }).join('');

  res.send(`<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ADM</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; }
  body { background: #1a0820; color: #f0d5e8; padding: 16px; min-height: 100vh; }
  h1 { color: #ff6ec7; font-size: 16px; text-align: center; margin-bottom: 20px; letter-spacing: 1px; font-weight: 700; }
  .khung { max-width: 480px; margin: 0 auto; }
  .item {
    display: flex; justify-content: space-between; align-items: center;
    background: #2a0d26; border: 1px solid #7a2d5c; border-radius: 10px;
    padding: 14px 16px; margin-bottom: 10px;
  }
  .ten { font-size: 14px; font-weight: 700; color: #ffd6ee; letter-spacing: 0.5px; }
  .nut {
    background: #4a1535; color: #ff9ecb; border: 1px solid #7a2d5c;
    padding: 8px 16px; border-radius: 16px; font-size: 11px; font-weight: 700;
    cursor: pointer; min-width: 110px; transition: all 0.2s;
  }
  .nut.bat { background: #d63384; color: #fff; border-color: #ff6ec7; }
  .nut:active { transform: scale(0.95); }
</style>
</head>
<body>
<h1>⚙️ QUẢN LÝ ĐẢO DỰ ĐOÁN</h1>
<div class="khung">${items}</div>
<script>
async function toggle(id, btn) {
  const res = await fetch('/adm/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiId: id })
  });
  if (!res.ok) return;
  const json = await res.json();
  if (json.reverse) {
    btn.classList.add('bat');
    btn.innerText = 'ĐẢO';
  } else {
    btn.classList.remove('bat');
    btn.innerText = 'KHÔNG ĐẢO';
  }
}
</script>
</body>
</html>`);
});

app.post('/adm/toggle', (req, res) => {
  const { apiId } = req.body;
  if (!reverseMap.hasOwnProperty(apiId)) {
    return res.status(400).json({ error: 'invalid' });
  }
  reverseMap[apiId] = !reverseMap[apiId];
  res.json({ apiId, reverse: reverseMap[apiId] });
});

const INDEX_HTML = `<!DOCTYPE html>
<html lang="vi" data-t="black">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#030303">
<title>@dongnetsun</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Orbitron:wght@700;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;font-family:var(--f)}
:root{--r:14px;--bw:1px;--sh:none;--bf:none;--f:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif}
[data-t=black]{--bg:#030303;--b2:#0d0d10;--cd:rgba(18,18,22,.72);--bd:#26262c;--tx:#f4f4f5;--mu:#8e8e99;--ac:#00e5a0;--a2:#0891b2;--tai:#38bdf8;--xiu:#fb7185;--bo:.07}
[data-t=onyx]{--bg:#02040a;--b2:#0a1020;--cd:rgba(12,18,34,.72);--bd:#1e2a44;--tx:#eef2ff;--mu:#8793b0;--ac:#60a5fa;--a2:#2563eb;--tai:#67e8f9;--xiu:#fda4af;--bo:.08}
[data-t=carbon]{--bg:#050505;--b2:#14100c;--cd:rgba(22,18,14,.72);--bd:#33281d;--tx:#faf5ef;--mu:#9a8b7c;--ac:#fb923c;--a2:#ea580c;--tai:#fde68a;--xiu:#fca5a5;--bo:.08}
[data-t=pink]{--bg:#1a0820;--b2:#3a0f2e;--cd:#2a0d26;--bd:#7a2d5c;--tx:#f0d5e8;--mu:#b88fb0;--ac:#ff6ec7;--a2:#d63384;--tai:#7dd3fc;--xiu:#fca5a5}
[data-t=cyber]{--bg:#020617;--b2:#0b1a3a;--cd:#0a1730;--bd:#0e7490;--tx:#e0f7ff;--mu:#7aa9bd;--ac:#22d3ee;--a2:#0891b2;--tai:#38bdf8;--xiu:#fb7185}
[data-t=gold]{--bg:#0c0a06;--b2:#221b0c;--cd:#17130a;--bd:#8a6d1d;--tx:#f5e6b8;--mu:#a8935a;--ac:#fbbf24;--a2:#b45309;--tai:#fde68a;--xiu:#fca5a5;--f:Georgia,'Times New Roman',serif}
[data-t=matrix]{--bg:#000a03;--b2:#03230f;--cd:#041a0b;--bd:#15803d;--tx:#bbf7d0;--mu:#4ade80;--ac:#22ff66;--a2:#15803d;--tai:#86efac;--xiu:#fde047;--f:ui-monospace,Menlo,Consolas,monospace;--r:4px}
[data-t=galaxy]{--bg:#0f0524;--b2:#3b1385;--cd:rgba(76,29,149,.35);--bd:#7c3aed;--tx:#ede9fe;--mu:#a78bfa;--ac:#c084fc;--a2:#7c3aed;--tai:#67e8f9;--xiu:#f9a8d4;--bf:blur(14px)}
[data-t=dragon]{--bg:#1a0505;--b2:#4a0d0d;--cd:#2b0808;--bd:#b91c1c;--tx:#fee2e2;--mu:#fca5a5;--ac:#ef4444;--a2:#b91c1c;--tai:#fcd34d;--xiu:#fdba74}
[data-t=ice]{--bg:#e0f2fe;--b2:#bae6fd;--cd:rgba(255,255,255,.7);--bd:#7dd3fc;--tx:#0c4a6e;--mu:#0369a1;--ac:#0284c7;--a2:#0ea5e9;--tai:#0369a1;--xiu:#be123c;--bf:blur(12px)}
[data-t=sunset]{--bg:#2b0b2e;--b2:#ff6a3d;--cd:rgba(0,0,0,.28);--bd:#ff9a76;--tx:#fff1e6;--mu:#ffd0b0;--ac:#ffd166;--a2:#ff5e7e;--tai:#fff3b0;--xiu:#ffd1dc;--bf:blur(8px)}
[data-t=light]{--bg:#f4f4f5;--b2:#e4e4e7;--cd:#fff;--bd:#d4d4d8;--tx:#18181b;--mu:#71717a;--ac:#2563eb;--a2:#1d4ed8;--tai:#2563eb;--xiu:#dc2626}
[data-t=brutal]{--bg:#fde047;--b2:#fff;--cd:#fff;--bd:#000;--tx:#000;--mu:#444;--ac:#ec4899;--a2:#000;--tai:#2563eb;--xiu:#dc2626;--r:0;--bw:3px;--sh:4px 4px 0 #000}
[data-t=arcade]{--bg:#0b0b2b;--b2:#1c1152;--cd:#12123e;--bd:#f0f;--tx:#e6e6ff;--mu:#8f8fd8;--ac:#0ff;--a2:#f0f;--tai:#0ff;--xiu:#ff0;--f:ui-monospace,Menlo,Consolas,monospace;--r:0;--bw:2px;--sh:0 0 12px rgba(255,0,255,.5)}
[data-t=forest]{--bg:#06190f;--b2:#0f3b24;--cd:#0b2a19;--bd:#2f855a;--tx:#dcfce7;--mu:#86efac;--ac:#34d399;--a2:#059669;--tai:#a7f3d0;--xiu:#fdba74}
[data-t=ocean]{--bg:#021b2b;--b2:#05507c;--cd:rgba(3,60,95,.45);--bd:#0ea5e9;--tx:#e0f2fe;--mu:#7dd3fc;--ac:#38bdf8;--a2:#0369a1;--tai:#67e8f9;--xiu:#fda4af;--bf:blur(12px)}
[data-t=oled]{--bg:#000;--b2:#111;--cd:#0a0a0a;--bd:#333;--tx:#fafafa;--mu:#888;--ac:#fff;--a2:#737373;--tai:#93c5fd;--xiu:#fca5a5}
[data-t=candy]{--bg:#fff1f7;--b2:#ffd6ea;--cd:#fff;--bd:#f9a8d4;--tx:#6b2148;--mu:#b5578a;--ac:#ec4899;--a2:#a855f7;--tai:#6366f1;--xiu:#f43f5e;--r:22px}
[data-t=aurora]{--bg:#06122a;--b2:#123a5e;--cd:rgba(10,30,60,.5);--bd:#5eead4;--tx:#e6fffb;--mu:#8fd8cc;--ac:#5eead4;--a2:#a78bfa;--tai:#7dd3fc;--xiu:#f0abfc;--bf:blur(10px)}
[data-t=coffee]{--bg:#1c1410;--b2:#3b2a20;--cd:#2a1e17;--bd:#7c5a44;--tx:#f3e5d8;--mu:#b89a84;--ac:#e0a96d;--a2:#92603a;--tai:#fcd9a0;--xiu:#f4a3a3;--f:Georgia,'Times New Roman',serif}
html,body{height:100%}
body{background:linear-gradient(160deg,var(--bg) 0%,var(--b2) 170%) fixed;color:var(--tx);overflow-x:hidden;user-select:none;-webkit-user-select:none;font-size:12px;padding-bottom:env(safe-area-inset-bottom);position:relative}
body:before,body:after{content:"";position:fixed;width:70vmax;height:70vmax;border-radius:50%;filter:blur(70px);opacity:var(--bo,.16);pointer-events:none;z-index:0;animation:fl 18s ease-in-out infinite alternate}
body:before{background:var(--ac);top:-35vmax;left:-25vmax}
body:after{background:var(--a2);bottom:-35vmax;right:-25vmax;animation-delay:-9s}
@keyframes fl{to{transform:translate(8vmax,6vmax) scale(1.15)}}
[data-t=aurora] body{background:linear-gradient(120deg,#06122a,#123a5e,#3b1d6e,#06122a);background-size:300% 300%;animation:au 14s ease infinite}
@keyframes au{50%{background-position:100% 50%}}
.top,.wrap{position:relative;z-index:1}
.top{position:sticky;top:0;z-index:20;background:var(--cd);backdrop-filter:blur(16px) saturate(1.4);-webkit-backdrop-filter:blur(16px) saturate(1.4);border-bottom:var(--bw) solid var(--bd);padding:calc(7px + env(safe-area-inset-top)) 10px 8px}
.pg{position:absolute;left:0;right:0;bottom:-1px;height:2px;background:linear-gradient(90deg,var(--a2),var(--ac));transform-origin:left;transform:scaleX(0);opacity:.9}
.pg.go{animation:pg 8s linear forwards}
@keyframes pg{to{transform:scaleX(1)}}
.t1{display:flex;align-items:center;gap:7px}
.logo{flex:1;font-weight:900;font-size:14px;letter-spacing:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:linear-gradient(90deg,var(--ac),var(--tx),var(--a2),var(--ac));background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sh 6s linear infinite}
@keyframes sh{to{background-position:250% 0}}
.logo small{font-size:8px;margin-left:6px;font-weight:700;-webkit-text-fill-color:var(--mu);letter-spacing:.5px}
.ib{width:32px;height:32px;border-radius:12px;border:var(--bw) solid var(--bd);background:linear-gradient(135deg,var(--a2),var(--ac));color:#fff;font-size:14px;cursor:pointer;box-shadow:var(--sh),0 4px 14px rgba(0,0,0,.25)}
[data-t=oled] .ib{background:#fff;color:#000}
.ib:active{transform:scale(.88)}
.chips{display:flex;gap:6px;overflow-x:auto;padding-top:8px;scrollbar-width:none}
.chips::-webkit-scrollbar{display:none}
.chip{flex:none;padding:6px 11px;border-radius:99px;border:var(--bw) solid var(--bd);background:rgba(127,127,127,.1);color:var(--tx);font-size:10px;font-weight:800;cursor:pointer;white-space:nowrap;transition:.2s}
.chip.on{background:linear-gradient(135deg,var(--a2),var(--ac));color:#fff;border-color:transparent;box-shadow:0 4px 14px rgba(0,0,0,.3);transform:translateY(-1px)}
[data-t=oled] .chip.on,[data-t=gold] .chip.on{color:#000}
.chip i{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:5px;background:var(--mu)}
.chip i.o{background:#4ade80;box-shadow:0 0 0 0 #4ade80;animation:pu 1.8s infinite}
.chip i.f{background:#f87171}
@keyframes pu{70%{box-shadow:0 0 0 5px transparent}}
.wrap{max-width:720px;margin:0 auto;padding:10px 8px}
.card{background:var(--cd);border:var(--bw) solid var(--bd);border-radius:var(--r);box-shadow:var(--sh),0 8px 24px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.07);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.hero{display:grid;grid-template-columns:1fr auto;gap:8px 12px;align-items:center;padding:14px;position:relative;overflow:hidden;animation:up .5s both}
.hero:before{content:"";position:absolute;inset:-70% -30% auto auto;width:80%;height:200%;background:radial-gradient(circle,var(--ac) 0,transparent 60%);opacity:.16;pointer-events:none}
@keyframes up{from{opacity:0;transform:translateY(8px)}}
.hl{font-size:9px;color:var(--mu);letter-spacing:2px;font-weight:800}
.hp{display:inline-block;margin-top:5px;padding:4px 18px 5px;border-radius:calc(var(--r) + 4px);font-size:30px;font-weight:900;letter-spacing:2px;line-height:1.15;background:rgba(127,127,127,.16);border:var(--bw) solid currentColor;text-shadow:0 0 16px currentColor;animation:gl 2.4s ease-in-out infinite}
@keyframes gl{50%{box-shadow:0 0 22px -2px currentColor}}
[data-t=brutal] .hp,[data-t=light] .hp,[data-t=ice] .hp,[data-t=candy] .hp{text-shadow:none}
.gw{text-align:center;font-size:8px;color:var(--mu);letter-spacing:1px;font-weight:800;line-height:1.5}
.gg{width:62px;height:62px;display:block;margin:0 auto -2px}
.gg circle:last-of-type{transition:stroke-dashoffset .8s}
.mt{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:5px}
.mt span{padding:3px 9px;border-radius:99px;background:rgba(127,127,127,.15);font-size:9px;font-weight:700;color:var(--mu)}
.mt b{color:var(--tx)}
.tai{color:var(--tai)}.xiu{color:var(--xiu)}.bao{color:#fbbf24}.dung{color:#4ade80}.sai{color:#f87171}
.pl{display:inline-block;padding:2px 9px;border-radius:99px;font-size:10px;font-weight:800;background:rgba(127,127,127,.16)}
@supports(background:color-mix(in srgb,red 10%,blue)){.pl.tai{background:color-mix(in srgb,var(--tai) 18%,transparent)}.pl.xiu{background:color-mix(in srgb,var(--xiu) 18%,transparent)}.pl.bao{background:rgba(251,191,36,.2)}}
.viz{margin-top:8px;padding:9px 10px;animation:up .5s .08s both}
.dots{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}
.dots i{width:16px;height:16px;border-radius:50%;font-size:8px;font-style:normal;font-weight:900;display:flex;align-items:center;justify-content:center;color:#000;box-shadow:inset -1px -2px 3px rgba(0,0,0,.25)}
.dots .tai{background:var(--tai)}.dots .xiu{background:var(--xiu)}.dots .bao{background:#fbbf24}
.bars{display:flex;align-items:flex-end;gap:2px;height:34px;margin-top:9px}
.bars i{flex:1;border-radius:3px 3px 0 0;min-height:3px;opacity:.85}
.bars .tai{background:var(--tai)}.bars .xiu{background:var(--xiu)}.bars .bao{background:#fbbf24}
.list{margin-top:8px;overflow:hidden;animation:up .5s .16s both}
.row{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:10px;padding:10px 13px;border-bottom:1px solid rgba(127,127,127,.18)}
.row:last-child{border-bottom:0}
.pn{color:var(--ac);font-weight:900;font-size:14px;letter-spacing:.3px}
.row small{display:block;font-size:9px;color:var(--mu);font-weight:600;margin-top:2px}
.lv{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:99px;background:var(--ac);color:var(--bg);font-size:7px;font-weight:900;letter-spacing:.6px;vertical-align:1px}
.row.fresh{animation:fr 1.6s ease-out}
@keyframes fr{from{background:var(--ac)}}
.dc{text-align:center}
.dc small{font-size:10px;font-weight:800;color:var(--tx);opacity:.75;margin-top:4px}
.ds{display:inline-flex;gap:4px}
.d{width:20px;height:20px;border-radius:6px;background:linear-gradient(145deg,#fff,#d4d4d8);display:grid;grid-template:repeat(3,1fr)/repeat(3,1fr);padding:3px;box-shadow:0 1px 3px rgba(0,0,0,.45)}
.d i{width:4px;height:4px;border-radius:50%;place-self:center}
.d i.on{background:#18181b}.d.o i.on{background:#e11d48;width:5.5px;height:5.5px}
.ok,.no{display:inline-flex;width:17px;height:17px;border-radius:50%;align-items:center;justify-content:center;font-size:10px;font-weight:900;color:#fff}
.ok{background:#16a34a}.no{background:#dc2626}
.rs{display:flex;flex-direction:column;gap:5px;align-items:flex-end;min-width:92px}
.rs>div{display:flex;align-items:center;gap:6px}
.rs em{font-style:normal;font-size:8px;color:var(--mu);font-weight:800;letter-spacing:.5px}
.nx{background:linear-gradient(90deg,rgba(127,127,127,.22),transparent);border-left:3px solid var(--ac)}
.wait{animation:bl 1.4s infinite;color:var(--mu);font-weight:700}
@keyframes bl{50%{opacity:.35}}
.msg{padding:34px 10px;text-align:center;color:var(--ac);font-weight:700;font-size:12px}
.skl{height:74px;margin-bottom:8px;border-radius:var(--r);background:linear-gradient(100deg,rgba(127,127,127,.12) 30%,rgba(127,127,127,.3) 50%,rgba(127,127,127,.12) 70%);background-size:300% 100%;animation:sk 1.3s linear infinite}
@keyframes sk{to{background-position:-300% 0}}
.note{padding:9px 6px 0;font-size:9px;color:var(--mu);text-align:center;line-height:1.6}
.bfl{display:flex;gap:6px;align-items:center;margin-bottom:9px}
.fb{padding:5px 12px;border-radius:99px;border:var(--bw) solid var(--bd);background:rgba(127,127,127,.1);color:var(--tx);font-size:10px;font-weight:800;cursor:pointer}
.fb.on{background:var(--ac);color:var(--bg);border-color:var(--ac)}
.bfl span{margin-left:auto;font-size:10px;color:var(--mu);font-weight:800}
.bg{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.bt{padding:10px;cursor:pointer;animation:up .5s both;transition:.15s;border:1px solid rgba(212,175,55,.5);background:radial-gradient(ellipse at 50% -10%,#117a53,#08402d 62%,#05281d);box-shadow:0 6px 18px rgba(0,0,0,.45),inset 0 0 0 2px rgba(0,0,0,.25);color:#e8fff3;backdrop-filter:none}
.bt:active{transform:scale(.97)}
.bh{display:flex;align-items:center;gap:6px;font-weight:900;font-size:11px;color:#f5d97a;letter-spacing:.6px}
.bh .no{width:18px;height:18px;border-radius:50%;background:#f5d97a;color:#3a2a00;display:flex;align-items:center;justify-content:center;font-size:10px}
.bh small{margin-left:auto;font-size:8px;color:#a6e6c6;font-weight:700}
.bpm{display:grid;grid-auto-flow:column;grid-template-rows:repeat(6,10px);grid-auto-columns:10px;gap:2px;margin:8px 0 7px;padding:5px;border-radius:8px;background:#f3ecd8;justify-content:start;min-height:82px;overflow:hidden}
.bpm i,.bp i{border-radius:50%;display:block;box-shadow:inset -1px -2px 2px rgba(0,0,0,.35),inset 1px 1px 2px rgba(255,255,255,.55)}
.P{background:#2563eb}.B{background:#dc2626}.T{background:#16a34a}
.b3{display:flex;height:5px;border-radius:9px;overflow:hidden;background:rgba(255,255,255,.18)}
.b3 i{display:block;height:100%}
.pr{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:8px;font-size:9px;color:#a6e6c6;font-weight:700}
.pr .cl{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right}
.pd{display:inline-flex;align-items:center;padding:3px 10px;border-radius:99px;font-weight:900;font-size:10px;color:#fff;background:#52525b;letter-spacing:.4px;white-space:nowrap;flex:none}
.pd.P{background:#2563eb}.pd.B{background:#dc2626}
.bp,.br{display:grid;grid-template-rows:repeat(6,19px);grid-auto-columns:19px;gap:3px;overflow-x:auto;padding:8px;border-radius:10px;background:#f3ecd8;margin-top:6px}
.bp{grid-auto-flow:column}
.bp i{width:19px;height:19px;color:#fff;font-style:normal;font-size:9px;font-weight:900;display:flex;align-items:center;justify-content:center}
.ring{width:17px;height:17px;border-radius:50%;border:3px solid;position:relative;font-style:normal;font-size:8px;font-weight:900;color:#15803d;display:flex;align-items:center;justify-content:center;box-sizing:border-box}
.ring.P{border-color:#2563eb;background:none}.ring.B{border-color:#dc2626;background:none}
.ring.tie:after{content:"";position:absolute;left:-3px;right:-3px;top:50%;height:2px;margin-top:-1px;background:#16a34a;transform:rotate(-45deg)}
.ov{position:fixed;inset:0;background:rgba(0,0,0,.68);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);z-index:50;display:none;align-items:flex-end;justify-content:center}
.ov.on{display:flex}
.sheet{width:100%;max-width:560px;max-height:82vh;overflow-y:auto;padding:16px;border-radius:24px 24px 0 0;background:var(--bg);border:var(--bw) solid var(--bd);color:var(--tx);animation:sl .3s both}
@keyframes sl{from{transform:translateY(40px);opacity:0}}
.sheet h3{text-align:center;color:var(--ac);font-size:12px;letter-spacing:2px;margin-bottom:12px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.sw{height:62px;display:flex;flex-direction:column;justify-content:flex-end;padding:7px;text-align:left;border-radius:var(--r);border:2px solid var(--bd);background:linear-gradient(135deg,var(--bg),var(--b2) 55%,var(--ac));color:var(--tx);font-size:10px;font-weight:800;cursor:pointer;text-shadow:0 1px 3px rgba(0,0,0,.5);transition:.15s}
.sw:active{transform:scale(.94)}
.sw.cur{outline:3px solid var(--ac);outline-offset:1px}
.btn{background:linear-gradient(135deg,var(--a2),var(--ac));color:#fff;border:0;padding:10px;border-radius:calc(var(--r) + 6px);font-size:11px;font-weight:800;cursor:pointer;flex:1}
[data-t=oled] .btn{background:#fff;color:#000}
.opt{display:flex;gap:8px;margin-top:10px}
.ts{position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom));transform:translate(-50%,20px);background:var(--ac);color:var(--bg);padding:8px 16px;border-radius:99px;font-size:11px;font-weight:800;opacity:0;pointer-events:none;transition:.3s;z-index:90}
.ts.on{opacity:1;transform:translate(-50%,0)}
.foot{padding:14px 10px 24px;text-align:center;font-size:9px;color:var(--mu);line-height:1.6}
[data-t=black] .chip.on,[data-t=black] .ib,[data-t=black] .btn,[data-t=carbon] .chip.on,[data-t=carbon] .ib,[data-t=carbon] .btn,[data-t=onyx] .chip.on,[data-t=onyx] .ib,[data-t=onyx] .btn{color:#03110b}
.card.hero{border:1.5px solid transparent;background:linear-gradient(145deg,var(--b2),var(--bg)) padding-box,linear-gradient(135deg,var(--ac),rgba(127,127,127,.12) 45%,var(--a2)) border-box}
html{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.logo,.pn{font-family:'Orbitron','Inter',sans-serif}
.logo{font-size:13px;letter-spacing:1.5px}
.vip{margin-left:8px;padding:2px 7px;border-radius:6px;background:linear-gradient(135deg,#fde68a,#f59e0b);-webkit-text-fill-color:#3a2a00;color:#3a2a00;font-size:8px;font-weight:900;letter-spacing:1px;vertical-align:2px;font-family:'Inter',sans-serif}
.pn{font-size:13px;letter-spacing:.5px}
.gg{width:78px;height:78px}
.hero{padding:16px 16px 14px}
.hero:after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.09),transparent);transform:skewX(-20deg);animation:sn 5s ease-in-out infinite;pointer-events:none}
@keyframes sn{0%,55%{left:-60%}100%{left:140%}}
.hp{border:0;color:#fff;font-size:34px;padding:7px 24px 8px;background:rgba(127,127,127,.3);text-shadow:0 2px 4px rgba(0,0,0,.45);box-shadow:0 8px 22px -8px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.35);animation:none}
.hp.tai{background:linear-gradient(135deg,var(--tai),#2563eb)}
.hp.xiu{background:linear-gradient(135deg,var(--xiu),#dc2626)}
.hp.bao{background:linear-gradient(135deg,#fde68a,#d97706)}
.mb{display:inline-flex;align-items:center;padding:3px 9px;border-radius:99px;font-size:9px;font-weight:800;letter-spacing:.6px}
.mt .mb.rev{background:rgba(251,191,36,.16);color:#fbbf24;border:1px solid rgba(251,191,36,.55)}
.mt .mb.nm{background:rgba(74,222,128,.13);color:#4ade80;border:1px solid rgba(74,222,128,.4)}
.lh{display:flex;gap:3px;flex-wrap:wrap}
.lh i{width:13px;height:13px;border-radius:4px}
.lh .w{background:#22c55e;box-shadow:0 0 6px rgba(34,197,94,.5)}.lh .l{background:#ef4444;box-shadow:0 0 6px rgba(239,68,68,.45)}
.ds{gap:4px}
.d{width:22px;height:22px;border-radius:6px;padding:3px}
.d i{width:4.4px;height:4.4px}.d.o i.on{width:6px;height:6px}
.pl{font-size:11px;padding:3px 11px;font-weight:900;letter-spacing:.3px}
.ok,.no{width:19px;height:19px;font-size:11px}
.ok{box-shadow:0 0 8px rgba(34,197,94,.6)}.no{box-shadow:0 0 8px rgba(239,68,68,.55)}
.chip{font-size:11px;padding:7px 12px}
.chips.sub{padding-top:6px}
.chip.s{font-size:10px;padding:5px 11px;background:transparent;border-style:dashed}
.chip.s.on{border-style:solid}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important}}
</style>
</head>
<body oncontextmenu="return false">
<div class="top">
  <div class="t1"><div class="logo">♛ @DONGNETSUN<span class="vip">VIP</span><small id="gs"></small></div><button class="ib" id="bt">🎨</button></div>
  <div class="chips" id="ch"></div><div class="chips sub" id="ch2" style="display:none"></div><div class="pg" id="pg"></div>
</div>
<div class="wrap" id="app"><div id="main"><div class="skl"></div><div class="skl" style="height:46px"></div><div class="skl" style="height:180px"></div></div>
<div class="foot">✦ @dongnetsun ✦<br>Chỉ mang tính tham khảo. Mỗi phiên là ngẫu nhiên — không có cách đoán chắc thắng. Chế độ tự đảo cầu: khi 10 dự đoán LIVE gần nhất sai nhiều thì đảo chiều, nếu đảo cũng sai nhiều thì quay về cầu gốc. Tỉ lệ LIVE là kết quả thực tế của các dự đoán đã đưa ra TRƯỚC khi có kết quả.</div></div>
<div class="ov" id="ovb"><div class="sheet"><h3 id="bth"></h3><div id="btb"></div><div class="opt"><button class="btn" id="bc">ĐÓNG</button></div></div></div>
<div class="ov" id="ovt"><div class="sheet"><h3>🎨 CHỌN GIAO DIỆN</h3><div class="grid" id="tg"></div>
  <div class="opt"><button class="btn" id="tr">🎲 NGẪU NHIÊN</button><button class="btn" id="ta">🌈 TỰ ĐỔI: TẮT</button></div>
  <div class="opt"><button class="btn" id="tc">ĐÓNG</button></div></div></div>
<div class="ts" id="ts"></div>
<script>
var $=function(s){return document.querySelector(s)};
var TH=[['black','Đen Mint'],['onyx','Đen Xanh'],['carbon','Đen Cam'],['pink','Hồng Neon'],['cyber','Cyber Xanh'],['gold','Vàng Kim'],['matrix','Matrix'],['galaxy','Galaxy Tím'],['dragon','Rồng Đỏ'],['ice','Băng Giá'],['sunset','Hoàng Hôn'],['light','Sáng Tối Giản'],['brutal','Neo Brutal'],['arcade','Arcade Retro'],['forest','Rừng Xanh'],['ocean','Đại Dương'],['oled','OLED Đen'],['candy','Kẹo Ngọt'],['aurora','Cực Quang'],['coffee','Cà Phê']];
var LS={g:function(k,d){try{return localStorage.getItem(k)||d}catch(e){return d}},s:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
var cur=LS.g('dn_game','1'),timer=null,busy=false,view=LS.g('dn_view','tbl'),theme=LS.g('dn_theme2','black'),autoT=null,lastKey='',lastTop='',games=[],bac=[],tsT=null;
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function cls(v){return v==='Tài'?'tai':v==='Xỉu'?'xiu':v==='Bão'?'bao':''}
function pill(v){return v?'<span class="pl '+cls(v)+'">'+esc(v)+'</span>':'<span class="pl">—</span>'}
function toast(t){var e=$('#ts');e.textContent=t;e.classList.add('on');clearTimeout(tsT);tsT=setTimeout(function(){e.classList.remove('on')},1200)}
function setTheme(t,say){theme=t;document.documentElement.setAttribute('data-t',t);LS.s('dn_theme2',t);$('meta[name=theme-color]').content=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#000';Array.prototype.forEach.call(document.querySelectorAll('.sw'),function(b){b.classList.toggle('cur',b.getAttribute('data-t')===t)});if(say)TH.forEach(function(x){if(x[0]===t)toast('🎨 '+x[1])})}
function buildThemes(){$('#tg').innerHTML=TH.map(function(t){return '<button class="sw" data-t="'+t[0]+'">'+esc(t[1])+'</button>'}).join('');Array.prototype.forEach.call(document.querySelectorAll('.sw'),function(b){b.onclick=function(){setTheme(b.getAttribute('data-t'),1)}})}
function dot(l){var on=l.some(function(g){return g.online===true}),off=l.every(function(g){return g.online===false});return '<i class="'+(on?'o':off?'f':'')+'"></i>'}
function chips(){
  var o=[],m={};games.forEach(function(g){var b=g.brand||g.name;if(!m[b]){m[b]={name:b,list:[]};o.push(m[b])}m[b].list.push(g)});
  var cg=games.filter(function(g){return String(g.id)===String(cur)})[0],cb=cur==='bac'?'bac':(cg?(cg.brand||cg.name):'');
  $('#ch').innerHTML=o.map(function(b){return '<button class="chip'+(b.name===cb?' on':'')+'" data-b="'+esc(b.name)+'">'+dot(b.list)+esc(b.name)+'</button>'}).join('')+'<button class="chip'+(cur==='bac'?' on':'')+'" data-id="bac">🎴 BACCARAT</button>';
  var B=o.filter(function(b){return b.name===cb})[0],sub=B&&B.list.length>1?B.list.map(function(g){return '<button class="chip s'+(String(g.id)===String(cur)?' on':'')+'" data-id="'+g.id+'">'+dot([g])+esc(g.kind||g.name)+'</button>'}).join(''):'';
  $('#ch2').innerHTML=sub;$('#ch2').style.display=sub?'flex':'none';
  Array.prototype.forEach.call(document.querySelectorAll('.chip'),function(b){b.onclick=function(){var id=b.getAttribute('data-id');if(id)return pick(id);var bn=b.getAttribute('data-b'),want=LS.g('dn_b_'+bn,''),L=m[bn].list,t=L.filter(function(g){return String(g.id)===want})[0]||L[0];pick(t.id)}})}
function loadGames(){fetch('/api/games').then(function(r){return r.json()}).then(function(l){if(Array.isArray(l)&&l.length){games=l;chips()}}).catch(function(){})}
function skel(){$('#main').innerHTML='<div class="skl"></div><div class="skl" style="height:46px"></div><div class="skl" style="height:180px"></div>'}
function pick(id){cur=String(id);LS.s('dn_game',cur);var pg=games.filter(function(g){return String(g.id)===cur})[0];if(pg)LS.s('dn_b_'+(pg.brand||pg.name),cur);lastKey='';lastTop='';chips();$('#gs').textContent='';skel();var el=document.querySelector('.chip.on');if(el&&el.scrollIntoView)el.scrollIntoView({inline:'center',block:'nearest'});load();if(timer)clearInterval(timer);timer=setInterval(load,8000)}
function tick(){var p=$('#pg');p.classList.remove('go');void p.offsetWidth;p.classList.add('go')}
function stamp(){$('#gs').textContent='· '+new Date().toLocaleTimeString('vi-VN');tick()}
function fail(){lastKey='';$('#gs').textContent='· BẢO TRÌ';$('#main').innerHTML='<div class="msg">🛠 Game đang bảo trì hoặc chưa có dữ liệu.<br><small>Tự thử lại sau 8 giây...</small></div>'}
function load(){if(busy)return;busy=true;var p=cur==='bac'?fetch('/api/baccarat').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){if(!d||!d.tables||!d.tables.length)throw 0;bac=d.tables;bacLive=d.live||{n:0,w:0};var k=JSON.stringify(bac.map(function(t){return [t.ket_qua,t.du_doan,t.live_n]}))+bacF;if(k!==lastKey){lastKey=k;drawBac()}stamp()}):fetch('/api/data',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({apiId:+cur})}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){if(!d||!d.rows||!d.rows.length)throw 0;var k=d.rows.map(function(r){return r.phien+r.result+r.verify+r.prediction}).join('|');if(k!==lastKey){lastKey=k;draw(d)}stamp()});p.catch(fail).then(function(){busy=false})}
function die(n){var P={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]}[n]||[],h='<b class="d'+(n===1?' o':'')+'">';for(var i=0;i<9;i++)h+='<i'+(P.indexOf(i)>-1?' class="on"':'')+'></i>';return h+'</b>'}
function dice(a){return Array.isArray(a)&&a.length===3?'<span class="ds">'+a.map(die).join('')+'</span>':'—'}
function gauge(p){var c=2*Math.PI*26,o=p===null?c:c*(1-p/100);return '<svg class="gg" viewBox="0 0 64 64"><defs><linearGradient id="gd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--ac)"/><stop offset="1" style="stop-color:var(--a2)"/></linearGradient></defs><circle cx="32" cy="32" r="26" fill="none" style="stroke:rgba(127,127,127,.25)" stroke-width="6"/><circle cx="32" cy="32" r="26" fill="none" style="stroke:url(#gd)" stroke-width="6" stroke-linecap="round" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+o.toFixed(1)+'" transform="rotate(-90 32 32)"/><text x="32" y="37" text-anchor="middle" font-size="14" font-weight="900" style="fill:var(--tx)">'+(p===null?'…':p+'%')+'</text></svg>'}
function draw(d){
  var rows=d.rows,st=d.stats||{},nx=rows.filter(function(r){return r.isNext})[0],ps=rows.filter(function(r){return !r.isNext});
  var sv=ps[0]?ps[0].result:'',sk=0;for(var i=0;i<ps.length&&ps[i].result===sv;i++)sk++;
  var n=st.live_n||0,w=st.live_win||0,pc=n?Math.round(w*100/n):null,h='';
  if(nx)h+='<div class="card hero"><div><div class="hl">PHIÊN #'+esc(nx.phien)+' · DỰ ĐOÁN</div><div class="hp '+cls(nx.prediction)+'">'+esc((nx.prediction||'—').toUpperCase())+'</div></div><div class="gw">'+gauge(pc)+'LIVE '+(n?w+'/'+n:'…')+'</div><div class="mt"><span class="mb '+(nx.mode==='rev'?'rev':'nm')+'">'+(nx.mode==='rev'?'⟲ ĐANG ĐẢO CẦU':'● CẦU GỐC')+'</span><span>Chuỗi <b class="'+cls(sv)+'">'+esc(sv||'—')+' ×'+sk+'</b></span>'+(nx.conf?'<span>API báo <b>'+esc(nx.conf)+'</b></span>':'')+(nx.pattern?'<span>'+esc(nx.pattern)+'</span>':'')+'</div></div>';
  var lh=ps.filter(function(r){return r.live&&typeof r.isCorrect==='boolean'}).slice(0,30).reverse(),lhH=lh.length?'<div class="hl" style="margin-bottom:6px">DỰ ĐOÁN LIVE · '+lh.length+' GẦN NHẤT</div><div class="lh">'+lh.map(function(r){return '<i class="'+(r.isCorrect?'w':'l')+'"></i>'}).join('')+'</div><div style="height:10px"></div>':'';
  var bars=ps.slice(0,24).reverse().map(function(r){return r.total?'<i class="'+cls(r.result)+'" style="height:'+Math.max(8,Math.round((r.total-2)*100/16))+'%"></i>':''}).join('');
  h+='<div class="card viz">'+lhH+'<div class="dots">'+ps.slice(0,26).reverse().map(function(r){return '<i class="'+cls(r.result)+'">'+esc(r.result.charAt(0))+'</i>'}).join('')+'</div>'+(bars?'<div class="bars">'+bars+'</div>':'')+'</div>';
  var top=ps[0]?String(ps[0].phien):'',fresh=lastTop&&top&&top!==lastTop;lastTop=top;
  var top=ps[0]?String(ps[0].phien):'',fresh=lastTop&&top&&top!==lastTop;lastTop=top;
  h+='<div class="card list">';
  var first=true;
  rows.forEach(function(r){
    if(r.isNext)h+='<div class="row nx"><div><div class="pn">#'+esc(r.phien)+'</div><small>đang chạy</small></div><div class="dc wait">🎲 🎲 🎲</div><div class="rs"><div><em>DỰ ĐOÁN</em>'+pill(r.prediction)+'</div><div class="wait"><em>KẾT QUẢ</em>Chờ...</div></div></div>';
    else{h+='<div class="row'+(fresh&&first?' fresh':'')+'"><div><div class="pn">#'+esc(r.phien)+'</div><small>'+esc(r.time||'')+(r.live?'<span class="lv">LIVE</span>':'')+'</small></div><div class="dc">'+dice(r.dice)+'<small>'+esc(r.total||'')+'</small></div><div class="rs"><div><em>KẾT QUẢ</em>'+pill(r.result)+'</div><div><em>DỰ ĐOÁN</em>'+pill(r.prediction)+(r.isCorrect===true?'<span class="ok">✓</span>':r.isCorrect===false?'<span class="no">✗</span>':'')+'</div></div></div>';first=false}});
  $('#main').innerHTML=h+'</div><div class="note">Nhãn LIVE = dự đoán đưa ra trước khi có kết quả (chỉ những dòng này tính vào tỉ lệ LIVE).</div>';
}
var BN={P:'Con',B:'Cái',T:'Hòa'},bacF='all',bacLive={n:0,w:0};
function bar3(t){var n=t.con+t.cai+t.hoa||1;return '<div class="b3"><i class="P" style="width:'+t.con*100/n+'%"></i><i class="B" style="width:'+t.cai*100/n+'%"></i><i class="T" style="width:'+t.hoa*100/n+'%"></i></div>'}
function miniPlate(r){var s=Math.max(0,(Math.floor((r.length-1)/6)-10)*6);return r.slice(s).split('').map(function(c){return '<i class="'+c+'"></i>'}).join('')}
function pdPill(t,big){return t.du_doan?'<span class="pd '+t.du_doan+'"'+(big?' style="font-size:17px;padding:6px 20px"':'')+'>'+BN[t.du_doan].toUpperCase()+'</span>':'<span class="pd"'+(big?' style="font-size:15px;padding:6px 20px"':'')+'>—</span>'}
function bigRoad(r){var occ={},beads=[],col=0,row=0,sc=0,last=null,lb=null;
  for(var i=0;i<r.length;i++){var c=r.charAt(i);
    if(c==='T'){if(lb)lb.t++;continue}
    if(c===last){if(row<5&&!occ[col+','+(row+1)])row++;else col++}
    else{if(last!==null){sc++;while(occ[sc+',0'])sc++}col=sc;row=0}
    occ[col+','+row]=1;lb={c:c,col:col,row:row,t:0};beads.push(lb);last=c}
  return '<div class="br" id="brr">'+beads.map(function(b){return '<i class="ring '+b.c+(b.t?' tie':'')+'" style="grid-row:'+(b.row+1)+';grid-column:'+(b.col+1)+'">'+(b.t>1?b.t:'')+'</i>'}).join('')+'</div>'}
function drawBac(){
  var np=bac.filter(function(t){return t.du_doan}).length,h='<div class="bfl"><button class="fb'+(bacF==='all'?' on':'')+'" data-f="all">TẤT CẢ ('+bac.length+')</button><button class="fb'+(bacF==='pred'?' on':'')+'" data-f="pred">CÓ DỰ ĐOÁN ('+np+')</button>'+(bacLive.n?'<span>LIVE '+bacLive.w+'/'+bacLive.n+' · '+Math.round(bacLive.w*100/bacLive.n)+'%</span>':'')+'</div><div class="bg">';
  bac.forEach(function(t,i){if(bacF==='pred'&&!t.du_doan)return;
    h+='<div class="card bt" data-i="'+i+'" style="animation-delay:'+Math.min(i*25,350)+'ms"><div class="bh"><span class="no">♠</span>BÀN '+esc(t.ban)+'<small>'+esc(t.phien)+' ván</small></div><div class="bpm">'+miniPlate(t.ket_qua)+'</div>'+bar3(t)+'<div class="pr">'+pdPill(t)+'<span class="cl">'+esc(t.cau||'Chưa có cầu')+(t.live_n?' · '+t.live_w+'/'+t.live_n:'')+'</span></div></div>'});
  $('#main').innerHTML=h+'</div><div class="note">Chạm vào bàn để xem bảng châu lộ + đại lộ. Dự đoán lấy theo cầu của API. <span class="tai">● Con</span> <span class="xiu">● Cái</span> <span class="dung">● Hòa</span></div>';
  Array.prototype.forEach.call(document.querySelectorAll('.bt'),function(b){b.onclick=function(){openBac(+b.getAttribute('data-i'))}});
  Array.prototype.forEach.call(document.querySelectorAll('.fb'),function(b){b.onclick=function(){bacF=b.getAttribute('data-f');drawBac()}});
  if($('#ovb').classList.contains('on')&&openBac.i!==undefined)openBac(openBac.i);
}
function openBac(i){var t=bac[i];if(!t)return;openBac.i=i;var c=t.chuoi;$('#bth').textContent='BÀN '+t.ban+' · '+t.phien+' VÁN';
  $('#btb').innerHTML='<div class="card hero" style="margin-bottom:10px"><div><div class="hl">DỰ ĐOÁN · THEO CẦU API</div><div style="margin-top:7px">'+pdPill(t,1)+'</div><div class="hs" style="margin-top:6px;font-size:11px;color:var(--mu);font-weight:700">'+esc(t.cau||'Chưa có cầu')+'</div></div><div class="gw" style="text-align:right;font-size:10px">'+(c?'CHUỖI<br><span class="pl '+(c.side==='P'?'tai':c.side==='B'?'xiu':'dung')+'">'+BN[c.side]+' ×'+c.len+'</span>':'')+(t.live_n?'<br><br>LIVE '+t.live_w+'/'+t.live_n:'')+'</div><div class="mt"><span class="tai">Con <b>'+t.con+'</b></span><span class="xiu">Cái <b>'+t.cai+'</b></span><span class="dung">Hòa <b>'+t.hoa+'</b></span></div></div>'+bar3(t)+'<div class="hl" style="margin-top:12px">BẢNG CHÂU LỘ</div><div class="bp" id="bpp">'+t.ket_qua.split('').map(function(x){return '<i class="'+x+'">'+x+'</i>'}).join('')+'</div><div class="hl" style="margin-top:12px">ĐẠI LỘ</div>'+bigRoad(t.ket_qua);
  $('#ovb').classList.add('on');['#bpp','#brr'].forEach(function(q){var e=$(q);if(e)e.scrollLeft=e.scrollWidth})}
$('#bc').onclick=function(){$('#ovb').classList.remove('on');openBac.i=undefined};
$('#ovb').onclick=function(e){if(e.target===this){this.classList.remove('on');openBac.i=undefined}};
$('#bt').onclick=function(){$('#ovt').classList.add('on')};
$('#tc').onclick=function(){$('#ovt').classList.remove('on')};
$('#tr').onclick=function(){setTheme(TH[Math.floor(Math.random()*TH.length)][0],1)};
$('#ta').onclick=function(){if(autoT){clearInterval(autoT);autoT=null;this.textContent='🌈 TỰ ĐỔI: TẮT'}else{var i=0;autoT=setInterval(function(){i=(i+1)%TH.length;setTheme(TH[i][0],1)},15000);this.textContent='🌈 TỰ ĐỔI: BẬT'}};
$('#ovt').onclick=function(e){if(e.target===this)this.classList.remove('on')};
buildThemes();setTheme(theme);chips();loadGames();pick(cur);
</script>
</body>
</html>
`;
const sendUI = (req, res) => { res.setHeader('Cache-Control', 'no-store'); res.type('html').send(INDEX_HTML); };
app.get('/', sendUI);
app.get('/index.html', sendUI);

let bacCache = null;
const bacTrack = {};
// Dự đoán lấy theo trường "cau" của API: dính/bệt/nghiêng + Con/Cái => theo bên đó; "cầu đơn" => cầu 1-1 (đảo bên cuối)
function bacPred(cau, r) {
  const c = String(cau || '').toLowerCase();
  const side = /con/.test(c) ? 'P' : /cái|cai/.test(c) ? 'B' : null;
  if (side && /(dính|dinh|bệt|bet|nghiêng|nghieng)/.test(c)) return side;
  if (/đơn|don/.test(c)) { const nt = r.replace(/T/g, ''); const l = nt[nt.length - 1]; return l ? (l === 'P' ? 'B' : 'P') : null; }
  return null;
}
async function getBaccarat() {
  if (bacCache && Date.now() - bacCache.ts < 8000) return bacCache.data;
  const raw = await fetchJson('https://bcf-ayt4.onrender.com/sexy/all', 20000);
  if (!Array.isArray(raw)) throw new Error('bad baccarat data');
  const cnt = (r, c) => (r.match(new RegExp(c, 'g')) || []).length;
  let tn = 0, tw = 0;
  const data = raw.map(t => {
    const r = String(t.ket_qua || '').toUpperCase().replace(/[^PBT]/g, '');
    const pred = bacPred(t.cau, r);
    const tr = bacTrack[t.ban] || (bacTrack[t.ban] = { len: r.length, pred: null, n: 0, w: 0 });
    // chấm đúng/sai thật: so dự đoán của lần quét trước với ván mới ra (bỏ qua Hòa)
    if (tr.pred && r.length > tr.len && r.length - tr.len <= 3) { const c = r[tr.len]; if (c !== 'T') { tr.n++; if (c === tr.pred) tr.w++; } }
    tr.len = r.length; tr.pred = pred;
    tn += tr.n; tw += tr.w;
    let len = 0; for (let i = r.length - 1; i >= 0 && r[i] === r[r.length - 1]; i--) len++;
    return { ban: String(t.ban), cau: t.cau || '', phien: t.phien, time: t.time || '', ket_qua: r, con: cnt(r, 'P'), cai: cnt(r, 'B'), hoa: cnt(r, 'T'), chuoi: r ? { side: r[r.length - 1], len } : null, du_doan: pred, live_n: tr.n, live_w: tr.w };
  });
  const key = b => (/^\d+$/.test(b.ban) ? [0, Number(b.ban)] : [1, Number(b.ban.replace(/\D/g, '')) || 0]);
  data.sort((a, b) => { const x = key(a), y = key(b); return x[0] - y[0] || x[1] - y[1]; });
  bacCache = { data, ts: Date.now(), live: { n: tn, w: tw } };
  return data;
}
app.get('/api/baccarat', async (req, res) => {
  try { const tables = await getBaccarat(); res.json({ id: '@dongnetsun', tables, live: bacCache.live }); }
  catch (e) { if (bacCache) return res.json({ id: '@dongnetsun', tables: bacCache.data, live: bacCache.live, stale: true }); res.status(503).json({ error: 'no data' }); }
});

app.get('/api/games', (req, res) => {
  const rank = c => { const i = KIND_ORDER.findIndex(k => String(c.kind).startsWith(k)); return i < 0 ? 99 : i; };
  const list = Object.keys(API_CONFIGS).map(id => ({
    id: Number(id), name: API_CONFIGS[id].name, brand: API_CONFIGS[id].brand, kind: API_CONFIGS[id].kind, online: status[id] ? status[id].ok : null
  }));
  const bo = b => { const i = BRAND_ORDER.indexOf(b); return i < 0 ? 99 : i; };
  list.sort((a, b) => bo(a.brand) - bo(b.brand) || rank(a) - rank(b) || a.id - b.id);
  res.json(list);
});

app.get('/health', (req, res) => res.json({ ok: true, games: Object.keys(API_CONFIGS).length }));

app.get('/preds-status', (req, res) => {
  const counts = {};
  for (const k in serverPreds) counts[k] = Object.keys(serverPreds[k]).length;
  res.json({ file: PREDS_FILE, exists: fs.existsSync(PREDS_FILE), counts });
});

app.get('/sunwin', async (req, res) => {
  const json = await buildCommonJSON(1);
  if (!json) return res.status(503).json({ error: 'no data' });
  res.json(json);
});

app.get('/lc79-md5', async (req, res) => {
  const json = await buildCommonJSON(2);
  if (!json) return res.status(503).json({ error: 'no data' });
  res.json(json);
});

app.get('/max789', async (req, res) => {
  const json = await buildCommonJSON(3);
  if (!json) return res.status(503).json({ error: 'no data' });
  res.json(json);
});

app.get('/hitclub', async (req, res) => {
  const json = await buildCommonJSON(4);
  if (!json) return res.status(503).json({ error: 'no data' });
  res.json(json);
});

app.get('/68gb', async (req, res) => {
  const json = await buildCommonJSON(5);
  if (!json) return res.status(503).json({ error: 'no data' });
  res.json(json);
});

app.get('/sumclub', async (req, res) => {
  const json = await buildCommonJSON(6);
  if (!json) return res.status(503).json({ error: 'no data' });
  res.json(json);
});

app.get('/rikvip', async (req, res) => {
  const json = await buildCommonJSON(7);
  if (!json) return res.status(503).json({ error: 'no data' });
  res.json(json);
});

app.get('/sicsun', async (req, res) => {
  const json = await buildCommonJSON(8);
  if (!json) return res.status(503).json({ error: 'no data' });
  res.json(json);
});

app.get('/lc79-hu', async (req, res) => {
  const json = await buildCommonJSON(9);
  if (!json) return res.status(503).json({ error: 'no data' });
  res.json(json);
});

app.get('/betvip-md5', async (req, res) => { const json = await buildCommonJSON(10); if (!json) return res.status(503).json({ error: 'no data' }); res.json(json); });
app.get('/betvip-hu', async (req, res) => { const json = await buildCommonJSON(11); if (!json) return res.status(503).json({ error: 'no data' }); res.json(json); });
app.get('/max789-hu', async (req, res) => { const json = await buildCommonJSON(12); if (!json) return res.status(503).json({ error: 'no data' }); res.json(json); });
app.get('/max789-live', async (req, res) => { const json = await buildCommonJSON(13); if (!json) return res.status(503).json({ error: 'no data' }); res.json(json); });
app.get('/xoclo88', async (req, res) => { const json = await buildCommonJSON(14); if (!json) return res.status(503).json({ error: 'no data' }); res.json(json); });
app.get('/b52', async (req, res) => { const json = await buildCommonJSON(15); if (!json) return res.status(503).json({ error: 'no data' }); res.json(json); });
app.get('/sichit', async (req, res) => { const json = await buildCommonJSON(16); if (!json) return res.status(503).json({ error: 'no data' }); res.json(json); });

const SLUGS = {17: "luck8-tx", 18: "luck8-md5", 19: "luck8-sicbo", 20: "xocdia88-hu", 21: "xocdia88-md5", 22: "789club-tx", 23: "789club-sicbo", 24: "b52-tx", 25: "b52-md5", 26: "b52-sicbo", 27: "hitclub-tx", 28: "hitclub-md5", 29: "hitclub-sicbo", 30: "hot789-tx", 31: "hot789-md5", 32: "rikvip-tx", 33: "rikvip-md5", 34: "rikvip-sicbo"};
Object.keys(SLUGS).forEach(id => {
  app.get('/' + SLUGS[id], async (req, res) => { const json = await buildCommonJSON(Number(id)); if (!json) return res.status(503).json({ error: 'no data' }); res.json(json); });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

async function preload() {
  for (const id of Object.keys(API_CONFIGS)) {
    try {
      await fetchRaw(Number(id));
      console.log(`✓ preload game ${id}`);
    } catch (e) {
      console.log(`✗ preload game ${id} failed`);
    }
  }
}

setInterval(() => {
  Object.keys(API_CONFIGS).forEach((id, i) => { setTimeout(() => buildCommonJSON(Number(id)).catch(() => {}), i * 250); });
  getBaccarat().catch(() => {});
}, Number(process.env.POLL_MS) || 15000);

process.on('unhandledRejection', e => console.log('unhandledRejection', e && e.message));
process.on('uncaughtException', e => console.log('uncaughtException', e && e.message));

app.listen(PORT, () => {
  console.log(`@dongnetsun running on port ${PORT}`);
  preload();
});