(() => {
  const languageButton = document.querySelector('[data-language]');
  const menuButton = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  let language = localStorage.getItem('masteko-language') === 'fr' ? 'fr' : 'en';

  const applyLanguage = () => {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-fr]').forEach((node) => {
      node.textContent = node.dataset[language];
    });
    languageButton.textContent = language === 'en' ? 'FR' : 'EN';
    languageButton.setAttribute('aria-label', language === 'en' ? 'Passer au français' : 'Switch to English');
    localStorage.setItem('masteko-language', language);
  };

  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  languageButton.addEventListener('click', () => {
    language = language === 'en' ? 'fr' : 'en';
    applyLanguage();
  });

  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    nav.classList.toggle('open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  applyLanguage();
})();
