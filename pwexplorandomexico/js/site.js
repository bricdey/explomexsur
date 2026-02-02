document.addEventListener('DOMContentLoaded', function () {
  // Header scroll effect
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero, .hero-tours');
  const offset = 40;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > offset) header.classList.add('scrolled');
    else {
      if (hero && y < (hero.offsetHeight - 20)) header.classList.remove('scrolled');
      else header.classList.add('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  // Mobile menu toggle
  const burger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  burger && burger.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

  // Simple Carousel initializer for each .carousel
  document.querySelectorAll('.carousel').forEach(initCarousel);

  function initCarousel(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prev = carousel.querySelector('.carousel-btn.prev');
    const next = carousel.querySelector('.carousel-btn.next');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    let index = 0;
    let autoplay = true;
    let timer = null;
    const count = items.length;

    // dots
    if (dotsWrap) {
      items.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
      });
    }

    function update() {
      const w = carousel.clientWidth;
      track.style.transform = `translateX(-${index * w}px)`;
      const dots = dotsWrap ? Array.from(dotsWrap.children) : [];
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    function goTo(i) {
      index = (i + count) % count;
      update();
      restart();
    }

    function nextSlide() { goTo(index + 1); }
    function prevSlide() { goTo(index - 1); }

    next && next.addEventListener('click', nextSlide);
    prev && prev.addEventListener('click', prevSlide);

    function start() {
      if (!autoplay) return;
      timer = setInterval(nextSlide, 4000);
    }
    function stop() { clearInterval(timer); }
    function restart() { stop(); start(); }

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    window.addEventListener('resize', update);

    update();
    start();
  }
});
