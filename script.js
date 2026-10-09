/* Kathy's Shade Shop — concept redesign. Small enough to stay inline-free. */
(function () {
  'use strict';

  // Current year in the footer
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Dismiss the demo ribbon
  var ribbon = document.getElementById('ribbon');
  var ribbonX = document.getElementById('ribbonX');
  if (ribbonX && ribbon) {
    ribbonX.addEventListener('click', function () {
      ribbon.classList.add('is-gone');
    });
  }

  // Mobile menu
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Shadow under the header once scrolled
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Interactive blind demo: drag the slider to raise/lower, pick a color
  var blindEl = document.getElementById('blindEl');
  var blindRange = document.getElementById('blindRange');
  if (blindEl && blindRange) {
    var setBlindHeight = function () {
      blindEl.style.setProperty('--blind-h', blindRange.value + '%');
    };
    blindRange.addEventListener('input', setBlindHeight);
    setBlindHeight();
  }

  var swatches = document.querySelectorAll('.blind-demo__swatches button');
  if (swatches.length && blindEl) {
    swatches.forEach(function (btn) {
      btn.addEventListener('click', function () {
        blindEl.style.setProperty('--slat-color', btn.dataset.color);
        swatches.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
      });
    });
  }

  // Demo form: validate, then show the confirmation instead of posting
  var form = document.getElementById('quoteForm');
  var ok = document.getElementById('formOk');
  if (form && ok) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      ok.hidden = false;
      form.querySelector('button[type="submit"]').disabled = true;
      ok.scrollIntoView({ block: 'nearest' });
    });
  }
})();
