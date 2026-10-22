(function () {
  'use strict';

  // ---------- Year in footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Navigation ----------
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  function setScrolled() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', setScrolled, { passive: true });
  setScrolled();

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('menu-open')) {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- Hero carousel ----------
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('hero-dots');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  const pauseBtn = document.getElementById('hero-pause');
  let current = 0;
  let paused = false;
  let timer = null;
  const INTERVAL = 6500;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goTo(index) {
    slides[current].classList.remove('active');
    slides[current].setAttribute('aria-hidden', 'true');
    if (dotsContainer && dotsContainer.children[current]) {
      dotsContainer.children[current].classList.remove('active');
      dotsContainer.children[current].setAttribute('aria-selected', 'false');
    }
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    slides[current].setAttribute('aria-hidden', 'false');
    if (dotsContainer && dotsContainer.children[current]) {
      dotsContainer.children[current].classList.add('active');
      dotsContainer.children[current].setAttribute('aria-selected', 'true');
    }
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startTimer() {
    if (reduceMotion || paused) return;
    stopTimer();
    timer = setInterval(next, INTERVAL);
  }
  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  if (dotsContainer && slides.length) {
    slides.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', function () {
        goTo(i);
        startTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); startTimer(); });

  if (pauseBtn) {
    const iconPause = pauseBtn.querySelector('.icon-pause');
    const iconPlay = pauseBtn.querySelector('.icon-play');
    pauseBtn.addEventListener('click', function () {
      paused = !paused;
      if (paused) {
        stopTimer();
        if (iconPause) iconPause.style.display = 'none';
        if (iconPlay) iconPlay.style.display = 'block';
        pauseBtn.setAttribute('aria-label', 'Play slideshow');
      } else {
        startTimer();
        if (iconPause) iconPause.style.display = 'block';
        if (iconPlay) iconPlay.style.display = 'none';
        pauseBtn.setAttribute('aria-label', 'Pause slideshow');
      }
    });
  }

  slides.forEach(function (s, i) {
    s.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
  });
  startTimer();

  // ---------- Read more toggles ----------
  document.querySelectorAll('.read-more').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('data-target');
      const panel = document.getElementById(id);
      if (!panel) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (expanded) {
        panel.hidden = true;
        btn.innerHTML = 'Read more <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
      } else {
        panel.hidden = false;
        btn.innerHTML = 'Read less <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
      }
    });
  });

  // ---------- Contact form ----------
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (form.querySelector('#name') || {}).value || '';
      const phone = (form.querySelector('#phone') || {}).value || '';
      const text = encodeURIComponent(
        'Hello Sewa Academy,\n\nMy name is ' + name + '.\nPhone: ' + phone + '\n\nI would like more information about enrollment.'
      );
      window.open('https://wa.me/254795893804?text=' + text, '_blank', 'noopener,noreferrer');
    });
  }
})();
