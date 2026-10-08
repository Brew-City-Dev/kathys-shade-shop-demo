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
