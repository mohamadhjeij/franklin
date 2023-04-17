import { decorateIcons, getMetadata, readBlockConfig } from '../../scripts/lib-franklin.js';
import { addClipboardInteraction } from '../../scripts/utils.js';

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

function buildMarkup(element) {
  element.classList.add('share');
  element.classList.add('general-article-stage__share');
  socials.forEach((social) => {
    const a = document.createElement('a');
    a.setAttribute('data-type', social.type);
    a.setAttribute('aria-label', social.label);
    a.setAttribute('class', 'plain-link share__link');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', social.href);
    a.setAttribute('title', social.label);
    a.innerHTML = `<span class="icon icon-${social.icon}"></span>`;
    element.appendChild(a);
  });
}

/**
 * decorates the social block
 * @param {Element} block The social block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.innerHTML = '';

  block.classList.add('page-utility-bar');
  if (block.classList.contains('highlighted')) {
    const divider = document.createElement('hr');
    divider.classList.add('divider');
    divider.classList.add('divider--dark');
    block.appendChild(divider);
  }
  if (cfg && cfg.label) {
    const label = document.createElement('div');
    label.textContent = cfg.label;
    label.classList.add('page-utility-bar__label');
    block.appendChild(label);
  }
  const socialItems = document.createElement('div');
  socialItems.classList.add('page-utility-bar__share-container');
  buildMarkup(socialItems);
  block.appendChild(socialItems);
  const divider = document.createElement('hr');
  divider.classList.add('divider');
  divider.classList.add('grid__column');
  divider.classList.add('grid__column--100');
  block.appendChild(divider);

  decorateIcons(block, true);

  addClipboardInteraction(block);
}

export { decorate, buildMarkup };
