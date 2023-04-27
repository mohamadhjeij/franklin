/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console, class-methods-use-this */

const authorMapDe = {
  'Frederic Franz': 'https://main--zeiss--hlxsites.hlx.live/de/authors/frederic-franz',
  'Dr. Manuel Thomä': 'https://main--zeiss--hlxsites.hlx.live/de/authors/manuel-thomae',
  'Janis Eitner': 'https://main--zeiss--hlxsites.hlx.live/de/authors/janis-eitner',
  'Jeannine Rapp': 'https://main--zeiss--hlxsites.hlx.page/de/authors/jeannine-rapp',
  'Jörg Nitschke': 'https://main--zeiss--hlxsites.hlx.page/de/authors/joerg-nitschke',
  'Victoria Doll': 'https://main--zeiss--hlxsites.hlx.page/de/authors/victoria-doll',
  'Nadine Schütze': 'https://main--zeiss--hlxsites.hlx.page/de/authors/nadine-schuetze',
};

const authorMapEn = {
  'Frederic Franz': 'https://main--zeiss--hlxsites.hlx.live/en/authors/frederic-franz',
  'Dr. Manuel Thomä': 'https://main--zeiss--hlxsites.hlx.live/en/authors/manuel-thomae',
  'Janis Eitner': 'https://main--zeiss--hlxsites.hlx.live/en/authors/janis-eitner',
  'Jeannine Rapp': 'https://main--zeiss--hlxsites.hlx.page/en/authors/jeannine-rapp',
  'Jörg Nitschke': 'https://main--zeiss--hlxsites.hlx.page/en/authors/joerg-nitschke',
  'Victoria Doll': 'https://main--zeiss--hlxsites.hlx.page/en/authors/victoria-doll',
  'Nadine Schütze': 'https://main--zeiss--hlxsites.hlx.page/en/authors/nadine-schuetze',
};

const tagsMap = {
  Technologie:
  ['/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/spie-award.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-expandiert-in-wetzlar-weiteres-werk-im-dillfeld.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/deutscher-zukunftspreis-2020-euv.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/verkauf-von-zeiss-itrap.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/winfried-kaiser-mit-dem-spie-frits-zernike-award-ausgezeichnet.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-accelerates-semiconductor-package-failure-analysis-en-only.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/ausgezeichnete-auszubildende.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/50-jahre-halbleiterfertigungstechnologien-von-zeiss.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/european-inventor-award-2018-en-only.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/neue-multifunktionsfabrik-in-wetzlar.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/zeiss-expandiert-am-forschungs--und-entwicklungsstandort-rossdorf.html'],

  'Menschen und Führung':
  ['/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/spie-award.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/neue-multifunktionsfabrik-in-wetzlar.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/spende-an-tafeln-aalen-heidenheim.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/mitbestimmungspreis.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/modernes-ausbildungsangebot-in-wetzlar.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/ausgezeichnete-ausbildung-bei-zeiss.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/winfried-kaiser-mit-dem-spie-frits-zernike-award-ausgezeichnet.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/european-inventor-award-2018-en-only.html'],

  'Soziales Engagement':
  ['/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/neue-multifunktionsfabrik-in-wetzlar.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/spende-an-tafeln-aalen-heidenheim.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/zeiss-als-ehrenamtsfreundlicher-arbeitgeber-ausgezeichnet.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/mitbestimmungspreis.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-expandiert-in-wetzlar-weiteres-werk-im-dillfeld.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-spendet-25000-euro-an-kinderstiftung-knalltuete.html'],

  'Märkte und Partner':
  ['/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/neue-multifunktionsfabrik-in-wetzlar.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/zeiss-expandiert-am-forschungs--und-entwicklungsstandort-rossdorf.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/2023/spie-award.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-expandiert-in-wetzlar-weiteres-werk-im-dillfeld.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/intels-2022-epic-distinguished-supplier-award-en-only.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/deutscher-zukunftspreis-2020-euv.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/verkauf-von-zeiss-itrap.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/quality-supplier-award-2019-en-only.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/50-jahre-halbleiterfertigungstechnologien-von-zeiss.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/investitionen.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/european-inventor-award-2018-en-only.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/quality-supplier-award-en-only.html',
    '/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/europaeischer-erfinderpreis-2018.html'],

  Technology:
  ['/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/zeiss-expands-in-wetzlar-additional-plant-in-dillfeld.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/zeiss-trumpf-and-fraunhofer-research-team-awarded-the-deutscher-zukunftspreis-.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/deutscher-zukunftspreis-2020-euv.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/zeiss-adds-advanced-reconstruction-intelligence.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/sale-of-zeiss-itrap.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/winfried-kaiser-honored-with-the-spie-frits-zernike-award-for-microlithography.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/zeiss-accelerates-semiconductor-package-failure-analysis.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/zeiss-xradia.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/anniversary-50-years-smt.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/european-inventor-award-2018.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/2023/new-multifunctional-factory-in-wetzlar.html'],

  'People and Leadership':
  ['/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/winfried-kaiser-honored-with-the-spie-frits-zernike-award-for-microlithography.html'],

  'Social Commitment':
  ['/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/zeiss-expands-in-wetzlar-additional-plant-in-dillfeld.html'],

  'Markets and Partners':
  ['/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/2023/zeiss-expands-at-the-rossdorf-research-and-development-site.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/zeiss-expands-in-wetzlar-additional-plant-in-dillfeld.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/intels-2022-epic-distinguished-supplier-award.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/zeiss-trumpf-and-fraunhofer-research-team-awarded-the-deutscher-zukunftspreis-.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/deutscher-zukunftspreis-2020-euv.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/sale-of-zeiss-itrap.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/intels-preferred-quality-supplier-award-2020.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/zeiss-xradia.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/quality-supplier-award-2019.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/anniversary-50-years-smt.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/european-inventor-award-2018.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/quality-supplier-award.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/european-inventor-award.html',
    '/semiconductor-manufacturing-technology/news-and-events/smt-press-releases/2023/zeiss-expands-at-the-rossdorf-research-and-development-site.html'],
};

