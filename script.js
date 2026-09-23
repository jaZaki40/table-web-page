document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.nav-links a');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const active = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', active);
          });
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('main section[id]').forEach((section) => {
      sectionObserver.observe(section);
    });
  } else {
    sections.forEach((section) => section.classList.add('is-visible'));
  }

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');

  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';

  const lightboxImage = document.createElement('img');
  lightboxImage.alt = 'Expanded portfolio image';

  const closeButton = document.createElement('button');
  closeButton.className = 'lightbox-close';
  closeButton.type = 'button';
  closeButton.textContent = '×';

  lightboxContent.appendChild(closeButton);
  lightboxContent.appendChild(lightboxImage);
  lightbox.appendChild(lightboxContent);
  document.body.appendChild(lightbox);

  const openLightbox = (imageUrl) => {
    lightboxImage.src = imageUrl;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.querySelectorAll('[data-lightbox]').forEach((element) => {
    element.addEventListener('click', () => {
      const imageUrl = element.dataset.lightbox;
      if (imageUrl) {
        openLightbox(imageUrl);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
});
