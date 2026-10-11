/* ==========================================================
   A Little Birthday World — script.js
   Reads everything from config.js (birthdayConfig).
   All user text is inserted with textContent (never innerHTML).
   ========================================================== */
(function () {
  'use strict';

  const cfg = (typeof birthdayConfig !== 'undefined' && birthdayConfig) || {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* ---------- helpers ---------- */
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const arr = (v) => (Array.isArray(v) ? v : []);
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const rand = (min, max) => min + Math.random() * (max - min);
  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  // Replace {name} / {you} placeholders
  function fill(s) {
    return String(s == null ? '' : s)
      .replace(/\{name\}/g, cfg.friendName || 'Friend')
      .replace(/\{you\}/g, cfg.yourName || 'Me');
  }
  // Read "a.b.c" from the config
  function get(path) {
    return path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : undefined), cfg);
  }
  function scrollToTarget(sel) {
    if (sel === 'top') { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); return; }
    const t = $(sel);
    if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3800);
  }

  /* ---------- particles (lightweight, Web Animations API) ---------- */
  const HEARTS = ['💗', '🌷', '✨', '🌸', '💖', '⭐'];
  const BLUE = ['💙', '✨', '🌺', '⭐', '🫧', '🌊'];
  const CONFETTI = ['🎊', '🎉', '💗', '🌷', '✨', '🌸', '⭐', '💙', '💛'];
  function burst(x, y, items, count) {
    if (!document.body.animate) return;
    const n = reduce ? Math.min(count, 4) : count;
    for (let i = 0; i < n; i++) {
      const s = el('span', 'particle', pick(items));
      s.setAttribute('aria-hidden', 'true');
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      document.body.appendChild(s);
      const a = Math.random() * Math.PI * 2;
      const d = rand(60, 150);
      const dx = Math.cos(a) * d;
      const dy = Math.sin(a) * d - 50;
      const anim = s.animate([
        { transform: 'translate(-50%,-50%) scale(.4)', opacity: 1 },
        { transform: 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + (dy + 70) + 'px)) rotate(' + rand(-120, 120) + 'deg) scale(1.1)', opacity: 0 }
      ], { duration: rand(1000, 1700), easing: 'cubic-bezier(.2,.7,.3,1)' });
      anim.onfinish = () => s.remove();
    }
  }
  function burstFrom(node, items, count) {
    const r = node.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, items, count);
  }

  /* ---------- decorations ---------- */
  function makeFloaters() {
    const box = $('#floaters');
    const emojis = ['🌸', '💗', '✨', '🦋', '🌷', '⭐', '🫧', '💙', '🌼'];
    for (let i = 0; i < 12; i++) {
      const s = el('span', '', pick(emojis));
      s.style.left = rand(2, 94) + '%';
      s.style.setProperty('--s', rand(1, 1.9).toFixed(2) + 'rem');
      s.style.setProperty('--d', rand(18, 34).toFixed(1) + 's');
      s.style.setProperty('--delay', '-' + rand(0, 30).toFixed(1) + 's');
      s.style.setProperty('--x', rand(-40, 40).toFixed(0) + 'px');
      box.appendChild(s);
    }
    const dbox = $('#introDoodles');
    ['🌸', '💗', '⭐', '🌷', '🦋', '✨', '🌼', '💙'].forEach((e, i) => {
      const s = el('span', '', e);
      s.style.left = (6 + (i * 37) % 84) + '%';
      s.style.top = (6 + (i * 53) % 84) + '%';
      s.style.setProperty('--s', rand(1.3, 2.2).toFixed(2) + 'rem');
      s.style.setProperty('--d', rand(3, 6).toFixed(1) + 's');
      s.style.setProperty('--delay', '-' + rand(0, 4).toFixed(1) + 's');
      dbox.appendChild(s);
    });
  }

  /* Fill every [data-cfg="path"] element from the config (keeps HTML default if missing) */
  function applyConfigText() {
    $$('[data-cfg]').forEach((n) => {
      const v = get(n.getAttribute('data-cfg'));
      if (typeof v === 'string' && v.trim()) n.textContent = fill(v);
    });
    const name = cfg.friendName || 'Friend';
    $('#heroTitle').textContent = 'Happy Birthday, ' + name + '! 🎂';
    document.title = 'Happy Birthday, ' + name + '! 🎂';
  }

  function setupCountdown() {
    if (!cfg.showCountdown) return;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(cfg.birthdayDate || ''));
    if (!m) return; // still a placeholder → show nothing
    const now = new Date(); now.setHours(0, 0, 0, 0);
    let target = new Date(now.getFullYear(), +m[2] - 1, +m[3]);
    if (target < now) target = new Date(now.getFullYear() + 1, +m[2] - 1, +m[3]);
    const days = Math.round((target - now) / 86400000);
    const c = $('#countdown');
    c.textContent = days === 0 ? "It's today! 🎉" : days + (days === 1 ? ' sleep' : ' sleeps') + ' until the big day 🎈';
    c.hidden = false;
  }

  /* ---------- intro ---------- */
  let introDone = false;
  function openIntro(skip) {
    if (introDone) return;
    introDone = true;
    const intro = $('#intro');
    intro.classList.add(skip ? 'skip' : 'opening');
    if (!skip) {
      setTimeout(() => burstFrom($('#envelope'), HEARTS, 22), 450);
    }
    setTimeout(() => {
      intro.hidden = true;
      root.classList.remove('locked');
      window.scrollTo(0, 0);
    }, skip ? 350 : 1800);
  }

  /* ---------- 3D tilt on hero card ---------- */
  function setupTilt() {
    const card = $('#heroCard');
    if (reduce) return;
    const tilt = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'rotateY(' + (x * 10).toFixed(2) + 'deg) rotateX(' + (-y * 10).toFixed(2) + 'deg)';
    };
    const reset = () => { card.style.transform = ''; };
    card.addEventListener('pointermove', tilt);
    card.addEventListener('pointerdown', tilt);
    ['pointerleave', 'pointerup', 'pointercancel'].forEach((ev) => card.addEventListener(ev, reset));
  }

  /* ---------- letter (typewriter) ---------- */
  function setupLetter() {
    const box = $('#letterBody');
    const paras = arr(cfg.letter).map(fill);
    const btn = $('#revealLetter');
    if (!paras.length) { box.textContent = 'A letter is on its way… 💌'; btn.hidden = true; return; }
    const nodes = paras.map((t) => { const p = el('p'); box.appendChild(p); return p; });
    const chars = paras.map((t) => Array.from(t));
    let done = false, started = false, timer = null;

    function finish() {
      clearTimeout(timer);
      nodes.forEach((p, i) => { p.textContent = paras[i]; });
      done = true;
      btn.hidden = true;
    }
    function start() {
      if (started) return;
      started = true;
      if (reduce) { finish(); return; }
      let pi = 0, ci = 0;
      (function step() {
        if (done) return;
        if (pi >= paras.length) { finish(); return; }
        ci += 3; // 3 characters per tick keeps it quick
        nodes[pi].textContent = chars[pi].slice(0, ci).join('');
        if (ci >= chars[pi].length) { pi++; ci = 0; timer = setTimeout(step, 140); }
        else timer = setTimeout(step, 22);
      })();
    }
    btn.addEventListener('click', finish);
    return start;
  }

  /* ---------- photo gallery + lightbox ---------- */
  const state = { photos: [] };
  const lb = { root: $('#lightbox'), img: $('#lbImg'), cap: $('#lbCap'), count: $('#lbCount'), list: [], pos: 0, last: null };

  function setupGallery() {
    const grid = $('#photoGrid');
    state.photos = arr(cfg.photos).filter((p) => p && typeof p.src === 'string').map((p) => ({ src: p.src, caption: p.caption || '', alt: p.alt || '', ok: null }));
    if (!state.photos.length) { grid.appendChild(el('p', 'empty', 'Photos coming soon 🌷')); return; }
    state.photos.forEach((p, i) => {
      const fig = el('figure', 'polaroid reveal ' + (i % 3 === 1 ? 'land' : 'port'));
      fig.style.setProperty('--r', ((i % 2 ? 1 : -1) * (1 + (i * 7) % 3)) + 'deg');
      const btn = el('button', 'photo-btn');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Open photo ' + (i + 1) + (p.caption ? ': ' + p.caption : ''));
      const img = new Image();
      img.alt = p.alt || p.caption || 'Photo ' + (i + 1);
      img.loading = 'lazy';
      img.decoding = 'async';
      img.addEventListener('load', () => { p.ok = true; });
      img.addEventListener('error', () => {
        p.ok = false;
        img.remove();
        btn.disabled = true;
        btn.classList.add('missing');
        btn.removeAttribute('aria-label');
        btn.textContent = '🌷 A photo will bloom here';
      });
      img.src = p.src;
      btn.appendChild(img);
      btn.addEventListener('click', () => { if (p.ok !== false) openLightbox(i); });
      fig.appendChild(btn);
      if (p.caption) fig.appendChild(el('figcaption', '', p.caption));
      grid.appendChild(fig);
    });
  }

  function showLightbox() {
    const p = state.photos[lb.list[lb.pos]];
    lb.img.src = p.src;
    lb.img.alt = p.alt || p.caption || 'Photo';
    lb.cap.textContent = p.caption;
    lb.count.textContent = '(' + (lb.pos + 1) + '/' + lb.list.length + ')';
    const multi = lb.list.length > 1;
    $('#lbPrev').hidden = !multi;
    $('#lbNext').hidden = !multi;
  }
  function openLightbox(idx) {
    lb.list = state.photos.map((p, i) => i).filter((i) => state.photos[i].ok !== false);
    lb.pos = Math.max(0, lb.list.indexOf(idx));
    lb.last = document.activeElement;
    showLightbox();
    lb.root.hidden = false;
    root.classList.add('locked'); // stops the page scrolling behind
    $('#lbClose').focus();
  }
  function closeLightbox() {
    lb.root.hidden = true;
    lb.img.removeAttribute('src');
    root.classList.remove('locked');
    if (lb.last && lb.last.focus) lb.last.focus();
  }
  function stepLightbox(d) {
    if (lb.list.length < 2) return;
    lb.pos = (lb.pos + d + lb.list.length) % lb.list.length;
    showLightbox();
  }
  function setupLightbox() {
    $('#lbClose').addEventListener('click', closeLightbox);
    $('#lbPrev').addEventListener('click', () => stepLightbox(-1));
    $('#lbNext').addEventListener('click', () => stepLightbox(1));
    lb.root.addEventListener('click', (e) => {
      if (e.target === lb.root || e.target.classList.contains('lb-stage')) closeLightbox();
    });
    lb.img.addEventListener('error', () => { lb.cap.textContent = 'This photo could not be loaded.'; });
    document.addEventListener('keydown', (e) => {
      if (lb.root.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') stepLightbox(-1);
      else if (e.key === 'ArrowRight') stepLightbox(1);
      else if (e.key === 'Tab') { // keep focus inside the dialog
        const f = ['#lbClose', '#lbPrev', '#lbNext'].map((s) => $(s)).filter((b) => !b.hidden);
        const i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    let sx = null;
    lb.root.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.root.addEventListener('touchend', (e) => {
      if (sx == null) return;
      const dx = e.changedTouches[0].clientX - sx;
      sx = null;
      if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---------- Stitch + Shin-chan sections ---------- */
  function tryImage(path, holder, alt) {
    if (typeof path !== 'string' || !path) return;
    const img = new Image();
    img.alt = alt;
    img.onload = () => { holder.replaceChildren(img); };
    img.src = path; // on error we simply keep the CSS doodle
  }
  function setupFunSections() {
    tryImage(get('stitch.image'), $('#stitchArt'), 'A little blue sticker');
    tryImage(get('shin.image'), $('#shinArt'), 'A funny cartoon sticker');

    const blueWishes = arr(get('stitch.wishes')).length ? arr(get('stitch.wishes')) : ['May your day be full of blue magic! 💙'];
    const blueOut = $('#blueOut');
    $('#blueBtn').addEventListener('click', function () {
      burstFrom(this, BLUE, 26);
      blueOut.textContent = fill(pick(blueWishes));
    });

    const jokes = arr(get('shin.jokes')).length ? arr(get('shin.jokes')) : ['Extra cake today. That is the law! 🎂'];
    const out = $('#laughOut');
    $('#laughBtn').addEventListener('click', () => {
      out.hidden = false;
      $('p', out).textContent = fill(pick(jokes));
      out.classList.remove('pop');
      void out.offsetWidth; // restart animation
      out.classList.add('pop');
    });
  }

  /* ---------- videos ---------- */
  function setupVideos() {
    const box = $('#videoList');
    const vids = arr(cfg.videos).filter((v) => v && typeof v.src === 'string');
    if (!vids.length) { box.appendChild(el('p', 'empty', 'Videos will appear here soon 🎞️')); return; }
    vids.forEach((v, i) => {
      const card = el('article', 'vcard reveal');
      const wrap = el('div', 'vwrap');
      const vid = document.createElement('video');
      vid.controls = true;
      vid.preload = 'none';            // nothing downloads until she taps play
      vid.playsInline = true;
      vid.setAttribute('playsinline', '');
      vid.setAttribute('aria-label', v.title || 'Video ' + (i + 1));
      if (v.poster) { const t = new Image(); t.onload = () => { vid.poster = v.poster; }; t.src = v.poster; }
      vid.addEventListener('error', () => {
        wrap.replaceChildren(el('p', 'vfail', "This video isn't available right now 🥲\nIt may not have been added yet."));
      });
      vid.src = v.src;
      wrap.appendChild(vid);
      card.appendChild(wrap);
      if (v.title) card.appendChild(el('h3', '', v.title));
      if (v.caption) card.appendChild(el('p', '', v.caption));
      box.appendChild(card);
    });
  }

  /* ---------- wish cards ---------- */
  function setupWishes() {
    const grid = $('#wishGrid');
    const wishes = arr(cfg.wishes).filter((w) => w && w.message);
    if (!wishes.length) { grid.appendChild(el('p', 'empty', 'More wishes coming soon ✨')); return; }
    wishes.forEach((w, i) => {
      const b = el('button', 'wish-card reveal c' + (i % 6));
      b.type = 'button';
      b.setAttribute('aria-expanded', 'false');
      b.appendChild(el('span', 'ic', w.icon || '💗')).setAttribute('aria-hidden', 'true');
      b.appendChild(el('span', 'tt', w.title || 'A wish'));
      const msg = el('span', 'msg', fill(w.message));
      msg.hidden = true;
      b.appendChild(msg);
      b.addEventListener('click', () => {
        const open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!open));
        b.classList.toggle('open', !open);
        msg.hidden = open;
        if (!open) burstFrom(b, HEARTS, 12);
      });
      grid.appendChild(b);
    });
  }

  /* ---------- gift ---------- */
  function setupGift() {
    const fm = $('#finalMsg');
    arr(cfg.finalMessage).forEach((t) => fm.appendChild(el('p', '', fill(t))));
    const btn = $('#giftBtn');
    btn.addEventListener('click', () => {
      const gift = $('#gift');
      gift.classList.add('open');
      btn.disabled = true;
      btn.textContent = 'Surprise opened 🎁';
      burstFrom(gift, CONFETTI, 34);
      setTimeout(() => burstFrom(gift, CONFETTI, 20), 400);
      if (fm.childNodes.length) {
        fm.hidden = false;
        requestAnimationFrame(() => fm.classList.add('show'));
        setTimeout(() => fm.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' }), 500);
      }
    });
  }

  /* ---------- music (optional, only after a tap) ---------- */
  function setupMusic() {
    const btn = $('#musicBtn');
    if (cfg.showMusicButton === false || typeof cfg.backgroundMusic !== 'string' || !cfg.backgroundMusic) return;
    btn.hidden = false;
    let audio = null, playing = false;
    const sync = () => {
      btn.setAttribute('aria-pressed', String(playing));
      btn.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
    };
    btn.addEventListener('click', () => {
      if (!audio) {
        audio = new Audio();
        audio.loop = true;
        audio.preload = 'none';
        audio.addEventListener('error', () => {
          playing = false; audio = null; sync();
          toast('No music file found yet 🎵 (add assets/audio/birthday-music.mp3)');
        });
        audio.src = cfg.backgroundMusic;
      }
      if (playing) { audio.pause(); playing = false; sync(); return; }
      const p = audio.play();
      playing = true; sync();
      if (p && p.catch) p.catch(() => { playing = false; sync(); });
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden && audio && playing) { audio.pause(); playing = false; sync(); } });
  }

  /* ---------- scroll reveal + generic buttons ---------- */
  function setupReveal(startLetter) {
    const targets = $$('.reveal');
    if (!('IntersectionObserver' in window)) { targets.forEach((t) => t.classList.add('in')); if (startLetter) startLetter(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        if (en.target.id === 'paper' && startLetter) startLetter();
        io.unobserve(en.target);
      });
    }, { threshold: 0.2 });
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- init ---------- */
  function init() {
    makeFloaters();
    applyConfigText();
    setupCountdown();
    setupTilt();
    const startLetter = setupLetter();
    setupGallery();
    setupLightbox();
    setupFunSections();
    setupVideos();
    setupWishes();
    setupGift();
    setupMusic();
    setupReveal(startLetter);

    $('#openBtn').addEventListener('click', () => openIntro(false));
    $('#skipBtn').addEventListener('click', () => openIntro(true));
    $$('[data-scroll]').forEach((b) => b.addEventListener('click', () => scrollToTarget(b.getAttribute('data-scroll'))));
    // Pause decorative animations when the tab/app is hidden
    document.addEventListener('visibilitychange', () => document.body.classList.toggle('paused', document.hidden));
  }

  init();
})();