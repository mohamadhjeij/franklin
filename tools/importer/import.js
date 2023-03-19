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

const authorMap = {
  'Frederic Franz': 'https://main--zeiss--hlxsites.hlx.live/de/authors/frederic-franz ',
  'Dr. Manuel Thomä': 'https://main--zeiss--hlxsites.hlx.live/de/authors/manuel-thomae ',
  'Janis Eitner': 'https://main--zeiss--hlxsites.hlx.live/de/authors/janis-eitner ',
  'Jeannine Rapp': 'https://main--zeiss--hlxsites.hlx.page/de/authors/jeannine-rapp',
};
const createMetadata = (main, document) => {
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

  const img = document.querySelector('[property="og:image"]');
  if (img && img.content) {
    const el = document.createElement('img');
    el.src = img.content;
    meta.Image = el;
  }

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  main.append(block);

  return meta;
};

function customLogic(main, document) {
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
      const cells = [['social']];
      cells.push([item.querySelector('.page-utility-bar__label')]);
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
      let src;
      try {
        src = JSON.parse(image.getAttribute('src')).max;
      } catch (e) {
        src = image.getAttribute('src');
      }

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
    document.querySelectorAll('.profileCollection.module .profile-collection__item').forEach((item) => {
      const p = document.createElement('p');
      const name = item.querySelector('h2 > span').textContent;
      if (authorMap[name]) {
        const a = document.createElement('a');
        a.href = authorMap[name];
        a.textContent = authorMap[name];
        p.append(a);
      } else {
        p.textContent = name;
      }
      div.append(p);
    });
    cells.push([div]);
    const table = WebImporter.DOMUtils.createTable(cells, document);
    document.querySelector('.profileCollection.module').after(document.createElement('hr'));
    document.querySelector('.profileCollection.module').replaceWith(table);
  }

  // Add collapse block
  if (document.querySelector('.text-block__expandable-area')) {
    const cells = [['collapse']];
    const div = document.createElement('div');
    const heading = document.querySelector('.text-block__expandable-area').closest('.text-block').querySelector('.text-block__headline h2');
    document.querySelector('.text-block__expandable-area').closest('.text-block').querySelector('[data-js-select="TextBlock_buttonToggle"]').remove();
    div.append(heading);
    document.querySelectorAll('.text-block__expandable-area>div>p').forEach((item) => {
      div.append(item);
    });
    div.append(document.querySelector('.text-block__expandable-area .text-block__button a'));
    cells.push([div]);
    const table = WebImporter.DOMUtils.createTable(cells, document);
    document.querySelector('.text-block__expandable-area').replaceWith(table);
  }

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

    customLogic(main, document);
    // create the metadata block and append it to the main element
    createMetadata(main, document);

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
