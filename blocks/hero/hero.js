import { decorateIcons, getMetadata, fetchPlaceholders } from '../../scripts/lib-franklin.js';
import { addClipboardInteraction } from '../../scripts/utils.js';

function addBackLink(block) {
  if (window.location.pathname.endsWith('/news-und-events/')) {
    return;
  }

  const p = document.createElement('p');
  p.innerHTML = 'Pressemitteilung';
  p.classList.add('headline-brow');
  block.insertBefore(p, block.firstChild);
  const hr = document.createElement('hr');
  hr.classList.add('back-link-line');
  block.insertBefore(hr, block.firstChild);

  const bl = document.createElement('div');
  // The 2 elements are created in the 'backward' order to allow the hover over the link
  // to change the color of the arrow. They are put in the correct position via the
  // 'order' attribute in the CSS.
  bl.innerHTML = `<a href="/de/semiconductor-manufacturing-technology/news-und-events/" class="back-link"> Zurück zu Informationen und Veranstaltungen</a>
  <a href="#" class="back-link-icon">
    <svg focusable="false" xmlns:xlink="http://www.w3.org/1999/xlink"">
      <use xlink:href="/icons/symbols-sprite.svg#svgsymbol-chevron-left"></use>
    </svg>
  </a>`;
  bl.classList.add('back-link-base');

  block.insertBefore(bl, block.firstChild);
}

export default async function decorate(block) {
  addBackLink(block);

  const locale = getMetadata('locale') || 'en';
  const placeholders = await fetchPlaceholders(`/${locale}`);
  const pub = document.querySelector('head > meta[name="publicationdate"');
  const time = document.querySelector('head > meta[name="readingtime"');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let dateString = '';
  if (pub && pub.content) {
    dateString = new Date(pub.content).toLocaleDateString(getMetadata('locale'), options);
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

  block.querySelector('h1').classList.add('headline');
  block.querySelector('h1').classList.add('headline__main');
  block.querySelector('h1').classList.add('hl-xxl');

  if (block.querySelector('h3')) {
    block.querySelector('h3').classList.add('headline');
    block.querySelector('h3').classList.add('headline__sub');
    block.querySelector('h3').classList.add('hl--sub');
    block.querySelector('h3').classList.add('hl--sub-m');
    block.querySelector('h3').classList.add('general-article-stage');
  }

  decorateIcons(block, true);

  addClipboardInteraction(block);
}
