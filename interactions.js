// Project data is retained verbatim in index.html.
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const sections = [...document.querySelectorAll('.group-section')];
sections.forEach((section, sectionIndex) => {
  const label = document.createElement('p');
  label.className = 'section-kicker';
  label.textContent = `0${sectionIndex + 1} / ${['AI & automation', 'Data & architecture', 'People & delivery'][sectionIndex]}`;
  section.prepend(label);
  const tiles = [...section.querySelectorAll('.project-tile')];
  tiles.forEach((tile, index) => {
    const project = projectDetails[tile.dataset.project];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-tile';
    button.dataset.project = tile.dataset.project;
    button.setAttribute('aria-haspopup', 'dialog');
    const title = tile.querySelector('h3');
    const image = tile.querySelector('img');
    const content = document.createElement('div');
    content.innerHTML = project.content;
    const opening = content.querySelector('li');
    const summary = opening.textContent.replace(/^Problem:\s*/, '').trim();
    const sentence = summary.match(/^.*?[.!?](?:\s|$)/)?.[0] || summary;
    const meta = document.createElement('span');
    meta.className = 'card-meta';
    meta.innerHTML = `<span>${String(index + 1).padStart(2, '0')} / ${String(tiles.length).padStart(2, '0')} · ${['Applied AI', 'Data engineering', 'Enablement'][sectionIndex]}</span><span class="card-symbol" aria-hidden="true">⌘</span>`;
    const description = document.createElement('p');
    description.className = 'card-description';
    description.textContent = sentence;
    const bottom = document.createElement('span');
    bottom.className = 'card-bottom';
    bottom.innerHTML = '<span>Explore project</span><span class="card-arrow" aria-hidden="true"></span>';
    button.append(meta, title, description, bottom);
    button.addEventListener('click', () => {
      modalTitle.textContent = title.textContent;
      modalContent.innerHTML = project.content;
      const stack = [...modalContent.querySelectorAll('strong')].find(el => el.textContent === 'Tech Stack:');
      if (stack) {
        const tags = document.createElement('div');
        tags.className = 'stack-tags';
        stack.parentElement.textContent.replace('Tech Stack:', '').split(',').forEach(tech => {
          const tag = document.createElement('span');
          tag.textContent = tech.trim();
          tags.append(tag);
        });
        modalContent.append(tags);
      }
      if (image) {
        const detailImage = image.cloneNode();
        detailImage.className = 'detail-image';
        detailImage.loading = 'lazy';
        modalContent.append(detailImage);
      }
      modal.showModal();
      modal.scrollTop = 0;
      document.body.classList.add('dialog-open');
    });
    tile.replaceWith(button);
  });
});
function closeModal() { modal.close(); }
modal.querySelector('.close-btn').addEventListener('click', closeModal);
modal.addEventListener('close', () => document.body.classList.remove('dialog-open'));
modal.addEventListener('click', event => {
  const rect = modal.getBoundingClientRect();
  if (event.target === modal && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeModal();
});
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
function closeMenu() { links.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  links.classList.toggle('is-open', !expanded);
});
links.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
const navigationObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.nav-links a').forEach(link => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -65% 0px' });
document.querySelectorAll('section[id]').forEach(section => navigationObserver.observe(section));
document.querySelectorAll('a[target="_blank"]').forEach(link => link.rel = 'noopener noreferrer');
document.querySelectorAll('.interesting-links a').forEach((link, index) => {
  const label = document.createElement('span');
  label.className = 'resource-label';
  label.textContent = ['Not Some AI', 'Neural Lace · Research', 'HackerRank'][index];
  const arrow = document.createElement('span');
  arrow.className = 'inline-arrow'; arrow.setAttribute('aria-hidden', 'true');
  label.append(arrow); link.append(label);
  link.querySelector('img').loading = 'lazy';
});
[['links', '04 / Elsewhere'], ['contact', '05 / Get in touch']].forEach(([id, text]) => {
  const label = document.createElement('p'); label.className = 'section-kicker'; label.textContent = text;
  document.getElementById(id).prepend(label);
});
