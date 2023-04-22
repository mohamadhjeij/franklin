import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';
import { getLocale, getAemTemplateUrl } from '../../scripts/utils.js';

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
      const menu = header.querySelector('.header__megamenu__menu');
      closeMegaMenu(link, menu);
    }
  };

  header.querySelectorAll('.header__navigation .header__first-level-link[data-megamenu]').forEach((link) => {
    link.onclick = (event) => {
      const menu = header.querySelector(`.header__megamenu__menu[id=${link.getAttribute('data-megamenu')}]`);

      // Handle click only if there's a menu to open. Else it's a normal link.
      if (menu) {
        event.preventDefault();
        const isMenuOpen = header.querySelector('.header__megamenu--opened') !== null;

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
    megaMenu.classList.remove('header__megamenu--opened');
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
  const navPath = cfg.nav || getAemTemplateUrl(getLocale());
  const resp = await fetch(navPath);

  if (resp.ok) {
    const html = await resp.text();
    const parser = new DOMParser();
    const header = parser.parseFromString(html, 'text/html').querySelector('header');
    header.querySelector('.search.search--recommended').remove();
    if (getLocale() === 'de') {
      header.querySelector('a.header__action-area__search').href = 'https://www.zeiss.de/semiconductor-manufacturing-technology/z/suche.html?_charset_=UTF-8';
    } else {
      header.querySelector('a.header__action-area__search').href = 'https://www.zeiss.com/semiconductor-manufacturing-technology/z/search.html?_charset_=UTF-8';
    }

    const headerDiv = document.createElement('div');
    headerDiv.classList.add('header');
    headerDiv.classList.add('main-header');
    headerDiv.innerHTML = header.innerHTML;
    block.appendChild(headerDiv);
    addScrollListener(block);
    addHeaderInteractions(block);
    decorateIcons(block, true);
  }
}
