import { decorateIcons } from '../../scripts/lib-franklin.js';

function template(props) {
  return document.createRange().createContextualFragment(`
    <div class="in-page-navigation exclude-site-search">
      <div class="in-page-navigation__placeholder"></div>
      <section class="grid__container grid__container--full-bleed in-page-navigation__grid">
        <div class="grid__structure">
          <div class="grid__column grid__column--100">
            <div class="grid__background-column"></div>
            <div class="grid__container">
              <div class="grid__structure">
                <div class="grid__column grid__column--100">
                  <div class="in-page-navigation__navigation-wrapper">
                    <a href="#" class="plain-link in-page-navigation__expand-button">
                      Übersicht
                      <i class="in-page-navigation__expand-button-icon">
                        <span class="icon icon-expand-more"></span>
                      </i>
                    </a>
                    <div class="in-page-navigation__navigation-list" style="height: 0px;">
                      ${props.links.map((link) => `
                        <a class="plain-link in-page-navigation__navigation-link" href="${link.href}" title="${link.label}">${link.label}</a>
                      `).join('')}
                    </div>
                    
                    <div class="in-page-navigation__cta-wrapper">
                      <div class="in-page-navigation__cta-wrapper-button">
                        <div>
                          <div class="button-link">
                            <a class="button-link--internal" href="${props.CTALink.href}">
                             <span class="button-link__content">
                                <span><span>${props.CTALink.label}</span></span>
                             </span>
                            </a>
                          </div>
                        </div>
                      </div>
                
                      <div class="in-page-navigation__cta-wrapper-icon">
                        <div>
                          <div class="button-link button-link--icon-rounded">
                            <a class=" button-link--icon  button-link--internal" href="${props.CTALink.href}">
                              <span class="button-link__content">
                                <span class="icon icon-inline-page-navigation/contact-message_selected">
                                  <span class="svg-scale-wrapper" style="padding-bottom: 100%;">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"></path></svg>
                                  </span>
                                </span>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
              
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `);
}

function addStickyListener(navigation) {
  window.addEventListener('scroll', () => {
    navigation.classList.toggle('in-page-navigation--sticky', navigation.getBoundingClientRect().top <= 0);
  }, {
    passive: true,
  });
}

function addActiveLinkListener(navigation) {
  const linkClass = 'in-page-navigation__navigation-link';
  const linkActiveClass = 'in-page-navigation__navigation-link--active';

  let activeHeadingLinks = [];

  const headingLinks = Array.from(document.querySelectorAll('h2'));

  const findActiveHeadingLink = () => {
    let activeHref = null;

    Array.from(navigation.querySelectorAll(`.${linkClass}`)).some((link) => {
      const href = `#${decodeURIComponent(link.href.split('#').pop())}`;

      return activeHeadingLinks.some((activeHeadingLink) => {
        if (activeHeadingLink === href) {
          activeHref = href;
          return true;
        }

        return false;
      });
    });

    return activeHref;
  };

  headingLinks.forEach((headingLink) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const href = `#${headingLink.id}`;
        activeHeadingLinks = activeHeadingLinks.filter((activeHref) => activeHref !== href);

        if (entry.isIntersecting) {
          activeHeadingLinks.push(href);
        }
      });

      const newActiveHeadingLink = findActiveHeadingLink();
      if (newActiveHeadingLink) {
        const link = Array.from(navigation.querySelectorAll(`a.${linkClass}`)).find((el) => decodeURIComponent(el.href).endsWith(newActiveHeadingLink));

        if (link) {
          const activeLink = navigation.querySelector(`.${linkActiveClass}`);
          if (activeLink) {
            activeLink.classList.remove(linkActiveClass);
          }

          link.classList.add(linkActiveClass);
        }
      }
    });

    observer.observe(headingLink);
  });
}

/**
 * decorates the navigation block
 * @param {Element} block The navigation block element
 */

export default async function decorate(block) {
  const links = Array.from(block.querySelectorAll('a')).map((link) => ({
    href: link.href,
    label: link.textContent,
  }));

  const CTALink = links.pop();

  const navTemplate = template({
    links,
    CTALink,
  });

  decorateIcons(navTemplate, true);

  block.textContent = '';
  block.append(navTemplate);

  const nav = block.querySelector('.in-page-navigation');
  addStickyListener(nav);
  addActiveLinkListener(nav);
}
