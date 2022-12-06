import { decorateIcons, readBlockConfig } from '../../scripts/lib-franklin.js';

function articleTemplate(article) {
  return `
                        <div
                            class="grid__column featured-articles-with-teaser__item featured-articles-with-teaser__item--article">
                            <div class="article-teaser-item__column">
                                <div class="article-teaser-item__content">
                                    <a class="plain-link article-teaser-item__content-link"
                                        href="${article.path}"
                                        tabindex="1">
                                        <div class="article-teaser-item__image-wrapper">
                                            <figure
                                                class="lazy-image lazy-image--ratio-16_9 lazy-image--position-top article-teaser-item__image lazy-image--loaded">
                                                <div class="lazy-image__image-container">
                                                    <img class="lazy-image__image lazy-image__target-image "
                                                        src="${article.image}"
                                                        alt="${article.imagealt}"
                                                        title="${article.imagealt}">
                                                </div>
                                                <div class="lazy-image__active-image-indicator"></div>
                                            </figure>
                                        </div>
                                        <div class="article-teaser-item__eyebrow text--eyebrow">
                                            <span
                                                class="article-teaser-item__eyebrow--sub article-teaser-item__eyebrow--sub-without-main ">${article.pubdate}</span>
                                        </div>
                                        <div class="headline hl-s     ">
                                            <span>
                                                <h3>
                                                    <span class="headline__main">${article.title}</span>
                                                </h3>
                                            </span>
                                        </div>
                                    </a>
                                    <div class="article-teaser-item__meta text--caption">
                                        <div>
                                            Presseinformation
                                            - <span class="article-teaser-item__meta-reading-info">${article.readingtime || '1 min'}</span>
                                                Lesedauer</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
}

function template(articles, title = 'Weitere Artikel') {
  return `<div class="featured-articles-with-teaser featured-articles-with-teaser--background-grey">
    <div class="grid__container">
        <div class="grid__structure">
            <div class="grid__column grid__column--100">
                <div class="featured-articles-with-teaser__inner-grid-content">
                    <div class="featured-articles-with-teaser__headline">
                        <div class="module-headline">
                            <div class="grid__structure">
                                <div class="grid__column module-headline--column">
                                    <div class="headline hl-l headline--align-center    hl--sub-xs">
                                        <span>
                                            <h2 id="${title.toLowerCase().replace(/\s/gm, '-')}">
                                                <span class="headline__main">${title}</span>
                                            </h2>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div
                        class="grid__structure featured-articles-with-teaser__items featured-articles-with-teaser__items--${articles.length}">
                        ${articles.map(articleTemplate).join('')}
                        

                        <div
                            class="grid__column featured-articles-with-teaser__item featured-articles-with-teaser__item--teaser">
                            <div class="featured-articles-with-teaser__teaser">
                                <div class="headline hl-s featured-articles-with-teaser__teaser-headline">
                                    <span>
                                        <h3>
                                            <span class="headline__main">Alle Pressemeldungen</span>
                                        </h3>
                                    </span>
                                </div>
                                <div class="text text--body-m featured-articles-with-teaser__teaser-text">
                                    <p>Finden Sie hier die neuesten Presseinformationen von ZEISS.<br>
                                    </p>
                                </div>
                                <div class="featured-articles-with-teaser__teaser-link">
                                    <div class="button-link button-link--link">
                                        <a class=" button-link--icon  "
                                            href="https://www.zeiss.de/corporate/newsroom/pressemitteilungen.html"
                                            target="_blank">
                                            <span class="button-link__content">
                                                <span>
                                                    <span>Zu den Pressemeldungen</span>
                                                </span>
                                                <span class="icon icon-external-link icon--symbol">
                                                </span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid__content-bg--full featured-articles-with-teaser__grid-background"></div>
            </div>
        </div>
    </div>
</div>`;
}

export default async function decorate(block) {
  const config = await readBlockConfig(block);
  console.log(config);
  console.log((config['number-of-articles'] || '').replace(/[^0-9]/g, ''));
  const limit = parseInt(config['number-of-articles'], 10) || 2;
  const dataurl = new URL('/de/semiconductor-manufacturing-technology/news-und-events/query-index.json', window.location.href);
  const response = await fetch(dataurl);
  const { data } = await response.json();
  const articles = data
    .filter((article) => article.path !== window.location.pathname)
    .slice(0, limit);
  block.innerHTML = template(articles, config.title);
  decorateIcons(block, true);
}
