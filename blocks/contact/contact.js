/* eslint-disable comma-dangle */
import { decorateIcons, fetchPlaceholders } from '../../scripts/lib-franklin.js';
import { getLocale } from '../../scripts/utils.js';

function template(items, placeholders) {
  return `<div class="profile-collection ">
    <div class="heading-slot"></div>
    <div class="profile-collection__settings" data-primary-count="1">
        <div class="grid__container">
            <div class="profile-collection__content profile-collection__content-medium">
                <div class="profile-collection__section profile-collection__section--visible">
                    <div class="grid__structure profile-collection__structure profile-collection__structure--primary">
                        ${items.map((item) => `<div class="profile-collection__item">
                            <div data-module="Profile" class="profile profile--primary">
                                <div class="grid__structure profile__grid-structure">
                                    <div class="grid__column profile__column--content">
                                        <div class="headline hl-xs    profile__headline ">
                                            <span>
                                                <span class="headline__eyebrow text--eyebrow">${placeholders.contactheadline}</span>
                                                <h3>
                                                    <span class="headline__main" data-js-select="Headline_main">${item.Name}</span>
                                                </h3>
                                                ${item.Org ? `<h4 class="headline__sub hl--sub">${item.Org}</h4>` : ''}
                                            </span>
                                        </div>
                                        <div class="profile__actions">
                                            <div class="profile__toggle">
                                            </div>
                                            <div class="profile__contact">
                                                <ul class="profile__contact-list">
                                                    <li class="profile__contact-item">
                                                        <a aria-label="${placeholders.contacttelephon}"
                                                            class="plain-link profile__contact-item-link"
                                                            href="tel:${item.Phone}" title="${placeholders.contacttelephon}">
                                                            <span class="icon icon-phone">
                                                            </span>
                                                            <span class="profile__contact-item-label">${item.Phone}</span>
                                                        </a>
                                                    </li>
                                                    <li class="profile__contact-item">
                                                        <a aria-label="${placeholders.contactemail}"
                                                            class="plain-link profile__contact-item-link"
                                                            href="mailto:${item.Email}" title="${placeholders.contactemail}">
                                                            <span class="icon icon-mail icon--symbol">
                                                            </span>
                                                            <span
                                                                class="profile__contact-item-label">${item.Email}</span>
                                                        </a>
                                                    </li>
                                                    <li class="profile__contact-item">
                                                        <a aria-label="vCard"
                                                            class="plain-link profile__contact-item-link"
                                                            href="${item.vCard}"
                                                            target="_blank" title="vCard">
                                                            <span class="icon icon-file-download">
                                                            </span>
                                                            <span class="profile__contact-item-label">${placeholders.contactvcard}</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`).join('')}
                    </div>
                    <div class="grid__structure profile-collection__structure profile-collection__structure--secondary">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

export default async function decorate(block) {
  const locale = getLocale();
  const placeholders = await fetchPlaceholders(`/${locale}`);
  const heading = block.querySelector('h2');
  const contacts = [];
  block.querySelectorAll('a').forEach((a) => {
    contacts.push(a.href);
  });

  const reqs = await Promise.all(contacts.map((contact) => fetch(contact)));

  const items = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const req of reqs) {
    if (req.ok) {
      // eslint-disable-next-line no-await-in-loop
      const res = await req.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(res, 'text/html');
      items.push(
        {
          Name: doc.querySelector('html > head > title') ? doc.querySelector('html > head > title').text : undefined,
          Email: doc.querySelector('html > head > meta[name="email"]') ? doc.querySelector('html > head > meta[name="email"]').content : undefined,
          Org: doc.querySelector('html > head > meta[name="org"]') ? doc.querySelector('html > head > meta[name="org"]').content : undefined,
          Phone: doc.querySelector('html > head > meta[name="phone"]') ? doc.querySelector('html > head > meta[name="phone"]').content : undefined,
          vCard: doc.querySelector('html > head > meta[name="vcard"]') ? doc.querySelector('html > head > meta[name="vcard"]').content : undefined,
        }
      );
    }
  }

  block.innerHTML = template(items, placeholders);
  // Required for navigation scroll tracking
  block.querySelector('.heading-slot').append(heading);

  decorateIcons(block, true);
}
