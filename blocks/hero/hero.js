import { decorateIcons, fetchPlaceholders } from '../../scripts/lib-franklin.js';
import { addClipboardInteraction, getFormattedDate, getLocale } from '../../scripts/utils.js';
import { buildMarkup as buildSocialMarkup } from '../social/social.js';

export function addBackLink(block, locale, placeholders, curPath) {
  if (curPath.endsWith(placeholders.newseventsbase)) {
    return;
  }

  const p = document.createElement('p');
  p.innerHTML = placeholders.pressrelease;
  p.classList.add('headline-brow');
  block.insertBefore(p, block.firstChild);
  const hr = document.createElement('hr');
  hr.classList.add('back-link-line');
  block.insertBefore(hr, block.firstChild);

  const bl = document.createElement('div');
  // The 2 elements are created in the 'backward' order to allow the hover over the link
  // to change the color of the arrow. They are put in the correct position via the
  // 'order' attribute in the CSS.
  bl.innerHTML = `<a href="/${locale}/${placeholders.newseventsbase}/"
    class="back-link">${placeholders.backtonewsevents}</a>
  <a href="/${locale}/${placeholders.newseventsbase}/" class="back-link-icon">
    <svg focusable="false" xmlns:xlink="http://www.w3.org/1999/xlink"">
      <use xlink:href="/icons/symbols-sprite.svg#svgsymbol-chevron-left"></use>
    </svg>
  </a>`;
  bl.classList.add('back-link-base');

  block.insertBefore(bl, block.firstChild);
}

export default async function decorate(block) {
  const locale = getLocale();
  let placeholders = {};
  try {
    placeholders = await fetchPlaceholders(`/${locale}`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Could not fetch placeholders', e);
  }

  addBackLink(block, locale, placeholders, window.location.pathname);

  const pub = document.querySelector('head > meta[name="publicationdate"');
  const time = document.querySelector('head > meta[name="readingtime"');
  let dateString = '';
  if (pub && pub.content) {
    dateString = getFormattedDate(new Date(pub.content), getLocale());
  }
  let timeString = '';
  if (time && time.content) {
    timeString = `${time.content} ${placeholders.readingtime}`;
  }

  const generalArticleStageDetails = document.createElement('div');
  generalArticleStageDetails.innerHTML = `${dateString} · ${timeString}`;
  generalArticleStageDetails.classList.add('general-article-stage__details');
  generalArticleStageDetails.classList.add('text--eyebrow');
  block.appendChild(generalArticleStageDetails);

  const picture = block.querySelector('picture');
  if (picture) {
    block.querySelector('.general-article-stage__column-content').prepend(picture);
  }

  if (block.querySelector('h1')) {
    block.querySelector('h1').classList.add('headline');
    block.querySelector('h1').classList.add('headline__main');
    block.querySelector('h1').classList.add('hl-xxl');
  }

  if (block.querySelector('h3')) {
    block.querySelector('h3').classList.add('headline');
    block.querySelector('h3').classList.add('headline__sub');
    block.querySelector('h3').classList.add('hl--sub');
    block.querySelector('h3').classList.add('hl--sub-m');
    block.querySelector('h3').classList.add('general-article-stage');
  }

  const social = block.querySelector('.social');
  if (social) {
    buildSocialMarkup(social);
    block.appendChild(social);
  }
  const divider = document.createElement('hr');
  divider.classList.add('divider');
  divider.classList.add('grid__column');
  divider.classList.add('grid__column--100');
  block.appendChild(divider);

  decorateIcons(block, true);

  addClipboardInteraction(block);
}
