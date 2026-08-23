(() => {
  const buttons = Array.from(document.querySelectorAll('[data-concept]'));
  const concepts = Array.from(document.querySelectorAll('.concept'));
  const languageButton = document.querySelector('[data-language]');
  let language = 'en';

  function showConcept(id, updateHash = true) {
    buttons.forEach((button) => {
      const active = button.dataset.concept === id;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });

    concepts.forEach((concept) => {
      const active = concept.id === `concept-${id}`;
      concept.hidden = !active;
      concept.classList.toggle('is-active', active);
    });

    if (updateHash) history.replaceState(null, '', `#${id}`);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-fr]').forEach((element) => {
      element.textContent = element.dataset[language];
    });
    languageButton.textContent = language === 'en' ? 'FR' : 'EN';
    languageButton.setAttribute('aria-label', language === 'en' ? 'Passer au français' : 'Switch to English');
  }

  buttons.forEach((button) => button.addEventListener('click', () => showConcept(button.dataset.concept)));
  languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'fr' : 'en'));

  const requestedConcept = window.location.hash.slice(1);
  if (['a', 'b', 'c', 'd'].includes(requestedConcept)) showConcept(requestedConcept, false);
  setLanguage('en');
})();
