/* eslint-disable comma-dangle */
import { decorateIcons } from '../../scripts/lib-franklin.js';

function template(items) {
  return `<div class="profile-collection ">
    <div class="profile-collection__settings" data-primary-count="3">
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
                                                <span class="headline__eyebrow text--eyebrow">Pressekontakt</span>
                                                <h2>
                                                    <span class="headline__main" data-js-select="Headline_main">${item.Name}</span>
                                                </h2>
                                                <h3 class="headline__sub hl--sub">${item.Org}</h3>
                                            </span>
                                        </div>
                                        <div class="profile__actions">
                                            <div class="profile__toggle">
                                            </div>
                                            <div class="profile__contact">
                                                <ul class="profile__contact-list">
                                                    <li class="profile__contact-item">
                                                        <a aria-label="Telefon"
                                                            class="plain-link profile__contact-item-link"
                                                            href="tel:${item.Phone}" title="Telefon">
                                                            <span class="icon icon-phone">
                                                            </span>
                                                            <span class="profile__contact-item-label">${item.Phone}</span>
                                                        </a>
                                                    </li>
                                                    <li class="profile__contact-item">
                                                        <a aria-label="E-Mail"
                                                            class="plain-link profile__contact-item-link"
                                                            href="mailto:${item.Email}" title="E-Mail">
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
                                                            <span class="profile__contact-item-label">vCard
                                                                herunterladen</span>
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
  const contacts = [];
  [...block.firstElementChild.firstElementChild.children].forEach((p) => {
    const child = p.querySelector('a');
    contacts.push(child.href);
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
          Name: doc.querySelector('html > head > title').text,
          Email: doc.querySelector('html > head > meta[name="email"]').content,
          Org: doc.querySelector('html > head > meta[name="org"]').content,
          Phone: doc.querySelector('html > head > meta[name="phone"]').content,
          vCard: doc.querySelector('html > head > meta[name="vcard"]').content
        }
      );
    }
  }

  block.innerHTML = template(items);

  decorateIcons(block, true);
}
