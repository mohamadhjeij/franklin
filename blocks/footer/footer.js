import { decorateIcons, readBlockConfig } from '../../scripts/lib-franklin.js';

function template(props) {
  return `
    <section class="grid__container footer__breadcrumb-and-to-top">
      <div class="grid__structure">
        <div class="grid__column grid__column--100">
          <nav class="breadcrumb">
            <ul class="breadcrumb__list-wrapper breadcrumb__list-wrapper--less-than-two">
              ${props.nav.items.map((item) => `
                <li class="breadcrumb__list-item">
                  <span class="icon icon-chevron-right"></span>
                  <a class="plain-link breadcrumb__link-item" href="${item.href}">${item.label}</a>
                </li>
              `).join('')}
            </ul>
          </nav>

          <div class="to-top">
            <a href="#to-top" class="to-top__link">
              <span class="to-top__link-text">Zurück nach oben</span>
              <span class="icon icon-arrow-upward"></span>
            </a>
          </div>

        </div>
      </div>
    </section>
    
    
    
    <section class="footer__related-websites grid__container grid__container--full-bleed visible-from-l">
      <div class="grid__structure">
        <div class="grid__column grid__column--100">
          <div class="footer__background-column"></div>
          <div class="grid__container">
            <div class="grid__structure">
              <div class="grid__column grid__column--100">
                <div class="related-websites">
                  <div class="related-websites__headline hl-s">${props.relatedSites.title}</div>
                  <a aria-label="${props.relatedSites.label}" class="header__first-level-link" href="https://www.zeiss.de" title="${props.relatedSites.label}">${props.relatedSites.label}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    
    
    <section class="footer__main-footer grid__container grid__container--full-bleed">
      <div class="grid__structure">
        <div class="grid__column grid__column--100">
          <div class="footer__background-column"></div>
          <div class="grid__container">
            <div class="grid__structure footer__navigation">
              <div class="grid__column grid__column--33">
                <div class="accordion">
                  <ul>
                    <li class="accordion__item">
                      <button class="accordion__button">
                        <div class="accordion__button-container">
                          <div class="accordion__header_info">
                            <div class="accordion__header-text">
                              <p class="accordion__headline hl-xs">${props.popular.title}</p>
                            </div>
                          </div>
                          <span class="accordion__icon">
                            <span class="icon icon-expand-more"></span>
                          </span>
                        </div>
                      </button>

                      <div class="accordion__content-container">
                        <div class="accordion-links">
                          ${props.popular.items.map((item) => `
                          <a aria-label="${item.label}" class="plain-link " href="${item.href}" title="${item.label}">${item.label}</a>
                          `).join('')}
                       </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="grid__column grid__column--33">
                <div class="accordion">
                  <ul>
                    <li class="accordion__item">
                      <button class="accordion__button">
                        <div class="accordion__button-container">
                          <div class="accordion__header_info">
                            <div class="accordion__header-text">
                              <p class="accordion__headline hl-xs">${props.about.title}</p>
                            </div>
                          </div>
                          <span class="accordion__icon">
                            <span class="icon icon-expand-more"></span>
                          </span>
                        </div>
                      </button>
  
                      <div class="accordion__content-container">
                        <div class="accordion-links">
                          ${props.about.items.map((item) => `
                          <a aria-label="${item.label}" class="plain-link" href="${item.href}" target="_blank" title="${item.label}">${item.label}</a>
                          `).join('')}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            
              <div class="grid__column grid__column--33">
                <div class="accordion">
                  <ul>
                    <li class="accordion__item">
                      <button class="accordion__button">
                        <div class="accordion__button-container">
                          <div class="accordion__header_info">
                            <div class="accordion__header-text">
                              <p class="accordion__headline hl-xs">${props.social.title}</p>
                            </div>
                          </div>
                          <span class="accordion__icon">
                            <span class="icon icon-expand-more"></span>
                          </span>
                        </div>
                      </button>
                      
                      <div class="accordion__content-container">
                        <div class="accordion-links">
                          ${props.social.items.map((item) => `
                          <a aria-label="${item.label}" class="plain-link" href="${item.href}" target="_blank" title="${item.label}">${item.label}</a>
                          `).join('')}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          
            <div class="grid__structure footer-tabs">
              <div class="footer-tabs__tab">
                <div class="footer-tabs__tab-title">
                  <div class="footer-tabs__tab-title__eyebrow">ZEISS Bereich wählen</div>
                  <div class="footer-tabs__tab-title__selection zeiss-location-slot">${props.zeiss.selected}</div>
                  <span class="icon icon-expand-more"></span>
                </div>
              </div>
              
              <div class="footer-tabs__tab-content-container footer-tabs__website-area">
                <div class="grid__container grid__container--full-bleed">
                  <div class="footer-tabs__tab-content grid__structure">
                    <div class="grid__column grid__column--33">
                      <ul class="footer-tabs__website-area__list">
                        ${props.zeiss.items0.map((item) => `
                        <li class="item link">
                          <a aria-label="${item.label}" class="footer-tabs__website-area__link ${props.zeiss.selected === item.label ? 'footer-tabs__website-area__link--active' : ''}" href="${item.href}" target="_blank" title="${item.label}">
                            <span class="button-link__content">
                              <span><span>${item.label}</span></span>
                            </span>
                          </a>
                        </li>
                        `).join('')}
                      </ul>
                    </div>
                    <div class="grid__column grid__column--33">
                      <ul class="footer-tabs__website-area__list">
                        ${props.zeiss.items1.map((item) => `
                        <li class="item link">
                          <a aria-label="${item.label}" class="footer-tabs__website-area__link ${props.zeiss.selected === item.label ? 'footer-tabs__website-area__link--active' : ''}" href="${item.href}" target="_blank" title="${item.label}">
                            <span class="button-link__content">
                              <span><span>${item.label}</span></span>
                            </span>
                          </a>
                        </li>
                        `).join('')}
                      </ul>
                    </div>
                    <div class="grid__column grid__column--33">
                      <ul class="footer-tabs__website-area__list">
                        ${props.zeiss.items2.map((item) => `
                        <li class="item link">
                          <a aria-label="${item.label}" class="footer-tabs__website-area__link ${props.zeiss.selected === item.label ? 'footer-tabs__website-area__link--active' : ''}" href="${item.href}" target="_blank" title="${item.label}">
                            <span class="button-link__content">
                              <span><span>${item.label}</span></span>
                            </span>
                          </a>
                        </li>
                        `).join('')}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="footer-tabs__tab">
                <div class="footer-tabs__tab-title">
                  <div class="footer-tabs__tab-title__eyebrow">${props.language.title}</div>
                  <div class="footer-tabs__tab-title__selection language-slot">${props.language.selected}</div>
                  <span class="icon icon-expand-more"></span>
                </div>
              </div>
              
              <div class="footer-tabs__tab-content-container country-switch grid__container">
                <div class="footer-tabs__tab-content grid__structure footer-tabs__tab-content--visible" style="padding-bottom: 0px;">
                  <ul class="country-switch__first-level-container" >
                    <li class="country-switch__first-level-list-item ${props.language.global.en.label === props.language.selected ? 'country-switch__first-level-list-item--initial-selected' : ''}">
                      <a href="" aria-label="Sprache wählen aus ${props.language.global.title}" title="Sprache wählen aus ${props.language.global.title}" class="plain-link country-switch__link">
                        <span class="country-switch__link-label">${props.language.global.title}</span>
                        <span class="icon icon-chevron-right"></span>
                      </a>
  
                      <ul class="country-switch__second-level-container">
                        <li class="country-switch__second-level-list-item ${props.language.global.en.label === props.language.selected ? 'country-switch__first-level-list-item--initial-selected' : ''}">
                          <a aria-label="Seite in ${props.language.global.en.label} öffnen" class="plain-link country-switch__link" href="${props.language.global.en.href}" title="Seite in ${props.language.global.en.label} öffnen">
                            <span class="country-switch__link-label">${props.language.global.en.label}</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    
                    <li class="country-switch__first-level-list-item ${props.language.europa.de.label === props.language.selected ? 'country-switch__first-level-list-item--initial-selected' : ''}">
                      <a href="" aria-label="Sprache wählen aus ${props.language.europa.title}" title="Sprache wählen aus ${props.language.europa.title}" class="plain-link country-switch__link">
                        <span class="country-switch__link-label">${props.language.europa.title}</span>
                        <span class="icon icon-chevron-right"></span>
                      </a>
  
                      <ul class="country-switch__second-level-container">
                        <li class="country-switch__second-level-list-item ${props.language.europa.de.label === props.language.selected ? 'country-switch__first-level-list-item--initial-selected' : ''}">
                          <a aria-label="Seite in ${props.language.europa.de.label} öffnen" class="plain-link country-switch__link" href="${props.language.europa.de.href}" title="Seite in ${props.language.europa.de.label} öffnen">
                            <span class="country-switch__link-label">${props.language.europa.de.label}</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
    
    
    
    <section class="footer-legal-links grid__container grid__container--full-bleed">
      <div class="grid__structure">
        <div class="grid__column grid__column--100">
          <div class="footer-legal-links__background-column"></div>
          <div class="grid__container">
            <div class="grid__structure">
              <div class="grid__column grid__column--100">
                <div class="accordion">
                  <ul>
                    <li class="accordion__item">
                      <button class="accordion__button">
                        <div class="accordion__button-container">
                          <div class="accordion__header_info">
                            <div class="accordion__header-text">
                              <p class="accordion__headline hl-xs">${props.legal.title}</p>
                            </div>
                          </div>
                          <span class="accordion__icon">
                            <span class="icon icon-expand-more"></span>
                          </span>
                        </div>
                      </button>
  
                      <div class="accordion__content-container">
                        <div class="accordion-links">
                          ${props.legal.items.map((item) => `
                          <a aria-label="${item.label}" class="plain-link " href="${item.href}" title="${item.label}">${item.label}</a>
                          `).join('')}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function addFooterInteractions(block) {
  block.querySelector('a[href="#to-top"]').onclick = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
  };

  block.querySelectorAll('.footer-tabs__tab').forEach((tab) => {
    tab.onclick = () => {
      const content = tab.nextElementSibling.querySelector('.footer-tabs__tab-content');
      const icon = tab.querySelector('.icon-expand-more');

      const isActiveTabClass = 'footer-tabs__tab--active';
      const isTabContentVisibleClass = 'footer-tabs__tab-content--visible';
      const isActive = tab.classList.contains(isActiveTabClass);

      const activeEl = block.querySelector(`.${isActiveTabClass}`);
      if (!isActive && activeEl) {
        activeEl.classList.remove(isActiveTabClass);
        block.querySelector(`.${isTabContentVisibleClass}`).classList.remove(isTabContentVisibleClass);
        block.querySelector('.icon-expand-more.is-active').classList.remove('is-active');
      }

      tab.classList.toggle(isActiveTabClass, !isActive);
      content.classList.toggle(isTabContentVisibleClass, !isActive);
      icon.classList.toggle('is-active', !isActive);
    };
  });

  block.querySelectorAll('.country-switch__first-level-list-item > .country-switch__link').forEach((link) => {
    link.onclick = (event) => {
      event.preventDefault();

      const activeFirstLevelClass = 'country-switch__first-level-list-item--active';
      const activeSecondLevelClass = 'country-switch__second-level-list-item--active';
      const li = link.parentElement;
      const isActive = li.classList.contains(activeFirstLevelClass);

      const activeEl = block.querySelector(`.${activeFirstLevelClass}`);
      if (activeEl) {
        activeEl.classList.remove(activeFirstLevelClass);
        activeEl.querySelector('.country-switch__second-level-list-item').classList.remove(activeSecondLevelClass);
      }

      li.classList.toggle(activeFirstLevelClass, !isActive);
      requestAnimationFrame(() => {
        li.querySelector('.country-switch__second-level-list-item').classList.toggle(activeSecondLevelClass, !isActive);
      });
    };
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();
    const doc = document.createRange().createContextualFragment(html);

    const paths = window.location.pathname.split('/').slice(1);
    const currentPaths = paths.slice(0, 3);

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const path2label = (p) => p.split('-').map((s) => capitalize(s)).join(' ');

    const nav = {
      items: [{
        label: 'Home',
        href: `/${paths[1]}/home.html`,
      }, {
        label: path2label(currentPaths[currentPaths.length - 1]),
        href: `/${currentPaths.join('/')}.html`,
      }],
    };

    const toItems = (elements) => Array.from(elements).map((item) => ({
      href: item.href,
      label: item.textContent,
    }));

    const relatedSitesTitle = doc.querySelector('div > p:nth-of-type(1)');
    const relatedSitesItems = doc.querySelectorAll('div > p:nth-of-type(1) + ul a');

    const relatedSites = {
      title: relatedSitesTitle.textContent,
      label: relatedSitesItems[0].textContent,
      href: relatedSitesItems[0].href,
    };

    const popularTitle = doc.querySelector('div > p:nth-of-type(2)');
    const popularItems = doc.querySelectorAll('div > p:nth-of-type(2) + ul a');

    const popular = {
      title: popularTitle.textContent,
      items: toItems(popularItems),
    };

    const aboutTitle = doc.querySelector('div > p:nth-of-type(3)');
    const aboutItems = doc.querySelectorAll('div > p:nth-of-type(3) + ul a');

    const about = {
      title: aboutTitle.textContent,
      items: toItems(aboutItems),
    };

    const socialTitle = doc.querySelector('div > p:nth-of-type(4)');
    const socialItems = doc.querySelectorAll('div > p:nth-of-type(4) + ul a');

    const social = {
      title: socialTitle.textContent,
      items: toItems(socialItems),
    };

    const zeissTitle = doc.querySelector('div > p:nth-of-type(5)');
    const zeissItems = [
      doc.querySelectorAll('div > p:nth-of-type(5) + ul a'),
      doc.querySelectorAll('div > p:nth-of-type(5) + ul + ul a'),
      doc.querySelectorAll('div > p:nth-of-type(5) + ul + ul + ul a'),
    ];

    const zeiss = {
      title: zeissTitle.textContent,
    };
    const zeissLocation = path2label(currentPaths[1]);
    zeissItems.forEach((elements, index) => {
      zeiss[`items${index}`] = toItems(elements);

      if (zeiss[`items${index}`].some((item) => item.label === zeissLocation)) {
        zeiss.selected = zeissLocation;
      }
    });

    const languageTitle = doc.querySelector('div > p:nth-of-type(6)');
    const languageGlobalTitle = doc.querySelector('div > p:nth-of-type(7)');
    const languageEN = doc.querySelector('div > p:nth-of-type(7) + ul a');
    const languageEuropaTitle = doc.querySelector('div > p:nth-of-type(8)');
    const languageDE = doc.querySelector('div > p:nth-of-type(8) + ul a');

    const isDE = currentPaths[0] === 'de';

    const language = {
      title: languageTitle.textContent,
      selected: isDE ? languageDE.textContent : languageEN.textContent,
      global: {
        title: languageGlobalTitle.textContent,
        // TODO currently hardcoded in the content
        en: {
          label: languageEN.textContent,
          href: languageEN.href,
        },
      },
      europa: {
        title: languageEuropaTitle.textContent,
        // TODO currently hardcoded in the content
        de: {
          label: languageDE.textContent,
          href: languageDE.href,
        },
      },
      items: toItems(socialItems),
    };

    const legalTitle = doc.querySelector('div > p:nth-of-type(9)');
    const legalItems = doc.querySelectorAll('div > p:nth-of-type(9) + ul a');

    const legal = {
      title: legalTitle.textContent,
      items: toItems(legalItems),
    };

    block.innerHTML = template({
      nav,
      relatedSites,
      popular,
      about,
      social,
      zeiss,
      language,
      legal,
    });

    decorateIcons(block, true);

    addFooterInteractions(block);
  }
}
