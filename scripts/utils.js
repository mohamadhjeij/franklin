import { getMetadata } from './lib-franklin.js';

const meta = {
  title: encodeURIComponent(document.title),
  description: encodeURIComponent(getMetadata('description')),
  url: `${window.location.origin}${window.location.pathname}`,
};

const socials = [{
  type: 'mail',
  label: 'Diese Website per E-Mail teilen',
  href: `mailto:?subject=${meta.title}&amp;body=${meta.description}%0D%0A%0D%0A${meta.url}`,
  icon: 'mail',
}, {
  type: 'clipboard',
  label: 'Link in die Zwischenablage kopieren',
  href: meta.url,
  icon: 'content_copy',
}, {
  type: 'linkedin',
  label: 'Diese Website auf LinkedIn teilen',
  href: `https://www.linkedin.com/shareArticle?mini=true&amp;url=${meta.url}&amp;title=${meta.title}&amp;summary=${meta.description}`,
  icon: 'linkedin',
}, {
  type: 'twitter',
  label: 'Diese Website auf Twitter teilen',
  href: `https://twitter.com/intent/tweet?url=${meta.url}&amp;text=${meta.title}`,
  icon: 'twitter',
}, {
  type: 'facebook',
  label: 'Diese Website auf Facebook teilen',
  href: `https://www.facebook.com/sharer/sharer.php?u=${meta.url}`,
  icon: 'facebook',
}];

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

export {
  meta, socials, addClipboardInteraction, getLocale,
};
