import { decorateIcons } from '../../scripts/lib-franklin.js';
import { addClipboardInteraction } from '../../scripts/utils.js';

export default async function decorate(block) {
  const pub = document.querySelector('head > meta[name="publicationdate"');
  const time = document.querySelector('head > meta[name="readingtime"');
  let dateString = '';
  if (pub && pub.content) {
    dateString = pub.content;
  }
  let timeString = '';
  if (time && time.content) {
    timeString = time.content;
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
  }

  decorateIcons(block, true);

  addClipboardInteraction(block);
}
