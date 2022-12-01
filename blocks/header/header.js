import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

function subMenuItemsTemplate(subMenuItems) {
  return `
    <ul class="drilldown__second-level-container drilldown__x-level-container--with-overview">
      ${subMenuItems.map((item) => `
      <li class="drilldown__second-level-list-item">
        <a aria-label="Übersicht" class="plain-link drilldown__link" href="${item.href}" title="${item.label}">
          <span class="drilldown__link-label">${item.label}</span>
        </a>
      </li>
      `).join('')}
    </ul>
  `;
}

function subMenuTemplate(subMenu) {
  return `
    <nav class="grid__container header__megamenu__menu" data-menu="${subMenu.title}">
      <div class="grid__structure">
        <div class="grid__column header__megamenu__drilldown header__megamenu__configure-toggle header__megamenu__configure-toggle--view">
          <div class="header__megamenu__first-level-label">${subMenu.title}</div>
            <div class="drilldown drilldown--with-overview">
              <ul class="drilldown__first-level-container drilldown__x-level-container--with-overview">
                ${subMenu.items.map((subMenuItem) => `
                <li class="drilldown__first-level-list-item">
                  <a aria-label="Übersicht" class="plain-link drilldown__link" href="${subMenuItem.href}" title="Übersicht">
                    <span class="drilldown__link-label">${subMenuItem.label}</span>
                    ${subMenuItem.items.length ? '<span class="icon icon-chevron-right"></span>' : ''}
                  </a>
                  
                  ${subMenuItem.items.length ? subMenuItemsTemplate(subMenuItem.items) : ''}
                </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </nav>
  `;
}

function template(props) {
  return `
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
            
            <div class="header__website-area-name hide-from-m">${props.home.label}</div>
            
            <nav class="header__navigation visible-from-l">
              <section class="header__first-level-container">
                ${props.menus.map((menu) => `
                <a class="header__first-level-link" href="${menu.href}" ${props.subMenus.some((subMenu) => subMenu.title === menu.label) ? `data-menu="${menu.label}"` : ''}>
                  ${menu.label}
                  <span class="header__first-level-link__child-indication">
                    <span class="icon icon-chevron-right"></span>
                  </span>
                </a>
                `).join('')}
              </section>
            </nav>
            
            <section class="header__megamenu">
              <div class="header__megamenu__backdrop"></div>

              <div class="header__megamenu__menu-container" style="height:0">
        
                <div class="grid__container">
                  <div class="grid__structure">
                    <div class="grid__column grid__column--100 header__megamenu__close-button-container">
                      <a aria-label="Mega-Menü mit diesem Link schließen" class="plain-link header__megamenu__close-button" href="#">
                        <span class="icon icon-close"></span>
                      </a>
                    </div>
                  </div>
                </div>
  
                ${props.subMenus.map((subMenu) => subMenuTemplate(subMenu)).join('')}
              </div>
            </section>
            
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
  `;
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

function addHeaderInteractions(header) {
  const linkMenuOpenClass = 'header__first-level-link--megamenu-open';
  const megaMenuOpenClass = 'header__megamenu--opened';
  const menuVisibleClass = 'header__megamenu__menu--visible';
  const drilldownActiveClass = 'drilldown__first-level-list-item--active';

  const megaMenu = header.querySelector('.header__megamenu');
  const container = header.querySelector('.header__megamenu__menu-container');
  const backdrop = header.querySelector('.header__megamenu__backdrop');

  const setContainerHeight = (menu) => {
    // TODO Find where the 40px are coming from
    const margin = 40;
    const drillDownMenu = menu.querySelector('.drilldown__first-level-list-item--active ul');
    const drillDownMenuHeight = drillDownMenu ? drillDownMenu.getBoundingClientRect().height : 0;
    const menuHeight = menu.getBoundingClientRect().height;
    const containerHeight = container.firstElementChild.getBoundingClientRect().height;

    const height = containerHeight + Math.max(menuHeight, drillDownMenuHeight) + margin;
    container.style.height = `${height}px`;
  };

  const closeMegaMenu = (link, menu) => {
    container.ontransitionend = () => {
      document.body.classList.remove('fixed-body-scroll-position');

      link.classList.remove(linkMenuOpenClass);
      menu.classList.remove(menuVisibleClass);

      container.style.height = '0px';
      megaMenu.classList.remove(megaMenuOpenClass);
      backdrop.style = '';
      container.ontransitionend = () => {};
    };
    container.style.height = '0px';
    backdrop.style.opacity = '0';
  };

  header.querySelector('.header__megamenu__close-button').onclick = (event) => {
    event.preventDefault();

    const link = header.querySelector(`.${linkMenuOpenClass}`);
    if (link) {
      const menu = header.querySelector(`.header__megamenu__menu[data-menu="${link.dataset.menu}"]`);
      closeMegaMenu(link, menu);
    }
  };

  header.querySelectorAll('.header__navigation .header__first-level-link[data-menu]').forEach((link) => {
    link.onclick = (event) => {
      event.preventDefault();

      const isMenuOpen = header.querySelector('.header__megamenu--opened') !== null;
      const menu = header.querySelector(`.header__megamenu__menu[data-menu="${link.dataset.menu}"]`);

      if (!link.classList.contains(linkMenuOpenClass)) {
        if (!isMenuOpen) {
          document.body.classList.add('fixed-body-scroll-position');

          link.classList.add(linkMenuOpenClass);
          menu.classList.add(menuVisibleClass);
          backdrop.setAttribute('style', 'visibility: visible; opacity: 1');

          setContainerHeight(menu);
          megaMenu.classList.add(megaMenuOpenClass);
        } else {
          header.querySelector(`.${linkMenuOpenClass}`).classList.remove(linkMenuOpenClass);
          header.querySelector(`.${menuVisibleClass}`).classList.remove(menuVisibleClass);

          link.classList.add(linkMenuOpenClass);
          menu.classList.add(menuVisibleClass);

          setContainerHeight(menu);
        }
      } else {
        closeMegaMenu(link, menu);
      }
    };
  });

  header.querySelectorAll('.drilldown__first-level-container li:has(ul) a').forEach((link) => {
    link.onclick = (event) => {
      event.preventDefault();

      const li = link.parentElement;
      if (li.classList.contains(drilldownActiveClass)) {
        li.classList.remove(drilldownActiveClass);
      } else {
        const activeDrilldown = header.querySelector(`.${drilldownActiveClass}`);
        if (activeDrilldown) {
          activeDrilldown.classList.remove(drilldownActiveClass);
        }

        li.classList.add(drilldownActiveClass);
        setContainerHeight(header.querySelector(`.${menuVisibleClass}`));
      }
    };
  });

  header.querySelector('.main-menu-toggle').onclick = (event) => {
    event.preventDefault();

    const mainHeader = header.querySelector('.main-header');
    mainHeader.classList.toggle('header--expanded', !mainHeader.classList.contains('header--expanded'));
    mainHeader.classList.toggle('header--mobile-navigation-open', !mainHeader.classList.contains('header--mobile-navigation-open'));
    document.body.classList.toggle('fixed-body-scroll-position', !document.body.classList.contains('fixed-body-scroll-position'));
  };
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
      menus: menus.map((menu) => ({
        href: menu.href,
        label: menu.textContent,
      })),
      subMenus: menus.map((menu) => {
        const subMenus = [];
        const subMenuEl = menu.nextElementSibling;
        if (subMenuEl) {
          subMenuEl.querySelectorAll(':scope > li > a').forEach((subMenu) => {
            const items = [];

            const subMenuItemsEl = subMenu.nextElementSibling;
            if (subMenuItemsEl) {
              subMenuItemsEl.querySelectorAll(':scope > li > a').forEach((item) => {
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

          return {
            title: menu.textContent,
            items: subMenus,
          };
        }

        return null;
      }).filter((item) => item !== null),
      actions: actions.map((action) => ({
        href: action.href,
        label: action.textContent,
      })),
      search: {
        href: search.href,
        icon: search.querySelector('.icon-search').outerHTML,
      },
    };

    block.innerHTML = template(props);

    decorateIcons(block, true);

    const header = document.querySelector('header');
    addScrollListener(header);
    addHeaderInteractions(header);
  }
}
