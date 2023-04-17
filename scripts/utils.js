import { getMetadata } from './lib-franklin.js';

function addClipboardInteraction(block) {
  const link = block.querySelector('a[data-type="clipboard"]');
  if (link) {
    link.style.transition = 'transform 200ms ease-in';
    link.onclick = (event) => {
      event.preventDefault();

      link.ontransitionend = () => {
        link.style.transform = '';
      };

      navigator.clipboard.writeText(link.href).then(() => {
        link.style.transform = 'scale(1.3)';
      });
    };
  }
}

function getLocale() {
  const locale = getMetadata('locale');
  if (locale && locale.length > 0) {
    return locale;
  }
  // Default to english
  return 'en';
}

function getFormattedDate(date, locale) {
  const dateLocaleMap = {
    de: 'de-DE',
    en: 'en-GB',
  };
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(dateLocaleMap[locale], options);
}

export {
  addClipboardInteraction, getLocale, getFormattedDate,
};
