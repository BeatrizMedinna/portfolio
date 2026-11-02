// @ts-nocheck
/* Menu mobile, índice do case com progresso de leitura e lightbox acessível. */
(function () {
  // Menu mobile
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  // TOC do case: seção atual + barra de progresso de leitura
  var toc = document.querySelector('.toc');
  if (toc) {
    var links = Array.prototype.slice.call(toc.querySelectorAll('a'));
    var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    var bar = document.querySelector('.read-progress span');
    var article = document.querySelector('.case-body');
    var tick = false;
    function update() {
      tick = false;
      var pos = window.scrollY + window.innerHeight * 0.3;
      var current = 0;
      targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top + window.scrollY <= pos) current = i; });
      links.forEach(function (a, i) {
        if (i === current) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
      if (bar && article) {
        var r = article.getBoundingClientRect();
        var p = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - r.top) / r.height));
        bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
      }
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  // Lightbox: abre por clique ou teclado, prende o foco, devolve o foco ao fechar
  var box = document.querySelector('.lightbox');
  if (box) {
    var img = box.querySelector('img');
    var close = box.querySelector('.lightbox-close');
    var opener = null;
    function open(btn) {
      opener = btn;
      var src = btn.querySelector('img');
      img.src = btn.dataset.full || src.src;
      img.alt = src.alt;
      box.hidden = false;
      requestAnimationFrame(function () { box.classList.add('is-open'); });
      document.body.style.overflow = 'hidden';
      close.focus();
    }
    function shut() {
      box.classList.remove('is-open');
      box.hidden = true;
      document.body.style.overflow = '';
      if (opener) opener.focus();
    }
    document.querySelectorAll('.zoom').forEach(function (b) { b.addEventListener('click', function () { open(b); }); });
    close.addEventListener('click', shut);
    box.addEventListener('click', function (e) { if (e.target === box) shut(); });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') shut();
      if (e.key === 'Tab') { e.preventDefault(); close.focus(); }
    });
  }
})();

// Âncoras antigas que agora ficam dentro de "Artefatos do processo": abre o bloco e rola até ele
(function () {
  function openFromHash() {
    if (!location.hash) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    var box = el && el.closest('details');
    if (box && !box.open) { box.open = true; el.scrollIntoView(); }
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();

// Seletor PT/EN: leva junto a seção atual (#âncora), já que os ids são iguais nos dois idiomas
(function () {
  document.querySelectorAll('[data-lang-switch]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (location.hash) a.setAttribute('href', a.getAttribute('href').split('#')[0] + location.hash);
    });
  });
})();
