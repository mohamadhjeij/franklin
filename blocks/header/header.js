import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

function subMenuTemplate(menu, subMenu) {
  return `
    
    <li class="drilldown__first-level-list-item">
      <a aria-label="${subMenu.label}" class="plain-link drilldown__link" href="${subMenu.href}" title="${subMenu.label}" >
        <span class="drilldown__link-label">${subMenu.label}</span>
      </a>
      
      ${subMenu.items.length ? `

      <span class="header__first-level-link__child-indication">
        <span class="icon icon-chevron-right"></span>
      </span>
  
      <ul class="drilldown__second-level-container drilldown__x-level-container--with-overview">
        
        ${subMenu.items.map((item) => `
          <li class="drilldown__second-level-list-item">
            <a aria-label="Übersicht" class="plain-link drilldown__link" href="${item.href}" title="${item.label}">
              <span class="drilldown__link-label">${item.label}</span>
            </a>
          </li>
        `).join('')}

      </ul>


      ` : ''}
      
    </li>
    
  `;
}

function menuTemplate(menu) {
  return `
    <a class="header__first-level-link" href="${menu.href}">${menu.label}</a>
    
    
    ${menu.subMenus.length ? `
    <!--
    <span class="header__first-level-link__child-indication">
      <span class="icon icon-chevron-right"></span>
    </span>
    
    <div class="grid__column header__megamenu__drilldown header__megamenu__configure-toggle header__megamenu__configure-toggle--view">
    
      <div class="header__megamenu__first-level-label">${menu.label}</div>
      
      <div class="drilldown drilldown--with-overview" data-module="Drilldown">
        <ul class="drilldown__first-level-container drilldown__x-level-container--with-overview">
          ${menu.subMenus.map((subMenu) => subMenuTemplate(menu, subMenu)).join('')}
        </ul>
      </div>
    </div>
    -->
    ` : ''}
  `;
}

function template(props) {
  return document.createRange().createContextualFragment(`
    <div class="main-header header exclude-site-search">
      <section class="header__meta grid__container grid__container--full-bleed">
        <div class="grid__structure">
          <div class="grid__column grid__column--100 ">
            <div class="grid__background-column"></div>
            <div class="grid__container ">
              <div class="grid__structure">
                <div class="header__website-area-name visible-from-m">${props.home.label}</div>
                <div class="header__utility-links"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section class="grid__container">
        <div class="grid__structure">
          <div class="header__navigation-area">
            <a href="${props.home.href}" aria-label="${props.home.label}" title="${props.home.label}" class="header__logo">
              ${props.home.logo}
            </a>

            <a href="#" aria-label="Klicken Sie hier, um zur letzten Navigationsebene zurückzukehren" title="Klicken Sie hier, um zur letzten Navigationsebene zurückzukehren" class="plain-link header__backlink">
              <span class="icon icon-chevron-left"/>
              Zurück
            </a>
            
            <nav class="header__navigation visible-from-l">
              <section class="header__first-level-container">
                ${props.menus.map((menu) => menuTemplate(menu)).join('')}
              </section>
            </nav>
            
            <nav class="header__my-zeiss-area visible-from-l">
              ${props.actions.map((action) => `
                <a aria-label="Kontakt" class="header__first-level-link" href="${action.href}" title="${action.label}">${action.label}</a>
              `).join('')}
            </nav>
            
            <nav class="header__action-area">
              <a aria-label="Auf Website suchen" class="header__first-level-link header__action-area__search header__first-level-link--iconheader__first-level-link--icon header__first-level-link--no-label" href="${props.search.href}" title="Auf Website suchen" >
                ${props.search.icon}
              </a>
              
              <a aria-label="Menü öffnen / schließen" class="main-menu-toggle" href="#" title="Menü öffnen / schließen">
                <span class="main-menu-toggle__icon icon">
                  <span class="svg-scale-wrapper">
                    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <polygon class="top-line" fill="#000000" fill-rule="nonzero" points="3 6 3 8 21 8 21 6"></polygon>
                      <polygon class="center-line__1" fill="#000000" fill-rule="nonzero" points="3 13 21 13 21 11 3 11"></polygon>
                      <polygon class="center-line__2" fill="#000000" fill-rule="nonzero" points="3 13 21 13 21 11 3 11"></polygon>
                      <polygon class="bottom-line" fill="#000000" fill-rule="nonzero" points="3 18 21 18 21 16 3 16"></polygon>
                    </svg>
                  </span>
                </span>
              </a>
            </nav>

          </div>
        </div>
      </section>
    </div>
  `);
}

function addScrollListener(header) {
  window.addEventListener('scroll', () => {
    const isScrolling = window.scrollY > 0;

    header.classList.toggle('header--scrolled', isScrolling);
    header.classList.toggle('header--got-animated', isScrolling);
  }, {
    passive: true,
  });
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch nav content
  const navPath = cfg.nav || '/nav';
  const resp = await fetch(`${navPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();
    const doc = document.createRange().createContextualFragment(html);

    const menus = Array.from(doc.querySelectorAll('div > ul:first-of-type > li > a'));
    const actions = Array.from(doc.querySelectorAll('div > ul:last-of-type > li > a')).slice(0, -1);
    const search = doc.querySelector('div > ul:last-of-type > li:last-of-type > a');

    const props = {
      home: {
        href: doc.querySelector('a:has(.icon-zeiss-logo)').href,
        label: doc.querySelector('p').textContent,
        logo: doc.querySelector('.icon-zeiss-logo').outerHTML,
      },
      menus: menus.map((menu) => {
        const subMenus = [];

        if (menu.nextElementSibling) {
          menu.nextElementSibling.querySelectorAll(':scope > li > a').forEach((subMenu) => {
            const items = [];

            if (subMenu.nextElementSibling) {
              subMenu.nextElementSibling.querySelectorAll(':scope > li > a').forEach((item) => {
                items.push({
                  href: item.href,
                  label: item.textContent,
                });
              });
            }

            subMenus.push({
              href: subMenu.href,
              label: subMenu.textContent,
              items,
            });
          });
        }

        return {
          href: menu.href,
          label: menu.textContent,
          subMenus,
        };
      }),
      actions: actions.map((action) => ({
        href: action.href,
        label: action.textContent,
      })),
      search: {
        href: search.href,
        icon: search.querySelector('.icon-search').outerHTML,
      },
    };

    const headerTemplate = template(props);

    decorateIcons(headerTemplate, true);

    block.append(headerTemplate);

    const header = document.querySelector('header');
    addScrollListener(header);
  }
}
