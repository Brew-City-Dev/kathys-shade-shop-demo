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

  // Interactive blind demo: click and drag the shade itself to raise/lower, pick a color
  var blindEl = document.getElementById('blindEl');
  var blindWindow = document.querySelector('.blind-demo__window');
  if (blindEl && blindWindow) {
    var setBlindHeight = function (pct) {
      pct = Math.max(0, Math.min(100, Math.round(pct)));
      blindEl.style.setProperty('--blind-h', pct + '%');
      blindEl.setAttribute('aria-valuenow', String(pct));
      return pct;
    };

    var pctFromPointer = function (clientY) {
      var rect = blindWindow.getBoundingClientRect();
      return ((clientY - rect.top) / rect.height) * 100;
    };

    var onPointerMove = function (e) {
      setBlindHeight(pctFromPointer(e.clientY));
    };
    var stopDrag = function () {
      blindEl.classList.remove('is-dragging');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', stopDrag);
    };

    blindEl.addEventListener('pointerdown', function (e) {
      blindEl.classList.add('is-dragging');
      blindEl.focus();
      setBlindHeight(pctFromPointer(e.clientY));
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', stopDrag);
      e.preventDefault();
    });

    // Arrow keys move the shade for anyone who can't drag
    blindEl.addEventListener('keydown', function (e) {
      var current = parseFloat(blindEl.getAttribute('aria-valuenow')) || 0;
      var step = e.shiftKey ? 10 : 4;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { setBlindHeight(current + step); e.preventDefault(); }
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { setBlindHeight(current - step); e.preventDefault(); }
      else if (e.key === 'Home') { setBlindHeight(0); e.preventDefault(); }
      else if (e.key === 'End') { setBlindHeight(100); e.preventDefault(); }
    });
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