const getLocale = (url) => {
  if (url.includes('zeiss.de')) {
    return 'de';
  }
  return 'en';
};

const createMetadata = (main, document, url) => {
  const meta = {};

  const title = document.querySelector('title');
  if (title) {
    meta.Title = title.innerHTML.replace(/[\n\t]/gm, '');
  }

  const desc = document.querySelector('[property="og:description"]');
  if (desc) {
    meta.Description = desc.content;
  }

  const publishingDate = document.querySelector('[property="article_publishing_date"]');
  if (publishingDate) {
    meta.publicationDate = publishingDate.content;
  }

  const readingTime = document.querySelector('[property="article_time"]');
  if (readingTime) {
    meta.readingTime = readingTime.content;
  }

  const timeType = document.querySelector('[property=article_time_type]');
  if (timeType) {
    meta.timeType = timeType.content;
  }

  const img = document.querySelector('[property="og:image"]');
  if (img && img.content) {
    const el = document.createElement('img');
    el.src = img.content;
    meta.Image = el;
  }

  // iterate over tagsMap
  const tags = [];
  Object.entries(tagsMap).forEach(([key, value]) => {
    value.forEach((item) => {
      if (new URL(url).pathname === item) {
        tags.push(key);
      }
    });
  });

  // covert tags to string
  meta.Tags = tags.join(', ');

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  main.append(block);

  return meta;
};

