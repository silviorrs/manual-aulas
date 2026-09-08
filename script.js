/* ============================================
   Manual Docente UTFPR — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Accordeon: cada assunto abre/fecha no clique
  const chevronSvg = '<svg class="card-toggle-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

  document.querySelectorAll('.guideline-card').forEach((card) => {
    const header = card.querySelector('.card-top');
    const body = document.createElement('div');
    body.className = 'card-collapsible';

    // Move todos os elementos após o header para dentro da área colapsável
    while (header && header.nextElementSibling) {
      body.appendChild(header.nextElementSibling);
    }

    card.appendChild(body);

    if (header) {
      header.insertAdjacentHTML('beforeend', chevronSvg);
      header.addEventListener('click', () => {
        card.classList.toggle('is-open');
        // Recarrega iframes de vídeo ao abrir a seção (iframes em contêiner oculto não carregam sozinhos).
        if (card.classList.contains('is-open')) {
          card.querySelectorAll('.video-embed iframe').forEach(iframe => {
            const src = iframe.getAttribute('src');
            iframe.setAttribute('src', 'about:blank');
            requestAnimationFrame(() => {
              iframe.setAttribute('src', src);
            });
          });
        }
      });
    }
  });

  // 2. Barra de progresso de leitura
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrolled = (document.documentElement.scrollTop || document.body.scrollTop);
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar && height > 0) {
      progressBar.style.width = (scrolled / height) * 100 + '%';
    }
  }, { passive: true });

  // 3. Navegação ativa por scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-btn');

  window.addEventListener('scroll', () => {
    let current = '';
    const pos = window.pageYOffset + 120;

    sections.forEach(sec => {
      if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
});
