import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './lib-franklin.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here

function buildHeroBlock(main) {
  const heroDiv = main.querySelector('div:first-of-type');
  const h1 = heroDiv.querySelector('h1');
  const h3 = heroDiv.querySelector('h3');
  const social = heroDiv.querySelector('.social');
  // eslint-disable-next-line no-bitwise
  if (h1) {
    const parent = h1.closest('div');
    let picture;
    if (parent) {
      picture = parent.querySelector('picture');
    }
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [h1, h3, picture, social] }));
    main.prepend(section);
  }
}

function indexOfElementInParent(element) {
  return [...element.parentElement.children].indexOf(element);
}

/**
 * Split children of this div up into 1, 2 or 3 separate divs with cut points as specified in
 * the from and to indexes, separating the elements from-to into
 * a separate div on the same level and putting the remaining elements in new divs surrounding it.
 * @param {HTMLElement} div The element to work on.
 * @param {number} from The index from from which to put element into the middle div.
 * @param {number} to The index up-to-but-not-including the element that marks then end of the
 * middle div.
 * @returns Returns the middle div.
 */
export function splitChildDiv(div, from, to) {
  // run backwards because moving element will delete them from the original

  let afterDiv;
  if (to < div.children.length - 1) {
    afterDiv = document.createElement('div');
    for (let i = div.children.length - 1; i >= to; i -= 1) {
      afterDiv.prepend(div.children[i]);
    }
  }

  const midDiv = document.createElement('div');
  for (let i = to - 1; i >= from; i -= 1) {
    midDiv.prepend(div.children[i]);
  }

  let beforeDiv;
  if (from > 0) {
    beforeDiv = document.createElement('div');
    for (let i = from - 1; i >= 0; i -= 1) {
      beforeDiv.prepend(div.children[i]);
    }
  }

  if (beforeDiv) {
    div.parentElement.insertBefore(beforeDiv, div);
  }
  div.parentElement.insertBefore(midDiv, div);
  if (afterDiv) {
    div.parentElement.insertBefore(afterDiv, div);
  }
  div.parentElement.removeChild(div);

  return midDiv;
}

export function buildTextMediaBlock(main, buildBlockFunction) {
  // Find blocks that contain a picture followed by an em text block. These are text-media blocks
  const pictures = main.querySelectorAll('picture');

  // eslint-disable-next-line no-restricted-syntax
  for (const picture of pictures) {
    const parentP = picture.parentElement;
    if (parentP) {
      const enclosingDiv = parentP.parentElement;
      if (enclosingDiv) {
        const captionP = parentP.nextElementSibling;
        if (captionP) {
          let hasEMChild = false;
          // eslint-disable-next-line no-restricted-syntax
          for (const c of captionP.children) {
            if (c.localName === 'em') {
              hasEMChild = true;
              break;
            }
          }

          if (hasEMChild) {
            const idx = indexOfElementInParent(parentP);
            const section = splitChildDiv(enclosingDiv, idx, idx + 2);
            section.append(buildBlockFunction('text-media', { elems: [parentP, captionP] }));
          }
        }
      }
    }
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
    buildTextMediaBlock(main, buildBlock);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * loads everything needed to get to LCP.
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/* TODO: Elements not yet simplified are added as  exceptions.
This list  should shrink as we simplify sections */
function isNotSimplified(element) {
  const classes = element.classList;
  return classes.contains('carousel-container')
    || classes.contains('text-block')
    || classes.contains('contact-container')
    || classes.contains('columns-container')
    || classes.contains('article-list-container')
    || element.tagName('FOOTER');
}

function decorateContentBlocks(main) {
  const sections = [...main.querySelectorAll(':scope > div[class="section"]')];
  const template = document.createRange().createContextualFragment(`
  <div class="grid__container">
    <div class="grid__structure">
      <div class="grid__column grid__column--inner"></div>
    </div>
  </div>
`);

  // Start with 1 to ignore hero
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const content = section.querySelector('.default-content-wrapper');
    if (content) {
      section.classList.add('text-block');

      content.classList.add('text');
      content.classList.add('text--body-m');

      if (isNotSimplified(section)) {
        const wrapper = template.cloneNode(true);
        wrapper.querySelector('.grid__column--inner').append(content);
        section.append(wrapper);
      }

      const h2 = section.querySelector('h2');
      if (h2) {
        h2.classList.add('headline__main');
        h2.classList.add('text-block__headline');
        h2.classList.add('headline');
        h2.classList.add('hl-l');
      }

      section.querySelectorAll('strong').forEach((strong) => {
        strong.classList.add('text--bold');
      });
    }
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  decorateContentBlocks(main);
  await loadBlocks(main);

  try {
    const { hash } = window.location;
    // Hash can be an invalid selector
    const element = hash ? main.querySelector(hash) : false;
    if (hash && element) element.scrollIntoView();
  /* eslint-disable no-empty */
  } catch (e) {}

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/favicon.ico`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