function deriveImageSrc(image) {
  let src;
  try {
    src = JSON.parse(image.getAttribute('src')).max;
  } catch (e) {
    src = image.getAttribute('src');
  }
  return src;
}
function customLogic(main, document, url) {
  // Change heading to h1
  if (document.querySelector('.headline.hl-xxl .headline__main')) {
    const heading = document.createElement('h1');
    heading.textContent = document.querySelector('.headline.hl-xxl .headline__main').textContent;
    document.querySelector('.headline.hl-xxl .headline__main').replaceWith(heading);
  }

  // Change subheading to h3
  if (document.querySelector('h2.headline__sub.hl--sub')) {
    const subHeading = document.createElement('h3');
    subHeading.textContent = document.querySelector('h2.headline__sub.hl--sub').textContent;
    document.querySelector('h2.headline__sub.hl--sub').replaceWith(subHeading);
  }

  // Add section breaks after text blocks
  document.querySelectorAll('[data-module="TextBlock"]').forEach((item) => {
    item.after(document.createElement('hr'));
  });

  // Add social share blocks
  document.querySelectorAll('.general-article-stage__share').forEach((item) => {
    item.after(document.createElement('hr'));
    const cells = [['social']];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    item.replaceWith(table);
  });

  document.querySelectorAll('.page-utility-bar').forEach((item) => {
    if (item.querySelector('.share')) {
      const cells = [['social(highlighted)']];
      cells.push(['Label', item.querySelector('.page-utility-bar__label')]);
      item.after(document.createElement('hr'));
      const table = WebImporter.DOMUtils.createTable(cells, document);
      item.replaceWith(table);
    }
  });

  // Add cards block for media
  if (document.querySelector('.text-media-grid')) {
    const cells = [['cards']];
    document.querySelectorAll('.text-media-grid .text-media-item-vertical').forEach((item) => {
      const image = item.querySelector('.text-media-item-vertical__media figure img');
      const src = deriveImageSrc(image);

      const cardImg = document.createElement('img');
      cardImg.src = src;

      const text = item.querySelector('.text-media-item-vertical__text p');
      const row = [cardImg, text.textContent];
      cells.push(row);
    });
    const table = WebImporter.DOMUtils.createTable(cells, document);
    document.querySelector('.text-media-grid').after(document.createElement('hr'));
    document.querySelector('.text-media-grid').replaceWith(table);
  }

  // Add contacts block
  if (document.querySelector('.profileCollection.module')) {
    const cells = [['contact(small)']];
    const div = document.createElement('div');
    const names = [];
    const authorMap = getLocale(url) === 'de' ? authorMapDe : authorMapEn;
    document.querySelectorAll('.profileCollection.module .profile-collection__item').forEach((item) => {
      const p = document.createElement('p');
      const name = item.querySelector('h2 > span').textContent;
      // Avoid duplicate contacts
      if (!names.includes(name)) {
        names.push(name);
        if (authorMap[name]) {
          const a = document.createElement('a');
          a.href = authorMap[name];
          a.textContent = authorMap[name];
          p.append(a);
        } else {
          p.textContent = name;
        }
        div.append(p);
      }
    });
    cells.push([div]);
    const table = WebImporter.DOMUtils.createTable(cells, document);
    document.querySelector('.profileCollection.module').after(document.createElement('hr'));
    document.querySelector('.profileCollection.module').replaceWith(table);
  }

  // Add collapse block
  document.querySelectorAll('.text-block__expandable-area').forEach((collapseItem) => {
    const uncapitalize = (s) => {
      const trimmed = s.trim();
      return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
    };
    const cells = [['collapse']];
    const div = document.createElement('div');
    const heading = collapseItem.closest('.text-block').querySelector('.text-block__headline h2');
    collapseItem.closest('.text-block').querySelector('[data-js-select="TextBlock_buttonToggle"]').remove();
    cells.push([`${heading.textContent}`]);
    const title = uncapitalize(heading.textContent);
    heading.remove();
    collapseItem.querySelectorAll(':scope>div>p').forEach((item) => {
      div.append(item);
    });
    const expandButton = document.createElement('a');
    const collapseButton = document.createElement('a');

    const furtherButton = collapseItem.querySelector('.text-block__button a');
    if (furtherButton) {
      const fqdn = {
        en: 'www.zeiss.com',
        de: 'www.zeiss.de',
      }[getLocale(url)];
      furtherButton.href = `https://${fqdn}`;
      div.append(furtherButton);
    }

    expandButton.href = '#';
    collapseButton.href = '#';

    if (getLocale(url) === 'de') {
      expandButton.textContent = `Mehr Informationen ${title}`;
      collapseButton.textContent = `Weniger Informationen ${title}`;
    } else {
      expandButton.textContent = `More ${title}`;
      collapseButton.textContent = `Less ${title}`;
    }

    cells.push([div], [expandButton], [collapseButton]);
    const table = WebImporter.DOMUtils.createTable(cells, document);
    const styleCells = [['Section Metadata']];
    styleCells.push(['Style', 'collapsed-text']);
    const stylesTable = WebImporter.DOMUtils.createTable(styleCells, document);
    collapseItem.replaceWith(table, stylesTable);
  });

  // Add downloads block
  if (document.querySelector('.downloads-wrapper')) {
    const cells = [['columns']];
    const headline = document.createElement('h2');
    headline.textContent = document.querySelector('.downloads-wrapper .module-headline [data-js-select="Headline_main"]').textContent;
    cells.push([headline]);

    document.querySelectorAll('.downloads__tabs .slideshow__list > .slideshow__item').forEach((item) => {
      const img = document.createElement('img');
      img.src = item.querySelector('.download-item__image-link').href;
      const div = document.createElement('div');
      const h3 = document.createElement('h3');
      h3.textContent = item.querySelector('.download-item__headline h3 span').textContent;
      const h4 = document.createElement('h4');
      h4.textContent = item.querySelector('.download-item__headline h4').textContent;
      div.append(h3);
      div.append(h4);

      // Use MAM links
      const downloadLink = document.createElement('a');
      downloadLink.href = item.querySelector('.download-item__content .button-link--icon').href;
      downloadLink.textContent = 'Download Link';
      div.append(downloadLink);
      cells.push([img, div]);
    });
    document.querySelector('.downloads-wrapper').after(document.createElement('hr'));
    const table = WebImporter.DOMUtils.createTable(cells, document);
    document.querySelector('.downloads-wrapper').replaceWith(table);
  }

  // Add featured articles block
  if (document.querySelector('.featured-articles-with-teaser')) {
    const cells = [['Article List']];
    const count = document.querySelectorAll('.featured-articles-with-teaser__item--article').length;
    cells.push(['Number of articles', count]);
    document.querySelector('.featured-articles-with-teaser').after(document.createElement('hr'));
    const table = WebImporter.DOMUtils.createTable(cells, document);
    document.querySelector('.featured-articles-with-teaser').replaceWith(table);
  }

  // Add carousel block
  if (document.querySelector('.image-slideshow')) {
    const cells = [['Carousel']];
    document.querySelectorAll('.image-slideshow .thumbnail-slideshow__main .slideshow__list .slideshow__item').forEach((item) => {
      const imgDiv = document.createElement('div');
      const img = document.createElement('img');
      img.src = deriveImageSrc(item.querySelector('figure img'));
      imgDiv.appendChild(img);
      // Copyright
      if (item.querySelector('.lazy-image__copyright-text')) {
        const copyrightTxt = `©${item.querySelector('.lazy-image__copyright-text').textContent}`;
        const copyright = document.createElement('p');
        copyright.textContent = copyrightTxt;
        imgDiv.appendChild(copyright);
      }

      const caption = item.querySelector('figure figcaption .lazy-image__caption p');
      cells.push([imgDiv, caption]);
    });
    const table = WebImporter.DOMUtils.createTable(cells, document);
    document.querySelector('.image-slideshow').after(document.createElement('hr'));
    document.querySelector('.image-slideshow').replaceWith(table);
  }

  // Image and text block handling
  const imageTextBlock = document.querySelector('.image-and-text-block');

  if (imageTextBlock) {
    const cells = [['Columns New']];
    const imageBlock = imageTextBlock.querySelectorAll('.image-and-text-block__visual');
    const textBlock = imageTextBlock.querySelectorAll('.image-and-text-block__content');
    const arr = [];

    if (imageBlock) {
      imageBlock.forEach((item) => {
        const imgDiv = document.createElement('div');
        const img = document.createElement('img');
        img.src = deriveImageSrc(item.querySelector('figure img'));
        imgDiv.appendChild(img);

        const copyrightBlock = item.querySelector('.lazy-image__copyright-text');
        if (copyrightBlock) {
          const copyrightTxt = `©${copyrightBlock.textContent}`;
          const copyright = document.createElement('p');
          copyright.textContent = copyrightTxt;
          imgDiv.appendChild(copyright);
        }

        const caption = item.querySelector('figure figcaption .lazy-image__caption p');
        if (caption) {
          imgDiv.appendChild(caption);
        }
        arr.push(imgDiv);
      });
    }

    if (textBlock) {
      textBlock.forEach((item) => {
        const contentDiv = document.createElement('div');
        const headline = item.querySelector('.headline');
        const text = item.querySelector('.text');

        if (headline) {
          const h1 = document.createElement('h1');
          h1.textContent = headline.textContent;
          contentDiv.appendChild(h1);
        }

        if (text) {
          const pTags = text.querySelectorAll('p');

          if (pTags) {
            pTags.forEach((pTag) => {
              const p = document.createElement('p');
              p.textContent = pTag.textContent;
              contentDiv.appendChild(p);
            });
          }
        }

        arr.push(contentDiv);
      });
    }

    if (arr.length) {
      cells.push(arr);
    }

    const table = WebImporter.DOMUtils.createTable(cells, document);
    document.querySelector('.image-and-text-block').after(document.createElement('hr'));
    document.querySelector('.image-and-text-block').replaceWith(table);
  }
}

export default {
  /**
   * Apply DOM operations to the provided document and return
   * the root element to be then transformed to Markdown.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @returns {HTMLElement} The root element to be transformed
   */
  transformDOM: ({
    // eslint-disable-next-line no-unused-vars
    document, url, html, params,
  }) => {
    // define the main element: the one that will be transformed to Markdown
    const main = document.body;

    // use helper method to remove header, footer, etc.
    WebImporter.DOMUtils.remove(main, [
      'header',
      'footer',
      '.headline__eyebrow.text--eyebrow',
      '.general-article-stage__back-button',
      '.general-article-stage__details.text--eyebrow',
      '#onetrust-banner-sdk',
    ]);

    customLogic(main, document, url);
    // create the metadata block and append it to the main element
    createMetadata(main, document, url);

    return main;
  },

  /**
   * Return a path that describes the document being transformed (file name, nesting...).
   * The path is then used to create the corresponding Word document.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @return {string} The path
   */
  generateDocumentPath: ({
    // eslint-disable-next-line no-unused-vars
    document, url, html, params,
  }) => WebImporter.FileUtils.sanitizePath(new URL(url).pathname.replace(/\.html$/, '').replace(/\/$/, '')),
};
