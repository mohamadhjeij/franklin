import { decorateIcons, readBlockConfig, fetchPlaceholders } from '../../scripts/lib-franklin.js';
import { getLocale, getFormattedDate } from '../../scripts/utils.js';

function getArticle(article, placeholders, itemid) {
  return `
    <a href="${article.path}" id="art${itemid}a">
      <figure>
        <img src="${article.image}" alt="${article.imagealt || article.title}" title="${article.title}">
        </img>
        <svg class="article-list-item-icon"
          width="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12h12v-1.333H2V12zm0-3.333h12V7.333H2v1.334zM2 4v1.333h12V4H2z"></path>
        </svg>
      </figure>
      <div class="article-list-item-eyebrow">${getFormattedDate(new Date(article.publicationdate), getLocale())}</div>
      <div class="article-list-item-headline">${article.title}</div>
    </a>
    <div class="article-list-item-info" id="art${itemid}b">${placeholders.pressrelease} - ${article.readingtime || '1 min'} ${placeholders.readingtime.toUpperCase()}</div>
  `;
}

function template(articles, placeholders) {
  let articlesHTML = '';
  for (let i = 0; i < articles.length; i += 1) {
    articlesHTML += getArticle(articles[i], placeholders, i);
  }

  return `
      <h2 id="${placeholders.furtherarticles.toLowerCase().replace(/\s/gm, '-')}">
        ${placeholders.furtherarticles}
      </h2>
      ${articlesHTML}
      <div class="all-articles" id="art${articles.length}a">
        <h3>${placeholders.furtherarticlesheadline}</h3>
        <p>${placeholders.furtherarticlesteaser}</p>
        <a href="${placeholders.furtherarticleshref}">${placeholders.furtherarticlesbutton}
          <svg focusable="false" xmlns:xlink="http://www.w3.org/1999/xlink">
            <use xlink:href="/icons/symbols-sprite.svg#svgsymbol-external-link"></use>
          </svg>
        </a>
    </div>
  `;
}

export default async function decorate(block) {
  const config = await readBlockConfig(block);
  const locale = getLocale();
  let placeholders = {};
  try {
    placeholders = await fetchPlaceholders(`${locale}`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Could not fetch placeholders', e);
  }
  const limit = 2; // Currently always 2 articles
  const dataurl = new URL(placeholders.querypath, window.location.href);
  const response = await fetch(dataurl);
  const { data } = await response.json();
  const articles = data
    .filter((article) => article.path !== window.location.pathname)
    .filter((article) => article.publicationdate)
    .map((article) => [new Date(article.publicationdate).getTime(), article])
    .sort((entry1, entry2) => entry2[0] - entry1[0])
    .map((entry) => entry[1])
    .slice(0, limit);
  block.innerHTML = template(articles, placeholders, config.title);
  decorateIcons(block, true);
}
